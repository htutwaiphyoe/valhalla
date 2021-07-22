import nc from "next-connect";

import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/globalError";
import { checkUserisAuthenticated, checkUserisAuthorized } from "../../../../middlewares/auth";
import { deleteBookingByAdmin } from "../../../../controllers/bookingController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated, checkUserisAuthorized("admin")).delete(deleteBookingByAdmin);

export default handler;
