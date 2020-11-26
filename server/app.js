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

// app.listen(port, () => {
//     console.log(`Server running at ${port}`)
// })

const server = app.listen(port, () => {
        console.log(`Server running at ${port}`)
    })
    const socketio = require('socket.io')(server, {
        cors: {
            origin: process.env.URL, // "http://localhost:1000",
            methods: ["GET", "POST"]
    }
})

// const users = []
socketio.on('connection', (socket) => {
    // console.log(socket.id)

    //User Logged In
    socket.on('loggedIn', (data) => {
        // users.push(data)
        socketio.emit('loggedIn', data)
    })

    //call function for retrieving data
    socket.on('chatMessage', (data) => {
        socketio.emit('chatMessage', data)
    })
})

app.use('/api',query)