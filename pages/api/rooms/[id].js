import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import { getSingleRoom } from "../../../controllers/roomController";
import onError from "../../../middlewares/globalError";

const handler = nc({ onError });

// connect database
dbConnect();

// routes
handler.get(getSingleRoom);

export default handler;
