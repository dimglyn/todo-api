const todoService = require('../services/todo');

module.exports = {
    getTodos: (req, res, next) => {
        const todos = todoService.getAll();
        res.status(200).json(todos);
    },

    addTodo: (req, res, next) => {
        try {
            const newTodo = todoService.create(req.body);
            res.status(201).json(newTodo);
        } catch (err) {
            next(err);
        }
    },

    getTodo: (req, res, next) => {
        try {
            const todo = todoService.get(req.params.id);
            res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    },

    deleteTodo: (req, res, next) => {
        try {
            const deletedTodo = todoService.del(req.params.id);
            res.status(202).json(deletedTodo);
        } catch (err) {
            next(err);
        }
    }
}