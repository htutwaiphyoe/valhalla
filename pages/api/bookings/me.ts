import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@/configs/connectDB";
import { checkUserIsAuthenticated } from "@/middlewares/auth";
import { getMyBookings } from "@/controllers/bookingController";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectDB();

router.use(checkUserIsAuthenticated).get(getMyBookings);

export default router.handler();
