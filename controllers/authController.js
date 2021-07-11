import User from "../models/user";
import catchAsyncError from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

export const signUp = catchAsyncError(async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "PUBLIC_ID",
            url: "URL",
        },
    });

    res.status(201).json({
        status: "success",
        message: "Sign up success",
    });
});
