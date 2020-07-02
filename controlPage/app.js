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
app.set('view－engine','ejs')

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('control.ejs')
})


app.post('/insert/area',(req,res)=>{

    
    var cityname = req.body.City
    

        mysqlConnection.query('insert into area(Postal_code,City,Area) values(?,?,?)',[req.body.postalcode,req.body.City,req.body.member],(err,response)=>{
                if(!err)
                    {
                        console.log(cityname)
                        res.render("control",{cityname});
                    }
                else
                    {
                        throw err;
                    }
            
        });
    
    
    
    
});




app.post('/insert/trails,',(req,res)=>{
    mysqlConnection.query('insert into trails(trailsName,trailsGuide,Length,dif) value(?,?,?,?)',[req.body.trailsName,req.body.trailsGuide,req.body.Length,req.body.dif],(err,response)=>{

        if(!err)
        {
            res.send('area record has been inserted seccessfully! nex step!');
        }
        else
        {
            throw err;
        }
    })
})


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
app.post('/entrance/control',(req,res)=>{

    
    mysqlConnection.query('insert into entrance(entrancePostal_code,Entrance,Traffic) values(?,?,?)',[req.body.entrancePostal_code,req.body.Entrance,req.body.Traffic],(err,response)=>{
        if(!err)
        {
            res.send('entrance record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});
app.post('/evaluatestore/control',(req,res)=>{

    
    mysqlConnection.query('insert into evaluatestore(store_ID,comment,Evaluate) values(?,?,?)',[req.body.store_ID,req.body.comment,req.body.Evaluate],(err,response)=>{
        if(!err)
        {
            res.send('evaluatestore record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});
app.post('/evaluatetrails/control',(req,res)=>{

    
    mysqlConnection.query('insert into evaluatetrails(trailsID,comment,Evaluate) values(?,?,?)',[req.body.trailsID,req.body.comment,req.body.Evaluate],(err,response)=>{
        if(!err)
        {
            res.send('evaluatetrails record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});
app.post('/level/control',(req,res)=>{

    
    mysqlConnection.query('insert into level(dif_ID,dif_name) values(?,?)',[req.body.dif_ID,req.body.dif_name],(err,response)=>{
        if(!err)
        {
            res.send('level record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});
app.post('/store/control',(req,res)=>{

    
    mysqlConnection.query('insert into store(storeName,storePostal_code,storeAddress,tellphone,time,storeGuide,storeTraffic) values(?,?,?,?,?,?,?)',[req.body.storeName,req.body.storePostal_code,req.body.storeAddress,req.body.tellphone,req.body.time,req.body.storeGuide,req.body.storeTraffic],(err,response)=>{
        if(!err)
        {
            res.send('store record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});
app.post('/trails/control',(req,res)=>{

    
    mysqlConnection.query('insert into trails(trailsName,trailsGuide,Length,Pave) values(?,?,?,?)',[req.body.trailsName,req.body.trailsGuide,req.body.Length,req.body.Pave],(err,response)=>{
        if(!err)
        {
            res.send('trails record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});
app.post('/trailsimg/control',(req,res)=>{

    
    mysqlConnection.query('insert into trailsimg(trailsimgID,trailsimg) values(?,?)',[req.body.trailsImgID,req.body.trailsImg],(err,response)=>{
        if(!err)
        {
            res.send('trailsImg record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});

app.post('/storeimg/control',(req,res)=>{

    
    mysqlConnection.query('insert into storeimg(store_ID,storeimg) values(?,?)',[req.body.store_ID,req.body.storeimg],(err,response)=>{
        if(!err)
        {
            res.send('storeImg record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});
app.post('/users/control',(req,res)=>{

    
    mysqlConnection.query('insert into users(name,email,password) values(?,?,?)',[req.body.name,req.body.email,req.body.password],(err,response)=>{
        if(!err)
        {
            res.send('users record has been inserted seccessfully!'); 
        }
        else
        {
            throw err;
        }
    });
    
});


//晨瑞你看這邊～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～

//類似下面 delete好像只要where =主健 不用insert那麼麻煩

app.post('/area/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from area where Postal_code=?',[req.body.Postal_code],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/difficulty/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from difficulty where difficultID=?',[req.body.difficultyID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/entrance/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from entrance where entranceID=?',[req.body.entranceID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/level/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from level where dif_ID=?',[req.body.dif_ID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/store/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from store where store_ID=?',[req.body.store_ID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/trails/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from trails where trailsID=?',[req.body.trailsID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/trailsimg/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from trailsimg where trailsImgID=?',[req.body.trailsImgID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/storeimg/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from storeimg where store_ID=?',[req.body.store_ID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/evalutestore/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from evalutestore where EvaluateStoreID=?',[req.body.EvaluateStoreID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.post('/evalutetrails/deleteControl',(req,res)=>{
    mysqlConnection.query('delete from evalutetrails where EvaluateTrailsID=?',[req.body.EvaluateTrailsID],(err,row,fields)=>{
        if(!err)
        {
            res.send('record has been delete successfully!')
        }
        else{
            throw err;
        }
    })
})

app.listen(3001,()=>{
    console.log("Express is running on localhost:3001");
    console.log('CORS-enabled web server listening on port 3001');
});



