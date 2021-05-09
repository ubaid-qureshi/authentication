global._handleResponse = ({
  res, statusCode, response, status = 'success', message = '',
}) => res.status(statusCode).json({
  status,
  message,
  data: response || [],
});
