import TodoDAO from '../dao/todo'
const todoDAO = new TodoDAO()
class TodoService {
    async getAll() {
      return await todoDAO.getAll()
    }

    async getAllByUserId(userId) {
      return await todoDAO.getAllByUserId(userId)
    }

    async create(todo, userId) {
        const { text } = todo
        if(text.trim() === "") {
            throw new Error("Task cannot be empty.")
        }
        return await todoDAO.create({ ...todo, user: userId })
    }

    async getById(id) {
        const todo = await todoDAO.getById(id)
        if(!todo) {
            throw new Error('Invalid todo ID.')
        }
        return todo
    }

    async update(id, data) {
        const updatedTodo = await todoDAO.updateById(id, data)
        if(!updatedTodo) {
            throw new Error('Invalid todo ID.')
        }
        return updatedTodo
    }

    async del(id) {
        const deletedTodo = await this.getById(id)
        if(!deletedTodo) {
            throw new Error('Invalid todo ID.')
        }
        const result = await todoDAO.deleteById(id)
        return deletedTodo
    }
}

export { TodoService as default }