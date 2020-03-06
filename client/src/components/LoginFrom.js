import React, { useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
import { useHistory } from 'react-router-dom'
const LoginFrom = () => {
  const history = useHistory()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/api/login', { email, password })
      .then(res => {
        Cookie.set('token', res.data.token)
        history.replace('/')
      })
      .catch(err => console.log(err))
  }
  return (
    <form onSubmit={handleSubmit} className='form'>
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

export default LoginFrom
