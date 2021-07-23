import cloudinary from "cloudinary";

import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import APIFeatures from "../utils/apiFeatures";

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET => /api/rooms
export const getAllRooms = catchAsyncError(async (req, res, next) => {
    // get query
    const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter().paginate();

    // get number of documents in a collection
    const allRoomsCount = await Room.countDocuments();
    // execute query
    const rooms = await apiFeatures.dbQuery;

    res.status(200).json({
        status: "success",
        results: rooms?.length,
        limit: 4,
        total: allRoomsCount,
        data: {
            data: rooms,
        },
    });
});

// POST => /api/admin/rooms
export const createNewRoom = catchAsyncError(async (req, res) => {
    const { images } = req.body;
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "valhalla/avatar",
        });

        imageLinks.push({
            publicId: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imageLinks;

    const newRoom = await Room.create(req.body);

    res.status(201).json({
        status: "success",
        message: "Room is created successfully!",
    });
});

// GET => /api/rooms/[id]
export const getSingleRoom = catchAsyncError(async (req, res, next) => {
    const room = await Room.findById(req.query.id);
    if (!room) {
        return next(new ErrorHandler("Room not found with that id", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: room,
        },
    });
});

// PATCH => /api/rooms/[id]
export const updateSingleRoom = catchAsyncError(async (req, res, next) => {
    const room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler("No room found!", 404));
    }

    if (req.body.images) {
        for (let i = 0; i < room.images.length; i++) {
            await cloudinary.v2.uploader.destroy(room.images[i].publicId);
        }

        const imageLinks = [];
        for (let i = 0; i < req.body.images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
                folder: "valhalla/avatar",
            });

            imageLinks.push({
                publicId: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imageLinks;
    }
    await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        message: "Room updated successfully.",
    });
});

// DELETE => /api/rooms/[id]
export const deleteSingleRoom = catchAsyncError(async (req, res, next) => {
    const deletedRoom = await Room.findByIdAndDelete(req.query.id);

    if (!deletedRoom) {
        return next(new ErrorHandler("Room not found with that id", 404));
    }

    for (let i = 0; i < deletedRoom.images.length; i++) {
        await cloudinary.v2.uploader.destroy(deletedRoom.images[i].publicId);
    }
    res.status(201).json({
        status: "success",
        message: "Room deleted successfully.",
    });
});

// get all rooms by admin => GET: /api/admin/rooms
export const getAllRoomsByAdmin = catchAsyncError(async (req, res, next) => {
    const rooms = await Room.find();

    res.status(200).json({
        status: "success",
        rooms,
    });
});
