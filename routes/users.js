const User = require('../models/User')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10).then(function(hash) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    user
      .save()
      .then(user =>
        res.json({
          message: 'user created',
          user: {
            email: user.email,
            name: user.name
          }
        })
      )
      .catch(error => res.status(500).json({ error }))
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(500).json({ message: 'Auth failed' })
      bcrypt.compare(req.body.password, user.password).then(result => {
        if (result === false) return res.status(401).json({ message: 'Auth failed' })
        else {
          const token = jwt.sign(
            { _id: user._id, email: user.email, name: user.name },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          )
          res.json({ message: 'Auth success', token })
        }
      })
    })
    .catch(error => res.status(500).json({ message: 'Auth failed' }))
})

module.exports = router
