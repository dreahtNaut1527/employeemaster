const express = require('express')
const mssql = require('mssql')
const config = require('../config/pes.db.config')()

const router = express.Router()


// =====================================================================
// ======================= Select Query (MSSQL)=========================
// =====================================================================
router.get('/notifications', (req, res) => {
     config.connect().then(() => {
               const request = new mssql.Request(config)
               request.query(`SELECT * FROM NotificationView
                              ORDER BY Viewed, CreatedDate DESC`, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/dayofflist', (req, res) => {
     let company = req.params.company
     config.connect().then(() => {
         const request = new mssql.Request(config)
         request.query(`SELECT * FROM DayOffList`, (err, results) => {
             if(err) {
                 res.send(err)
             } else {
                 res.send(results.recordset)
             }
             config.close()
         })
     })
 })

router.get('/dayoff/:company', (req, res) => {
     let company = req.params.company
     config.connect().then(() => {
         const request = new mssql.Request(config)
         request.query(`SELECT * FROM DayOffView WHERE lower(ShortName) = lower('${company}')`, (err, results) => {
             if(err) {
                 res.send(err)
             } else {
                 res.send(results.recordset)
             }
             config.close()
         })
     })
 })

 router.get('/dayoff/:company/:department', (req, res) => {
      let company = req.params.company
      let department = req.params.department
      config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(`SELECT * FROM DayOffView 
                         WHERE lower(ShortName) = lower('${company}')
                         AND lower(DepartmentName) = lower('${department}')`, (err, results) => {
              if(err) {
                  res.send(err)
              } else {
                  res.send(results.recordset)
              }
              config.close()
          })
      })
  })

// =====================================================================
// ====================== Execute Procedure (MSSQL)=====================
// =====================================================================
router.post('/postexecute', (req, res) => {
     let data = JSON.parse(req.body.data)
     let values = data.values
     let sql = `EXECUTE ${data.procedureName}`

     // Loop through values
     if (!Array.isArray(values[0])) {
          values = Array(data.values)
     }
     values.forEach(rec => {
          config.connect().then(() => {
               const request = new mssql.Request(config)
               request.query(`${sql} '${rec.join("','").replace(/''/g, null)}'`, err => {
                    if(err) {
                         res.send(err)
                    } else {
                         res.end()
                    }
                    config.close()   
               })
          })
     })   
})

router.post('/getexecute', (req, res) => {
     let data = JSON.parse(req.body.data)
     let values = data.values
     let sql = `EXECUTE ${data.procedureName}`

     // Loop through values
     if (!Array.isArray(values[0])) {
          values = Array(data.values)
     }
     values.forEach(rec => {
          config.connect().then(() => {
               const request = new mssql.Request(config)
               request.query(`${sql} '${rec.join("','").replace(/''/g, null)}'`, (err, results) => {
                    if(err) {
                         res.send(err)
                    } else {
                         res.send(results.recordset)
                    }
                    config.close()   
               })
          })
     })
})

module.exports = router       