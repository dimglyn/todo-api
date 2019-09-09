const todoService = require('../services/todo');
const { Todo } = require('../models/todo');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const config = require('../config');

describe('Todo Controller', function() {
    before(async function(){
        await mongoose.connect(`${config.MONGOURI}?retryWrites=true`, { useNewUrlParser: true });
    });

    it('should add the todo in the database', async function(){ 
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
    
    after(async function(){
        await Todo.deleteMany({});
        await mongoose.disconnect();
    });
});