import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";

// create new reivew => POST: /api/reviews
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

// get all reviews by admin => GET: /api/admin/reviews
export const getAllReviewsByAdmin = catchAsyncError(async (req, res, next) => {
    const rooms = await Room.find();

    const reviews = [];

    rooms.forEach((room) => {
        if (room.reviews.length > 0) {
            room.reviews.forEach((review) => {
                reviews.push({
                    roomName: room.name,
                    data: review,
                });
            });
        }
    });

    res.status(200).json({
        status: "success",
        data: {
            reviews,
        },
    });
});
