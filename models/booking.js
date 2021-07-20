import mongoose from "mongoose";
import timeZone from "mongoose-timezone";

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: "Room",
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    checkInDate: {
        type: Date,
        required: true,
    },

    checkOutDate: {
        type: Date,
        required: true,
    },

    amountPaid: {
        type: Number,
        required: true,
    },

    daysOfStay: {
        type: Number,
        required: true,
    },

    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },

    paidAt: {
        type: Date,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
}); 

// add dates with user timezone
bookingSchema.plugin(timeZone);

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
