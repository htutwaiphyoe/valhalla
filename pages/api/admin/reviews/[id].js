import nc from "next-connect";

import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/globalError";
import { checkUserisAuthenticated, checkUserisAuthorized } from "../../../../middlewares/auth";
import { deleteReviewByAdmin } from "../../../../controllers/reviewController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated, checkUserisAuthorized("admin")).delete(deleteReviewByAdmin);

export default handler;
