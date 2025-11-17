export default function handleApiError(error) {
  let message =
    error?.data?.error ||
    error?.data?.message ||
    error?.message ||
    "Error desconocido";

  const customError = new Error(message);

  customError.status = error.status || 0;
  customError.data = error.data || null;
  customError.raw = error;

  return customError;
}
