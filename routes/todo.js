const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo');

router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodo);
router.post('/', todoController.addTodo);
router.put('/:id', todoController.updateTodo);
router.put('/:id/done', todoController.markDone);
router.put('/:id/undone', todoController.markUndone);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;