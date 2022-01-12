const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const router = require('./routes/routes')

// DB CONFIG
const db = require('./db')
const { config } = require('./config/index')
db(config.mongodb)

app.use(cors(['https://effren-penafullstackbankingapplication.vercel.app/', 'http://localhost:3000']))

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(router)
router(app)

const port = config.port

app.listen(port, () => {
  console.log(`Listening on ${config.host}:${config.port}`)
})
