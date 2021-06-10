import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import {
    getSingleRoom,
    updateSingleRoom,
    deleteSingleRoom,
} from "../../../controllers/roomController";

const handler = nc();

// connect database
dbConnect();

// routes
handler.get(getSingleRoom).patch(updateSingleRoom).delete(deleteSingleRoom);

export default handler;
