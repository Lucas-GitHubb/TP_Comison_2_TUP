export const handleError = (res, error, status = 500) => {
  console.error(error);
  res.status(status).json({
    ok: false,
    message: error.message || "Error interno del servidor",
  });
};
