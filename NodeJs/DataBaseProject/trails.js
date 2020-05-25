const axios = require('axios');
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ProjectDB'
     
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection succeful!!.');
    else
        console.log('DB connection failed.');
});



axios.get('https://recreation.forest.gov.tw/mis/api/BasicInfo/Trail')
    .then(response=>{
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        console.log(response.data)

        for(var i = 0 ; i <129 ; i++){
                var j = i+1;
            mysqlConnection.query('insert into AllTrail(ID,Name,Position,Guide,Lenth,Pave,Url) values('+j+',?,?,?,?,?,?)',[response.data[i].TR_CNAME,response.data[i].TR_POSITION,response.data[i].GUIDE_CONTENT,response.data[i].TR_LENGTH_NUM,response.data[i].TR_PAVE,response.data[i].URL],(err,response)=>{
                if(!err)
                {
                   
                }
                else
                {
                    throw err;
                }
            });
        }console.log('success');
        
    })


axios.get('https://recreation.forest.gov.tw/mis/api/BasicInfo/Trail')
    .then(response=>{
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        console.log(response.data[0].TR_ENTRANCE)
    })
