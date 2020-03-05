const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.decode(token, process.env.JWT_KEY)
    req.user = decoded
    next()
  } catch {
    res.status(500).json({ message: 'Auth failed' })
  }
}
