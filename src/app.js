const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config').sequelize
const transactionOptions = require('./config').transactionOptions
const Todo = sequelize.import('./model/todo.js')

const init = (service) => {
  const app = express()

  app.use(bodyParser.json())
  app.get('/todos', async (req, res) => {
    const todos = await sequelize.transaction(transactionOptions, (t) => {
      return Todo.findAll({
        transaction: t
      })
    })
    res.send(todos)
  })
  app.get('/todos/:id', async (req, res) => {
    const todoId = req.params.id
    const todo = await sequelize.transaction(transactionOptions, (t) => {
      return Todo.findOne({
        where: {
          id: todoId
        },
        transaction: t
      })
    })
    res.send(todo)
  })
  app.post('/todos', async (req, res) => {
    const todo = await service.createTodo(req.body)
    res.send(todo)
  })
  app.delete('/todos/:id', async (req, res) => {
    const todoId = req.params.id
    await sequelize.transaction(transactionOptions, (t) => {
      return Todo.destroy({
        where: {
          id: todoId
        },
        transaction: t
      })
    })
    res.sendStatus(200)
  })
  app.put('/todos/:id', async (req, res) => {
    const todoId = req.params.id
    const todo = req.body
    sequelize.transaction(transactionOptions, (t) => {
      return Todo.update(
        {
          name: todo.name,
          doen: todo.done
        },
        {
          where: { id: todoId },
          transaction: t
        }
      )
    }).then(async () => {
      const todo = await sequelize.transaction(transactionOptions, (t) => {
        return Todo.findOne({
          where: {
            id: todoId
          },
          transaction: t
        })
      })
      res.send(todo)
    })
  })

  return app
}

module.exports = init