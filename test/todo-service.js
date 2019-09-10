const todoService = require('../services/todo');
const { Todo } = require('../models/todo');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const config = require('../config');

let dummyTodoId;

const initialText = 'This is a test todo';
const initialTags = ['tag1', 'tag2', 'tag3'];

describe('Todo Service', function() {
    before(async function(){
        await mongoose.connect(`${config.MONGOURI}?retryWrites=true`, { useNewUrlParser: true });
    });

    it('should add a new todo in the database', async function(){ 
        const payload = {
            text: initialText,
            tags: initialTags
        };
        const todo = await todoService.create(payload);
        dummyTodoId = todo._id;
        expect(todo).to.have.property('text');
        expect(todo).to.have.property('dueDate');
        expect(todo).to.have.property('tags').with.lengthOf(3);
        expect(todo.text).to.equals(initialText);
        todo.tags.forEach((tag, index) => {
            expect(tag).to.equal(initialTags[index]);
        });
        expect(todo.dueDate).to.equal(null);
    });

    it('should return an array of the todos', async function() {
        const todos = await todoService.getAll();
        
        expect(todos).to.be.an('array');
    });

    it('should get a todo by its id', async function() {
        const todo = await todoService.get(dummyTodoId);

        expect(todo.text).to.equal(initialText);
        todo.tags.forEach((tag, index) => {
            expect(tag).to.equal(initialTags[index]);
        });
    });

    it('should update a todo and return the new object', async function() {
        const todoId = dummyTodoId;
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
    });

    it('should delete a todo by id', async function(){

    });

    after(async function(){
        await Todo.deleteMany({});
        await mongoose.disconnect();
    });
});