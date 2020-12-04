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
            process.env.GRP_URL,
            process.env.PES_URL,
            process.env.GRP_LOCAL_URL,
            process.env.PES_LOCAL_URL
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
    socket.on('newNotifications', (data) => {
        socketio.emit('showNotifications', {
            socket: data.socket,
            title: data.title,
            message: data.message
        })
    })
})

app.use('/api', query)
app.use('/pes', pes)

// const { networkInterfaces } = require('os');

// const nets = networkInterfaces();
// const results = Object.create(null); // or just '{}', an empty object

// for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//         // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
//         if (net.family === 'IPv4' && !net.internal) {
//             if (!results[name]) {
//                 results[name] = [];
//             }

//             results[name].push(net.address);
            
//         }
//     }
// }

// console.log(results['Local Area Connection'])

// var os = require( 'os' );
// var networkInterfaces = os.networkInterfaces();
// var arr = networkInterfaces['Local Area Connection']
// var ip = arr[0].address

// console.log(ip)