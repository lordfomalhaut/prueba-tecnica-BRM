module.exports = (...allowed) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  if (!allowed.includes(req.user.role))
    return res.status(403).json({ message: 'Sin permiso' });
  next();
};
