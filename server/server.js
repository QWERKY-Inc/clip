const express = require('express')
const path = require('path')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8080;
//app.use(express.static(publicPath))
const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy(["/api", , "/otherApi"], { target: "http://localhost:8080" })
  );
};
const buildPath = path.join(__dirname,'..','build')
// console.log(buildPath)
app.use(express.static(buildPath))
const publicPath = path.join(__dirname,'..','public');
console.log(publicPath)
app.use(express.static(publicPath))
app.get('/clip', (req,res)=>{
    // res.sendFile(path.join(publicPath,'index.html'))
    res.sendFile(path.join(__dirname,'..','build','index.html'))
})

app.get('/brands', (req,res)=>{
    // res.sendFile(path.join(publicPath,'index.html'))
    res.sendFile(path.join(__dirname,'..','build','index.html'))
})
app.get('/category', (req,res)=>{
    // res.sendFile(path.join(publicPath,'index.html'))
    res.sendFile(path.join(__dirname,'..','build','index.html'))
})

app.get('/constructionpart', (req,res)=>{
    // res.sendFile(path.join(publicPath,'index.html'))
    res.sendFile(path.join(__dirname,'..','build','index.html'))
})
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
