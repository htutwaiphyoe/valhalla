import cloudinary from "cloudinary";

import User from "../models/user";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const signUp = catchAsyncError(async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "valhalla/avatar",
        width: "150",
        crop: "scale",
    });
    const { name, email, password } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url,
        },
    });

    res.status(201).json({
        status: "success",
        message: "Sign up success",
    });
});
