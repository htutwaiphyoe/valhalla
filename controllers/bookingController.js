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
export const getBookedDatesByRoom = catchAsyncError(async (req, res, next) => {
    // get room id from query
    const { room } = req.query;

    // get bookings of that room
    const bookings = await Booking.find({ room });

    // get dates in booking objects
    let bookedDates = [];

    // to get users timezone
    // moment().utcOffset() return minutes which is difference between users timezone and current UTC
    // for Myanmar, it returns 390 minutes which is 6 hours and 30 minutes
    // to get hours, divide by 60
    let timeDifference = moment().utcOffset() / 60;

    // loop throung arrays of booking objects
    bookings.forEach((booking) => {
        // add timezone difference in fetched data
        const checkInDate = moment(booking.checkInDate).add(timeDifference, "hours");
        const checkOutDate = moment(booking.checkOutDate).add(timeDifference, "hours");
        // get date range with monment-range between checkIn and checkOut
        const range = moment.range(moment(checkInDate), moment(checkOutDate));

        // range return start and end
        // get days in range with range.by("day")
        // transform to array of days and add to dates
        bookedDates = [...bookedDates, ...Array.from(range.by("day"))];
    });

    res.status(200).json({
        status: "success",
        bookedDates,
    });
});

// get all bookings of current user
export const getAllBookingsByCurrentUser = catchAsyncError(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user._id })
        .populate({
            path: "room",
            select: "name pricePerNight images",
        })
        .populate({
            path: "user",
            select: "name email",
        });
    res.status(200).json({
        status: "success",
        bookings,
    });
});

// get booking details => GET: /api/bookings/:id
export const getBookingDetails = catchAsyncError(async (req, res, next) => {
    const booking = await Booking.findById(req.query.id)
        .populate({
            path: "room",
            select: "name pricePerNight images",
        })
        .populate({
            path: "user",
            select: "name email",
        });

    res.status(200).json({
        status: "success",
        booking,
    });
});

// get bookings by user and room => GET: /api/bookings/room/:id
export const getBookingsByUserIdAndRoomId = catchAsyncError(async (req, res, next) => {
    const { id } = req.query;

    const bookings = await Booking.find({ user: req.user._id, room: id });

    const hasBookings = bookings.length > 0;

    res.status(200).json({
        status: "success",
        hasBookings,
    });
});

// get all bookings by admin => GET: /api/admin/bookings
export const getAllBookingsByAdmin = catchAsyncError(async (req, res, next) => {
    const bookings = await Booking.find()
        .populate({
            path: "room",
            select: "name pricePerNight images",
        })
        .populate({
            path: "user",
            select: "name email",
        });
    res.status(200).json({
        status: "success",
        bookings,
    });
});

// delete booking by admin => DELETE: /api/admin/bookings/:bookingId
export const deleteBookingByAdmin = catchAsyncError(async (req, res, next) => {
    const deletedBooking = await Booking.findByIdAndDelete(req.query.id);

    if (!deletedBooking) {
        return next(new ErrorHandler("No booking found", 404));
    }

    res.statue(204).json({
        status: "success",
        message: "Booking deleted successfully.",
    });
});
