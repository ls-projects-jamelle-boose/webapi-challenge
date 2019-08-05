module.exports = (err, req, res, next) => {
  if (err.code) {
    res.status(err.code).json({
      ...err,
      success: false
    });
  }

  next();
};
