export const requireFields = (fields) => (req, res, next) => {
  const missing = fields.filter(f => !(f in req.body));
  if (missing.length) return res.status(400).json({ error: `Faltan campos: ${missing.join(', ')}` });
  next();
};