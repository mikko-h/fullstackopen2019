if (process.env.NODE_ENV !== 'production') {
  require('dotenv-flow').config()
}

const { MONGODB_URI, PORT, SECRET } = process.env

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}
