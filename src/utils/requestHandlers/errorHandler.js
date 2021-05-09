class AppError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

const errorHandler = (err, res) => {
  if (err instanceof AppError) {
    const { code, message } = err;
    res.status(code).json({
      status: 'error',
      code,
      message,
    });
  } else {
    _logger.error(err.toString());
    res.status(400).json({
      status: 'error',
      code: 400,
      message: err.message ? err.message : 'Something Went Wrong.',
    });
  }
};

module.exports = {
  AppError,
  errorHandler,
};
