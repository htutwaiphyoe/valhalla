import nc from "next-connect";

import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/globalError";
import { checkUserisAuthenticated } from "../../../../middlewares/auth";
import { getBookingsByUserIdAndRoomId } from "../../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated).get(getBookingsByUserIdAndRoomId);

export default handler;
