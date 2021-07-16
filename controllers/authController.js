import cloudinary from "cloudinary";
import absoluteUrl from "next-absolute-url";

import User from "../models/user";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../mail/email";

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
            url: result.secure_url,
        };
    }

    await user.save();

    res.status(201).json({
        status: "success",
        message: "Profile has been updated successfully, Please login!",
    });
});

// forgot password => /api/password/forgot
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    // get and check user
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("No user with this email", 404));
    }

    // get token
    const token = user.generateResetPasswordToken();

    // save token
    await user.save({ validateBeforeSave: false });

    // get origin
    const { origin } = absoluteUrl(req);

    // create reset url
    const resetUrl = `${origin}/password/reset/${token}`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Account recovery mail (valid 10 min)",
            body: `Here is the link to reset your password, ${resetUrl}`,
        });

        res.status(200).json({
            status: "success",
            message: `Email was sent to ${user.email}`,
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler("There was an error in sending mail", 500));
    }
});
