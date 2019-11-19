import mongoose from 'mongoose'

const {
    Schema
} = mongoose

const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: [{
        type: String,
        required: true,
        default: [],
        index: {
          unique: true
        }
    }],
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Boolean,
        required: true,
        default: false
    }
})

const User = mongoose.model('User', UserSchema)
export {
    User as default,
    UserSchema
}