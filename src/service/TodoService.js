class TodoService {
  constructor (todoDao) {
    this.todoDao = todoDao
  }
  async createTodo (todo) {
    return await this.todoDao.createTodo(todo)
  }
}

module.exports = TodoService