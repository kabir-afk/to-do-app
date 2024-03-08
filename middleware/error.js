class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message),
        this.statusCode = statusCode
    }
}

function errorMiddleware(err, req, res, next) {
  err.message || "Internal Server Error";
  err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}

module.exports = {errorMiddleware,ErrorHandler};
