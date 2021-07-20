import nc from "next-connect";

import dbConnect from "../../config/dbConnect";
import onError from "../../middlewares/globalError";

import { createNewBookingWithWebHook } from "../../controllers/paymentController";

const handler = nc({ onError });

dbConnect();

export const config = {
    api: {
        bodyParser: false,
    },
};
handler.post(createNewBookingWithWebHook);

export default handler;
