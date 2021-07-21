import { getSession } from "next-auth/client";

import catchAsyncError from "./catchAsyncError";
import ErrorHandler from "../utils/errorHandler";

// authentication middleware
export const checkUserisAuthenticated = catchAsyncError(async (req, res, next) => {
    const session = await getSession({ req });

    if (!session) {
        return next(new ErrorHandler("You need to login", 401));
    }

    req.user = session.user;
    next();
});

// authorization middleware
export const checkUserisAuthorized = (...roles) =>
    catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler("You don't have permission to access.", 403));
        }
        next();
    });
