import Moment from "moment";
import { extendMoment } from "moment-range";

import Booking from "../models/booking";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment);
// create new booking => POST: /api/bookings
export const addNewBooking = catchAsyncError(async (req, res, next) => {
    const { room, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo } = req.body;

    const newBooking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
    });

    res.status(201).json({
        status: "success",
        message: "Booking success",
        data: {
            booking: newBooking,
        },
    });
});

// check rooms availability => GET: /api/bookings/check?room=[roomid]&checkInDate=[checkInd]

export const checkRoomAvailability = catchAsyncError(async (req, res, next) => {
    let { room, checkInDate, checkOutDate } = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    const bookings = await Booking.find({
        room,
        $and: [{ checkInDate: { $lte: checkOutDate } }, { checkOutDate: { $gte: checkInDate } }],
    });

    const isAvailable = bookings && bookings.length === 0;

    res.status(200).json({
        status: "success",
        isAvailable,
    });
});

// get booking dates of a room => GET: /api/bookings/dates?room=[roomid]
export const getBookingDatesByRoom = catchAsyncError(async (req, res, next) => {
    // get room id from query
    const { room } = req.query;

    // get bookings of that room
    const bookings = await Booking.find({ room });

    // get dates in booking objects
    let bookingDates = [];

    // loop throung arrays of booking objects
    bookings.forEach((booking) => {
        // get date range with monment-range between checkIn and checkOut
        const range = moment.range(moment(booking.checkInDate), moment(booking.checkOutDate));

        // range return start and end
        // get days in range with range.by("day")
        // transform to array of days and add to dates
        bookingDates = [...bookingDates, ...Array.from(range.by("day"))];
    });

    res.status(200).json({
        status: "success",
        bookingDates,
    });
});
