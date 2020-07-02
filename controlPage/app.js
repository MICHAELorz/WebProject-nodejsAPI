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
    res.render('control.ejs')
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
            res.send('area record has been inserted seccessfully! next step!');
        }
        else
        {
            throw err;
        }
    })
})

app.post('/insert/entrance',(req,res)=>{


    mysqlConnection.query('insert into entrance(entrancePostal_code) values(?)',[req.body.entrancePostal_code],(err,response)=>{
        if(!err)
        {
            res.send('area record has been inserted seccessfully! next step!'); 
        }
        else
        {
            throw err;
        }
    });
});







app.post('/insert/pave',(req,res)=>{
    mysqlConnection.query('insert into pave(paveID) values(?)',[req.body.paveID],(err,response)=>{
        if(!err)
        {
            res.send('area record has been inserted seccessfully! next step!'); 
        }
        else
        {
            throw err;
        }
    })
})






app.post('/area/control',(req,res)=>{

    
    mysqlConnection.query('insert into area(Postal_code,City,Area,Position) values(?,?,?,?)',[req.body.Postal_code,req.body.City,req.body.Area,req.body.Position],(err,response)=>{
        if(!err)
        {
            res.send('area record has been inserted seccessfully!');
        }
        else
        {
            throw err;
        }
    });
    
});

app.post('/difficulty/control',(req,res)=>{

    
    mysqlConnection.query('insert into difficulty(difficultyID,dif) values(?,?)',[req.body.difficultyID,req.body.dif],(err,response)=>{
        if(!err)
        {
            res.send('difficulty record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});


app.listen(3001,()=>{
    console.log("Express is running on localhost:3001");
    console.log('CORS-enabled web server listening on port 3001');
});



