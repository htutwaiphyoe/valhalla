import Booking from "../models/booking";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

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
