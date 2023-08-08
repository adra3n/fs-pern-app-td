import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import pool from './db'

const app: Express = express()
const port: number = 5000

// Middlewares
app.use(cors())
app.use(express.json())

//////////// Routes /////////////

// Create
app.post('/todos', async (req: Request, res: Response) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1)',
      [description]
    )
    res.json(newTodo.rows[0])
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      console.error('An unexpected error occurred:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
})

// Get all
app.get('/todos', async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo')
    res.json(allTodos.rows)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      console.error('An unexpected error occurred:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
})

// Get by id
app.get('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
    res.json(todo.rows[0])
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      console.error('An unexpected error occurred:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
})

// Update
app.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    )
    res.json(`ToDo #${id} has been updated`)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      console.error('An unexpected error occurred:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
})

// Delete
app.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
    res.json(`ToDo #${id} deleted`)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      res.status(500).json({ error: 'Internal Server Error' })
    } else {
      console.error('An unexpected error occurred:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
})

///////////////////////////

app.listen(port, () => {
  console.log('Server has started on port 5000')
})
