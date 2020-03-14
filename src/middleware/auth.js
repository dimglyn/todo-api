import jwt from 'jsonwebtoken'
import UserService from '../services/user'
import UserDAO from '../dao/user'

const userService = new UserService({ userDAO: new UserDAO() })

// TODO extract secret and use from config
const isLoggedIn = async (resolve, parent, args, ctx, info) => {
  const authHeader = ctx.request.get('Authorization')
  const [ , token] = authHeader.split(' ');
  const decoded = jwt.verify(token, 'supersecretsecretysecret')

  const user = await userService.getById(decoded.userId)
  if(user.email !== decoded.email) {
    throw new Error('wtf?')
  }

  ctx.user = user

  return resolve()
}

export { isLoggedIn }