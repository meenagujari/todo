const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  bulkUpdateTodos,
  getTodoStats
} = require('../controllers/todoController');

// Routes - Specific routes must come before parameterized routes
router.get('/', getTodos);
router.post('/', createTodo);

router.get('/stats', getTodoStats);

router.patch('/bulk', bulkUpdateTodos);

router.get('/:id', getTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router; 