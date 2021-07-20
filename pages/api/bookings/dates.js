import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { getBookedDatesByRoom } from "../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.get(getBookedDatesByRoom);

export default handler;
