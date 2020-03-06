import axios from 'axios'
const auth = {
  isAuthenticated: false,
  // login
  login: (email, password) => {
    axios
      .post('http://localhost:5000/api/login', { email, password })
      .then(res => {
        auth.isAuthenticated = true
        console.log(res.data.token)
      })
      .catch(err => console.log(error))
  },
  logout: () => (auth.isAuthenticated = false)
}

export default auth
