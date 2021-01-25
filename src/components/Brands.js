import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking} from 'react-native';
const queryString = require('query-string');

function Brands(props) {

  const[brandListData,setBrandListData]=React.useState([])
  const[brandData,setBrandData]=React.useState({})
  const[detailView,setDetailView]=React.useState(false)
  const[brandId,setBrandId]=React.useState(null)
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
  const oneBrand=(ct_id)=>{
      fetch('/onebrand?'+
        queryString.stringify({
              ct_id:ct_id
            })
      )
      .then(res=>res.json())
      .then((incomingData)=>{
        // console.log(incomingData)
        setBrandData(incomingData)
        })
      .catch(err=>{
          console.log(err)
      })
    
  }
  useEffect(() => {
      
    // fetch('/data')
    // .then(res=>res.json())
    // .then(data=>setData(data),()=>{
    //   console.log('data read : ' , data);
    // })
    const parsed = queryString.parse(props.location.search);
    console.log(parsed.ct_id==undefined)
    if(parsed.ct_id==undefined){
      brands()
      setDetailView(false)
    }
    else{
      oneBrand(parsed.ct_id)
      setBrandId(parsed.ct_id)
      setDetailView(true)
    }
    
  },[])
  useEffect(()=>{
    console.log(typeof(brandListData))
    console.log(brandListData)

  },[brandListData])
  useEffect(()=>{
    if(brandData.bestproducts_brand){
      // console.log('true')
      // console.log(brandData)
    }
    

  },[brandData])
  if(brandListData!=[]){
    if(brandId!=null){
      if(brandData.bestproducts_brand){
        console.log(brandData.bestproducts_brand)
        return(
          <div>
            <Navbar />
            <NavBarFiller/>
            {/* <div
            style={{
              backgroundColor:'red'
            }}
            > */}
            <Image
                    style={{
                    display:'block',
                    height:'200pt',
                    width:'200pt',
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    zIndex:1,
                    pointerEvents:'none',
                    transform:[{
                        translateX:'0px',
                        translateY:'0px'
                    }]
                    }}
                    source={{
                        uri:
                            // data.listCategory[i].ct_img_url
                            //listMoodboard.mb_img_url
                            brandData.brd_feature_img_url
                    }}

                >
                </Image>
                <Image
                    style={{
                    display:'block',
                    height:'200pt',
                    width:'200pt',
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    zIndex:1,
                    pointerEvents:'none',
                    transform:[{
                        translateX:'0px',
                        translateY:'0px'
                    }]
                    }}
                    source={{
                        uri:
                            // data.listCategory[i].ct_img_url
                            //listMoodboard.mb_img_url
                            brandData.brd_logo_img_url
                    }}

                >
                </Image>
            <Text>{brandData.brd_name_kor}</Text>
            <Text>
              {brandData.brd_intro}
            </Text>
            <Text>
              {brandData.brd_description}
            </Text>
            {/* </div> */}
            {brandData.bestproducts_brand.map((material)=>{
             
          
          <View
              style={{
                backgroundColor:'red',
                height:'200px',
                width:'200px'

              }}
          >
          <Image
              style={{
              display:'block',
              height:'200pt',
              width:'200pt',
              borderTopLeftRadius:10,
              borderTopRightRadius:10,
              zIndex:1,
              pointerEvents:'none',
              transform:[{
                  translateX:'0px',
                  translateY:'0px'
              }]
              }}
              source={{
                  uri:
                      material.mt_feature_img_url
              }}

          >
          </Image>
              <View
                  style ={{
                      height:'60pt',
                      width:'200pt',
                      fontSize: '15pt',
                      fontWeight:'700',
                      textDecorationLine:'none',
                      color:'black',
                      textAlign:'center',
                      flexDirection:'row',
                      pointerEvents:'none',
                      backgroundColor:'rgb(33,33,33)',
                      pointerEvents:'none',
                      borderBottomLeftRadius:10,
                      borderBottomRightRadius:10,
                      
                  }}
              >
                  <View
                      style ={{
                          height:'60pt',
                          width:'190pt',
                          fontSize: '15pt',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          borderBottomLeftRadius:10,
                          borderBottomRightRadius:10,
                          color:'black',
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          marginLeft:'5pt',
                          pointerEvents:'none',
                          backgroundColor:"rgb(33,33,33)",
                          pointerEvents:'none',
                          
                      }}
                  >
                      <Text
                          style ={{
                              height:'65pt',
                              width:'250px',
                              fontSize: '15pt',
                              fontWeight:'700',
                              textDecorationLine:'none',
                              color:'white',
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
                          {material.mt_subname}
                      </Text>
                  </View>
              </View>
            </View>
          
            })} 
          

          </div>
        )
      }
      else{
        console.log(brandData);
        return(
          <div>
            <Navbar />
            <NavBarFiller/>
            <Image
                    style={{
                    display:'block',
                    height:'200pt',
                    width:'200pt',
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    zIndex:1,
                    pointerEvents:'none',
                    transform:[{
                        translateX:'0px',
                        translateY:'0px'
                    }]
                    }}
                    source={{
                        uri:
                            // data.listCategory[i].ct_img_url
                            //listMoodboard.mb_img_url
                            brandData.brd_feature_img_url
                    }}

                >
                </Image>
                <Image
                    style={{
                    display:'block',
                    height:'200pt',
                    width:'200pt',
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    zIndex:1,
                    pointerEvents:'none',
                    transform:[{
                        translateX:'0px',
                        translateY:'0px'
                    }]
                    }}
                    source={{
                        uri:
                            // data.listCategory[i].ct_img_url
                            //listMoodboard.mb_img_url
                            brandData.brd_logo_img_url
                    }}

                >
                </Image>
            <Text>{brandData.brd_name_kor}</Text>
            <Text>
              {brandData.brd_intro}
            </Text>
            <Text>
              {brandData.brd_description}
            </Text>
            

          </div>
        )
      }
    }
    else{
      return (
        <div className="Brands">
          <Navbar />
          <NavBarFiller/>
          {/* <Text> 
            Brands
          </Text> 
          <br></br>
            <Text>
              {catQ.ct_id}
            </Text>
          <Content/>   */}

          {brandListData.map((brand)=>
          <div>
            {/* <Image
            style={{
              display:'block',
              height:'150pt',
              width:'150pt',
              borderTopLeftRadius:10,
              borderTopRightRadius:10,
              zIndex:1,
              pointerEvents:'none',
              transform:[{
                  translateX:'0px',
                  translateY:'0px'
              }]
              }}
              source={{
                  uri:brand.ct_img_url
              }}
            >

            </Image>
            <Text>
              {brand.ct_text}
            </Text> */}
            <View
              style={{
                flex: 1, 
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                flexwrap:'wrap',
                display: 'grid',
                gridTemplateColumns: 'auto auto auto',
                paddingLeft: '77pt',
                paddingRight: '77pt'
              }}
            >
                      
                  
              

              
                  <TouchableOpacity
                  style={{
                      flexDirection:'column',
                      borderRadius:10,
                      height:'260pt',
                      width:"200pt",
                      backgroundColor:'rgb(33,33,33)',
                      // boxShadow:'0px 0px 2px',
                      
                          fontSize: '25pt',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          // color:'white',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          color:'black',
                          textAlign:'left',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'column',
                          marginLeft:'25pt',
                          marginRight:'25pt',
                          marginTop:'25pt',
                          padding:'auto',
                          zIndex:2
                          // backgroundColor:'red'
                      
                  }}
                  onPress={() => Linking.openURL(`/brands?ct_id=${brand.ct_id}`)}
                  
              >
              
              <Image
                  style={{
                  display:'block',
                  height:'200pt',
                  width:'200pt',
                  borderTopLeftRadius:10,
                  borderTopRightRadius:10,
                  zIndex:1,
                  pointerEvents:'none',
                  transform:[{
                      translateX:'0px',
                      translateY:'0px'
                  }]
                  }}
                  source={{
                      uri:
                          // data.listCategory[i].ct_img_url
                          //listMoodboard.mb_img_url
                          brand.ct_img_url
                  }}

              >
              </Image>
              {/* <a
                  style={{
                  transform:[{
                      translateX:'100px'
                  }]
                  }}
              > */}
                  <View
                      style ={{
                          height:'60pt',
                          width:'200pt',
                          fontSize: '15pt',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          // color:'white',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          color:'black',
                          textAlign:'center',
                          // alignItems:'center',
                          // justifyContent:'center',
                          flexDirection:'row',
                          // margin:11,
                          // padding:'auto',
                          pointerEvents:'none',
                          // borderTopRightRadius:20,
                          // borderBottomRightRadius:20,
                          backgroundColor:'rgb(33,33,33)',
                          // zIndex:99,
                          pointerEvents:'none',
                          borderBottomLeftRadius:10,
                          borderBottomRightRadius:10,
                          // left:0,
                          
                      }}
                  >
                      <View
                          style ={{
                              height:'60pt',
                              width:'190pt',
                              fontSize: '15pt',
                              fontWeight:'700',
                              textDecorationLine:'none',
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
                              borderBottomLeftRadius:10,
                              borderBottomRightRadius:10,
                              color:'black',
                              textAlign:'center',
                              alignItems:'center',
                              justifyContent:'center',
                              flexDirection:'row',
                              marginLeft:'5pt',
                              // padding:'auto',
                              pointerEvents:'none',
                              backgroundColor:"rgb(33,33,33)",
                              // zIndex:99,
                              pointerEvents:'none',
                              
                          }}
                      >
                          <Text
                              style ={{
                                  height:'65pt',
                                  width:'250px',
                                  fontSize: '15pt',
                                  fontWeight:'700',
                                  textDecorationLine:'none',
                                  // color:'white',
                                  // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                  // textShadowOffset: {width: 0, height: 0},
                                  // textShadowRadius: 2,
                                  color:'white',
                                  textAlign:'left',
                                  alignItems:'center',
                                  justifyContent:'center',
                                  flexDirection:'row',
                                  marginTop:'45pt',
                                  // padding:'auto',
                                  pointerEvents:'none',
                                  backgroundColor:'transparent',
                                  // zIndex:99,
                                  pointerEvents:'none',
                                  
                              }}
                          >
                              {/* {data.listCategory[i].ct_text} */}
                              {brand.ct_text}
                          </Text>
                      </View>
                  </View>
              {/* </a> */}
              </TouchableOpacity>
              
              </View>
            </div>

          )}
          
        </div>
      );
    }
  }
  else{
    return (
        <div className="MainContent">
        
            <Navbar />
            <NavBarFiller/>
            <Text>
            로딩중 ...
            </Text>
            {/* <Content/> */}
            
            
        
        </div>
    );
}
  }
  export default Brands;