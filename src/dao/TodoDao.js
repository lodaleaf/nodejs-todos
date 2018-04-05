const sequelize = require('../config').sequelize
const transactionOptions = require('../config').transactionOptions

class TodoDao {
  constructor (todo) {
    this.Todo = todo
  }
  async createTodo (todo) {
    return await sequelize.transaction(transactionOptions, (t) => {
      return this.Todo.create(todo, {
        transaction: t
      })
    })
  }
}
module.exports = TodoDao