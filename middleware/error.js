const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = { ...err };
  error.message = err.message;
  //Log to console for dev

  //MOngoose bad ObjectId
  if (err.code === "ER_DUP_ENTRY") {
    const message = `Duplicate entry found in request`;
    error = new ErrorResponse(message, 404);
  }

  //Mongo duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }
  //mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;
