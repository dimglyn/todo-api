import TodoService from '../services/todo'
import UserService from '../services/user'
import validator from 'validator'

import jwt from 'jsonwebtoken'

const userService = new UserService()
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
  },

  signUp: async (parent, { data }, ctx, info) => {
    const errors = []

    if (!validator.isEmail(data.email)) {
      errors.push({ message: 'E-mail is invalid.' })
    }

    if(validator.isEmpty(data.password) || !validator.isLength(data.password, { min: 5 })){
        errors.push({message: 'Password too short!'})
    }

    if(errors.length > 0) {
      const error = new Error('Invalid input.')
      error.data = errors
      error.code = 422
      throw error
    }

    const user = await userService.create(data)

    console.log(user.email);

    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
    }, 
    'supersecretsecretysecret',
    {expiresIn: '1h'})

    return { token , user: user }
  }
}

export { Mutation as default }