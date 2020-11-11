const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const helmet = require('helmet')
const query = require('./controller/query')

dotenv.config()

const app = express()
const port = process.env.PORT || 8700

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(helmet())

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})

app.use('/api',query)