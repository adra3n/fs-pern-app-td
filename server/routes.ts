import express, { Request, Response } from 'express'
import pool from './db'

const router = express.Router()

// Create
router.post('/todos', async (req: Request, res: Response) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1)',
      [description]
    )
    res.status(201).json(newTodo.rows[0]) // Use 201 Created status code
  } catch (error) {
    console.error('Error creating todo:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Get all
router.get('/todos', async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo')
    res.json(allTodos.rows)
  } catch (error) {
    console.error('Error fetching todos:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Get by id
router.get('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
    res.json(todo.rows[0])
  } catch (error) {
    console.error('Error fetching todo by id:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Update
router.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { description } = req.body
    await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
      description,
      id,
    ])
    res.json(`ToDo #${id} has been updated`)
  } catch (error) {
    console.error('Error updating todo:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Delete
router.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
    res.json(`ToDo #${id} deleted`)
  } catch (error) {
    console.error('Error deleting todo:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
