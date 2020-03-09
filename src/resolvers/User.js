import TodoService from '../services/todo'
const todoService = new TodoService()

const User = {
  todos: async(parent, args, ctx, info) => {
    const todo = await todoService.getAllByUser(parent.id)
    return todo
  }
}

export { User as default }