const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo');

router.get('/', todoController.getTodos);

router.post('/', todoController.addTodo);

router.get('/:id', todoController.getTodo);

router.put('/:id', todoController.updateTodo);

router.put('/:id/done', todoController.markDone);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;