import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("ready");
        return;
    }
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected");
    } catch (err) {
        console.log(err);
    }
};

export default dbConnect;
