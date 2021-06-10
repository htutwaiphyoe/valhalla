import Room from "../models/room";

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
        res.status(200).json({
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
const getSingleRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.query.id);
        if (!room) {
            return res.status(404).json({
                status: "fail",
                message: "Room not found with that id",
            });
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
export { getAllRooms, createNewRoom, getSingleRoom };
