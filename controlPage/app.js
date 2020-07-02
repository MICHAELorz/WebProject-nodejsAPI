const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path')


const app = express();
app.use(cors())

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'Michael',
    password:'12345678',
    database:'projectdb'
     
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection succeful!!.');
    else
        console.log('DB connection failed.');
});

//input anything~~~~~~~~~~~~~~~~~~~~~~
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('control')
})

//trails -> entrance -> pave -> level



app.post('/search/area',(req,res)=>{

    
    var cityname = req.body.City
    

        mysqlConnection.query('select * from area where area.City=? and area.Area=?',[req.body.City,req.body.member],(err,result,field)=>{
                if(!err)
                    {
                        console.log(cityname)
                        console.log(result)
                        res.render("control",{result,cityname})
                    }
                else
                    {
                        throw err;
                    }
        });
    
});


app.post('/insert/trails',(req,res)=>{
    mysqlConnection.query('insert into trails(trailsName,trailsGuide,Length,dif) value(?,?,?,?)',[req.body.trailsName,req.body.trailsGuide,req.body.Length,req.body.dif],(err,response)=>{

        if(!err)
        {
            res.send('trails record has been inserted seccessfully! next step!<form action="/" method="get"><button type="submit" class="btn btn-danger">Next</form>');
        }
        else
        {
            throw err;
        }
    })
})

app.post('/insert/entrance',(req,res)=>{


    mysqlConnection.query(`SELECT AUTO_INCREMENT
    FROM  INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'projectdb'
    AND   TABLE_NAME   = 'trails'`,[],(err,result)=>{
        if(!err)
        {
         
            console.log(result[0].AUTO_INCREMENT)
            mysqlConnection.query('insert into entrance(trailsID,Postal_code,Entrance,Traffic) values(?,?,?,?)',[result[0].AUTO_INCREMENT-1,req.body.Postal_code,req.body.Entrance,req.body.Traffic],(err,response)=>{
                if(!err)
                {
                    res.send('entrance record has been inserted seccessfully! next step!<form action="/" method="get"><button type="submit" class="btn btn-danger">Next</form>'); 
                }
                else
                {
                    throw err;
                }
            }); 

        }
        else
        {
            throw err;
        }
    });


    
});





app.post('/insert/pave',(req,res)=>{


    mysqlConnection.query(`SELECT AUTO_INCREMENT
    FROM  INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'projectdb'
    AND   TABLE_NAME   = 'trails'`,[],(err,result)=>{
        if(!err)
        {
         
            console.log(result[0].AUTO_INCREMENT)
            mysqlConnection.query('insert into pave(trailsID,paveID) values(?,?)',[result[0].AUTO_INCREMENT-1,req.body.paveID],(err,response)=>{
                if(!err)
                {
                    res.send('pave record has been inserted seccessfully! next step!<form action="/" method="get"><button type="submit" class="btn btn-danger">Next</form>'); 
                }
                else
                {
                    throw err;
                }
            })

        }
        else
        {
            throw err;
        }
    });

    
});

app.post('/insert/trailsimg',(req,res)=>{
    mysqlConnection.query(`SELECT AUTO_INCREMENT
    FROM  INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'projectdb'
    AND   TABLE_NAME   = 'trails'`,[],(err,result)=>{
        if(!err)
        {
         
            console.log(result[0].AUTO_INCREMENT)
            mysqlConnection.query('insert into trailsimg(trailsID,trailsImg) values(?,?)',[result[0].AUTO_INCREMENT-1,req.body.trailsImg],(err,response)=>{
                if(!err)
                {
                    res.send('trailsimg record has been inserted seccessfully! next step!<form action="/" method="get"><button type="submit" class="btn btn-danger">Next</form>'); 
                }
                else
                {
                    throw err;
                }
            })

        }
        else
        {
            throw err;
        }
    });
})


app.post('/insert/store',(req,res)=>{
    mysqlConnection.query('insert into store(storeName,storePostal_code,storeAddress,tellphone,time,storeGuide,storeTraffic) values(?,?,?,?,?,?,?)',[req.body.storeName,req.body.storePostal_code,req.body.storeAddress,req.body.tellphone,req.body.time,req.body.storeGuide,req.body.storeTraffic],(err,response)=>{
        res.send('store record is successful<form action="/" method="get"><button type="submit" class="btn btn-danger">Next</form>')
    })
})

app.post('/insert/storeimg',(req,res)=>{
    mysqlConnection.query(`SELECT AUTO_INCREMENT
    FROM  INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA = 'projectdb'
    AND   TABLE_NAME   = 'store'`,[],(err,result)=>{
        if(!err)
        {
         
            console.log(result[0].AUTO_INCREMENT)
            mysqlConnection.query('insert into storeimg(storeID,storeImg) values(?,?)',[result[0].AUTO_INCREMENT-1,req.body.storeImg],(err,response)=>{
                if(!err)
                {
                    res.send('storeimg record has been inserted seccessfully! next step!<form action="/" method="get"><button type="submit" class="btn btn-danger">Next</form>'); 
                }
                else
                {
                    throw err;
                }
            })

        }
        else
        {
            throw err;
        }
    });
})



app.listen(3001,()=>{
    console.log("Express is running on localhost:3001");
    console.log('CORS-enabled web server listening on port 3001');
});



