import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
  const [user, setuser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/api/register', user)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  return (
    <form onSubmit={handleSubmit} className='loginForm'>
      <div className='form-group'>
        <label htmlFor='name'>Enter name</label>
        <input
          value={user.name}
          onChange={e => setuser({ ...user, name: e.target.value })}
          type='text'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Enter email</label>
        <input
          value={user.email}
          onChange={e => setuser({ ...user, email: e.target.value })}
          type='text'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Enter password</label>
        <input
          value={user.password}
          onChange={e => setuser({ ...user, password: e.target.value })}
          type='password'
        />
      </div>
      <input type='submit' />
    </form>
  )
}

export default RegisterForm
