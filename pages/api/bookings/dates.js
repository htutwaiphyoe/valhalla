import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { getBookingDatesByRoom } from "../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.get(getBookingDatesByRoom);

export default handler;
