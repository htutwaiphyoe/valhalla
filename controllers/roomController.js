import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "../middlewares/catchAsyncError";
import APIFeatures from "../utils/apiFeatures";

// GET => /api/rooms
const getAllRooms = catchAsyncError(async (req, res, next) => {
    // get query
    const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter();

    // execute query
    const rooms = await apiFeatures.dbQuery;

    res.status(200).json({
        status: "success",
        results: rooms?.length,
        data: {
            data: rooms,
        },
    });
});

// POST => /api/rooms
const createNewRoom = catchAsyncError(async (req, res) => {
    const newRoom = await Room.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            data: newRoom,
        },
    });
});

// GET => /api/rooms/[id]
const getSingleRoom = catchAsyncError(async (req, res, next) => {
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
const updateSingleRoom = catchAsyncError(async (req, res, next) => {
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
const deleteSingleRoom = catchAsyncError(async (req, res, next) => {
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

export { getAllRooms, createNewRoom, getSingleRoom, updateSingleRoom, deleteSingleRoom };
