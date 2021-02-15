import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
const queryString = require('query-string');
function PartDetail(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)
    const [q,setQ]=React.useState(undefined)
    const [materialData,setMaterialData]=React.useState(undefined)
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    const materialInfo=(qStr)=>{
    // console.log(qStr)
    fetch('/materialDetail?'+qStr
    )
    .then(res=>res.json())
    .then((incomingData)=>{
        console.log(incomingData)
        setMaterialData(incomingData)
        })
    .catch(err=>{
        console.log(err)
    })
    
}
    useEffect(() => {
        Dimensions.addEventListener('change',onChange)
        const parsed = queryString.parse(props.location.search);
        console.log(parsed)
        console.log(localStorage.login==undefined)
        if(localStorage.login!=undefined){
            var mem_no=undefined
            mem_no=JSON.parse(localStorage.login).message.split('_')[0]
            parsed.mem_no=mem_no 
        }
        else{
            parsed.mem_no=""
        }
        materialInfo(queryString.stringify(parsed)) 
        console.log('q = '+JSON.stringify(parsed))
        
        // console.log(parsed.ct_id==undefined)
        // if(parsed.ct_id==undefined){
        //   brands()
        //   setDetailView(false)
        // }
        // else{
        //   oneBrand(parsed.ct_id)
        //   setBrandId(parsed.ct_id)
        //   setDetailView(true)
        // }
        
      },[])
      return(
        <div>
        </div>
      )
}
export default PartDetail