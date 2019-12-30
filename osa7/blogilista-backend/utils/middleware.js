const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'PasswordError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  next(err)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}


module.exports = {
  errorHandler,
  tokenExtractor
}
