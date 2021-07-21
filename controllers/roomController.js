import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import APIFeatures from "../utils/apiFeatures";

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

// POST => /api/rooms
export const createNewRoom = catchAsyncError(async (req, res) => {
    const newRoom = await Room.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            data: newRoom,
        },
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
    const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedRoom) {
        return next(new ErrorHandler("Room not found with that id", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: updatedRoom,
        },
    });
});

// DELETE => /api/rooms/[id]
export const deleteSingleRoom = catchAsyncError(async (req, res, next) => {
    const deletedRoom = await Room.findByIdAndDelete(req.query.id);

    if (!deletedRoom) {
        return next(new ErrorHandler("Room not found with that id", 404));
    }
    res.status(204).json({
        status: "success",
        data: {
            data: deletedRoom,
        },
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
