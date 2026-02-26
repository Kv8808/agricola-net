// middleware/error.middleware.js
module.exports = (err, req, res, next) => {
  console.error('ERROR_HANDLER:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    detail: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};