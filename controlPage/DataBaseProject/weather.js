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


axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-1E93FFF1-1618-4CE3-8AB5-F5B0C34E1745&format=JSON')
    .then(response=>{

        //weatherElement[0] 天氣概況
        //weatherElement[1] 下雨機率
        //weatherElement[2] 最低溫
        //weatherElement[3] 體感溫度
        //weatherElement[4] 最高溫

        console.log(response.data.records.location[0].weatherElement[0].time[0].startTime)
        console.log(response.data.records.location[0].weatherElement[0].time[0].parameter.parameterName)
        console.log(response.data.records.location[0].weatherElement[1].time[0].parameter.parameterName)
        console.log(response.data.records.location[0].weatherElement[2].time[0].parameter.parameterName)
        console.log(response.data.records.location[0].weatherElement[3].time[0].parameter.parameterName)
        console.log(response.data.records.location[0].weatherElement[4].time[0].parameter.parameterName)

        

            var j = 0;
            for(var i = 0 ; i <22 ; i++){
                
                    for(var a = 0 ; a<3 ; a++){
                        j=j+1;
                        mysqlConnection.query('insert into weather(ID,startTime,endTime,Position,Overview,Rain,Lowest,Highest,Feel) values('+j+',?,?,?,?,?,?,?,?)',[response.data.records.location[i].weatherElement[0].time[a].startTime,response.data.records.location[i].weatherElement[0].time[a].endTime,response.data.records.location[i].locationName,response.data.records.location[i].weatherElement[0].time[a].parameter.parameterName,response.data.records.location[i].weatherElement[1].time[a].parameter.parameterName,response.data.records.location[i].weatherElement[2].time[a].parameter.parameterName,response.data.records.location[i].weatherElement[4].time[a].parameter.parameterName,response.data.records.location[0].weatherElement[3].time[a].parameter.parameterName],(err,response)=>{
                            if(!err){
                        
                            }
                            else{
                                throw err;
                            }        
                            
                        });
                        
                    }

            }
        
        
        
        
        
        
        
        
        
        })        