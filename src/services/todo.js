import logger from '../util/logger';

export default class TodoService {
  constructor({ todoDAO }) {
    this.todoDAO = todoDAO;
  }

  async getAll() {
    return this.todoDAO.getAll();
  }

  async getAllByUserId(userId) {
    return this.todoDAO.getAllByUserId(userId);
  }

  async create(todo, userId) {
    const { text } = todo;
    if (text.trim() === '') {
      throw new Error('Task cannot be empty.');
    }
    return this.todoDAO.create({ ...todo, user: userId });
  }

  async getById(id) {
    const todo = await this.todoDAO.getById(id);
    if (!todo) {
      throw new Error('Invalid todo ID.');
    }
    return todo;
  }

  async update(id, data) {
    const updatedTodo = await this.todoDAO.updateById(id, data);
    if (!updatedTodo) {
      throw new Error('Invalid todo ID.');
    }
    return updatedTodo;
  }

  async del(id) {
    const deletedTodo = await this.getById(id);
    if (!deletedTodo) {
      throw new Error('Invalid todo ID.');
    }
    const result = await this.todoDAO.deleteById(id);
    logger.info(result);
    return deletedTodo;
  }
}
