import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import { getAllRooms, createNewRoom } from "../../../controllers/roomController";
import onError from "../../../middlewares/globalError";

const handler = nc({ onError });

dbConnect();

handler.get(getAllRooms).post(createNewRoom);

export default handler;
