const todoService = require('../services/todo');
const { Todo } = require('../models/todo');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const config = require('../config');

describe('Todo Service', function() {
    before(async function(){
        await mongoose.connect(`${config.MONGOURI}?retryWrites=true`, { useNewUrlParser: true });
    });

    it('should return an array of the todos', async function() {
        const todos = await todoService.getAll();
        
        expect(todos).to.be.an('array');
    });

    it('should add a new todo in the database', async function(){ 
        const text = 'This is a test todo';
        const tags = ['tag1', 'tag2', 'tag3'];
        const payload = {
            text,
            tags
        };

        const todo = await todoService.create(payload);
        expect(todo).to.have.property('text');
        expect(todo).to.have.property('dueDate');
        expect(todo).to.have.property('tags').with.lengthOf(3);
        expect(todo.text).to.equals(text);
        expect(todo.dueDate).to.equal(null);
    });

    it('should update a todo and return the new object', async function() {
        const todos = await todoService.getAll();

        const todoId = todos[0]._id;
        const newData = {
            text: 'This is some fancy todo',
            tags: ['newtag'],
            dueDate: '2019-07-15T00:00:00.000Z'
        }

        const updatedTodo = await todoService.update(todoId, newData);

        expect(updatedTodo.text).to.equal(newData.text);
        updatedTodo.tags.forEach((tag, index) => {
            expect(tag).to.equal(newData.tags[index]);
        });
        expect(updatedTodo.dueDate.toString()).to.equal((new Date(newData.dueDate)).toString());
    })

    after(async function(){
        await Todo.deleteMany({});
        await mongoose.disconnect();
    });
});