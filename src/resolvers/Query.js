import jwt from 'jsonwebtoken';
import validator from 'validator';

import TodoService from '../services/todo';
import UserService from '../services/user';

import TodoDAO from '../dao/todo';
import UserDAO from '../dao/user';

const todoService = new TodoService({ todoDAO: new TodoDAO() });
const userService = new UserService({ userDAO: new UserDAO() });

const Query = {
  todos: async (parent, { userId }) => {
    const user = userService.getById(userId);
    if (!user) {
      throw new Error('User does not exist');
    }
    const todos = await todoService.getAllByUserId(userId);
    return todos;
  },

  todo: async (parent, { todoId, userId }) => {
    const user = userService.getById(userId);
    if (!user) {
      throw new Error('User does not exist');
    }
    const userOwnsTodo = user.todos.includes(todoId);
    if (!userOwnsTodo) {
      throw new Error('This is not your todo');
    }
    const todo = await todoService.getById(todoId);
    return todo;
  },
  login: async (parent, { data }) => {
    if (!validator.isEmail(data.email)) {
      throw new Error('E-mail is invalid.');
    }

    const user = await userService.getByEmail(data.email);
    if (!user) {
      throw new Error('User does not exist');
    }
    const validPass = await userService.validPassword(
      data.password,
      user.password,
    );

    if (!validPass) {
      const error = new Error('Password is incorrect');
      error.code = 401;
      throw error;
    }
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

export { Query as default };
