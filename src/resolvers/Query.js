import TodoService from '../services/todo'
import UserService from '../services/user'
const todoService = new TodoService()
const userService = new UserService()

const Query  = {
  todos: async (parent, args, ctx, info) => {
    const todos = await todoService.getAll()
    return todos
  },
  todo: async (parent, args, ctx, info) => {
    const todo = await todoService.getById(args.todoID)
    return todo
  },
  users: async(parent, args, ctx, info) => {
    const users = await userService.getAll
  }
}

export { Query as default }