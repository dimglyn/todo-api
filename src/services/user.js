import User from '../models/user'
import bcrypt from 'bcryptjs'


class UserService {
    async getAll() {
      return await User.find({})
    }

    async create(data) {
        const { name, email, password } = data
        const existingUser = await User.findOne({email: email})
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
}

export { UserService as default }