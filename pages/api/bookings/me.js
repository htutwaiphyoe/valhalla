import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { checkUserisAuthenticated } from "../../../middlewares/auth";
import { getAllBookingsByCurrentUser } from "../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated).get(getAllBookingsByCurrentUser);

export default handler;
