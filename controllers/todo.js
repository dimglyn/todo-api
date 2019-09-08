const todoService = require('../services/todo');

module.exports = {
    getTodos: async (req, res, next) => {
        try {
            const todos = await todoService.getAll();
            res.status(200).json(todos);
        } catch (error) {
            next(err);
        }
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

    updateTodo: async(req, res, next) => {
        try {
            const update = {
                ...req.body.text && {text: req.body.text},
                ...req.body.tags && {tags: [...req.body.tags]},
                ...req.body.dueDate && {dueDate: req.body.dueDate}
            };
            const updatedTodo = await todoService.update(req.params.id, update);
            res.status(201).json(updatedTodo);
        } catch (err) {
            next(err);
        }
    },

    markDone: async(req, res, next) => {
        try {
            const updatedTodo = await todoService.update(req.params.id, { done: true });
            res.status(201).json(updatedTodo);
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