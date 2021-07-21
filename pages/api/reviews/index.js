import nc from "next-connect";

import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/globalError";
import { checkUserisAuthenticated } from "../../../middlewares/auth";
import { createNewReview } from "../../../controllers/reviewController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated).post(createNewReview);

export default handler;
