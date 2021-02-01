import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
// import Carousel from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css'

const queryString = require('query-string');

function Brands(props) {
  // var bestProducts
  const[brandListData,setBrandListData]=React.useState([])
  const[brandData,setBrandData]=React.useState({})
  const[detailView,setDetailView]=React.useState(false)
  const[brandId,setBrandId]=React.useState(null)
  const [height,setHeight]=React.useState(Dimensions.get('window').height)
  const [width,setWidth]=React.useState(Dimensions.get('window').width)
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
        console.log(incomingData)
        setBrandData(incomingData)
        })
      .catch(err=>{
          console.log(err)
      })
    
  }
  const onChange=()=>{
    setHeight(Dimensions.get('window').height)
    setWidth(Dimensions.get('window').width)
    // console.log(height+" : "+width)
  }
  useEffect(() => {
      
    // fetch('/data')
    // .then(res=>res.json())
    // .then(data=>setData(data),()=>{
    //   console.log('data read : ' , data);
    // })
    Dimensions.addEventListener('change',onChange)
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
      console.log(brandData)
      // bestProducts=brandData.bestproducts_brand.map((material)=>{
             
          
      //   <View
      //       style={{
      //         backgroundColor:'red',
      //         height:'200px',
      //         width:'200px'

      //       }}
      //   >
      //   <Image
      //       style={{
      //       display:'block',
      //       height:'200pt',
      //       width:'200pt',
      //       borderTopLeftRadius:10,
      //       borderTopRightRadius:10,
      //       zIndex:1,
      //       pointerEvents:'none',
      //       transform:[{
      //           translateX:'0px',
      //           translateY:'0px'
      //       }]
      //       }}
      //       source={{
      //           uri:
      //               material.mt_feature_img_url
      //       }}

      //   >
      //   </Image>
      //       <View
      //           style ={{
      //               height:'60pt',
      //               width:'200pt',
      //               fontSize: '15pt',
      //               fontWeight:'700',
      //               textDecorationLine:'none',
      //               color:'black',
      //               textAlign:'center',
      //               flexDirection:'row',
      //               pointerEvents:'none',
      //               backgroundColor:'rgb(33,33,33)',
      //               pointerEvents:'none',
      //               borderBottomLeftRadius:10,
      //               borderBottomRightRadius:10,
                    
      //           }}
      //       >
      //           <View
      //               style ={{
      //                   height:'60pt',
      //                   width:'190pt',
      //                   fontSize: '15pt',
      //                   fontWeight:'700',
      //                   textDecorationLine:'none',
      //                   borderBottomLeftRadius:10,
      //                   borderBottomRightRadius:10,
      //                   color:'black',
      //                   textAlign:'center',
      //                   alignItems:'center',
      //                   justifyContent:'center',
      //                   flexDirection:'row',
      //                   marginLeft:'5pt',
      //                   pointerEvents:'none',
      //                   backgroundColor:"rgb(33,33,33)",
      //                   pointerEvents:'none',
                        
      //               }}
      //           >
      //               <Text
      //                   style ={{
      //                       height:'65pt',
      //                       width:'250px',
      //                       fontSize: '15pt',
      //                       fontWeight:'700',
      //                       textDecorationLine:'none',
      //                       color:'white',
      //                       textAlign:'left',
      //                       alignItems:'center',
      //                       justifyContent:'center',
      //                       flexDirection:'row',
      //                       marginTop:'45pt',
      //                       pointerEvents:'none',
      //                       backgroundColor:'transparent',
      //                       pointerEvents:'none',
                            
      //                   }}
      //               >
      //                   {material.mt_subname}
      //               </Text>
      //           </View>
      //       </View>
      //     </View>
        
      //     })
    }
    

  },[brandData])
  if(brandListData!=[]){
    if(brandId!=null){
      if(brandData.bestproducts_brand){
        if(brandData.brd_files!=null){
        // console.log(brandData.bestproducts_brand)
          return(
            <div>
            <div>
              <Navbar />
              <NavBarFiller/>
              <div
              style={{
                backgroundColor:'transparent',
                alignItems:'center',
                padding:'auto'
              }}
              >
                {/* <div
              style={{
                backgroundColor:'red'
              }}
              > */}
              <div
                style={{
                  paddingTop:'100px',
                  paddingLeft:'150px',
                  paddingRight:'150px'
                }}
              >
              <Image
                      style={{
                      display:'block',
                      height:'300px',
                      width:'auto',
                      // borderTopLeftRadius:10,
                      // borderTopRightRadius:10,
                      borderRadius:'10px',
                      pointerEvents:'none',
                      marginLeft:'auto',
                      marginRight:'auto'
                      // transform:[{
                      //     translateX:'0px',
                      //     translateY:'0px'
                      // }]
                      }}
                      source={{
                          uri:
                              brandData.brd_feature_img_url
                      }}

                  >
              </Image>
              </div>
                  </div>
                  {/* <Image
                      style={{
                      display:'block',
                      height:'200pt',
                      width:'200pt',
                      borderTopLeftRadius:10,
                      borderTopRightRadius:10,
                      pointerEvents:'none',
                      transform:[{
                          translateX:'0px',
                          translateY:'0px'
                      }]
                      }}
                      source={{
                          uri:
                              brandData.brd_logo_img_url
                      }}

                  >
                  </Image> */}
              <div
                style={{
                  textAlign:'left',
                  paddingLeft:'150px',
                  paddingRight:'150px',
                  paddingTop:'50px'
                }}
              >
              <View
                style={{
                  flex:1,
                  flexDirection:'row',
                  paddingTop:'15px',
                  paddingBottom:'15px',
                }}
              >
                <View
                  style={{
                    
                    // width:"450px",
                    // alignItems:'center',
                    // justifyContent:'center',
                    textAlign:'left',
                    flex:2
                  }}
                >
                  <Text
                    style={{
                      fontSize: '15px',
                      fontWeight:'500',
                      textDecorationLine:'none',
                      // color:'white',
                      // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                      // textShadowOffset: {width: 0, height: 0},
                      // textShadowRadius: 2,
                      color:'gray',
                      // textAlign:'center',
                      // alignItems:'center',
                      // justifyContent:'center',
                      flexDirection:'row',
                      // margin:11,
                      marginTop:'25px',
                      padding:'auto',
                      pointerEvents:'none'
                    }}
                  >
                    {brandData.brd_intro}
                  </Text>
                  <br></br>
                  <View>
                  <Text
                      style={{
                        fontSize: '20px',
                        fontWeight:'700',
                        textDecorationLine:'none',
                        // color:'white',
                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 2,
                        color:'black',
                        // textAlign:'center',
                        // alignItems:'center',
                        // justifyContent:'center',
                        //flexDirection:'row',
                        // margin:11,
                        marginTop:'25px',
                        padding:'auto',
                        pointerEvents:'none'
                      }}
                    >
                      {brandData.brd_name_eng}
                    </Text>
                    <Text
                    style={{
                      fontSize: '20px',
                      fontWeight:'700',
                      textDecorationLine:'none',
                      // color:'white',
                      // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                      // textShadowOffset: {width: 0, height: 0},
                      // textShadowRadius: 2,
                      color:'black',
                      // textAlign:'center',
                      // alignItems:'center',
                      // justifyContent:'center',
                      flexDirection:'row',
                      // margin:11,
                      marginTop:'25px',
                      padding:'auto',
                      pointerEvents:'none'
                    }}
                    > 
                      {brandData.brd_name_kor}
                    </Text>
                    <br></br>
                    <Text>
                      {brandData.brd_description}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => 
                    Linking.openURL(`/category?cat_num=${brandData.brd_no}`)
                    // console.log('show material list ')
                  }
                >
                  <View
                    style={{
                      marginTop:'25px',
                      marginLeft:'25px',
                      backgroundColor:'white',
                      width:100,
                      // flex:1,
                      height:40,
                      borderRadius:10,
                      borderColor:'black',
                      borderStyle:'solid',
                      borderWidth:'2px',
                      textAlign:'center',
                      alignItems:'center',
                      justifyContent:'center',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor:'transparent',
                        transform:[{
                          translateX:'0px',
                          translateY:'50px',
                        }]
                      }}
                    >
                      {/* <Text
                        
                      >
                        {brandData.brd_name_eng} {brandData.brd_name_kor} 자재 보기
                      </Text> */}
                      <Text
                        
                      >
                        자재 보기
                      </Text>
                    </View> 
                  </View>
                </TouchableOpacity>
              </View>
              <br></br>
              
              </div>
              
              {/* </div> */}
              {/* <Carousel plugins={['arrows']}>
                {brandData.pictures_brand.map((atom)=>
                  <img src={atom.pic_url}
                    style={{
                      height:"300px",
                      width:"auto"
                    }}
                  />
                )}
              </Carousel> */}
              {/* <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={300}
                totalSlides={brandData.pictures_brand.length}
                visibleSlides={3}
                interval={5000}
                infinite={true}
              >
                <Slider>
                {brandData.pictures_brand.map((atom,index)=>
                  
                  <Slide index={index}

                  >
                    <img src={atom.pic_url}
                      style={{
                        height:"300px",
                        width:"auto"
                      }}
                    />
                  </Slide>

                )}
                  
                </Slider>
                
              </CarouselProvider> */}
              <div
                style={{
                  paddingLeft:'150px',
                  paddingRight:'150px'
                }}
              >
                <Carousel
                  style={{
                    borderRadius:10
                  }}
                  showArrows={true} 
                  showStatus={false} 
                  showIndicators={true}
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={true}
                  interval={4500}
                  transitionTime={500}
                  emulateTouch={true}
                  stopOnHover={false}
                  //swipeScrollTolerance={1}
                  useKeyboardArrows={true}
                  //centerSlidePercentage={10}
                >
                {brandData.pictures_brand.map((atom)=>
                      <div
                        style={{
                          backgroundColor:'gainsboro',
                          
                        }}
                      >
                        <img src={atom.pic_url}
                          style={{
                            height:"300px",
                            width:"auto",
                            // borderRadius:10
                          }}
                        />
                      </div>
                    )}
                </Carousel>
              </div>
              <div
                style={{
                  textAlign:'left',
                  paddingLeft:'150px',
                  paddingRight:'150px',
                  paddingTop:'50px'
                }}
              >
              <Text
                style ={{

                  fontSize: '20px',
                  fontWeight:'700',
                  textDecorationLine:'none',
                  color:'black',
                  textAlign:'left',
                  alignItems:'center',
                  justifyContent:'center',
                  flexDirection:'row',
                  marginTop:'100px',
                  pointerEvents:'none',
                  backgroundColor:'transparent',
                  pointerEvents:'none',
                  
              }}
              >
                인기상품
              </Text>
              </div>
              <div
                style={{
                  padding:'auto'
                }}
              >

            
                <div
                  style={{
                    // columnCount:3,
                    flexwrap:'wrap',
                    justifyContent:'space-between',
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto auto auto',
                    marginLeft:'150px',
                    marginRight:'150px',
                    backgroundColor:'transparent',
                    
                  }}
                >
                  
                  {brandData.bestproducts_brand.map((material)=>
              
              
                    <View
                      style={{
                        backgroundColor:'transparent',
                        height:'175px',
                        width:'125px',
                        // marginLeft:'auto',
                        // marginRight:'auto',
                        marginTop:'20px',
                        borderRadius:10,
                        boxShadow:'0px 0px 3px black'
                      }}
                    >
                      <Image
                        style={{
                        display:'block',
                        height:'125px',
                        width:'125px',
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        zIndex:1,
                        pointerEvents:'none',
                        // transform:[{
                        //     translateX:'0px',
                        //     translateY:'0px'
                        // }]
                        }}
                        source={{
                            uri:
                                material.mt_feature_img_url
                        }}

                      >
                      </Image>
                      <View
                        style ={{
                          height:'50px',
                          width:'125px',
                          fontSize: '12pt',
                          fontWeight:'500',
                          textDecorationLine:'none',
                          color:'white',
                          textAlign:'center',
                          flexDirection:'column',
                          pointerEvents:'none',
                          backgroundColor:'white',
                          pointerEvents:'none',
                          borderBottomLeftRadius:10,
                          borderBottomRightRadius:10,
                          padding:'10px'
                        }}
                      >
                        <Text
                              style ={{
                                  height:'100px',
                                  width:'120px',
                                  fontSize: '8pt',
                                  fontWeight:'500',
                                  textDecorationLine:'none',
                                  color:'black',
                                  textAlign:'left',
                                  alignItems:'center',
                                  justifyContent:'center',
                                  flexDirection:'row',
                                  // marginLeft:'1px',
                                  // marginTop:'1px',
                                  pointerEvents:'none',
                                  backgroundColor:'transparent',
                                  pointerEvents:'none',
                                  
                                  
                              }}
                          >
                          {material.mt_subname}
                          
                        </Text>
                        <Text
                          style ={{
                              // height:'65pt',
                              // width:'250px',
                              fontSize: '8pt',
                              fontWeight:'700',
                              textDecorationLine:'none',
                              color:'black',
                              textAlign:'left',
                              //alignItems:'center',
                              //justifyContent:'center',
                              //flexDirection:'row',
                              //marginTop:'45pt',
                              pointerEvents:'none',
                              backgroundColor:'transparent',
                              pointerEvents:'none',
                              
                          }}
                      >
                          {material.vd_name}
                      </Text>
              </View>
            </View>
          
            
              )}
            
            </div>
            </div>
            <div
                style={{
                  textAlign:'left',
                  paddingLeft:'150px',
                  paddingRight:'150px',
                  paddingTop:'50px'
                }}
              >
              <Text
                style ={{

                  fontSize: '20px',
                  fontWeight:'700',
                  textDecorationLine:'none',
                  color:'black',
                  textAlign:'left',
                  alignItems:'center',
                  justifyContent:'center',
                  flexDirection:'row',
                  marginTop:'100px',
                  pointerEvents:'none',
                  backgroundColor:'transparent',
                  pointerEvents:'none',
                  
              }}
              >
                다운로드 가능한 파일
              </Text>
              <br></br>
              <div
                style={{
                  gridTemplateColumns:'auto auto auto'
                }}
              >
              {brandData.brd_files.map((file)=>
              <div
                style={{
                  backgroundColor:'transparent',
                  paddingTop:'15px',
                  paddingBottom:'15px'
                }}
              >
                <a
                  style ={{
                    fontSize: '8pt',
                    fontWeight:'500',
                    textDecorationLine:'none',
                    color:'black',
                    textAlign:'left',
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'row',
                    marginTop:'100px',
                    backgroundColor:'transparent',
                  }}
                  href={file.fl_url}
                >
                  <Text
                    style ={{

                      fontSize: '8pt',
                      fontWeight:'500',
                      textDecorationLine:'none',
                      color:'black',
                      textAlign:'left',
                      alignItems:'center',
                      justifyContent:'center',
                      flexDirection:'row',
                      marginTop:'100px',
                      pointerEvents:'none',
                      backgroundColor:'transparent',
                      pointerEvents:'none',
                      
                  }}
                  >
                    {file.fl_displayname}
                  </Text>
                </a>
              </div>
              )}
              </div>
              
              
              </div>
            </div>
            <div
                style={{
                  height:'100px',
                  width:'100vw',
                  backgroundColor:'transparent'
                }}
              >

              </div>
            </div>
          )
        }
        else{
          // console.log(brandData.bestproducts_brand)
            return(
              <div>
              <div>
                <Navbar />
                <NavBarFiller/>
                <div
                style={{
                  backgroundColor:'transparent',
                  alignItems:'center',
                  padding:'auto'
                }}
                >
                  {/* <div
                style={{
                  backgroundColor:'red'
                }}
                > */}
                <div
                  style={{
                    paddingTop:'100px',
                    paddingLeft:'150px',
                    paddingRight:'150px'
                  }}
                >
                <Image
                        style={{
                        display:'block',
                        height:'300px',
                        width:'auto',
                        // borderTopLeftRadius:10,
                        // borderTopRightRadius:10,
                        borderRadius:'10px',
                        pointerEvents:'none',
                        marginLeft:'auto',
                        marginRight:'auto'
                        // transform:[{
                        //     translateX:'0px',
                        //     translateY:'0px'
                        // }]
                        }}
                        source={{
                            uri:
                                brandData.brd_feature_img_url
                        }}
  
                    >
                </Image>
                </div>
                    </div>
                    {/* <Image
                        style={{
                        display:'block',
                        height:'200pt',
                        width:'200pt',
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        pointerEvents:'none',
                        transform:[{
                            translateX:'0px',
                            translateY:'0px'
                        }]
                        }}
                        source={{
                            uri:
                                brandData.brd_logo_img_url
                        }}
  
                    >
                    </Image> */}
                <div
                  style={{
                    textAlign:'left',
                    paddingLeft:'150px',
                    paddingRight:'150px',
                    paddingTop:'50px'
                  }}
                >
                <View
                  style={{
                    flex:1,
                    flexDirection:'row',
                    paddingTop:'15px',
                    paddingBottom:'15px',
                  }}
                >
                  <View
                    style={{
                      
                      // width:"450px",
                      // alignItems:'center',
                      // justifyContent:'center',
                      textAlign:'left',
                      flex:2
                    }}
                  >
                    <Text
                      style={{
                        fontSize: '15px',
                        fontWeight:'500',
                        textDecorationLine:'none',
                        // color:'white',
                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 2,
                        color:'gray',
                        // textAlign:'center',
                        // alignItems:'center',
                        // justifyContent:'center',
                        flexDirection:'row',
                        // margin:11,
                        marginTop:'25px',
                        padding:'auto',
                        pointerEvents:'none'
                      }}
                    >
                      {brandData.brd_intro}
                    </Text>
                    <br></br>
                    <View>
                    <Text
                        style={{
                          fontSize: '20px',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          // color:'white',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          color:'black',
                          // textAlign:'center',
                          // alignItems:'center',
                          // justifyContent:'center',
                          //flexDirection:'row',
                          // margin:11,
                          marginTop:'25px',
                          padding:'auto',
                          pointerEvents:'none'
                        }}
                      >
                        {brandData.brd_name_eng}
                      </Text>
                      <Text
                      style={{
                        fontSize: '20px',
                        fontWeight:'700',
                        textDecorationLine:'none',
                        // color:'white',
                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 2,
                        color:'black',
                        // textAlign:'center',
                        // alignItems:'center',
                        // justifyContent:'center',
                        flexDirection:'row',
                        // margin:11,
                        marginTop:'25px',
                        padding:'auto',
                        pointerEvents:'none'
                      }}
                      > 
                        {brandData.brd_name_kor}
                      </Text>
                      <br></br>
                      <Text>
                        {brandData.brd_description}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => 
                      Linking.openURL(`/category?cat_num=${brandData.brd_no}`)
                      // console.log('show material list ')
                    }
                  >
                    <View
                      style={{
                        marginTop:'25px',
                        marginLeft:'25px',
                        backgroundColor:'white',
                        width:100,
                        // flex:1,
                        height:40,
                        borderRadius:10,
                        borderColor:'black',
                        borderStyle:'solid',
                        borderWidth:'2px',
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                      }}
                    >
                      <View
                        style={{
                          backgroundColor:'transparent',
                          transform:[{
                            translateX:'0px',
                            translateY:'50px',
                          }]
                        }}
                      >

                        <Text
                          
                        >
                          자재 보기
                        </Text>
                      </View> 
                    </View>
                  </TouchableOpacity>
                </View>
                <br></br>
                
                </div>
                

                
                <div
                  style={{
                    paddingLeft:'150px',
                    paddingRight:'150px'
                  }}
                >
                  <Carousel
                    style={{
                      borderRadius:10
                    }}
                    showArrows={true} 
                    showStatus={false} 
                    showIndicators={true}
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={4500}
                    transitionTime={500}
                    emulateTouch={true}
                    stopOnHover={false}
                    //swipeScrollTolerance={1}
                    useKeyboardArrows={true}
                    //centerSlidePercentage={10}
                  >
                  {brandData.pictures_brand.map((atom)=>
                        <div
                          style={{
                            backgroundColor:'gainsboro',
                            
                          }}
                        >
                          <img src={atom.pic_url}
                            style={{
                              height:"300px",
                              width:"auto",
                              // borderRadius:10
                            }}
                          />
                        </div>
                      )}
                  </Carousel>
                </div>
                <div
                  style={{
                    textAlign:'left',
                    paddingLeft:'150px',
                    paddingRight:'150px',
                    paddingTop:'50px'
                  }}
                >
                <Text
                  style ={{
  
                    fontSize: '20px',
                    fontWeight:'700',
                    textDecorationLine:'none',
                    color:'black',
                    textAlign:'left',
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'row',
                    marginTop:'100px',
                    pointerEvents:'none',
                    backgroundColor:'transparent',
                    pointerEvents:'none',
                    
                }}
                >
                  인기상품
                </Text>
                </div>
                <div
                  style={{
                    padding:'auto'
                  }}
                >
  
              
                  <div
                    style={{
                      // columnCount:3,
                      flexwrap:'wrap',
                      justifyContent:'space-between',
                      display: 'grid',
                      gridTemplateColumns: 'auto auto auto auto auto',
                      marginLeft:'150px',
                      marginRight:'150px',
                      backgroundColor:'transparent',
                      
                    }}
                  >
                    
                    {brandData.bestproducts_brand.map((material)=>
                
                
                      <View
                        style={{
                          backgroundColor:'transparent',
                          height:'175px',
                          width:'125px',
                          // marginLeft:'auto',
                          // marginRight:'auto',
                          marginTop:'20px',
                          borderRadius:10,
                          boxShadow:'0px 0px 3px black'
                        }}
                      >
                        <Image
                          style={{
                          display:'block',
                          height:'125px',
                          width:'125px',
                          borderTopLeftRadius:10,
                          borderTopRightRadius:10,
                          zIndex:1,
                          pointerEvents:'none',
                          // transform:[{
                          //     translateX:'0px',
                          //     translateY:'0px'
                          // }]
                          }}
                          source={{
                              uri:
                                  material.mt_feature_img_url
                          }}
  
                        >
                        </Image>
                        <View
                          style ={{
                            height:'50px',
                            width:'125px',
                            fontSize: '12pt',
                            fontWeight:'500',
                            textDecorationLine:'none',
                            color:'white',
                            textAlign:'center',
                            flexDirection:'column',
                            pointerEvents:'none',
                            backgroundColor:'white',
                            pointerEvents:'none',
                            borderBottomLeftRadius:10,
                            borderBottomRightRadius:10,
                            padding:'10px'
                          }}
                        >
                          <Text
                                style ={{
                                    height:'100px',
                                    width:'120px',
                                    fontSize: '8pt',
                                    fontWeight:'500',
                                    textDecorationLine:'none',
                                    color:'black',
                                    textAlign:'left',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    // marginLeft:'1px',
                                    // marginTop:'1px',
                                    pointerEvents:'none',
                                    backgroundColor:'transparent',
                                    pointerEvents:'none',
                                    
                                    
                                }}
                            >
                            {material.mt_subname}
                            
                          </Text>
                          <Text
                            style ={{
                                // height:'65pt',
                                // width:'250px',
                                fontSize: '8pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'black',
                                textAlign:'left',
                                //alignItems:'center',
                                //justifyContent:'center',
                                //flexDirection:'row',
                                //marginTop:'45pt',
                                pointerEvents:'none',
                                backgroundColor:'transparent',
                                pointerEvents:'none',
                                
                            }}
                        >
                            {material.vd_name}
                        </Text>
                </View>
              </View>
            
              
                )}
              
              </div>
              </div>
              <div
                  style={{
                    textAlign:'left',
                    paddingLeft:'150px',
                    paddingRight:'150px',
                    paddingTop:'50px'
                  }}
                >
                
                <br></br>
                
                
                
                </div>
              </div>
              <div
                  style={{
                    height:'100px',
                    width:'100vw',
                    backgroundColor:'transparent'
                  }}
                >
  
                </div>
              </div>
            )
          }
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
                    // zIndex:1,
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
                    // zIndex:1,
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
        
        <div
                    style={{
                      position:'fixed',
                      // height:'200vh',
                      width:'100vw',
                      top:'100px',
                      left:0,
                      backgroundColor:'white',
                      // display:`${brandsDropDownDisplay}%`,
                      display:'block',
                      // overflowY:'scroll'
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
                            paddingLeft:'25px'
                          }}
                        >

                          <Text
                            style ={{
                              fontSize: '40px',
                              fontWeight:'700',
                              textDecorationLine:'none',
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
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
                          padding:'25px'
                        }}
                        >
                        <div
                        style={{
                          // columnCount:3,
                          flexwrap:'wrap',
                          display: 'grid',
                          gridTemplateColumns: 'auto auto auto',
                          overflowY: 'scroll'
                        }}
                        > 
                      
                        {brandListData.map((brand)=>
                        <TouchableOpacity
                          onPress={() => 
                            Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
                          }
                        >
                        <div
                         style={{
                           textAlign:'left',
                           padding:'5pt'
                         }}
                        >

                          <Text
                            style ={{
                              height:'65pt',
                              width:'250px',
                              fontSize: '15pt',
                              fontWeight:'700',
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
                          <br></br>
                        </div>
                        </TouchableOpacity>
                        )}
                          
                        </div>
                        </div>
                      </div> 
                  </div>
      );
    }
  }
  else{
    return (
      <div>
      <Navbar />
      <NavBarFiller/>
        <div className="MainContent">
        
            <Navbar />
            <NavBarFiller/>
            <Text>
            로딩중 ...
            </Text>
            {/* <Content/> */}
            
            
        
        </div>
      </div>
    );
}
  }
  export default Brands;