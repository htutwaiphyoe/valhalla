import ErrorHandler from "../utils/errorHandler";

const handleDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.statusText,
        name: err.name,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const handleProdError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.statusText,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Oops! Something went very wrong.",
        });
    }
};

const handleCastError = (err) => new ErrorHandler(`Invalid: ${err.path}: ${err.value}`, 400);

const handleValidationError = (err) => {
    const message = Object.values(err.errors)
        .map((key) => key.message)
        .join(" .");
    return new ErrorHandler(message, 400);
};

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.statusText = err.statusText || "error";
    if (process.env.NODE_ENV === "development") {
        handleDevError(err, res);
    } else if (process.env.NODE_ENV === "production") {
        
        // mongoose invalid id with wrong format error
        if (err.name === "CastError") {
            err = handleCastError(err);
        }

        // mongoose validation error
        if (err.name === "ValidationError") {
            err = handleValidationError(err);
        }
        handleProdError(err, res);
    }
};
