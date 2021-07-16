import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import uniqueValidator from "mongoose-unique-validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Your password must be longer than 8 characters"],
        select: false,
    },

    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} is not supported.",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.plugin(uniqueValidator, { message: "Email is already in use." });

// pre save middleware for encrypting password
userSchema.pre("save", async function (next) {
    // run this function only password is updated
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
});

// schema method for compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// schema method for generating reset password token
userSchema.methods.generateResetPasswordToken = function () {
    // generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // save in document
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};
export default mongoose.models.User || mongoose.model("User", userSchema);
