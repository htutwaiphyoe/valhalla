import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { checkUserisAuthenticated } from "../../../middlewares/auth";
import { getBookingDetails } from "../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated).get(getBookingDetails);

export default handler;
