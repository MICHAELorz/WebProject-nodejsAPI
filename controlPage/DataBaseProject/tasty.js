const axios = require('axios')
const mysql = require('mysql')

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ProjectDB'
})

mysqlConnection.connect((err)=>{
    if (!err)
        console.log('db connect')
    else
        console.log('failed connect')
})

axios.get('https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx')
    .then(response=>{
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<')



        for(var i = 0 ; i < 139 ; i ++){
            j = i+1
            mysqlConnection.query('insert into Tasty(TastyID,Name,Address,Tel,Feature,City,Town,Coordinate,PicURL) values('+j+',?,?,?,?,?,?,?,?)',[response.data[i].Name,response.data[i].Address,response.data[i].Tel,response.data[i].FoodFeature,response.data[i].City,response.data[i].Town,response.data[i].Coordinate,response.data[i].PicURL],(err,response)=>{
                if(!err)
                {
                   
                }
                else
                {
                    throw err;
                }
            }) 
        }
    })


