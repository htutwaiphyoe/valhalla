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
        // const e = {
        //     data: {
        //         object: {
        //             id: "cs_test_a1SeHVLzf5J4QbH0MOg22oH3J85VlxEhfFMBFzRA1LljT7S4U8vAacvVOa",
        //             object: "checkout.session",
        //             allow_promotion_codes: null,
        //             amount_subtotal: 28500,
        //             amount_total: 28500,
        //             automatic_tax: [Object],
        //             billing_address_collection: null,
        //             cancel_url: "https://hotelvalhalla.vercel.app/room/60e6e0d5e1d0020fa8d2cd36",
        //             client_reference_id: "60e6e0d5e1d0020fa8d2cd36",
        //             currency: "usd",
        //             customer: "cus_Jt5gJ0zvuCMNV0",
        //             customer_details: [Object],
        //             customer_email: "user2@valhalla.com",
        //             display_items: [Array],
        //             livemode: false,
        //             locale: null,
        //             metadata: [Object],
        //             mode: "payment",
        //             payment_intent: "pi_1JFJUUIu5rogl5wkxfnL8K9I",
        //             payment_method_options: {},
        //             payment_method_types: [Array],
        //             payment_status: "paid",
        //             setup_intent: null,
        //             shipping: null,
        //             shipping_address_collection: null,
        //             submit_type: null,
        //             subscription: null,
        //             success_url: "https://hotelvalhalla.vercel.app/bookings",
        //             total_details: [Object],
        //             url: null,
        //         },
        //     },
        // };

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            console.log(session);
            //     const room = session.client_reference_id;

            //     const user = (await User.findOne({ email: session.customer_email })).id;

            //     const amountPaid = session.amount_total / 100;

            //     const paymentInfo = {
            //         id: session.payment_intent,
            //         status: session.payment_status,
            //     };

            //     const checkInDate = sesssion.metadata.checkInDate;
            //     const checkOutDate = sesssion.metadata.checkOutDate;
            //     const daysOfStay = sesssion.metadata.daysOfStay;

            //     const booking = await Booking.create({
            //         room,
            //         user,
            //         checkInDate,
            //         checkOutDate,
            //         daysOfStay,
            //         amountPaid,
            //         paymentInfo,
            //         paidAt: Date.now(),
            //     });

            res.status(200).json({
                status: "success",
                message: "Booking success",
            });
        }
    } catch (err) {
        console.log("Error found in Payment", err);
    }
});
