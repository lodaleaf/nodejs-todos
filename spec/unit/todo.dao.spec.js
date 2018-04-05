const TodoDao = require('../../src/dao/TodoDao.js')
const sequelize = require('../../src/config').sequelize
const Todo = sequelize.import('../../src/model/todo.js')

describe('todo dao', () => {
  describe('createTodo', () => {
    it('shoud create Todo', async (done) => {
      spyOn(sequelize, 'transaction').and.callFake((option, callback) => {
        callback('t')
      })

      spyOn(Todo, 'create').and.returnValue(Promise.resolve())

      const todoStub = {
        name: 'name',
        done: false
      }
      const todoDao = new TodoDao(Todo)
      todoDao.createTodo(todoStub).then(() => {
        expect(Todo.create).toHaveBeenCalledWith(
          todoStub,
          { transaction: 't' }
        )
        done()
      })
    })
  })
})
