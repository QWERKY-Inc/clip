import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import xIcon from '../assets/x.png'

const queryString = require('query-string');

function BrandsDropDown(props) {
  // var bestProducts
  const[brandListData,setBrandListData]=React.useState([])
  const[brandData,setBrandData]=React.useState({})
  const[detailView,setDetailView]=React.useState(false)
  const[brandId,setBrandId]=React.useState(null)
  const [height,setHeight]=React.useState(Dimensions.get('window').height)
  const [width,setWidth]=React.useState(Dimensions.get('window').width)
//   const brands=()=>{
//     fetch('/brandslist')
//     .then(res=>res.json())
//     .then((incomingData)=>{
//       setBrandListData(incomingData)
//     })
//     .catch(err=>{
//         console.log(err)
//     })

//   }
const brands=()=>{
    fetch('/brandslist')
    .then(res=>res.json())
    .then((incomingData)=>{
      setBrandListData(incomingData)
    })
    .catch(err=>{
        console.log(err)
    })
  }
//   const oneBrand=(ct_id)=>{
//       fetch('/onebrand?'+
//         queryString.stringify({
//               ct_id:ct_id
//             })
//         )
//       .then(res=>res.json())
//       .then((incomingData)=>{
//         console.log(incomingData)
//         setBrandData(incomingData)
//         })
//       .catch(err=>{
//           console.log(err)
//       })
//   }
  const onChange=()=>{
    setHeight(Dimensions.get('window').height)
    setWidth(Dimensions.get('window').width)
  }
  useEffect(() => {

    Dimensions.addEventListener('change',onChange)
    // const parsed = queryString.parse(props.location.search);
    // console.log(parsed.ct_id==undefined)
    // if(parsed.ct_id==undefined){
    brands()
    //   setDetailView(false)
    // }
    // else{
    //   oneBrand(parsed.ct_id)
    //   setBrandId(parsed.ct_id)
    //   setDetailView(true)
    // }

  },[])
  useEffect(()=>{
    console.log(typeof(brandListData))
    console.log(brandListData)
  },[brandListData])
  useEffect(()=>{
    if(brandData.bestproducts_brand){
      console.log(brandData)
    }
  },[brandData])
  
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
                paddingLeft:'25px',
                paddingRight:'25px',
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
                    props.toggleBrandsDropDown()
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
                  padding:'auto',
                  pointerEvents:'none'
                }}
              >
                브랜드
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
              // columnCount:3,
              //flexwrap:'wrap',
              //flexDirection:'column',
              display: 'grid',
              gridTemplateColumns: 'auto auto auto',
              width:'100vw',
              height:'50vh',
              overflowY: 'scroll',
            }}
            >
          
            {brandListData.map((brand)=>
            <TouchableOpacity
              onPress={() => 
                Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
              }
            >
            <div>
            <div
            style={{
              textAlign:'left',
              height:'15px',
              paddingLeft:'27px',
              paddingRight:'27px',
              backgroundColor:'transparent'
            }}
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
                  marginTop:'45pt',
                  pointerEvents:'none',
                  backgroundColor:'transparent',
                  pointerEvents:'none',
              }}
              >
                {brand.ct_text}
              </Text>
            </div>
            </div>
            </TouchableOpacity>
            )}
            </div>
            </div>
          </div>
      </div>
    );
}
  
  export default BrandsDropDown;