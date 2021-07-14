import { getSession } from "next-auth/client";

import catchAsyncError from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

export const checkUserisAuthenticated = catchAsyncError(async (req, res, next) => {
    const session = await getSession({ req });

    if (!session) {
        return next(new ErrorHandler("You need to login", 401));
    }

    req.user = session.user;
    next();
});
