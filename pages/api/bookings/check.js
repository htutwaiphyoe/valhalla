import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { checkRoomAvailability } from "../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomAvailability);

export default handler;
