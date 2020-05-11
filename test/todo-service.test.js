import mongoose from 'mongoose';
import { expect } from 'chai';

import TodoService from '../src/services/todo';
import Todo from '../src/models/todo';
import User from '../src/models/user';
import TodoDAO from '../src/dao/todo';

import config from '../config';

// TODO: use mock DAO
const todoService = new TodoService({
  todoDAO: new TodoDAO(),
});

let dummyTodoId;
let dummyUser;
const initialText = 'This is a test todo';
const initialTags = ['tag1', 'tag2', 'tag3'];

describe('Todo Service', () => {
  before(async () => {
    await mongoose.connect(`${config.MONGOURI}Test?retryWrites=true`, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    dummyUser = new User({
      email: 'testuser@test.com',
      name: 'testUser',
      password: '123456hashed',
    });
    dummyUser = await dummyUser.save();
  });

  it('should add a new todo in the database', async () => {
    const todoPayload = {
      text: initialText,
      tags: initialTags,
    };
    const todo = await todoService.create(todoPayload, dummyUser._id);
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

  it('should return an array of the todos', async () => {
    const todos = await todoService.getAll();

    expect(todos).to.be.an('array');
  });

  it('should get a todo by its id', async () => {
    const todo = await todoService.getById(dummyTodoId);

    expect(todo.text).to.equal(initialText);
    todo.tags.forEach((tag, index) => {
      expect(tag).to.equal(initialTags[index]);
    });
  });

  it('should update a todo and return the new object', async () => {
    const todoId = dummyTodoId;
    const newData = {
      text: 'This is some fancy todo',
      tags: ['newtag'],
      dueDate: '2019-07-15T00:00:00.000Z',
    };

    const updatedTodo = await todoService.update(todoId, newData);

    expect(updatedTodo.text).to.equal(newData.text);
    updatedTodo.tags.forEach((tag, index) => {
      expect(tag).to.equal(newData.tags[index]);
    });
    expect(updatedTodo.dueDate.toString()).to.equal(
      new Date(newData.dueDate).toString(),
    );
  });

  it('should delete a todo by id', async () => {
    const deletedTodo = await todoService.del(dummyTodoId);
    expect(deletedTodo._id.toString()).to.equal(dummyTodoId.toString());
  });

  after(async () => {
    await Todo.deleteMany({});
    await User.deleteMany({});
    await mongoose.disconnect();
  });
});
