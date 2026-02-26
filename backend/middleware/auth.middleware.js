
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'clave_super_secreta';

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado. Token faltante.' });
    }
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret);
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido', detail: err.message });
  }
};


module.exports.verifyRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autorizado' });
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Acceso denegado, rol insuficiente' });
    }
    next();
  };
};