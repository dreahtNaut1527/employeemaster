const dotenv = require('dotenv')
const mssql = require('mssql')

dotenv.config()

const connect = function() {
    const conn = new mssql.ConnectionPool({
        user: process.env.USER,
        password: process.env.PASS,
        server: process.env.SERVER,
        database: process.env.GRP_DATABASE,
        options: {
            max: 15,
            min: 0,
            encrypt: false,
            enableArithAbort: true,
            idleTimeoutMillis: 30000,
            connectionTimeout : 30000,
            requestTimeout: 30000
        },
    })
    return conn
}

module.exports = connect