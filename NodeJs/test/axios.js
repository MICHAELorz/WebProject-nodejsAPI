
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const getData = () => {
    axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-1E93FFF1-1618-4CE3-8AB5-F5B0C34E1745&format=JSON')
    .then(response=>{
        console.log(response)
        
    })
};

const sendData = () => {};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);