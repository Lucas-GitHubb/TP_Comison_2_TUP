export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  const response = {
    status: 'error',
    message: err.message || 'Ocurrió un error inesperado en el servidor',
  };

  if (process.env.NODE_ENV === 'development' && err.stack) {
    response.stack = err.stack;
  }

  console.error(`❌ [${req.method}] ${req.originalUrl} → ${response.message}`);

  res.status(status).json(response);
};
