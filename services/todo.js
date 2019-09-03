const Todo = require('../models/todo')

class todoService {
    constructor() {
        this.todoList = [];
    }

    getAll() {
        return this.todoList;
    }

    create(todo) {
        if(todo.text.trim() === "") {
            throw new Error("Task cannot be empty.");
        }
        let newTodo = new Todo(this.todoList.length, todo.text)
        this.todoList.push(newTodo);
        return newTodo;
    }

    get(id) {
        const todo = this.todoList.find(todo => todo.id === +id);
        if(!todo) {
            throw new Error('Invalid todo ID.');
        }
        return todo;
    }

    del(id) {
        const todo = this.todoList.find(todo => todo.id === +id)
        if(!todo) {
            throw new Error('Invalid todo ID.');
        }
        const index = this.todoList.indexOf(todo);
        this.todoList = this.todoList.splice(index, 1);
        return todo;
    }
}

module.exports = new todoService();