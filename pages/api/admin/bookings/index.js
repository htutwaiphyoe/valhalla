import nc from "next-connect";

import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/globalError";
import { checkUserisAuthenticated, checkUserisAuthorized } from "../../../../middlewares/auth";
import { getAllBookingsByAdmin } from "../../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated, checkUserisAuthorized("admin")).get(getAllBookingsByAdmin);

export default handler;
