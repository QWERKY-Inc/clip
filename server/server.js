const express = require('express')
const path = require('path')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8080;
//const publicPath = path.join(__dirname,'..','public');
//app.use(express.static(publicPath))
const buildPath = path.join(__dirname,'..','build')
console.log(buildPath)
app.use(express.static(buildPath))
// app.get('*', (req,res)=>{
//     // res.sendFile(path.join(publicPath,'index.html'))
//     res.sendFile(path.join(__dirname,'..','build','index.html'))
// })
app.use(cors());
app.get('/', function (req, res) {
    res.json(path.join(__dirname, '..','build', 'index.html'))
    // res.sendFile(path.join(__dirname, '..','build', 'index.html'));
  });
app.get('/data',(req,res)=>{
    const data = {
        lastname : "han",
        firstname : "driver"
    };
    res.json(data);
})

app.listen(port,()=>{
    console.log('server is up on port ' + port);
})
