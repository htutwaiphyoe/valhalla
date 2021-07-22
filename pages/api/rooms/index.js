import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import { getAllRooms } from "../../../controllers/roomController";
import onError from "../../../middlewares/globalError";

const handler = nc({ onError });

dbConnect();

handler.get(getAllRooms);

export default handler;
