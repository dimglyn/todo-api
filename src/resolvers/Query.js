import TodoService from '../services/todo'
const todoService = new TodoService()

const Query  = {
  todos: async (parent, args, ctx, info) => {
    const todos = await todoService.getAll()
    return todos
  },
  todo: async (parent, args, ctx, info) => {
    const todo = await todoService.get(args.todoID)
    return todo
  }
}

export { Query as default }