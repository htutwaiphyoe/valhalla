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
