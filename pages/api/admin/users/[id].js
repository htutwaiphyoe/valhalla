import nc from "next-connect";

import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/globalError";
import { checkUserisAuthenticated, checkUserisAuthorized } from "../../../../middlewares/auth";
import { getUserDetailsByAdmin, updateUserByAdmin } from "../../../../controllers/userController";

const handler = nc({ onError });

dbConnect();

handler
    .use(checkUserisAuthenticated, checkUserisAuthorized("admin"))
    .get(getUserDetailsByAdmin)
    .patch(updateUserByAdmin);

export default handler;
