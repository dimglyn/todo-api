import User from '../models/user'
import bcrypt from 'bcryptjs'


class UserService {
    async getAll() {
      return await User.find({})
    }

    async create(data) {
        const { name, email, password } = data
        const existingUser = await this.getByEmail(email)
        if(existingUser) {
            const error = new Error('User exists already!')
            throw error
        }
        const hashedPw = await bcrypt.hash(password, 12)
        
        const user = new User({
            email,
            name,
            password: hashedPw
        })
        
        await user.save()
        return user
    }

    async getById(id) {
        const user = await User.findOne({_id: id})
        if(!user) {
            throw new Error('Invalid user ID.')
        }
        return user
    }

    async getByEmail(email) {
      return await User.findOne({ email: email })
    }

    async validPassword(password, hashedPassword) {
      return await bcrypt.compare(password, hashedPassword)
    }
}

export { UserService as default }