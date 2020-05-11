import mongoose from 'mongoose';
import { expect } from 'chai';
import bcrypt from 'bcryptjs';

import UserService from '../src/services/user';
import User from '../src/models/user';
import config from '../config';
// TODO: use mock dao
import UserDAO from '../src/dao/user';

const userService = new UserService({ userDAO: new UserDAO() });

const dummyUser = {
  name: 'testuser',
  email: 'test@test.com',
  password: '123456',
};

describe('User Service', () => {
  before(async () => {
    await mongoose.connect(`${config.MONGOURI}Test?retryWrites=true`, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  });

  it('should sign up a new user', async () => {
    const user = await userService.create(dummyUser);

    expect(user).to.have.property('email');
    expect(user).to.have.property('name');
    expect(user).to.have.property('password');
    expect(user).to.have.property('todos').with.lengthOf(0);
    const isPasswordEqual = await bcrypt.compare(
      dummyUser.password,
      user.password,
    );
    expect(isPasswordEqual).to.equals(true);
  });

  it('should get a user by email', async () => {
    const user = await userService.getByEmail(dummyUser.email);

    expect(user).to.have.property('email');
    expect(user.email).to.equal(dummyUser.email);
  });

  it('should validate a users password', async () => {
    const user = await userService.getByEmail(dummyUser.email);

    const check = await userService.validPassword(
      dummyUser.password,
      user.password,
    );
    const falsecheck = await userService.validPassword(
      `${dummyUser.password}some more`,
      user.password,
    );
    expect(check).to.be.true;
    expect(falsecheck).to.be.false;
  });

  after(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });
});
