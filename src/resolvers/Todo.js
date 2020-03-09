import UserService from '../services/user'
const userService = new UserService();

const Todo = {
  user: async (parent, args, ctx, info) => {
    const user = await userService.getById(parent.user)
    return user
  }
}


export { Todo as default}