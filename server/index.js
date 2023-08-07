const express = require('express')
const cors = require('cors')
const app = express()

const port = 5000

//middlewares
app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log('server has started on port 5000')
})
