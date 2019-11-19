import User from '../models/user'

class UserService {
    async getAll() {
      return await User.find({})
    }

    async create(user) {
        const { text, tags, dueDate } = user
        if(user.text.trim() === "") {
            throw new Error("Task cannot be empty.")
        }
        let newUser = new User({ text, tags, dueDate })
        await newUser.save()
        return newUser
    }

    async getById(id) {
        const user = await User.findOne({_id: id})
        if(!user) {
            throw new Error('Invalid user ID.')
        }
        return user
    }

    async update(id, data) {
        const updatedUser = await User.findOneAndUpdate( { _id: id }, {...data, updatedAt: Date.now() }, { new: true })
        if(!updatedUser) {
            throw new Error('Invalid user ID.')
        }
        return updatedUser
    }

    async del(id) {
        const deletedUser = await this.get(id);
        if(!deletedUser) {
            throw new Error('Invalid user ID.')
        }
        const result = await User.deleteOne({_id: id});
        return deletedUser
    }
}

export { UserService as default }