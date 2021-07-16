import nc from "next-connect";

import dbConnect from "../../../../config/dbConnect";
import { resetPassword } from "../../../../controllers/authController";
import onError from "../../../../middlewares/globalError";

const handler = nc({ onError });

dbConnect();

handler.patch(resetPassword);

export default handler;
