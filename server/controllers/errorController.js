module.exports = (err, req, res, next) => {
  res.status(424).json({
    status: 'failed',
    error: err.message,
  });
};
