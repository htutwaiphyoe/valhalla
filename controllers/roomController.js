import Room from "../models/room";

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({
            status: "success",
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
export { getAllRooms, createNewRoom };
