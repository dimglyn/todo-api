const todoService = require('../services/todo');

module.exports = {
    getTodos: async (req, res, next) => {
        const todos = await todoService.getAll();
        res.status(200).json(todos);
    },

    addTodo: async (req, res, next) => {
        try {
            const newTodo = await todoService.create(req.body);
            res.status(201).json(newTodo);
        } catch (err) {
            next(err);
        }
    },

    getTodo: async (req, res, next) => {
        try {
            const todo = await todoService.get(req.params.id);
            res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    },

    deleteTodo: async (req, res, next) => {
        try {
            const deletedTodo = await todoService.del(req.params.id);
            res.status(202).json(deletedTodo);
        } catch (err) {
            next(err);
        }
    }
}