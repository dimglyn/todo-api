import Todo from '../models/todo'
class TodoService {
    async getAll() {
      return await Todo.find({})
    }

    async getAllByUser(userId) {
      return await Todo.find({ user: userId })
    }

    async create(todo, userId) {
        const { text, tags, dueDate } = todo
        if(todo.text.trim() === "") {
            throw new Error("Task cannot be empty.")
        }
        let newTodo = new Todo({ text, tags, dueDate, user: userId })
        await newTodo.save()
        return newTodo
    }

    async getById(id) {
        const todo = await Todo.findOne({_id: id})
        if(!todo) {
            throw new Error('Invalid todo ID.')
        }
        return todo
    }

    async update(id, data) {
        const updatedTodo = await Todo.findOneAndUpdate( { _id: id }, {...data, updatedAt: Date.now() }, { new: true })
        if(!updatedTodo) {
            throw new Error('Invalid todo ID.')
        }
        return updatedTodo
    }

    async del(id) {
        const deletedTodo = await this.getById(id);
        if(!deletedTodo) {
            throw new Error('Invalid todo ID.')
        }
        const result = await Todo.deleteOne({_id: id});
        return deletedTodo
    }
}

export { TodoService as default }