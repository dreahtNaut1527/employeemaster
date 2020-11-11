# Employee Master

# Select Data

**Get lists of companies:** 
* http://asd_sql:8700/api/company

**Get Employee Information:**
* http://asd_sql:8700/api/employeeinfo/(employee code)

**Get list of employee from specific company:**
* http://asd_sql:8700/api/employees/(company shortname)

**Get list of employee from specific company and department:**
* http://asd_sql:8700/api/employees/(company shortname)/(department name)

**Get list of employee from specific company, department and section:**
* http://asd_sql:8700/api/employees/(company shortname)/(department name)/(section name)

**Get list of employee from specific company, department, section and team:**
* http://asd_sql:8700/api/employees/(company shortname)/(department name)/(section name)/(team name)

**Get list of department from specific company:**
* http://asd_sql:8700/api/company/department/(company shortname)

**Get list of department and section from a certain company:**
* http://asd_sql:8700/api/company/department/section/(company shortname)

**Get list of department, section and team from a certain company:**
* http://asd_sql:8700/api/company/department/section/team/(company shortname)

**Get list of position from certain company:**
* http://asd_sql:8700/api/company/designation/(company shortname)


<<<<<<< HEAD
# Insert / Update / Delete
=======
# Insert / Update
>>>>>>> 5e9d54a256bdddc2a1d00f8ff1eeb9ac70e1cd6a

**variable format for single data**


```
 let body = {
<<<<<<< HEAD
    procedureName: (sqlProcedureName),
    values: ['data1', 'data2', 'data3', . . .]
=======
    procedureName: 'ProcPostEmployee',
    values: [CompanyCode,EmployeeCode,AgencyCode,EmployeeName,NickName,DepartmentCode,SectionCode,
            TeamCode,DesignationCode,ContractStatus,ContractHiredDate,RegularHiredDate,
            RetiredDate,Gender,DateBirth,CreatedDate,DeletedDate,UpdatedDate,UpdatedBy
        ]
>>>>>>> 5e9d54a256bdddc2a1d00f8ff1eeb9ac70e1cd6a
}
```


**variable format for multiple data**


```
 let body = {
<<<<<<< HEAD
    procedureName: (sqlProcedureName),
    values: [
        ['data1', 'data2', 'data3', . . .],
        ['data1', 'data2', 'data3', . . .],
        ['data1', 'data2', 'data3', . . .],
        ['data1', 'da. . .]
=======
    procedureName: 'ProcPostEmployee',
    values: [
        [CompanyCode,EmployeeCode,AgencyCode,EmployeeName,NickName,DepartmentCode,SectionCode,
            TeamCode,DesignationCode,ContractStatus,ContractHiredDate,RegularHiredDate,
            RetiredDate,Gender,DateBirth,CreatedDate,DeletedDate,UpdatedDate,UpdatedBy],
        [CompanyCode,EmployeeCode,AgencyCode,EmployeeName,NickName,DepartmentCode,SectionCode,
            TeamCode,DesignationCode,ContractStatus,ContractHiredDate,RegularHiredDate,
            RetiredDate,Gender,DateBirth,CreatedDate,DeletedDate,UpdatedDate,UpdatedBy],
        [CompanyCode,EmployeeCode,AgencyCode,EmployeeName,NickName,DepartmentCode,SectionCode,
            TeamCode,DesignationCode,ContractStatus,ContractHiredDate,RegularHiredDate,
            RetiredDate,Gender,DateBirth,CreatedDate,DeletedDate,UpdatedDate,UpdatedBy],
        . . .
>>>>>>> 5e9d54a256bdddc2a1d00f8ff1eeb9ac70e1cd6a
    ]
}
```

<<<<<<< HEAD

=======
>>>>>>> 5e9d54a256bdddc2a1d00f8ff1eeb9ac70e1cd6a
**function format**
```
functionName() { 
    let body = {
<<<<<<< HEAD
        procedureName: 'sqlProcedureName',
        values: [
            ['data1', 'data2', 'data3', . . .],
            ['data1', 'data2', 'data3', . . .],
            ['data1', 'data2', 'data3', . . .],
            ['data1', 'da. . .]
=======
        procedureName: 'ProcPostEmployee',
        values: [
            [CompanyCode,EmployeeCode,AgencyCode,EmployeeName,NickName,DepartmentCode,SectionCode,
                TeamCode,DesignationCode,ContractStatus,ContractHiredDate,RegularHiredDate,
                RetiredDate,Gender,DateBirth,CreatedDate,DeletedDate,UpdatedDate,UpdatedBy],
            [CompanyCode,EmployeeCode,AgencyCode,EmployeeName,NickName,DepartmentCode,SectionCode,
                TeamCode,DesignationCode,ContractStatus,ContractHiredDate,RegularHiredDate,
                RetiredDate,Gender,DateBirth,CreatedDate,DeletedDate,UpdatedDate,UpdatedBy],
            [CompanyCode,EmployeeCode,AgencyCode,EmployeeName,NickName,DepartmentCode,SectionCode,
                TeamCode,DesignationCode,ContractStatus,ContractHiredDate,RegularHiredDate,
                RetiredDate,Gender,DateBirth,CreatedDate,DeletedDate,UpdatedDate,UpdatedBy],
            . . .
>>>>>>> 5e9d54a256bdddc2a1d00f8ff1eeb9ac70e1cd6a
        ]
    }
    axios.post("http://asd_sql:8700/api/postemployee", {data: JSON.stringify(body)}).then(res => {
        console.log(res.status)
    })
}

```

<<<<<<< HEAD
=======
# Delete
**function format**
```
functionName() { 
    let body = {
        procedureName: 'ProcDeleteEmployee',
        values: [EmployeeCode]
    }
    axios.put("http://asd_sql:8700/api/deleteemployee", {data: JSON.stringify(body)}).then(res => {
        console.log(res.status)
    })
}

```

>>>>>>> 5e9d54a256bdddc2a1d00f8ff1eeb9ac70e1cd6a

# Progamming Language
**Node JS**
> visit site: https://nodejs.org/


