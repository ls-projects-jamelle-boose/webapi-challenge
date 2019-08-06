module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({
      ...err,
      success: false
    });
  }

  next();
};
