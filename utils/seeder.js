const mongoose = require("mongoose");
const Room = require("../models/room");

// get json data
const rooms = require("../dev-data/rooms/rooms.json");

mongoose.connect("mongodb://localhost:27017/valhalla", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const seeder = async () => {
    try {
        await Room.deleteMany();
        console.log("Successfully deleted");
        await Room.insertMany(rooms);
        console.log("Successfully inserted");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit(1);
    }
};

seeder();
