import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { checkUserisAuthenticated } from "../../../middlewares/auth";
import { getStripeCheckoutSession } from "../../../controllers/paymentController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated).get(getStripeCheckoutSession);

export default handler;
