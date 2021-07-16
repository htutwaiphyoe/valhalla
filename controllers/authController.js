import cloudinary from "cloudinary";

import User from "../models/user";
import catchAsyncError from "../middlewares/catchAsyncError";

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// signup: /api/auth/signup
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

// get logged in user: /api/me
export const getLoggedInUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        status: "success",
        data: {
            data: user,
        },
    });
});

// update user profile
export const updateUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(401).json({
            status: "fail",
            message: "You are not logged in.",
        });
    }

    user.name = req.body.name;
    user.email = req.body.email;

    if (req.body.password) user.password = req.body.password;

    if (req.body.avatar !== "") {
        const image_id = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "valhalla/avatar",
            width: "150",
            crop: "scale",
        });

        user.avatar = {
            public_id: result.public_id,
            url: resutl.secure_url,
        };
    }

    await user.save();

    res.status(201).json({
        status: "success",
        message: "Profile has been updated successfully",
    });
});
