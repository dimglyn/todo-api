import TodoService from '../services/todo'
import TodoDAO from '../dao/todo'

const todoService = new TodoService({ todoDAO: new TodoDAO() })

const User = {
  todos: async(parent, args, ctx, info) => {
    const todo = await todoService.getAllByUserId(parent.id)
    return todo
  }
}

export { User as default }