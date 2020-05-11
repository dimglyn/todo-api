import User from '../models/user';

class UserDAO {
  async findAll() {
    return User.find({});
  }

  async create(userPayload) {
    const user = new User(userPayload);

    await user.save();
    return user;
  }

  async findById(id) {
    return User.findOne({ _id: id });
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }
}

export { UserDAO as default };
