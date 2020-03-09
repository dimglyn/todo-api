import UserDAO from '../dao/user'
import bcrypt from 'bcryptjs'

const userDAO = new UserDAO()


class UserService {
    async getAll() {
      return await userDAO.findAll()
    }

    async create(data) {
        const { name, email, password } = data
        const existingUser = await userDAO.findByEmail(email)
        if(existingUser) {
            const error = new Error('User exists already!')
            throw error
        }
        const hashedPw = await bcrypt.hash(password, 12)
        
        return userDAO.create({
            email,
            name,
            password: hashedPw
        })
    }

    async getById(id) {
        const user = await userDAO.findById(id)
        if(!user) {
            throw new Error('Invalid user ID.')
        }
        return user
    }

    async getByEmail(email) {
      return await userDAO.findByEmail(email)
    }

    async validPassword(password, hashedPassword) {
      return await bcrypt.compare(password, hashedPassword)
    }
}

export { UserService as default }