import UserService from '../src/services/user'
import User from '../src/models/user'
import mongoose from 'mongoose'
import { expect } from 'chai'
import config from '../config'
import bcrypt from 'bcryptjs'

const userService = new UserService()

describe('User Service', function() {
    before(async function(){
        await mongoose.connect(`${config.MONGOURI}?retryWrites=true`, { useNewUrlParser: true, useFindAndModify: false })
    })

    it('should sign up a new user', async function(){ 
        const payload = {
            name: 'testuser',
            email: 'test@test.com',
            password: '123456'
        }
        const user = await userService.create(payload)

        expect(user).to.have.property('email')
        expect(user).to.have.property('name')
        expect(user).to.have.property('password')
        expect(user).to.have.property('todos').with.lengthOf(0)
        const isPasswordEqual = await bcrypt.compare(payload.password, user.password);
        expect(isPasswordEqual).to.equals(true)
    })

    after(async function(){
        await User.deleteMany({})
        await mongoose.disconnect()
    })
})