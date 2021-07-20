import absoluteUrl from "next-absolute-url";
import getRawBody from "raw-body";

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

// create new booking after payment => POST: /api/webhook
export const createNewBookingWithWebHook = catchAsyncError(async (req, res, next) => {
    try {
        const rawBody = await getRawBody(req);
        const signature = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const room = session.client_reference_id;

            const user = (await User.findOne({ email: session.customer_email })).id;

            const amountPaid = session.amount_total / 100;

            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status,
            };

            const checkInDate = sesssion.metadata.checkInDate;
            const checkOutDate = sesssion.metadata.checkOutDate;
            const daysOfStay = sesssion.metadata.daysOfStay;

            const booking = await Booking.create({
                room,
                user,
                checkInDate,
                checkOutDate,
                daysOfStay,
                amountPaid,
                paymentInfo,
                paidAt: Date.now(),
            });

            res.status(200).json({
                status: "success",
                message: "Booking success",
            });
        }
    } catch (err) {
        console.log("Error found in Payment", err);
    }
});
