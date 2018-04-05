const supertest = require('supertest')
const TodoService = require('../../src/service/TodoService')
const app = require('../../src/app.js')

describe('todo route', () => {
  describe('post todo', () => {
    it('should call createTodo service', async (done) => {
      const todoResult = {
        name: 'test',
        done: false
      }
      const todoStub = {
        name: 'test',
        done: false
      }
      const todoService = new TodoService()
      spyOn(todoService, 'createTodo').and.returnValue(Promise.resolve(todoResult))

      supertest(app(todoService)).post('/todos')
        .send(todoStub).end((err, res) => {
          expect(res.status).toEqual(200)
          expect(res.body).toEqual(todoResult)
          expect(todoService.createTodo).toHaveBeenCalledWith(todoStub)
          done()
        })
    })
  })
})