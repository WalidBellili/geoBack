const express = require('express')
const app = express()
const port = 5000
const placesRoutes = require('./routes/place')

require('./models')

app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

app.use('/', placesRoutes)

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})