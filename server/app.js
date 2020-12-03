const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
const helmet = require('helmet')
const query = require('./controller/query')
const pes = require('./controller/pes.query')

dotenv.config()

const app = express()
const port = process.env.PORT || 8700

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(helmet())

const server = app.listen(port, () => {
        console.log(`Server running at ${port}`)
    })
    
const socketio = require('socket.io')(server, {
    cors: {
        origin: [
            process.env.URL, 
            process.env.PES_URL
        ], 
        methods: ["GET", "POST"]
    }
})

socketio.on('connection', (socket) => {

    //User Logged In
    socket.on('loggedIn', (data) => {
        socketio.emit('loggedIn', data)
    })

    //Notifications
    socket.on('notifications', (data) => {
        socketio.emit('notifications', data)
    })
})

app.use('/api', query)
app.use('/pes', pes)