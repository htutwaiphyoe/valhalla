import nc from "next-connect";

import dbConnet from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { signUp } from "../../../controllers/authController";

const handler = nc({ onError });

dbConnet();

handler.post(signUp);

export default handler;
