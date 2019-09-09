const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

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
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = {
    Todo,
    TodoSchema
}