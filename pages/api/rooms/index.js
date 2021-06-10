import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import { getAllRooms, createNewRoom } from "../../../controllers/roomController";

const handler = nc();

dbConnect();

handler.get(getAllRooms).post(createNewRoom);

export default handler;
