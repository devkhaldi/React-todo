const router = require('express').Router()
const Todo = require('../models/Todo')
const mongoose = require('mongoose')
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user._id })
  res.json(todos)
})

router.post('/', auth, async (req, res) => {
  const todo = new Todo({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    user: req.user._id
  })
  todo
    .save()
    .then(() => res.json({ message: 'Todo created', todo }))
    .catch(err => res.status(500).json({ error }))
})

router.put('/:id', auth, (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then(todo => {
      if (todo.user !== req.user._id) return res.status(500).json({ message: "Can't update todo" })
      res.json(todo)
    })
    .catch(error => res.status(500).json(error))
})

router.delete('/:id', auth, (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => {
      if (todo.user !== req.user._id) return res.status(500).json({ message: "Can't delete todo " })
      res.json({ message: 'Todo deleted' })
    })
    .catch(error => res.json({ error }))
})

module.exports = router
