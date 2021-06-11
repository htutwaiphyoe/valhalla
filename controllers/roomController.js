import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";

// GET => /api/rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({
            status: "success",
            results: rooms.length,
            data: {
                data: rooms,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            error: err,
        });
    }
};

// POST => /api/rooms
const createNewRoom = async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                data: newRoom,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            error: err,
        });
    }
};

// GET => /api/rooms/[id]
const getSingleRoom = async (req, res, next) => {
    try {
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
    } catch (err) {
        res.status(400).json({
            status: "fail",
            error: err,
        });
    }
};

// PATCH => /api/rooms/[id]
const updateSingleRoom = async (req, res, next) => {
    try {
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
    } catch (err) {
        res.status(400).json({
            status: "fail",
            error: err,
        });
    }
};

// DELETE => /api/rooms/[id]
const deleteSingleRoom = async (req, res, next) => {
    try {
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
    } catch (err) {
        res.status(400).json({
            status: "fail",
            error: err,
        });
    }
};
export { getAllRooms, createNewRoom, getSingleRoom, updateSingleRoom, deleteSingleRoom };
