const moment = require('moment')

class TodoService {
  constructor (todoDao) {
    this.todoDao = todoDao
  }
  async createTodo (todo) {
    const freezeTime = moment().hour(8).minutes(0).second(0).millisecond(0)
    if (moment().isAfter(freezeTime)){
      return await this.todoDao.createTodo(todo)
    }
  }
}

module.exports = TodoService