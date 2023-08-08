"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const router = express_1.default.Router();
// Create
router.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await db_1.default.query('INSERT INTO todo (description) VALUES($1)', [description]);
        res.status(201).json(newTodo.rows[0]); // Use 201 Created status code
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get all
router.get('/todos', async (req, res) => {
    try {
        const allTodos = await db_1.default.query('SELECT * FROM todo');
        res.json(allTodos.rows);
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Get by id
router.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await db_1.default.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows[0]);
    }
    catch (error) {
        console.error('Error fetching todo by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Update
router.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await db_1.default.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
            description,
            id,
        ]);
        res.json(`ToDo #${id} has been updated`);
    }
    catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Delete
router.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db_1.default.query('DELETE FROM todo WHERE todo_id = $1', [id]);
        res.json(`ToDo #${id} deleted`);
    }
    catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
