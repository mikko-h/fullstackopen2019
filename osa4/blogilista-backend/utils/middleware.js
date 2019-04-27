const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'PasswordError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

module.exports = {
  errorHandler
}
