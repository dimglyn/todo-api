import jwt from 'jsonwebtoken'
import UserService from '../services/user'
const userService = new UserService()

// TODO verify token
const isLoggedIn = async (resolve, parent, args, ctx, info) => {
  const token = ctx.request.get('Authorization')

  const decoded = jwt.decode(token.split(' ')[1])

  const user = await userService.getById(decoded.userId)
  if(user.email !== decoded.email) {
    throw new Error('wtf?')
  }

  ctx.user = user

  return resolve()
}

export { isLoggedIn }