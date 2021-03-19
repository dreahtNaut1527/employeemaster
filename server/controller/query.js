const express = require('express')
const mssql = require('mssql')
const config = require('../config/db.config')()

const router = express.Router()
// =====================================================================
// ======================= Select Query (MSSQL)=========================
// =====================================================================
router.get('/companies', (req, res) => {
     config.connect().then(() => {
          const request =  new mssql.Request(config)
          request.query(`SELECT * FROM CompanyView`, (err, results) => {
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
     let sqlQuery = `SELECT * FROM EmployeeInformationView WHERE EmployeeCode = '${code}'
                    AND (RetiredDate IS NULL 
                     OR RetiredDate >= convert(VARCHAR(10), getdate(), 111))`
     config.connect(err => {
          if(err) res.send(err)
          const request = new mssql.Request(config)
          request.query(sqlQuery, (err, results) => {
               if(err) res.send(err)
               res.send(results.recordset)
          })
     })
})

router.get('/basicinfo/:code', (req, res) => {
     let code = req.params.code
     let sqlQuery = `SELECT * FROM EmployeeBasicInfoView WHERE EmployeeCode = '${code}'`
     config.connect(err => {
          if(err) res.send(err)
          const request = new mssql.Request(config)
          request.query(sqlQuery, (err, results) => {
               if(err) res.send(err)
               res.send(results.recordset)
          })
     })
})

router.get('/employees/:company', (req, res) => {
     let company = req.params.company
     let sql = `SELECT * FROM EmployeeBasicInfoView WHERE lower(ShortName) = lower('${company}')
                ORDER BY EmployeeCode`
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
     let sqlwhere = ''
     let compname = req.params.compname
     let department = req.params.department
     
     let arr = req.query.array
     let arrData = arr != undefined ? arr.split(",") : ''       

     if (Array.isArray(arrData)) {
          arrData.forEach(rec => {
               sqlwhere += `'${rec}',`
          })
          sqlwhere = ` AND DepartmentName IN (${sqlwhere.slice(0, -1)})`
     } else {
          sqlwhere = ` AND lower(DepartmentName) = lower('${department}')`
     }

     let sql = `SELECT * FROM EmployeeBasicInfoView WHERE lower(ShortName) = lower('${compname}') 
               ${sqlwhere} ORDER BY EmployeeCode`
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
     let sql = `SELECT * FROM EmployeeBasicInfoView WHERE lower(ShortName) = lower('${compname}')
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
     let sql = `SELECT * FROM EmployeeBasicInfoView WHERE lower(ShortName) = lower('${compname}')
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
     let sql = `SELECT * FROM DepartmentView 
                    WHERE lower(ShortName) = lower('${compname}')
                    ORDER BY DepartmentName`
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

router.get('/company/section/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM SectionView 
                    WHERE lower(ShortName) = lower('${compname}')
                    ORDER BY SectionName`
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

router.get('/company/team/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM TeamView 
                    WHERE lower(ShortName) = lower('${compname}')
                    ORDER BY TeamName`
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

router.get('/company/position/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM PositionView WHERE lower(ShortName) = lower('${compname}')`
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

router.get('/education', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM Educations`
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

router.get('/shift/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM ShiftView WHERE lower(ShortName) = lower('${compname}')`
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

router.get('/os', (req, res) => {
     config.connect().then(() => {
         const request = new mssql.Request(config)
         request.query(`SELECT * FROM OperatingSystemView`, (err, results) => {
             if(err) {
                 res.send(err)
             } else {
                 res.send(results.recordset)
             }
             config.close()
         })
     })
 })

router.get('/usercontrol', (req, res) => {
     let arr = req.query.array.split(',')
     let sqlwhere = ''

     if(Array.isArray(arr)) {
          let company = arr[0]
          let department = arr[1]
          let section = arr[2]
          let team = arr[3]

          sqlwhere = company != 'NONE' ? `WHERE lower(ShortName) = '${company.toLowerCase()}'` : ''
          sqlwhere += department != 'NONE' ? ` AND lower(DepartmentName) = '${department.toLowerCase()}'` : ''
          sqlwhere += section != 'NONE' ? ` AND lower(SectionName) = '${section.toLowerCase()}'` : ''
          sqlwhere += team != 'NONE' ? ` AND lower(TeamName) = '${team.toLowerCase()}'` : ''
     }
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(`SELECT * FROM UserControlView ${sqlwhere}`, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/logging', (req, res) => {
     config.connect().then(() => {
         const request = new mssql.Request(config)
         request.query(`SELECT Logging.SocketId, 
                         Logging.EmployeeCode, 
                         EmployeeInformationView.EmployeeName, Logging.Details FROM Logging
                         INNER JOIN EmployeeInformationView 
                         ON EmployeeInformationView.EmployeeCode = Logging.EmployeeCode`, (err, results) => {
             if(err) {
                 res.send(err)
             } else {
                 res.send(results.recordset)
             }
             config.close()
         })
     })
 })

router.post('/shifts/:company', (req, res) => {
     let company = req.params.company
     let data = JSON.parse(req.body.data)
     config.connect().then(() => {
     const request = new mssql.Request(config)
     request.query(`SELECT * FROM ShiftView 
                    WHERE lower(ShortName) = lower('${company}')
                    AND ShiftID NOT IN(${data})
                    ORDER BY ShiftTime`, (err, results) => {
          if(err) {
               res.send(err)
          } else {
               res.send(results.recordset)
          }
          config.close()
     })
     })
})

router.get('/history/:company', (req, res) => {
     let company = req.params.company
     config.connect().then(() => {
               const request = new mssql.Request(config)
               request.query(`SELECT * FROM EmployeeHistoryDataView  
                         WHERE lower(ShortName) = lower('${company}')`, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/history/:company/:department', (req, res) => {
     let company = req.params.company
     let department = req.params.department
     let sqlwhere = ''

     let arr = req.query.array
     let arrData = arr != undefined ? arr.split(",") : ''       

     if (Array.isArray(arrData)) {
          arrData.forEach(rec => {
               sqlwhere += `'${rec}',`
          })
          sqlwhere = ` AND DepartmentName IN (${sqlwhere.slice(0, -1)})`
     } else {
          sqlwhere = ` AND lower(DepartmentName) = lower('${department}')`
     }

     config.connect().then(() => {
               const request = new mssql.Request(config)
               request.query(`SELECT * FROM EmployeeHistoryDataView  
                         WHERE lower(ShortName) = lower('${company}')
                         ${sqlwhere} ORDER BY EmployeeCode`, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/history/:company/:department/:section', (req, res) => {
     let company = req.params.company
     let department = req.params.department
     let section = req.params.section
     let sql = `SELECT * FROM EmployeeHistoryDataView WHERE lower(ShortName) = lower('${company}')
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

router.get('/history/:company/:department/:section/:team', (req, res) => {
     let company = req.params.company
     let department = req.params.department
     let section = req.params.section
     let team = req.params.team
     let sql = `SELECT * FROM EmployeeHistoryDataView WHERE lower(ShortName) = lower('${company}')
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

router.get('/pending/:company', (req, res) => {
     let company = req.params.company
     let sql = `SELECT EmployeeForTransferView.*,
               EmployeeInformationView.EmployeeName, EmployeeInformationView.DesignationCode,
               EmployeeInformationView.DesignationName
               FROM EmployeeForTransferView
               INNER JOIN EmployeeInformationView 
               ON EmployeeForTransferView.EmployeeCode = EmployeeInformationView.EmployeeCode
               WHERE lower(EmployeeForTransferView.ShortName) = lower('${company}')`
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

router.get('/pending/:company/:department', (req, res) => {
     let company = req.params.company
     let department = req.params.department
     let sqlwhere = ''
     let arr = req.query.array
     let arrData = arr != undefined ? arr.split(",") : ''

     if (Array.isArray(arrData)) {
          arrData.forEach(rec => {
               sqlwhere += `'${rec}',`
          })
          sqlwhere = ` AND EmployeeForTransferView.DepartmentName IN (${sqlwhere.slice(0, -1)})`
     } else {
          sqlwhere = ` AND lower(EmployeeForTransferView.DepartmentName) = lower('${department}')`
     }

     let sql = `SELECT EmployeeForTransferView.*,
               EmployeeInformationView.EmployeeName, EmployeeInformationView.DesignationCode,
               EmployeeInformationView.DesignationName
               FROM EmployeeForTransferView
               INNER JOIN EmployeeInformationView 
               ON EmployeeForTransferView.EmployeeCode = EmployeeInformationView.EmployeeCode
               WHERE lower(EmployeeForTransferView.ShortName) = lower('${company}')
               ${sqlwhere} ORDER BY EmployeeCode`
     config.connect().then(() => {
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.   recordset)
               }
               config.close()
          })
     })
})

router.get('/pending/:company/:department/:section', (req, res) => {
     let company = req.params.company
     let department = req.params.department
     let section = req.params.section
     let sql = `SELECT EmployeeForTransferView.*,
               EmployeeInformationView.EmployeeName, EmployeeInformationView.DesignationCode,
               EmployeeInformationView.DesignationName
               FROM EmployeeForTransferView
               INNER JOIN EmployeeInformationView 
               ON EmployeeForTransferView.EmployeeCode = EmployeeInformationView.EmployeeCode
               WHERE lower(EmployeeForTransferView.ShortName) = lower('${company}')
               AND lower(EmployeeForTransferView.DepartmentName) = lower('${department}')
               AND lower(EmployeeForTransferView.SectionName) = lower('${section}')`
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

router.get('/pending/:company/:department/:section/:team', (req, res) => {
     let company = req.params.company
     let department = req.params.department
     let section = req.params.section
     let team = req.params.team
     let sql = `SELECT EmployeeForTransferView.*,
               EmployeeInformationView.EmployeeName, EmployeeInformationView.DesignationCode,
               EmployeeInformationView.DesignationName
               FROM EmployeeForTransferView
               INNER JOIN EmployeeInformationView 
               ON EmployeeForTransferView.EmployeeCode = EmployeeInformationView.EmployeeCode
               WHERE lower(EmployeeForTransferView.ShortName) = lower('${company}')
               AND lower(EmployeeForTransferView.DepartmentName) = lower('${department}')
               AND lower(EmployeeForTransferView.SectionName) = lower('${section}')
               AND lower(EmployeeForTransferView.TeamName) = lower('${team}')`
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

router.get('/employeehistory/:code', (req, res) => {
     let code = req.params.code
     config.connect().then(() => {
               const request = new mssql.Request(config)
               request.query(`SELECT * FROM EmployeeHistoryDataView  
                         WHERE EmployeeCode = '${code}'`, (err, results) => {
               if(err) {
                    res.send(err)
               } else {
                    res.send(results.recordset)
               }
               config.close()
          })
     })
})

router.get('/notifications/:company/:code', (req, res) => {
     let company = req.params.company
     let code = req.params.code
     config.connect().then(() => {
               const request = new mssql.Request(config)
               request.query(`SELECT * FROM NotificationView
                              WHERE lower(ShortName) = lower('${company}')
                              AND EmployeeCode != '${code}'
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

router.get('/jobassignment/:compname/:department', (req, res) => {
     let sqlwhere = ''
     let compname = req.params.compname
     let department = req.params.department
     
     let arr = req.query.array
     let arrData = arr != undefined ? arr.split(",") : ''       

     if (Array.isArray(arrData)) {
          arrData.forEach(rec => {
               sqlwhere += `'${rec}',`
          })
          sqlwhere = ` AND DepartmentName IN (${sqlwhere.slice(0, -1)})`
     } else {
          sqlwhere = ` AND lower(DepartmentName) = lower('${department}')`
     }

     let sql = `SELECT * FROM JobAssignmentView WHERE lower(ShortName) = lower('${compname}') 
               ${sqlwhere} ORDER BY JobAssignmentDesc`
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

// ======================== MSSQL Procedure API ========================
// =====================================================================
// ======================= Select Query (MSSQL)=========================
// =====================================================================
  
router.post('/executeselect', (req, res) => {
     let data = JSON.parse(req.body.data)
     let values = data.values
     let sql = `EXECUTE ${data.procedureName}`

     // Loop through values
     if (!Array.isArray(values[0])) {
          values = Array(data.values)
     }

     values.forEach(rec => {
          config.connect(err => {
               if(err) res.send(err)
               const request = new mssql.Request(config)
               request.query(`${sql} '${rec.join("','").replace(/''/g, null)}'`, (err, results) => {
                    if(err) res.send(err)
                    res.send(results.recordset)
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
     values.forEach(async (rec) => {
          await config.connect().then(() => {
               const request = new mssql.Request(config)
               // console.log(`${sql} '${rec.join("','").replace(/''/g, null)}'`)
               request.query(`${sql} '${rec.join("','").replace(/''/g, null)}'`, err => {
                    if(err) {
                         res.send(err)
                    } else {
                         return res.status
                    }
                    config.close()   
               })
          })
     })
})

module.exports = router       