const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, minlength: 8, required: true }
})

const User = mongoose.model('User', userShema)
module.exports = User
