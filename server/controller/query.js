const express = require('express')
const mssql = require('mssql')
const config = require('../config/db.config')()
const { Parser } = require('json2csv')
const Excel = require('exceljs')

const router = express.Router()
// =====================================================================
// ======================= Select Query (MSSQL)=========================
// =====================================================================
router.get('/systemlist', (req, res) => {
     let sqlQuery = `SELECT * FROM SystemLists`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sqlQuery, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })
})

router.get('/systemprocess/:syscode', (req, res) => {
     let syscode = req.params.syscode
     let sqlQuery = `SELECT * FROM SystemProcess WHERE SystemCode = '${syscode}'`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sqlQuery, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })
})

router.get('/processrights/:emplcode/:syscode/:processid', (req, res) => {
     let emplcode = req.params.emplcode
     let syscode = req.params.syscode
     let processid = req.params.processid
     let sqlQuery = `SELECT * FROM SystemProcessRightView WHERE EmployeeCode = '${emplcode}'
                                   AND SystemCode = '${syscode}'`
     if(processid != 0) sqlQuery += ` AND ProcessId = '${processid}'`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sqlQuery, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })
})

router.get('/companies', (req, res) => {
     let sqlQuery = `SELECT * FROM CompanyView`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sqlQuery, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })
})

router.get('/employeeinfo/:code', (req, res) => {
     let code = req.params.code
     let sqlQuery = `SELECT * FROM EmployeeInformationView WHERE EmployeeCode = '${code}'
                    AND (RetiredDate IS NULL 
                     OR RetiredDate >= convert(VARCHAR(10), getdate(), 111))`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sqlQuery, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })
})

router.get('/basicinfo/:code', (req, res) => {
     let code = req.params.code
     let sqlQuery = `SELECT * FROM EmployeeBasicInfoView WHERE EmployeeCode = '${code}'`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sqlQuery, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })
})

router.get('/employees/:company', (req, res) => {
     let company = req.params.company
     let sql = `SELECT * FROM EmployeeBasicInfoView WHERE lower(ShortName) = lower('${company}')
                ORDER BY EmployeeCode`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/company/department/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM DepartmentView 
                    WHERE lower(ShortName) = lower('${compname}')
                    ORDER BY DepartmentName`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/company/section/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM SectionView 
                    WHERE lower(ShortName) = lower('${compname}')
                    ORDER BY SectionName`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/company/team/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM TeamView 
                    WHERE lower(ShortName) = lower('${compname}')
                    ORDER BY TeamName`
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/company/department/section/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM DepartmentSectionRelationView WHERE lower(ShortName) = lower('${compname}')`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/company/department/section/team/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM SectionTeamRelationView WHERE lower(ShortName) = lower('${compname}')`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/company/designation/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM DesignationView WHERE lower(ShortName) = lower('${compname}')`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/company/position/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM PositionView WHERE lower(ShortName) = lower('${compname}')`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/education', (req, res) => {
     let sql = `SELECT * FROM Educations`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/shift/:compname', (req, res) => {
     let compname = req.params.compname
     let sql = `SELECT * FROM ShiftView WHERE lower(ShortName) = lower('${compname}')`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/os', (req, res) => {
     let sql = `SELECT * FROM OperatingSystemView`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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

     let sql = `SELECT * FROM UserControlView ${sqlwhere} ORDER BY EmployeeCode`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/logging', (req, res) => {
     let sql = `SELECT Logging.SocketId, 
                         Logging.EmployeeCode, 
                         EmployeeInformationView.EmployeeName, Logging.Details FROM Logging
                         INNER JOIN EmployeeInformationView 
                         ON EmployeeInformationView.EmployeeCode = Logging.EmployeeCode`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
 })

router.post('/shifts/:company', (req, res) => {
     let company = req.params.company
     let data = JSON.parse(req.body.data)

     let sql = `SELECT * FROM ShiftView 
                    WHERE lower(ShortName) = lower('${company}')
                    AND ShiftID NOT IN(${data})
                    ORDER BY ShiftTime`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/history/:company', (req, res) => {
     let company = req.params.company
     let sql = `SELECT * FROM EmployeeHistoryDataView WHERE lower(ShortName) = lower('${company}')`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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

     let sql = `SELECT * FROM EmployeeHistoryDataView  
                         WHERE lower(ShortName) = lower('${company}')
                         ${sqlwhere} ORDER BY EmployeeCode`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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
               
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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
        
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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
               
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/employeehistory/:code', (req, res) => {
     let code = req.params.code
     let sql = `SELECT * FROM EmployeeHistoryDataView WHERE EmployeeCode = '${code}'`
     
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })   
})

router.get('/notifications/:company/:code', (req, res) => {
     let company = req.params.company
     let code = req.params.code
     let sql = `SELECT * FROM NotificationView
                              WHERE lower(ShortName) = lower('${company}')
                              AND EmployeeCode != '${code}'
                              ORDER BY Viewed, CreatedDate DESC`

     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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
            
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
          })
     })     
})

router.get('/departmentcategory/:compname', (req, res) => {
     let sqlwhere = ''
     let compname = req.params.compname

     let sql = `SELECT 
               Companies.CompanyName,
               Companies.ShortName, 
               DepartmentCategories.* FROM DepartmentCategories 
               INNER JOIN Companies on DepartmentCategories.CompanyCode = COmpanies.CompanyCode
               WHERE lower(ShortName) = lower('${compname}') 
               ${sqlwhere} ORDER BY DepartmentCategoryDesc`
            
     config.connect(err => {
          if(err) return res.send(err)
          const request = new mssql.Request(config)
          request.query(sql, (err, results) => {
               if(err) return res.send(err)
               res.send(results.recordset)
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
               if(err) return res.send(err)
               const request = new mssql.Request(config)
               request.query(`${sql} '${rec.join("','").replace(/''/g, null)}'`, (err, results) => {
                    if(err) return res.send(err)
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
     values.forEach(rec => {
          config.connect(err => {
               if(err) return res.send(err)
               const request = new mssql.Request(config)
               request.query(`${sql} '${rec.join("','").replace(/''/g, null)}'`, (err, results) => {
                    if(err) return res.send(err)
                    res.status(200).end()
               })
          })
     })
})

router.post('/exportcsv', (req, res) => {
     let value = JSON.parse(req.body.data)
     const parser = new Parser()
     const csv = parser.parse(value)
     res.send(csv)
})

router.get('/exportexcel', (req, res) => {
     let rowData = []
     let colData = []
     let headers = []
     let data = req.query.value
     let workbook = new Excel.Workbook()
     let worksheet = workbook.addWorksheet('Discography')

     // Convert data into JSON format
     data.forEach((rec, index) => {
          let rowVal = JSON.parse(rec)
          if(index == 0) {
               colData = Object.keys(JSON.parse(rec))
          }
          rowData.push(Object.values(rowVal))
     })
     
     // add column headers
     // worksheet.columns = [
     //      { header: 'Album', key: 'album'},
     //      { header: 'Year', key: 'year'}
     // ]
     
     colData.forEach(rec => {
          headers.push({header: rec, key: rec})
     })
     worksheet.columns = headers

     // edit cells directly
     // worksheet.getCell('A6').value = "1989"
     // worksheet.getCell('B6').value = 2014

     // add an array of rows
     // rowData = [
     //      ["Speak Now1", 2010],
     //      ["Speak Now2", 2010]
     // ]
     worksheet.addRows(rowData)

     // download workbook
     res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
     )
     res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "taylor.xls"
     )

     workbook.xlsx.write(res).then(function () {
          res.status(200).end()
     })

})

// router.get('/textCommand', (req, res) => {
//      const exec = require('child_process').exec
//      exec('cmd /c ""C:\\Program Files\\HRDev\\XPAApps\\ClinicHealth.lnk""', (err, stdout, stderr) => {
//           if (err) {
//                res.send(err)
//           }
//           res.send(stdout)
//      })
// })

module.exports = router       