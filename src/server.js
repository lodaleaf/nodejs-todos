const app = require('./app').init()

app.listen(3000, () => {
  console.info('start listening on port 3000')
})

