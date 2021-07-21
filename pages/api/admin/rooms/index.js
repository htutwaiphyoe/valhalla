import nc from "next-connect";

import dbConnect from "../../../../config/dbConnect";
import onError from "../../../../middlewares/globalError";
import { checkUserisAuthenticated, checkUserisAuthorized } from "../../../../middlewares/auth";
import { getAllRoomsByAdmin } from "../../../../controllers/roomController";

const handler = nc({ onError });

dbConnect();

handler.use(checkUserisAuthenticated, checkUserisAuthorized("admin")).get(getAllRoomsByAdmin);

export default handler;
