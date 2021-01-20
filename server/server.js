const express = require('express')
const path = require('path')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8080;
//app.use(express.static(publicPath))
const proxy = require("http-proxy-middleware");
const fetch = require('node-fetch')
const queryString =require('query-string');
var bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(
    proxy(["/api", , "/otherApi"], { target: "http://localhost:8080" })
  );
};
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
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
app.get('/terms', (req,res)=>{
    // res.sendFile(path.join(publicPath,'index.html'))
    res.sendFile(path.join(__dirname,'..','build','index.html'))
})
app.get('/privacypolicy', (req,res)=>{
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
app.get('/mainitem',(req,res)=>{
    fetch('http://clip.partners/api/mobile/Mainitem')
    .then(res=>res.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
    
})
app.post('/login',(req,res)=>{
    // console.log(queryString.stringify(Object.keys(req.body)[0]))
    fetch('http://clip.partners/api/mobile/MemberLogin',{
        method: 'post',
        // body:JSON.stringify({
        //     mem_jointype:'MOBILE',
        //     mem_password:'1491625B-a',
        //     mem_token:null,
        //     mem_mobile:'01055981367'
        // })
        // headers: {'Content-Type':'application/x-www-form-urlencoded'},
        // body:queryString.stringify({
        //     mem_jointype:'MOBILE',
        //     mem_password:'1491625B-a',
        //     mem_token:null,
        //     mem_mobile:'01055981367'
        // })
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        //body:queryString.stringify(req.body)
        // body:JSON.stringify(req.body)
        // body:Object.keys(req.body)[0]
        body:JSON.stringify(Object.keys(req.body)[0])
        //body:queryString.stringify(Object.keys(req.body)[0])
    })
    .then(res=>res.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})

app.listen(port,()=>{
    console.log('server is up on port ' + port);
})
