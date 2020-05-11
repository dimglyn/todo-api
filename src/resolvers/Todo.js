import UserService from '../services/user';
import UserDAO from '../dao/user';

const userService = new UserService({ userDAO: new UserDAO() });
const Todo = {
  user: async (parent) => {
    const user = await userService.getById(parent.user);
    return user;
  },
};

export { Todo as default };
