export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.statusText = err.statusText || "error";
    res.status(err.statusCode).json({
        status: err.statusText,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
