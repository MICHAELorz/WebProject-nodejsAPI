const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(cors())

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extend:false}));





var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employeedb'
     
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection succeful!!.');
    else
        console.log('DB connection failed.');
});

app.post('/employees',(req,res)=>{

    
    mysqlConnection.query('insert into employee(EmpID,Name,EmpCode,Salary) values(?,?,?,?)',[req.body.EmpID,req.body.Name,req.body.Empcode,req.body.Salary],(err,response)=>{
        if(!err)
        {
            res.send('record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});


app.get('/employee',(req,res)=>{



    mysqlConnection.query('select * from employee',(err,rows,field)=>{
        if(!err)
        {
            res.send(rows);

        }
        else
        {
            throw err;
        }
    });
})

var i;

app.get('/employee/:EmpID',(req,res)=>{
    mysqlConnection.query('select * from employee where EmpID=?',[req.params.EmpID],(err,row,fields)=>{
        if(!err)
        {
            res.send(row);
            
        }
        else
        {
            throw err;
        }
    });
});


app.put('/employee/:EmpID',(req,res)=>{
    mysqlConnection.query('Update employee set Salary=? where EmpID=?',[req.body.Salary,req.params.EmpID],(err,rows,fields)=>{
        if(!err)
        {
            res.send("record has been update")
        }
        else{
            throw err;
        }
    })
})

app.delete('/employee/:EmpID',(req,res)=>{
    mysqlConnection.query('delete from employee where EmpID=?',[req.params.EmpID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})


app.listen(3000,()=>{
    console.log("Express is running on localhost:3000");
    console.log('CORS-enabled web server listening on port 3000');
});





    mysqlConnection.query('select * from employee',(err,rows,field)=>{
        if(!err)
        {
           console.log(rows)

        }
        else
        {
            throw err;
        }
    });

