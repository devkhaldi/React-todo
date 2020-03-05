import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/api/login', { email, password })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  return (
    <form onSubmit={handleSubmit} className='loginForm'>
      <div className='form-group'>
        <label htmlFor='email'>Enter email</label>
        <input value={email} onChange={e => setemail(e.target.value)} type='text' />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Enter password</label>
        <input value={password} onChange={e => setpassword(e.target.value)} type='password' />
      </div>
      <input type='submit' />
    </form>
  )
}

export default Login
