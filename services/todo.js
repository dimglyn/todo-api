const { Todo } = require('../models/todo')

module.exports = {
    getAll: async () => Todo.find({}),

    create: async (todo) => {
        const { text } = todo;
        if(todo.text.trim() === "") {
            throw new Error("Task cannot be empty.");
        }
        let newTodo = new Todo({ text })
        await newTodo.save();
        return newTodo;
    },

    get: async (id) => {
        const todo = await Todo.findOne({_id: id});
        if(!todo) {
            throw new Error('Invalid todo ID.');
        }
        return todo;
    },

    del: async (id) => {
        const todo = await Todo.deleteOne({_id: id});
        if(!todo) {
            throw new Error('Invalid todo ID.');
        }
        return todo;
    }
}