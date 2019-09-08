const { Todo } = require('../models/todo')

module.exports = {
    getAll: async () => Todo.find({}),

    create: async (todo) => {
        const { text, tags, dueDate } = todo;
        if(todo.text.trim() === "") {
            throw new Error("Task cannot be empty.");
        }
        let newTodo = new Todo({ text, tags, dueDate })
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

    update: async (id, data) => {
        const updatedTodo = await Todo.findByIdAndUpdate( id, {...data, updatedAt: Date.now() }, { new: true });
        if(!updatedTodo) {
            throw new Error('Invalid todo ID.');
        }
        return updatedTodo;
    },

    del: async (id) => {
        const todo = await Todo.deleteOne({_id: id});
        if(!todo) {
            throw new Error('Invalid todo ID.');
        }
        return todo;
    }
}