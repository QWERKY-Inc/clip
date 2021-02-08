import fetch from 'node-fetch';
import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import xIcon from '../assets/x.png'

const queryString = require('query-string');

function UseDropDown(props) {
  // var bestProducts
  var subUse=[]
  const[useData,setUseData]=React.useState([])
  const[detailedUseData,setDetailedUseData]=React.useState({})
  const [height,setHeight]=React.useState(Dimensions.get('window').height)
  const [width,setWidth]=React.useState(Dimensions.get('window').width)


  const outerUse=(ct_id)=>{
    fetch('/Uselist?'+
        queryString.stringify({
            ct_depth:2,
            ct_parent:1
        })
    )
    .then(res=>res.json())
    .then((incomingData)=>{
      // console.log(incomingData)
      setUseData(incomingData)
    })
    .catch(err=>{
        console.log(err)
    })
  
  }
  const useList=()=>{
    fetch('/wholeuselist')
    .then(res=>res.json())
    .then((incomingData)=>{
      setUseData(incomingData)
    })
    .catch(err=>{
      console.log(err)
    })

  }
  const detailedUseDataObject = function(){
    var data=[]
    // if(detailedUseData.length==0){
      console.log('fetch call for use')
      UseData.map((oneUse,index)=>{
        fetch('/uselist?'+
          queryString.stringify({
            ct_depth:3,
            // ct_parent:useData[index].ct_id
            ct_parent:oneUse.ct_id
          })
        )
        .then(res=>res.json())
        .then((childrenData)=>{

          //setDetailedUseData(...detailedUseData,childrenData)
          data.push({...oneUse,children:childrenData})
          //subUse[index]=childrenData

        })
        .catch(err=>{
            console.log(err)
            // return {...oneUse,children:null}
            // data.push({...oneUse,children:null})
        })
  
      })
      setDetailedUseData(data)
      
      // return data
    // }
    // else{
    //   return detailedUseData
    // }
   
}


  const onChange=()=>{
    setHeight(Dimensions.get('window').height)
    setWidth(Dimensions.get('window').width)
  }
  useEffect(() => {
    Dimensions.addEventListener('change',onChange)
    //outerUse()
    useList()
  },[])

  useEffect(()=>{

    // const detailedUseDataArray = function(){
    //     var data=[]
    //     // if(detailedUseData.length==0){
    //       console.log('fetch call for Use')
    //       UseData.map((oneUse,index)=>{
    //         fetch('/Uselist?'+
    //           queryString.stringify({
    //             ct_depth:3,
    //             ct_parent:UseData[index].ct_id
    //           })
    //         )
    //         .then(res=>res.json())
    //         .then((childrenData)=>{
    //           data.push({...oneUse,children:childrenData})
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             // return {...oneUse,children:null}
    //             // data.push({...oneUse,children:null})
    //         })
      
    //       })
    //       return data
    //     // }
    //     // else{
    //     //   return detailedUseData
    //     // }
       
    // }

    // setDetailedUseData(detailedUseDataArray)
    console.log(useData)
    //detaileduseDataObject()
  },[useData])
  
  // useEffect(()=>{
  //   console.log(detaileduseData)
  // },[detaileduseData])
  if(useData){
    return (
      <div
      style={{
      position:'fixed',
      height:'100vh',
      width:'100vw',
      top:'100px',
      left:0,
      backgroundColor:'white',
      display:'block'
      }}
  >
    <div
    style={{
      paddingTop:'50px',
      paddingLeft:'65px',
      paddingRight:'65px'
    }}
    >
      <div
        style={{
          textAlign:'left',
          // margin:'25pt'
          paddingLeft:'0px',
          paddingRight:'0px',
          backgroundColor:'transparent'
        }}
      >
      <div
          style={{
            height:'25px',
            width:'25px',
            backgroundColor:'transparent',
            position: 'absolute',
            top:'62px',
            right:'75px'
          }}
        >
          <TouchableOpacity
            onPress={()=>{
              // console.log(detailedUseData)
              props.toggleUseDropDown()
            }}
          >
          <img
            src={xIcon}
            style={{
              height:'25px',
              width:'25px',
            }}
          >
          </img>
          </TouchableOpacity>
        </div>
        
        <Text
          style ={{
            fontSize: '40px',
            fontWeight:'700',
            textDecorationLine:'none',
            color:'black',
            textAlign:'center',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            // margin:11,
            marginTop:'5px',
            //padding:'auto',
            pointerEvents:'none'
          }}
        >
          자재카테고리
        </Text>
       
      </div>
      <div
        style={{
          height:'20px',
          width:'100vw',
          backgroundColor:'transparent'
        }}
      >

      </div>
      <div
      style={{
        //padding:'25px',
        
      }}
      >
      <div
      style={{
        columnCount:3,
        flexwrap:'wrap',
        flexDirection:'column',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        // padding:'100px',
        width:'80vw',
        height:'62vh',
        overflowY: 'scroll',
      }}
      >
      {/* {detaileduseData.map((use)=> */}
      {useData.map((use,index)=>
    
      
      <div>
      <div
      style={{
        textAlign:'left',
        height:'200px',
        //paddingLeft:'27px',
        //paddingRight:'27px',
        backgroundColor:'transparent'
      }}
      >
        <TouchableOpacity
                // onPress={() => 
                //   Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
                // }
                onPress={() => Linking.openURL(`/searchPage?search_target=USE_DEPTH1&search_value=${use.ct_id}`)}
              >
        <Text
          style ={{
            fontSize: '15pt',
            fontWeight:'700',
            textDecorationLine:'none',
            color:'black',
            textAlign:'left',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'row',
            // marginTop:'45pt',
            pointerEvents:'none',
            backgroundColor:'transparent',
            pointerEvents:'none',
            // marginTop:100
        }}
        >
          {use.ct_text}
        </Text>
        </TouchableOpacity> 
        <div
          style={{
            flexDirection:'column'
          }}
        >
        {useData[index].children.map((child,jndex)=>
          <div
            style={{
              paddingTop:'7px'
            }}
          >
          <TouchableOpacity
          // onPress={() => 
          //   Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
          // }
          onPress={() => Linking.openURL(`/searchPage?search_target=USE_DEPTH2&search_value=${child.ct_id}`)}
          >
          <Text
            style ={{
              fontSize: '12pt',
              fontWeight:'500',
              textDecorationLine:'none',
              color:'black',
              textAlign:'left',
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'row',
             // marginTop:'45pt',
              pointerEvents:'none',
              backgroundColor:'transparent',
              pointerEvents:'none',
              // marginTop:100
          }}
          >
            {child.ct_text}
          </Text>
          </TouchableOpacity>
          </div>
        )}
        </div>
      </div>
      </div>
      
)}
      </div>
      </div>
    </div>
</div>
    );
  }
	else{
		return(
			<div>
				<Text>
				로딩중 ...
				</Text>
			</div>
		)
	}
}
  
  export default UseDropDown;