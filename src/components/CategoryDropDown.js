import fetch from 'node-fetch';
import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import xIcon from '../assets/x.png'

const queryString = require('query-string');

function CategoryDropDown(props) {
  // var bestProducts
  var subCategory=[]
  const[categoryData,setCategoryData]=React.useState([])
  const[detailedCategoryData,setDetailedCategoryData]=React.useState({})
  const [height,setHeight]=React.useState(Dimensions.get('window').height)
  const [width,setWidth]=React.useState(Dimensions.get('window').width)


  const outerCategory=(ct_id)=>{
    fetch('/categorylist?'+
        queryString.stringify({
            ct_depth:2,
            ct_parent:1
        })
    )
    .then(res=>res.json())
    .then((incomingData)=>{
      // console.log(incomingData)
      setCategoryData(incomingData)
    })
    .catch(err=>{
        console.log(err)
    })
  
  }
  const categoryList=()=>{
    fetch('/wholecategorylist')
    .then(res=>res.json())
    .then((incomingData)=>{
      setCategoryData(incomingData)
    })
    .catch(err=>{
      console.log(err)
    })

  }
  const detailedCategoryDataObject = function(){
    var data=[]
    // if(detailedCategoryData.length==0){
      console.log('fetch call for category')
      categoryData.map((oneCategory,index)=>{
        fetch('/categorylist?'+
          queryString.stringify({
            ct_depth:3,
            // ct_parent:categoryData[index].ct_id
            ct_parent:oneCategory.ct_id
          })
        )
        .then(res=>res.json())
        .then((childrenData)=>{

          //setDetailedCategoryData(...detailedCategoryData,childrenData)
          data.push({...oneCategory,children:childrenData})
          //subCategory[index]=childrenData

        })
        .catch(err=>{
            console.log(err)
            // return {...oneCategory,children:null}
            // data.push({...oneCategory,children:null})
        })
  
      })
      setDetailedCategoryData(data)
      
      // return data
    // }
    // else{
    //   return detailedCategoryData
    // }
   
}


  const onChange=()=>{
    setHeight(Dimensions.get('window').height)
    setWidth(Dimensions.get('window').width)
  }
  useEffect(() => {
    Dimensions.addEventListener('change',onChange)
    //outerCategory()
    categoryList()
  },[])

  useEffect(()=>{

    // const detailedCategoryDataArray = function(){
    //     var data=[]
    //     // if(detailedCategoryData.length==0){
    //       console.log('fetch call for category')
    //       categoryData.map((oneCategory,index)=>{
    //         fetch('/categorylist?'+
    //           queryString.stringify({
    //             ct_depth:3,
    //             ct_parent:categoryData[index].ct_id
    //           })
    //         )
    //         .then(res=>res.json())
    //         .then((childrenData)=>{
    //           data.push({...oneCategory,children:childrenData})
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             // return {...oneCategory,children:null}
    //             // data.push({...oneCategory,children:null})
    //         })
      
    //       })
    //       return data
    //     // }
    //     // else{
    //     //   return detailedCategoryData
    //     // }
       
    // }

    // setDetailedCategoryData(detailedCategoryDataArray)
    console.log(categoryData)
    //detailedCategoryDataObject()
  },[categoryData])
  
  // useEffect(()=>{
  //   console.log(detailedCategoryData)
  // },[detailedCategoryData])
  if(categoryData){
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
              // console.log(detailedCategoryData)
              props.toggleCategoryDropDown()
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
        width:'calc(100vw-15px)',
        height:'62vh',
        overflowY: 'scroll',
      }}
      >
      {/* {detailedCategoryData.map((category)=> */}
      {categoryData.map((category,index)=>
    
      
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
              >
        <Text
          style ={{
            fontSize: '15pt',
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
          {category.ct_text}
        </Text>
        </TouchableOpacity> 
        <div
          style={{
            flexDirection:'column'
          }}
        >
        {categoryData[index].children.map((child,jndex)=>
          <div
            style={{
              paddingTop:'7px'
            }}
          >
          <TouchableOpacity
          // onPress={() => 
          //   Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
          // }
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
  
  export default CategoryDropDown;