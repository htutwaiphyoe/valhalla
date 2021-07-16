import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { checkUserisAuthenticated } from "../../../middlewares/auth";
import { updateUserProfile } from "../../../controllers/authController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated).patch(updateUserProfile);

export default handler;
