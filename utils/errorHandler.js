class ErrorHandler extends Error {
    constructor(message, statusCode, status) {
        super(message);
        this.status = status || "error";
        this.statusCode = statusCode || 500;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
