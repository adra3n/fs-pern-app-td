require('dotenv').config()

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

const port = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())

// Routes '/api'
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})
