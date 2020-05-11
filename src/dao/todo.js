import Todo from '../models/todo';

class TodoDAO {
  async getAll() {
    return Todo.find({});
  }

  async getAllByUserId(id) {
    return Todo.find({
      user: id,
    });
  }

  async create(todoPayload) {
    const newTodo = new Todo(todoPayload);
    await newTodo.save();
    return newTodo;
  }

  async getById(id) {
    return Todo.findOne({
      _id: id,
    });
  }

  async updateById(id, payload) {
    return Todo.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...payload,
        updatedAt: Date.now(),
      },
      {
        new: true,
      },
    );
  }

  async deleteById(id) {
    return Todo.deleteOne({
      _id: id,
    });
  }
}

export { TodoDAO as default };
