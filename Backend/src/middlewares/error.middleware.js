// middlewares/error.middleware.js
const errorMiddleware = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(status).json({
        success: false,
        message,
        errors: err.errors || [], // For validation or multiple error cases
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    });
};
export { errorMiddleware };
