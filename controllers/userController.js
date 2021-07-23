import cloudinary from "cloudinary";
import absoluteUrl from "next-absolute-url";
import crypto from "crypto";

import User from "../models/user";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

// get all users by admin => GET: /api/admin/users
export const getAllUsersByAdmin = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: "success",
        data: {
            users,
        },
    });
});

// get user details by admin => GET: /api/admin/users/:id
export const getUserDetailsByAdmin = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.query.id);
    if (!user) {
        return next(new ErrorHandler("No user found!", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

// update user by admin => PATCH: /api/admin/users/:id
export const updateUserByAdmin = catchAsyncError(async (req, res, next) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return next(new ErrorHandler("Invalid input data!", 400));
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.query.id,
        {
            name,
            email,
            role,
        },
        { runValidators: true, new: true, context: "query" }
    );
    if (!updatedUser) {
        return next(new ErrorHandler("No user found!", 404));
    }
    res.status(200).json({
        status: "success",
        message: "User updated successfully.",
    });
});
