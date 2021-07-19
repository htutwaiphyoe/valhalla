import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { checkUserisAuthenticated } from "../../../middlewares/auth";
import { addNewBooking } from "../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated).post(addNewBooking);

export default handler;
