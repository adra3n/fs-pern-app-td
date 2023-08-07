const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

const port = 5000

//middlewares
app.use(cors())
app.use(express.json())

//////////routes/////////////////

//create

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1)',
      [description]
    )
    res.json(newTodo.rows[0])
    console.log(req.body)
  } catch (error) {
    console.log(error.message)
  }
})

// get all

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo')
    res.json(allTodos.rows)
  } catch (error) {
    console.log(error.message)
  }
})

// get id

//update

//delete

/////////////////////////////////////

app.listen(port, () => {
  console.log('server has started on port 5000')
})
