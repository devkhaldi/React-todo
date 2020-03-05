const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User' }
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
