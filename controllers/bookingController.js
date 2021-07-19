import Booking from "../models/booking";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

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

// check rooms availability

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
