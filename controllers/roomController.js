const getAllRooms = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "All rooms",
    });
};

export { getAllRooms };
