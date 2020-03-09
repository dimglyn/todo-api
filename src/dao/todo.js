import Todo from '../models/todo'

class TodoDAO {
  async getAll() {
    return await Todo.find({})
  }
  async getAllByUserId(id) {
    return await Todo.find({ user: id })
  }
  async create(todoPayload) {
    let newTodo = new Todo(todoPayload)
    await newTodo.save()
    return newTodo
  }
  async getById(id) {
    return await Todo.findOne({_id: id})
  }
  async updateById(id, payload) {
    return await Todo.findOneAndUpdate( { _id: id }, {...payload, updatedAt: Date.now() }, { new: true })
  }
  async deleteById(id) {
    return await Todo.deleteOne({_id: id});
  }
}

export { TodoDAO as default }