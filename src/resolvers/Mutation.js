import TodoService from '../services/todo'
const todoService = new TodoService()

const Mutation  = {
  createTodo: async (parent, args, ctx, info) => {
    const todos = await todoService.create(args.data)
    return todos
  },
  deleteTodo: async (parent, args, ctx, info) => {
    const todo = await todoService.del(args.todoID)
    return todo
  },
  updateTodo: async (parent, args, ctx, info) => {
    const update = {
      ...args.data.text && {text: args.data.text},
      ...args.data.tags && {tags: [...args.data.tags]},
      ...args.data.dueDate && {dueDate: args.data.dueDate},
      ...args.data.done && {done: args.data.done},
    }
    const todo = await todoService.update(args.todoID, update)
    return todo
  },
  markDone: async (parent, args, ctx, info) => {
    const todo = await todoService.update(args.todoID, {done: true});
    return todo;
  },
  markUnDone: async (parent, args, ctx, info) => {
    const todo = await todoService.update(args.todoID, {done: false});
    return todo;
  }
}

export { Mutation as default }