import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import Navbar from './Navbar';
import NavBarFiller from './NavBarFiller';
import ClipBoard from './ClipBoard';
import parse from 'html-react-parser';
import { Carousel } from 'react-responsive-carousel';
import chatIcon from '../assets/chat.png'
import clipOff from '../assets/clipOff.png'
import clipOn from '../assets/clipOn.png'
const queryString = require('query-string');
function PartDetail(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)
    const [q,setQ]=React.useState(undefined)
    const [materialData,setMaterialData]=React.useState(undefined)
    const [hoverOne, setHoverOne]=React.useState(null)
    const [hoverTwo, setHoverTwo]=React.useState(null)
    const [clipBoard,setClipBoard]=React.useState(false)
    const [materialNumber,setMaterialNumber]=React.useState(undefined)
    const [refreshClipboard,setRefreshClipboard]=React.useState(0)
    const toggleClipBoard=()=>{
        setClipBoard(!clipBoard)
    }
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
    // var stringToHTML=function(str){
    //     var parser=new DOMParser();
    //     var doc = parser.parseFromString(str,'text/html')
    //     return doc.body;
    // }
    useEffect(() => {
        Dimensions.addEventListener('change',onChange)
        const parsed = queryString.parse(props.location.search);
        
        console.log(localStorage.login==undefined)
        if(localStorage.login!=undefined){
            var mem_no=undefined
            mem_no=JSON.parse(localStorage.login).message.split('_')[0]
            parsed.mem_no=mem_no 
        }
        else{
            parsed.mem_no=""
        }
        console.log(parsed)
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
      if(materialData!=undefined){
        return(
            <div>
                <div
                    style={{
                        display: clipBoard ? 'block':'none' 
                    }}
                >
                    <ClipBoard toggleClipBoard={toggleClipBoard} material_num={materialNumber} refresh={clipBoard}/>
                </div>
                <Navbar />
                <NavBarFiller/>
                
                <div
                    style={{
                        backgroundColor:'transparent',
                        height:'50px',
                        width:'100%'
                    }}
                >

                </div>
                <View
                    style={{
                        textAlign:'left',
                        paddingLeft:'160px',
                        paddingRight:'160px'
                    }}
                >
                    <View
                        style={{
                            backgroundColor:'transparent',
                            height:'400px',
                            width:'100%',
                            flexDirection:'row',
                            // flex:1,
                            // justifyContent:'flex-start'
                            justifyContent:'space-between',
                            alignItems:'center'

                        }}
                    >
                        <View
                            style={{
                                backgroundColor:'transparent',
                                // position:'absolute',
                                justifyContent:'flex-start',
                                // flex:1,
                                flexDirection:'row',
                                width:'400px'
                                
                            }}
                        >
                            <Image
                            style={{
                            display:'block',
                            height:'400px',
                            width:'400px',
                            // borderTopLeftRadius:10,
                            // borderTopRightRadius:10,
                            borderRadius:'10px',
                            pointerEvents:'none',
                            marginLeft:'auto',
                            marginRight:'auto',
                            position:'relative',
                            left:'0px'
                            // transform:[{
                            //     translateX:'0px',
                            //     translateY:'0px'
                            // }]
                            }}
             
                            source={{
                                uri:
                                    materialData.mt_feature_img_url
                            }}

                            >
                            </Image>
                            <div
                            style={{
                                backgroundColor:'white',
                                width:'65px',
                                height:'20px',
                                position:'absolute',
                                zIndex:100,
                                top:'15px',
                                left:'15px',
                                borderRadius:'15px',
                                // display:hover==index ? 'block':'none'
                            }}
                            onPress={()=>{  
                                // console.log('pressed clip ' + result.mt_no)
                            }}
                        >
                            <Text
                                style={{
                                    transform:'translate(2px,-2px)',
                                    position:'absolute',
                                    top:'4px',
                                    left:'6px',
                                    fontWeight:50,
                                    fontSize:'15px',
                                    color:materialData.mt_budget<1 ? 'rgb(219,219,219)':'black' 
                                }}
                            >₩</Text>
                           <Text
                                style={{
                                    transform:'translate(2px,-2px)',
                                    position:'absolute',
                                    top:'4px',
                                    left:'16px',
                                    fontWeight:50,
                                    fontSize:'15px',
                                    color:materialData.mt_budget<2 ? 'rgb(219,219,219)':'black'
                                }}
                            >₩</Text>
                            <Text
                                style={{
                                    transform:'translate(2px,-2px)',
                                    position:'absolute',
                                    top:'4px',
                                    left:'26px',
                                    fontWeight:50,
                                    fontSize:'15px',
                                    color:materialData.mt_budget<3 ? 'rgb(219,219,219)':'black'
                                }}
                            >₩</Text>
                            <Text
                                style={{
                                    transform:'translate(2px,-2px)',
                                    position:'absolute',
                                    top:'4px',
                                    left:'36px',
                                    fontWeight:50,
                                    fontSize:'15px',
                                    color:materialData.mt_budget<4 ? 'rgb(219,219,219)':'black'
                                }}
                            >₩</Text>
                            <Text
                                style={{
                                    transform:'translate(2px,-2px)',
                                    position:'absolute',
                                    top:'4px',
                                    left:'46px',
                                    fontWeight:50,
                                    fontSize:'15px',
                                    color:materialData.mt_budget<5 ? 'rgb(219,219,219)':'black'
                                }}
                            >₩</Text>
                        </div>
                        <div
                            style={{
                                backgroundColor:'transparent',
                                position:'absolute',
                                right:'15px',
                                top:'19px'
                            }}
                        >
                        <TouchableOpacity
                            onPress={()=>{  
                                console.log(materialData.mt_no)
                                setMaterialNumber(materialData.mt_no)
                                toggleClipBoard()
                              //   console.log('pressed clip ' + brandData.bestproducts_brand[index].mt_no)
                            }}
                        >
                        <Image
                                style={{
                                display:'block',
                                height:'40px',
                                width:'40px',
                                borderTopLeftRadius:10,
                                borderTopRightRadius:10,
                                zIndex:1,
                                pointerEvents:'none',
                                // display:materialData.is_clipped==false ? 'block':'none'
                                // transform:[{
                                //     translateX:'0px',
                                //     translateY:'0px'
                                // }]
                                }}
                                source={clipOff}

                                >
                                
                            </Image>
                            {/* <Image
                                style={{
                                display:'block',
                                height:'40px',
                                width:'40px',
                                borderTopLeftRadius:10,
                                borderTopRightRadius:10,
                                zIndex:1,
                                pointerEvents:'none',
                                display:materialData.is_clipped==true ? 'block':'none'
                                // transform:[{
                                //     translateX:'0px',
                                //     translateY:'0px'
                                // }]
                                }}
                                source={clipOn}

                                >
                                
                            </Image> */}
                            </TouchableOpacity>
                        </div>
                        </View>
                        <View
                            style={{
                                flex:1,
                                flexDirection:'column',
                                backgroundColor:'transparent',
                                width:width-'800px',
                                height:'400px',
                                justifyContent:'left',
                                textAlign:'left',
                                paddingLeft:'15px',
                                paddingRight:'15px',
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight:700,
                                    fontSize:'24px'
                                }}
                            >
                                {materialData.mt_name}
                            </Text>
                            <Text
                                style={{
                                    
                                    fontWeight:700,
                                    fontSize:'24px',
                                    marginBottom:'13px'
                                }}
                            >
                                {materialData.mt_subname}
                            </Text>
                            <div
                                style={{
                                    // flex:1,
                                    flextDirection:'row',
                                    backgroundColor:'transparent'
                                }}
                            >
                               
                                
                                <View
                                style={{
                                    height:'24px',
                                    width:'100%',
                                    backgroundColor:'transparent',
                                    marginBottom:'10px'                                }}
                                    
                                >
                                    <Image
                                    style={{
                                        height:'24px',
                                        width:'24px',
                                        borderRadius:'12px',
                                        position:'absolute'
                                    }}
                                    source={{
                                        uri:
                                            materialData.brd_logo_img_url
                                    }} 
                                ></Image>

                                    <div
                                    style={{
                                        height:'24px',
                                        width:'24px',
                                        backgroundColor:'transparent'
                                    }}
                                        
                                    >

                                    </div>
                                    <div
                                        style={{
                                            transform:'translate(24px,-2px)',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight:700,
                                                fontSize:'18px',
                                            }}
                                        >
                                            &nbsp;
                                            {materialData.brd_name_eng}
                                        </Text>
                                        <Text 
                                            style={{
                                                fontWeight:700,
                                                fontSize:'18px',
                                            }}
                                        >
                                            &nbsp;
                                            {materialData.brd_name_kor}
                                        </Text>
                                    </div>
                                </View>
                                
                            </div>
                            <div>
                                <Text
                                    style={{
                                        fontWeight:700,
                                        fontSize:'15px',
                                        marginBottom:'15px'
                                    }}
                                >
                                    자재 카테고리:&nbsp;
                                </Text>
                                <Text>
                                    {materialData.mt_category}
                                </Text>
                            </div>
                            <div>
                                <Text
                                    style={{
                                        fontWeight:700,
                                        fontSize:'15px',
                                        marginBottom:'15px'
                                    }}
                                >
                                     콜렉션:&nbsp;
                                </Text>
                                <Text>
                                    {materialData.mt_collection}
                                </Text>
                            </div>
                            <div>
                                <Text
                                    style={{
                                        fontWeight:700,
                                        fontSize:'15px',
                                        marginBottom:'15px'
                                    }}
                                >
                                     SKU:&nbsp;
                                </Text>
                                <Text>
                                    {materialData.mt_sku}
                                </Text>
                            </div>
                            <div>
                                <Text
                                    style={{
                                        fontWeight:700,
                                        fontSize:'15px',
                                        marginBottom:'15px'
                                    }}
                                >
                                     샘플 사이즈:&nbsp;
                                </Text>
                                <Text>
                                    {materialData.mt_sample_width}&nbsp;mm&nbsp;x&nbsp;{materialData.mt_sample_height}&nbsp;mm
                                </Text>
                            </div>
                            <View
                                style={{
                                    position:'absolute',
                                    bottom:0,
                                    backgroundColor:'transparent',
                                    height:'40px',
                                    width:'100%',
                                    flexDirection:'row'
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor:'transparent',
                                        height:'40px',
                                        width:'40px'
                                    }}
                                >
                                    <Image
                                    style={{
                                    display:'block',
                                    height:'40px',
                                    width:'40px',
                                    // borderTopLeftRadius:10,
                                    // borderTopRightRadius:10,
                                    zIndex:1,
                                    pointerEvents:'none'
                                    // transform:[{
                                    //     translateX:'0px',
                                    //     translateY:'0px'
                                    // }]
                                    }}
                                    source={chatIcon}

                                    >
                                    
                                    </Image>
                                </TouchableOpacity>
                                <div
                                    style={{
                                        backgroundColor:"transparent",
                                        width:'250px',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        height:'40px',
                                        paddingLeft:'15px',
                                    }}
                                >
                                <TouchableOpacity
                                    style={{
                                        display:'block',
                                        height:'40px',
                                        width:'100%',
                                        backgroundColor:'rgb(255,123,88)',
                                        color:'white',
                                        borderRadius:'10px',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        textAlign:'center',
                                        verticalAlign:'middle',
                                        lineHeight:'40px',
                                        

                                    }}
                                >
                  
                                        <Text
                                            style={{
                                                color:'white',
                                                
                                            }}
                                        >
                                            장바구니에 샘플 담기
                                        </Text>
                                    
                                </TouchableOpacity>
                                </div>
                            </View>
                        </View>
                        
                    </View>
                    {parse(materialData.mt_description)}
                    <View>
                        <Text
                        style={{
                                    
                            fontWeight:700,
                            fontSize:'24px',
                            marginBottom:'12px',
                            marginTop:'12px'
                            
                        }}
                        >
                            {materialData.brd_name_eng}
                        </Text>
                        <Text
                        style={{
                                    
                            fontWeight:700,
                            fontSize:'24px',
                            marginBottom:'24px'
                            
                        }}
                        >
                            {materialData.brd_name_kor}
                        </Text>
                        <Text
                        style={{
                                    
                            fontWeight:400,
                            fontSize:'12px',
                            marginBottom:'12px',
                            
                        }}
                        >
                            {materialData.brd_description}
                        </Text>
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
                            {materialData.pictures_brand.map((atom)=>
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
                        <Text
                            style={{
                                fontSize: '15px',
                                fontWeight:'700',
                                marginTop:'25px',
                                marginBottom:'15px'
                            }}
                        >
                            {materialData.brd_name_kor}&nbsp;다른 제품보기 
                        </Text>

                        <View
                            style={{
                                flexwrap:'wrap',
                                justifyContent:'space-between',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto auto auto auto',
                            }}
                        >
                        {materialData.samebrand_list.map((material,index)=>
                
                
                <View
                  style={{
                    backgroundColor:'transparent',
                    height:'200px',
                    width:'125px',
                    // marginLeft:'auto',
                    // marginRight:'auto',
                    marginTop:'20px',
                    borderRadius:10,
                    boxShadow:'0px 0px 3px black'
                  }}
                  onMouseEnter={()=>{
                    console.log(materialData.samebrand_list[index])
                    // var mem_no=JSON.parse(localStorage.login).message.split('_')
                    // console.log(mem_no)
                    setHoverOne(index)
                    // console.log(brandData)
                  }
                  }
                  onMouseLeave={()=>{
                      setHoverOne(null)
                      console.log('exited '+index)
                  }} 
                >
                <div
                      style={{
                          backgroundColor:'white',
                          width:'55px',
                          height:'12px',
                          position:'absolute',
                          zIndex:100,
                          top:'6px',
                          left:'6px',
                          borderRadius:'6px',
                          display:hoverOne==index ? 'block':'none'
                      }}
                      onPress={()=>{  
                          console.log('pressed clip ')
                      }}
                  >
                      <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'2px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samebrand_list[index].mt_budget<1 ? 'rgb(219,219,219)':'black' 
                          }}
                      >₩</Text>
                     <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'12px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samebrand_list[index].mt_budget<2 ? 'rgb(219,219,219)':'black'
                          }}
                      >₩</Text>
                      <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'22px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samebrand_list[index].mt_budget<3 ? 'rgb(219,219,219)':'black'
                          }}
                      >₩</Text>
                      <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'32px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samebrand_list[index].mt_budget<4 ? 'rgb(219,219,219)':'black'
                          }}
                      >₩</Text>
                      <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'42px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samebrand_list[index].mt_budget<5 ? 'rgb(219,219,219)':'black'
                          }}
                      >₩</Text>
                  </div>
                  <TouchableOpacity
                      style={{
                          backgroundColor:'transparent',
                          width:'20px',
                          height:'20px',
                          position:'absolute',
                          zIndex:100,
                          top:'6px',
                          right:'6px',
                          display:hoverOne==index ? 'block':'none'
                      }}
                      onPress={()=>{  
                          setMaterialNumber(materialData.samebrand_list[index].mt_no)
                          toggleClipBoard()
                        //   console.log('pressed clip ' + brandData.bestproducts_brand[index].mt_no)
                      }}
                  >   
                      <Image
                                style={{
                                display:'block',
                                height:'20px',
                                width:'20px',
                                borderTopLeftRadius:10,
                                borderTopRightRadius:10,
                                zIndex:1,
                                pointerEvents:'none',
                                display:materialData.samebrand_list[index].is_clipped==false ? 'block':'none'
                                // transform:[{
                                //     translateX:'0px',
                                //     translateY:'0px'
                                // }]
                                }}
                                source={clipOff}

                                >
                                
                            </Image>
                            <Image
                                style={{
                                display:'block',
                                height:'20px',
                                width:'20px',
                                borderTopLeftRadius:10,
                                borderTopRightRadius:10,
                                zIndex:1,
                                pointerEvents:'none',
                                display:materialData.samebrand_list[index].is_clipped==true ? 'block':'none'
                                // transform:[{
                                //     translateX:'0px',
                                //     translateY:'0px'
                                // }]
                                }}
                                source={clipOn}

                                >
                                
                            </Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{
                        console.log(materialData.samebrand_list[index].mt_no)
                        Linking.openURL('/partDetail?mt_no='+materialData.samebrand_list[index].mt_no)
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
                    filter:hoverOne==index ? 'brightness(90%)':'brightness(100%)'
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
                      height:'75px',
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
                          height:'100px',
                          width:'120px',
                          fontSize: '8pt',
                          fontWeight:'500',
                          textDecorationLine:'none',
                          color:'rgb(85,85,85)',
                          textAlign:'left',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          // marginLeft:'1px',
                          // marginTop:'1px',
                          pointerEvents:'none',
                          backgroundColor:'transparent',
                          pointerEvents:'none',
                          whiteSpace:'nowrap',
                          textOverflow: 'ellipsis',
                          overflow:'hidden'
                      }}
                  >
                  {material.mt_name}
                  
              </Text>
                    
          </View>
          </TouchableOpacity>
        </View>
      
        
          )}
                        </View>
                        <Text
                            style={{
                                fontSize: '15px',
                                fontWeight:'700',
                                marginTop:'25px',
                                marginBottom:'15px'
                            }}
                        >
                            {materialData.mt_first_large_category}&nbsp;카테고리:유사상품
                        </Text>
                        <View
                            style={{
                                flexwrap:'wrap',
                                justifyContent:'space-between',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto auto auto auto',
                            }}
                        >
                        {materialData.samecategory_list.map((material,index)=>
                
                
                <View
                  style={{
                    backgroundColor:'transparent',
                    height:'200px',
                    width:'125px',
                    // marginLeft:'auto',
                    // marginRight:'auto',
                    marginTop:'20px',
                    borderRadius:10,
                    boxShadow:'0px 0px 3px black'
                  }}
                  onMouseEnter={()=>{
                    console.log('entered ' + index)
                    // var mem_no=JSON.parse(localStorage.login).message.split('_')
                    // console.log(mem_no)
                    setHoverTwo(index)
                    console.log(materialData.samecategory_list[index])
                  }
                  }
                  onMouseLeave={()=>{
                      setHoverTwo(null)
                      console.log('exited '+index)
                  }} 
                >
                <div
                      style={{
                          backgroundColor:'white',
                          width:'55px',
                          height:'12px',
                          position:'absolute',
                          zIndex:100,
                          top:'6px',
                          left:'6px',
                          borderRadius:'6px',
                          display:hoverTwo==index ? 'block':'none'
                      }}
                      onPress={()=>{  
                          console.log('pressed clip ')
                      }}
                  >
                      <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'2px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samecategory_list[index].mt_budget<1 ? 'rgb(219,219,219)':'black' 
                          }}
                      >₩</Text>
                     <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'12px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samecategory_list[index].mt_budget<2 ? 'rgb(219,219,219)':'black'
                          }}
                      >₩</Text>
                      <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'22px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samecategory_list[index].mt_budget<3 ? 'rgb(219,219,219)':'black'
                          }}
                      >₩</Text>
                      <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'32px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samecategory_list[index].mt_budget<4 ? 'rgb(219,219,219)':'black'
                          }}
                      >₩</Text>
                      <Text
                          style={{
                              transform:'translate(2px,-2px)',
                              position:'absolute',
                              top:'1px',
                              left:'42px',
                              fontWeight:50,
                              fontSize:'12px',
                              color:materialData.samecategory_list[index].mt_budget<5 ? 'rgb(219,219,219)':'black'
                          }}
                      >₩</Text>
                  </div>
                  <TouchableOpacity
                      style={{
                          backgroundColor:'transparent',
                          width:'20px',
                          height:'20px',
                          position:'absolute',
                          zIndex:100,
                          top:'6px',
                          right:'6px',
                          display:hoverTwo==index ? 'block':'none'
                      }}
                      onPress={()=>{  
                        setMaterialNumber(materialData.samecategory_list[index].mt_no)
                        toggleClipBoard()
                      //   console.log('pressed clip ' + brandData.bestproducts_brand[index].mt_no)
                    }}
                  >   
                      <Image
                                style={{
                                display:'block',
                                height:'20px',
                                width:'20px',
                                borderTopLeftRadius:10,
                                borderTopRightRadius:10,
                                zIndex:1,
                                pointerEvents:'none',
                                display:materialData.samecategory_list[index].is_clipped==false ? 'block':'none'
                                // transform:[{
                                //     translateX:'0px',
                                //     translateY:'0px'
                                // }]
                                }}
                                source={clipOff}

                                >
                                
                            </Image>
                            <Image
                                style={{
                                display:'block',
                                height:'20px',
                                width:'20px',
                                borderTopLeftRadius:10,
                                borderTopRightRadius:10,
                                zIndex:1,
                                pointerEvents:'none',
                                display:materialData.samecategory_list[index].is_clipped==true ? 'block':'none'
                                // transform:[{
                                //     translateX:'0px',
                                //     translateY:'0px'
                                // }]
                                }}
                                source={clipOn}

                                >
                                
                            </Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{
                        console.log(materialData.samecategory_list[index].mt_no)
                        Linking.openURL('/partDetail?mt_no='+materialData.samecategory_list[index].mt_no)
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
                    filter:hoverTwo==index ? 'brightness(90%)':'brightness(100%)'
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
                      height:'75px',
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
                          height:'100px',
                          width:'120px',
                          fontSize: '8pt',
                          fontWeight:'500',
                          textDecorationLine:'none',
                          color:'rgb(85,85,85)',
                          textAlign:'left',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          // marginLeft:'1px',
                          // marginTop:'1px',
                          pointerEvents:'none',
                          backgroundColor:'transparent',
                          pointerEvents:'none',
                          whiteSpace:'nowrap',
                          textOverflow: 'ellipsis',
                          overflow:'hidden'
                      }}
                  >
                  {material.mt_name}
                  
              </Text>
                    
          </View>
          </TouchableOpacity>
        </View>
      
        
          )}
          
                        </View>
                            <div
                                style={{
                                    backgroundColor:'transparent',
                                    height:'50px',
                                    width:'100%'
                                }}
                            >

                            </div>
                    </View>
                </View>
            </div>
          )
      }
      else{
          return(
            <div>
                <Navbar />
                <NavBarFiller/>
            </div>
          )
      }
      
}
export default PartDetail