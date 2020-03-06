import React, { useEffect } from 'react'
import { useState } from 'react'
import Todo from './Todo'
import axios from 'axios'
import Cookie from 'js-cookie'

const Todos = () => {
  const [todos, settodos] = useState([])
  const [title, settitle] = useState('')
  // fetch todos of
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/todos', {
        headers: {
          Authorization: `Bearer ${Cookie.get('token')}`
        }
      })
      .then(res => settodos(res.data))
      .catch(err => console.log(err))
  })
  // Save a new todo
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post(
        'http://localhost:5000/api/todos',
        { title },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get('token')}`
          }
        }
      )
      .then(res => settodos([...todos, res.data.todo]))
      .catch(err => console.log(err))
  }

  return (
    <div className='todos'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Enter title</label>
          <input value={title} onChange={e => settitle(e.target.value)} type='text' id='title' />
        </div>
        <button type='submit'>Add Todo</button>
      </form>
      <div className='todo-list'>
        {todos.map(todo => (
          <Todo key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  )
}

export default Todos
