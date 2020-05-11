import validator from 'validator';
import jwt from 'jsonwebtoken';
import logger from '../util/logger';

import TodoService from '../services/todo';
import UserService from '../services/user';

import TodoDAO from '../dao/todo';
import UserDAO from '../dao/user';

const userService = new UserService({ userDAO: new UserDAO() });
const todoService = new TodoService({ todoDAO: new TodoDAO() });

const Mutation = {
  createTodo: async (parent, { data, userId }) => {
    const user = userService.getById(userId);
    if (!user) {
      throw new Error('User does not exist');
    }
    const todos = await todoService.create(data, userId);
    return todos;
  },
  deleteTodo: async (parent, { todoId, userId }) => {
    const user = userService.getById(userId);
    if (!user) {
      throw new Error('User does not exist');
    }
    const userOwnsTodo = user.todos.include(todoId);
    if (!userOwnsTodo) {
      throw new Error('This is not your todo');
    }

    const todo = await todoService.del(todoId);
    return todo;
  },
  updateTodo: async (parent, { data, todoId, userId }) => {
    const user = userService.getById(userId);
    const userOwnsTodo = user.todos.include(todoId);
    if (!userOwnsTodo) {
      throw new Error('This is not your todo');
    }
    const update = {
      ...(data.text && { text: data.text }),
      ...(data.tags && { tags: [...data.tags] }),
      ...(data.dueDate && { dueDate: data.dueDate }),
      ...(data.done && { done: data.done }),
    };
    const todo = await todoService.update(todoId, update);
    return todo;
  },
  markDone: async (parent, { todoId, userId }) => {
    const user = userService.getById(userId);
    const userOwnsTodo = user.todos.include(todoId);
    if (!userOwnsTodo) {
      throw new Error('This is not your todo');
    }
    const todo = await todoService.update(todoId, { done: true });
    return todo;
  },
  markUnDone: async (parent, { todoId, userId }) => {
    const user = userService.getById(userId);
    const userOwnsTodo = user.todos.include(todoId);
    if (!userOwnsTodo) {
      throw new Error('This is not your todo');
    }
    const todo = await todoService.update(todoId, { done: false });
    return todo;
  },

  signUp: async (parent, { data }) => {
    const errors = [];

    if (!validator.isEmail(data.email)) {
      errors.push({ message: 'E-mail is invalid.' });
    }

    if (
      validator.isEmpty(data.password)
      || !validator.isLength(data.password, { min: 5 })
    ) {
      errors.push({ message: 'Password too short!' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const user = await userService.create(data);

    logger.info(user.email);

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      'supersecretsecretysecret',
      { expiresIn: '1h' },
    );

    return { token, user };
  },
};

export { Mutation as default };
