import mongoose from 'mongoose'

const {
    Schema
} = mongoose

const TodoSchema = new Schema({
    text: {
        required: true,
        type: String
    },
    tags: [{
        type: String,
        required: true,
        default: []
    }],
    dueDate: {
        type: Date,
        required: false,
        default: null
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    user : {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
})

const Todo = mongoose.model('Todo', TodoSchema)
export {
    Todo as default,
    TodoSchema
}