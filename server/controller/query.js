const express = require('express')
const mssql = require('mssql')
const config = require('../config/db.config')()


const router = express.Router()

// =====================================================================
// ======================= Select Query (MSSQL)=========================
// =====================================================================
router.get('/company', (req, res) => {
     config.connect().then(() => {
         const request = new mssql.Request(config)
         request.query(`SELECT ShortName FROM Companies`, (err, results) => {
             if(err) {
                 res.send(err)
             } else {
                 res.send(results.recordset)
             }
             config.close()
         })
     })
 })

router.get('/employeeinfo/:code', (req, res) => {
     let code = req.params.code
     config.connect().then(() => {
         const request = new mssql.Request(config)
         request.query(`SELECT * FROM EmployeeInformationView WHERE EmployeeCode = '${code}'`, (err, results) => {
             if(err) {
                 res.send(err)
             } else {
                 res.send(results.recordset)
             }
             config.close()
         })
     })   
 })

router.get('/employees/:company', (req, res) => {
     let company = req.params.company
     let sql = `SELECT * FROM EmployeeInformationView WHERE lower(ShortName) = lower('${company}')`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {  
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/employees/:compname/:department', (req, res) => {
     let compname = req.params.compname
     let department = req.params.department
     let sql = `SELECT * FROM EmployeeInformationView WHERE lower(ShortName) = lower('${compname}')
               AND lower(DepartmentName) = lower('${department}')`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })   
})

router.get('/employees/:compname/:department/:section', (req, res) => {
     let compname = req.params.compname
     let department = req.params.department
     let section = req.params.section
     let sql = `SELECT * FROM EmployeeInformationView WHERE lower(ShortName) = lower('${compname}')
               AND lower(DepartmentName) = lower('${department}')
               AND lower(SectionName) = lower('${section}')`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/employees/:compname/:department/:section/:team', (req, res) => {
     let compname = req.params.compname
     let department = req.params.department
     let section = req.params.section
     let team = req.params.team
     let sql = `SELECT * FROM EmployeeInformationView WHERE lower(ShortName) = lower('${compname}')
               AND lower(DepartmentName) = lower('${department}')
               AND lower(SectionName) = lower('${section}')
               AND lower(TeamName) = lower('${team}')`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})


router.get('/company/department/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM DepartmentView WHERE lower(ShortName) = lower('${compname}')`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/company/department/section/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM DepartmentSectionRelationView WHERE lower(ShortName) = lower('${compname}')`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/company/department/section/team/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM SectionTeamRelationView WHERE lower(ShortName) = lower('${compname}')`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/company/designation/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM DesignationView WHERE lower(ShortName) = lower('${compname}')`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.post('/getaccount', (req, res) => {
     let data = JSON.parse(req.body.data)
     let values = data.values
     let sql = `EXECUTE ${data.procedureName}`

     // Loop through values
     if (!Array.isArray(values[0])) {
          values = Array(data.values)
     }
     values.forEach(rec => {
          // console.log(`${sql} '${rec.join("','").replace(/''/g, null)}'`)
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

// =====================================================================
// ===================== Insert / Update Query (MSSQL)==================
// =====================================================================
router.post('/execute', (req, res) => {
     let data = JSON.parse(req.body.data)
     let values = data.values
     let sql = `EXECUTE ${data.procedureName}`

     // Loop through values
     if (!Array.isArray(values[0])) {
          values = Array(data.values)
     }
     values.forEach(rec => {
          // console.log(`${sql} '${rec.join("','").replace(/''/g, null)}'`)
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

// =====================================================================
// ======================= Delete Query (MSSQL)=========================
// =====================================================================
router.put('/deleteemployee', (req, res) => {
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
 
module.exports = router       