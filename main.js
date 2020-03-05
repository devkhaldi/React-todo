const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const cors = require('cors')

// Enable cors for all routes
app.use(cors())
// connect
mongoose.connect(process.env.MONOGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise

app.use(express.json())
app.use('/api/todos', require('./routes/todos'))
app.use('/api', require('./routes/users'))

// handel errors
app.use((req, res) => res.status(404).json({ message: 'Not found' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started at ${PORT}`))
