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
app.get('/searchpage', (req,res)=>{
    // res.sendFile(path.join(publicPath,'index.html'))
    res.sendFile(path.join(__dirname,'..','build','index.html'))
})
app.get('/partDetail', (req,res)=>{
    // res.sendFile(path.join(publicPath,'index.html'))
    res.sendFile(path.join(__dirname,'..','build','index.html'))
})
app.get('/moodboarddetail', (req,res)=>{
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
app.get('/login',(req,res)=>{
    console.log(req.query)
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
        //body:JSON.stringify(Object.keys(req.body)[0])
        //body:queryString.stringify(Object.keys(req.body)[0])
        // body:JSON.stringify(req.query)
        body:queryString.stringify(req.query)
    })
    .then(res=>res.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/ScrapClipboard',(req,res)=>{
    fetch('http://clip.partners/api/mobile/ScrapClipboard',{
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:queryString.stringify(req.query)
    })
    .then(res=>res.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/AddClipboard',(req,res)=>{
    fetch('http://clip.partners/api/mobile/Clipboard',{
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:queryString.stringify(req.query)
    })
    .then(res=>res.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/brandslist',(req,res)=>{
    //console.log(req.query)
    fetch('http://clip.partners/api/mobile/Category?table=BRAND',{

    })
    .then(res=>res.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/onebrand',(req,res)=>{
    console.log(req.query)
    // fetch('http://clip.partners/api/mobile/Brand/'+req.query.ct_id+'?mem_no=')
    fetch('http://clip.partners/api/mobile/Brand/'+req.query.ct_id+'?'+queryString.stringify(req.query))
    .then(res=>res.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/categorylist',(req,res)=>{
    console.log(req.query)
    fetch('http://clip.partners/api/mobile/Category?table=CATEGORY&ct_depth='+req.query.ct_depth+'&ct_parent='+req.query.ct_parent)
    .then(res=>res.json())
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/wholecategorylist',(req,res)=>{
    var wholeData=[]
    // console.log(req.query)
    fetch('http://clip.partners/api/mobile/Category?table=CATEGORY&ct_depth=2&ct_parent=1')
    .then(res=>res.json())
    .then(data=>{
        data.map((oneCategory,index)=>{
            fetch('http://clip.partners/api/mobile/Category?'+
              queryString.stringify({
                table:'CATEGORY',
                ct_depth:3,
                ct_parent:oneCategory.ct_id
              })
            )
            .then(res=>res.json())
            .then((childrenData)=>{
            //   console.log(oneCategory)
            //   console.log(childrenData)
              wholeData.push({...oneCategory,children:childrenData})
             // wholeData[index]=childrenData
            })
            .then(()=>{
                if(wholeData.length==data.length){
                    console.log(index+'/'+data.length)
                    console.log('test end reached')
                    res.json(wholeData.sort(function(a,b){
                        return a.ct_text-b.ct_text
                    }));
                }
                else{
                    console.log(index+'/'+data.length)
                    
                }
                
                
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/wholeuselist',(req,res)=>{
    var wholeData=[]
    // console.log(req.query)
    fetch('http://clip.partners/api/mobile/Category?table=CATEGORY&ct_depth=2&ct_parent=2')
    .then(res=>res.json())
    .then(data=>{
        data.map((oneUse,index)=>{
            fetch('http://clip.partners/api/mobile/Category?'+
              queryString.stringify({
                table:'CATEGORY',
                ct_depth:3,
                ct_parent:oneUse.ct_id
              })
            )
            .then(res=>res.json())
            .then((childrenData)=>{
            //   console.log(oneCategory)
            //   console.log(childrenData)
              wholeData.push({...oneUse,children:childrenData})
             // wholeData[index]=childrenData
            })
            .then(()=>{
                if(wholeData.length==data.length){
                    console.log(index+'/'+data.length)
                    console.log('test end reached')
                    res.json(wholeData.sort(function(a,b){
                        return a.ct_text-b.ct_text
                    }));
                }
                else{
                    console.log(index+'/'+data.length)
                    
                }
                
                
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/search',(req,res)=>{
    // console.log('http://clip.partners/api/mobile/Material?'+queryString.stringify(req.query))
    //console.log(queryString.stringify(req.query))
    fetch('http://clip.partners/api/mobile/Material?'+queryString.stringify(req.query))
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/detailedsearch',(req,res)=>{
    // console.log('http://clip.partners/api/mobile/Material?'+queryString.stringify(req.query))
    //console.log(queryString.stringify(req.query))
    var a = {...req.query}
    delete a['list_category']
    delete a['list_use']
    delete a['list_brand']
    delete a['list_color']
    // console.log(a)

    var categoryString=""
    if(req.query.list_category!=undefined){
        categoryString="&list_category=["+String(req.query.list_category)+"]"
    }
    var useageString=""
    if(req.query.list_use!=undefined){
        useageString="&list_use=["+String(req.query.list_use)+"]"
    }
    var brandString=""
    if(req.query.list_brand!=undefined){
        brandString="&list_brand=["+String(req.query.list_brand)+"]"
    }
    var colorString=""
    if(req.query.list_color!=undefined){
        colorString="&list_color=[%22"+String(req.query.list_color).replace(/,/g,"%22,%22")+"%22]"
    }
    var patternString=""
    if(req.query.list_pattern!=undefined){
        patternString="&list_pattern=[%22"+String(req.query.list_pattern).replace(/,/g,"%22,%22")+"%22]"
    }
    var qString=queryString.stringify(a)+categoryString+useageString+brandString+colorString+patternString
    //res.json(qString)
    fetch('http://clip.partners/api/mobile/Material?'+qString)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})

app.get('/materialDetail',(req,res)=>{
    // console.log('http://clip.partners/api/mobile/Material?'+queryString.stringify(req.query))
    //console.log(queryString.stringify(req.query))
    console.log(req.query)
    fetch('http://clip.partners/api/mobile/Material/'+req.query.mt_no+'/?'+queryString.stringify(req.query))
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/clipboardInfo',(req,res)=>{
    var wholeData=[]
    fetch('http://clip.partners/api/mobile/Clipboard?'+queryString.stringify(req.query))
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        //     if(data.length!=0){
        //         arr=[]
        //         for(var i = 0; i<data.length; i++){
        //             fetch('http://clip.partners/api/mobile/Clipboard/'+data[i].cb_no)
        //             .then(res=>res.json())
        //             .then(moreData=>{
        //                 //console.log(moreData)
        //                 arr.push(moreData)
        //                 // res.json(data);
        //             })
        //             .catch(err=>{
        //                 console.log(err)
        //             })
        //         }
        //         console.log(arr)
        //         res.json(arr)
        //     }
        //     else{
        //         res.json(data);
        //     }
        data.map((oneBoard,index)=>{
            fetch('http://clip.partners/api/mobile/Clipboard/'+oneBoard.cb_no
            )
            .then(res=>res.json())
            .then((detailData)=>{
              wholeData.push({...oneBoard,detail:detailData})
            })
            .then(()=>{
                if(wholeData.length==data.length){
                    console.log(index+'/'+data.length)
                    console.log(' end reached')
                    res.json(wholeData.sort(function(a,b){
                        return a.ct_text-b.ct_text
                    }));
                }
                else{
                    console.log(index+'/'+data.length)
                    
                }
                
                
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('clipboardDetailInfo',(req,res)=>{
    console.log(req.query)
    fetch('http://clip.partners/api/mobile/Clipboard/'+req.query.cb_no)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})

app.get('/Moodboard',(req,res)=>{
    // console.log('http://clip.partners/api/mobile/Material?'+queryString.stringify(req.query))
    //console.log(queryString.stringify(req.query))
    fetch('http://clip.partners/api/mobile/Moodboard?'+queryString.stringify(req.query))
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})
app.get('/MoodboardDetails',(req,res)=>{
    // console.log('http://clip.partners/api/mobile/Material?'+queryString.stringify(req.query))
    //console.log(queryString.stringify(req.query))
    fetch('http://clip.partners/api/mobile/Moodboard/'+req.query.mb_no+'/?'+queryString.stringify(req.query))
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
        res.json(data);
    })
    .catch(err=>{
        console.log(err)
    })
})

app.listen(port,()=>{
    console.log('server is up on port ' + port);
})
