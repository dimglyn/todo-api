import TodoService from '../services/todo';
import TodoDAO from '../dao/todo';

const todoService = new TodoService({
  todoDAO: new TodoDAO(),
});

const User = {
  todos: async (parent) => {
    const todo = await todoService.getAllByUserId(parent.id);
    return todo;
  },
};

export { User as default };
