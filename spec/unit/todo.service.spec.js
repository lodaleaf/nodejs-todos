const TodoDao = require('../../src/dao/TodoDao')
const TodoService = require('../../src/service/TodoService')
describe('todo service', () => {
  describe('create todo', () => {
    it('should call todoDao.service', async () => {
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
  })
})