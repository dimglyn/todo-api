import User from '../models/user'

class UserDAO {
  async findAll() {
    return await User.find({})
  }

  async create(userPayload) {
      const user = new User(userPayload)
      
      await user.save()
      return user
  }

  async findById(id) {
      return await User.findOne({_id: id})
  }

  async findByEmail(email) {
    return await User.findOne({ email: email })
  }
}

export { UserDAO as default }