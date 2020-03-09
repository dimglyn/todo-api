import mongoose from 'mongoose'

const {
  Schema
} = mongoose

const UserSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
  },
  todos: [{
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }],
  lastLogin: {
    type: String,
    required: false
  },
  created: {
    type: Boolean,
    required: true,
    default: false
  },
})

const User = mongoose.model('User', UserSchema)
export {
  User as
  default,
  UserSchema
}