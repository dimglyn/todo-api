import TodoService from '../services/todo'
import UserService from '../services/user'
import jwt from 'jsonwebtoken'
import validator from 'validator'

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
  login: async (parent, { data }, ctx, info) => {
    if (!validator.isEmail(data.email)) {
      throw new Error('E-mail is invalid.')
    }

    const user = await userService.getByEmail(data.email)
    const validPass = await userService.validPassword(data.password, user.password)

    if (!validPass) {
      const error = new Error('Password is incorrect');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
    }, 
    'supersecretsecretysecret',
    {expiresIn: '1h'})

    return { token , user: user }
  }
}

export { Query as default }