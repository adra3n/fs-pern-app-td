const express = require('express')
const cors = require('cors')
const pool = require('./db')

const app = express()

const port = 5000

//middlewares
app.use(cors())
app.use(express.json())

////////////routes///////////////

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

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
    res.json(todo.rows[0])
  } catch (error) {
    console.log(error.message)
  }
})

//update

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id= $2',
      [description, id]
    )
    res.json(`ToDo #${id} has been updated`)
  } catch (error) {
    console.log(error.message)
  }
})

//delete

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ])
    res.json(`ToDO #${id} deleted`)
  } catch (error) {
    console.log(error.message)
  }
})

///////////////////////////

app.listen(port, () => {
  console.log('server has started on port 5000')
})
