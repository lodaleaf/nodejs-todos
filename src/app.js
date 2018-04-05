const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config').sequelize
const transactionOptions = require('./config').transactionOptions
const Todo = sequelize.import('./model/todo.js')

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
app.get('/todos/:id', (req, res) => {
    res.send('hello')
})
app.post('/todos', (req, res) => {
    res.send('hello')
})
app.delete('/todos', (req, res) => {
    res.send('hello')
})

app.listen(3000, () => {
    console.info('server is listening to 3000')
})