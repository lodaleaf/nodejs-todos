const TodoDao = require('../../src/dao/TodoDao')
const TodoService = require('../../src/service/TodoService')
const moment = require('moment')
describe('todo service', () => {
  describe('create todo', () => {
    it('should call todoDao.service', async () => {
      const freezeTime = moment().hour(10).minutes(0).second(0).millisecond(0)
      jasmine.clock().mockDate(freezeTime.toDate())
      const todoStub = {
        name: 'asdf',
        done: false
      }
      const todoDao = new TodoDao()
      spyOn(todoDao, 'createTodo').and.returnValue(Promise.resolve())
      const todoService = new TodoService(todoDao)
      await todoService.createTodo(todoStub)
      expect(todoDao.createTodo).toHaveBeenCalledWith(todoStub)
    })

    it('should not allow to create todo before 8:00 AM', async () => {
      const freezeTime = moment().hour(8).minutes(0).second(0).millisecond(0)
      jasmine.clock().mockDate(freezeTime.toDate())

      const todoStub = {
        name: 'name',
        done: false
      }
      const resultStub = {
        name: 'name'
      }
      const todoDao = new TodoDao()
      spyOn(todoDao, 'createTodo').and.returnValue(Promise.resolve(resultStub))
      const todoService = new TodoService(todoDao)
      await todoService.createTodo(todoStub)
      expect(todoDao.createTodo).not.toHaveBeenCalled()
    })
  })
})