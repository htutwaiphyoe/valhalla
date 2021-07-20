import absoluteUrl from "next-absolute-url";

import Room from "../models/room";
import User from "../models/user";
import Booking from "../models/booking";
import catchAsyncError from "../middlewares/catchAsyncError";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// generate stripe checkout session => GET: /api/checkout/:id
export const getStripeCheckoutSession = catchAsyncError(async (req, res, next) => {
    // get room
    const room = await Room.findById(req.query.id);

    const { checkInDate, checkOutDate, daysOfStay } = req.query;
    // get origin
    const { origin } = absoluteUrl(req);

    // generate stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        success_url: `${origin}/bookings`,
        cancel_url: `${origin}/room/${room._id}`,
        customer_email: req.user.email,
        client_reference_id: req.query.id,
        metadata: { checkInDate, checkOutDate, daysOfStay },
        line_items: [
            {
                name: room.name,
                images: [`${room.images[0].url}`],
                amount: req.query.amount * 100,
                currency: "usd",
                quantity: 1,
            },
        ],
    });

    res.status(200).json({
        status: "success",
        session,
    });
});
