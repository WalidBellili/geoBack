const express = require('express')
const app = express()
const port = 5000

require('./models')

app.use(express.json())



app.listen(port, () => {
  console.log(`Server running on ${port}`)
})