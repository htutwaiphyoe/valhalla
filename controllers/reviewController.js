import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";

export const createNewReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, roomId } = req.body;

    if (!rating || !comment || !roomId) {
        return next(new ErrorHandler("Invalid data", 401));
    }
    const room = await Room.findById(roomId);

    const isReviewed = room.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        room.reviews.forEach((review) => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = rating;
                review.comment = comment;
            }
        });
    } else {
        room.reviews.push({
            user: req.user._id,
            name: req.user.name,
            rating,
            comment,
        });

        room.numOfReviews = room.reviews.length;
    }

    room.ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length;

    await room.save({ validateBeforeSave: false });

    res.status(201).json({
        status: "success",
        message: "Your review has been saved.",
    });
});
