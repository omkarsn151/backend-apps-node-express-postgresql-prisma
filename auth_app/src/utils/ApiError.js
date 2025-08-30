class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors || [],
      success: err.success,
      data: err.data,
    });
  }

  // For unexpected errors
  return res.status(500).json({
    message: "Internal server error",
    errors: [err.message],
    success: false,
    data: null,
  });
};

export { ApiError, errorHandler };
