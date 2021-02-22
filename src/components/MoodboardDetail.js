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
    const [moodboardData,setMoodboardData]=React.useState(undefined)
    const [hoverOne, setHoverOne]=React.useState(null)
    const [hoverTwo, setHoverTwo]=React.useState(null)
    const [clipBoard,setClipBoard]=React.useState(false)
    const [moodboardNumber,setMoodboardNumber]=React.useState(undefined)
    const [refreshClipboard,setRefreshClipboard]=React.useState(0)
    const [materialNumber,setMaterialNumber]=React.useState(undefined)
    const toggleClipBoard=()=>{
        setClipBoard(!clipBoard)
    }
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    const moodboardInfo=(qStr)=>{
    // console.log(qStr)
    fetch('/MoodboardDetail?'+qStr
    )
    .then(res=>res.json())
    .then((incomingData)=>{
        console.log(incomingData)
        setMoodboardData(incomingData)
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
        moodboardInfo(queryString.stringify(parsed)) 
        console.log('q = '+JSON.stringify(parsed))
        
     
        
      },[])
      if(moodboardData!=undefined){
        return(
            <div>
                <div
                        style={{
                            display: clipBoard ? 'block':'none' 
                        }}
                    >
                        {/* <ClipBoard toggleClipBoard={toggleClipBoard} moodboard_num={moodboardNumber} refresh={clipBoard}/> */}
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
                                    moodboardData.mb_img_url
                            }}

                            >
                            </Image>
                            <TouchableOpacity
                            onPress={()=>{  
                                console.log(moodboardData.mb_no)
                                setMoodboardNumber(moodboardData.mb_no)
                                toggleClipBoard()
                              //   console.log('pressed clip ' + brandData.bestproducts_brand[index].mt_no)
                            }}
                        >
                        <Image
                                style={{
                                position:'absolute',
                                height:'40px',
                                width:'40px',
                                borderTopLeftRadius:10,
                                borderTopRightRadius:10,
                                zIndex:1,
                                right:'15px',
                                top:'15px'
                                // pointerEvents:'none',
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
                                {moodboardData.mb_name}
                            </Text>
                            <Text
                                style={{
                                    
                                    fontWeight:500,
                                    fontSize:'15px',
                                    marginBottom:'13px'
                                }}
                            >
                                {moodboardData.mb_description}
                            </Text>
                            <div
                            style={{
                                backgroundColor:"transparent",
                                width:'250px',
                                justifyContent:'center',
                                alignItems:'center',
                                height:'40px',
                                paddingLeft:'0px',
                                position:'absolute',
                                bottom:'0px'
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
                <View
                    style={{
                        textAlign:'left',
                        paddingLeft:'160px',
                        paddingRight:'160px'
                    }}
                >
                    {moodboardData.material_set.map((category,index)=>{
                        return(
                            <View
                             style={{
                                flexwrap:'wrap',
                                justifyContent:'space-between',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto auto auto auto',
                             }}
                            >
                            {category.map((material,innerIndex)=>{  
                                 
                                if(innerIndex==0){
                                    return(
                                        <div
                                            style={{
                                                backgroundColor:'transparent',
                                                height:"270px",
                                                width:'125px',
                                                marginBottom:'15px'
                                            }}
                                        >
                                        
                                        <Text
                                        style={{
                                                    
                                            fontWeight:700,
                                            fontSize:'24px',
                                            marginBottom:'12px',
                                            marginTop:'12px',
                                            color:'black'
                                            
                                        }}
                                        >
                                            {material.mt_first_large_category}
                                        </Text>
                                        <div
                                        style={{
                                            height:'30px',
                                            width:"125px",
                                            position:'absolute',
                                            top:"30px",
                                            backgroundColor: 'transparent',
                                            lineHeight:'30px'
                                        }}
                                        >
                                            <Text>
                                                표시된 상품
                                            </Text>
                                        </div>
                                        {/* <div
                                        style={{
                                            height:'30px',
                                            position:'absolute',
                                            bottom:0,
                                            backgroundColor: 'yellow'
                                        }}
                                    > */}
                                        {/* <Image
                                        style={{
                                        position:'absolute',
                                        bottom:"70px",
                                        display:'block',
                                        height:'125px',
                                        width:'125px',
                                        // borderTopLeftRadius:10,
                                        // borderTopRightRadius:10,
                                        borderRadius:'10px',
                                        pointerEvents:'none',
                                        // marginLeft:'auto',
                                        // marginRight:'auto',
                                        // position:'relative',
                                        // left:'0px'
                                        }}
                        
                                        source={{
                                            uri:
                                                material.mt_feature_img_url
                                        }}
            
                                        >
                                        </Image> */}
                                         <div
                                            style={{
                                                position:'absolute',
                                                bottom:'15px'
                                            }}
                                        >
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
                    // setHoverTwo(index)
                    // console.log(materialData.samecategory_list[index])
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<1 ? 'rgb(219,219,219)':'black' 
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<2 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<3 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<4 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<5 ? 'rgb(219,219,219)':'black'
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
                        setMaterialNumber(moodboardData.material_set[index][innerIndex].mt_no)
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
                                // display:materialData.samecategory_list[index].is_clipped==false ? 'block':'none'
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
                                
                            </Image> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{
                        // console.log(materialData.samecategory_list[index].mt_no)
                        Linking.openURL('/partDetail?mt_no='+moodboardData.material_set[index][innerIndex].mt_no)
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
                    // filter:hoverTwo==index ? 'brightness(90%)':'brightness(100%)'
                    // transform:[{
                    //     translateX:'0px',
                    //     translateY:'0px'
                    // }]
                    }}
                    source={{
                        uri:
                            moodboardData.material_set[index][innerIndex].mt_feature_img_url
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
                      {moodboardData.material_set[index][innerIndex].vd_name}
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
                      {moodboardData.material_set[index][innerIndex].mt_subname}
                      
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
                  {moodboardData.material_set[index][innerIndex].mt_name}
                  
              </Text>
                    
          </View>
          </TouchableOpacity>
        </View>
      
                                        </div>
                                       
                                        {/* </div> */}
                                        </div>
                                    )
                                }
                                else if(innerIndex==1){
                                    return(
                                        <div
                                            style={{
                                                backgroundColor:'transparent',
                                                height:"270px",
                                                width:'125px',
                                                marginBottom:'15px'
                                            }}
                                        >
                                        
                                        <Text
                                        style={{
                                                    
                                            fontWeight:700,
                                            fontSize:'24px',
                                            marginBottom:'12px',
                                            marginTop:'12px',
                                            color:'black'
                                            
                                        }}
                                        >
                                            {material.mt_first_large_category}
                                        </Text>
                                        <div
                                        style={{
                                            height:'30px',
                                            width:'125px',
                                            position:'absolute',
                                            top:"30px",
                                            backgroundColor: 'transparent',
                                            lineHeight:'30px'
                                        }}
                                        >
                                        <Text>
                                            유사 상품
                                        </Text>
                                        </div>
                                        {/* <div
                                        style={{
                                            height:'30px',
                                            position:'absolute',
                                            bottom:0,
                                            backgroundColor: 'yellow'
                                        }}
                                    > */}
                                        {/* <Image
                                        style={{
                                        position:'absolute',
                                        bottom:"70px",
                                        display:'block',
                                        height:'125px',
                                        width:'125px',
                                        // borderTopLeftRadius:10,
                                        // borderTopRightRadius:10,
                                        borderRadius:'10px',
                                        pointerEvents:'none',
                                        // marginLeft:'auto',
                                        // marginRight:'auto',
                                        // position:'relative',
                                        // left:'0px'
                                        }}
                        
                                        source={{
                                            uri:
                                                material.mt_feature_img_url
                                        }}
            
                                        >
                                        </Image> */}
                                        {/* </div> */}
                                        <div
                                            style={{
                                                position:'absolute',
                                                bottom:'15px'
                                            }}
                                        >
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
                    // setHoverTwo(index)
                    // console.log(materialData.samecategory_list[index])
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<1 ? 'rgb(219,219,219)':'black' 
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<2 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<3 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<4 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<5 ? 'rgb(219,219,219)':'black'
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
                        setMaterialNumber(moodboardData.material_set[index][innerIndex].mt_no)
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
                                // display:materialData.samecategory_list[index].is_clipped==false ? 'block':'none'
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
                                
                            </Image> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{
                        // console.log(materialData.samecategory_list[index].mt_no)
                        Linking.openURL('/partDetail?mt_no='+moodboardData.material_set[index][innerIndex].mt_no)
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
                    // filter:hoverTwo==index ? 'brightness(90%)':'brightness(100%)'
                    // transform:[{
                    //     translateX:'0px',
                    //     translateY:'0px'
                    // }]
                    }}
                    source={{
                        uri:
                            moodboardData.material_set[index][innerIndex].mt_feature_img_url
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
                      {moodboardData.material_set[index][innerIndex].vd_name}
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
                      {moodboardData.material_set[index][innerIndex].mt_subname}
                      
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
                  {moodboardData.material_set[index][innerIndex].mt_name}
                  
              </Text>
                    
          </View>
          </TouchableOpacity>
        </View>
      
                                        </div>
                                       
                                        </div>
                                    )
                                }
                                else{
                                    return(
                                        <div
                                            style={{
                                                backgroundColor:'transparent',
                                                height:"270px",
                                                width:'125px',
                                                marginBottom:'15px'
                                            }}
                                        >
                                        
                                        {/* <Text
                                        style={{
                                                    
                                            fontWeight:700,
                                            fontSize:'24px',
                                            marginBottom:'12px',
                                            marginTop:'12px',
                                            color:'black'
                                            
                                        }}
                                        >
                                            {material.mt_first_large_category}
                                        </Text> */}
                                        <div
                                        style={{
                                            height:'30px',
                                            width:'30px',
                                            position:'absolute',
                                            top:"30px",
                                            backgroundColor: 'transparent'
                                        }}
                                        >

                                        </div>
                                        {/* <div
                                        style={{
                                            height:'30px',
                                            position:'absolute',
                                            bottom:0,
                                            backgroundColor: 'yellow'
                                        }}
                                    > */}
                                        {/* <Image
                                        style={{
                                        position:'absolute',
                                        bottom:"70px",
                                        display:'block',
                                        height:'125px',
                                        width:'125px',
                                        // borderTopLeftRadius:10,
                                        // borderTopRightRadius:10,
                                        borderRadius:'10px',
                                        pointerEvents:'none',
                                        // marginLeft:'auto',
                                        // marginRight:'auto',
                                        // position:'relative',
                                        // left:'0px'
                                        }}
                        
                                        source={{
                                            uri:
                                                material.mt_feature_img_url
                                        }}
            
                                        >
                                        </Image> */}
                                        <div
                                            style={{
                                                position:'absolute',
                                                bottom:'15px'
                                            }}
                                        >
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
                    // setHoverTwo(index)
                    // console.log(materialData.samecategory_list[index])
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<1 ? 'rgb(219,219,219)':'black' 
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<2 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<3 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<4 ? 'rgb(219,219,219)':'black'
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
                              color:moodboardData.material_set[index][innerIndex].mt_budget<5 ? 'rgb(219,219,219)':'black'
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
                        setMaterialNumber(moodboardData.material_set[index][innerIndex].mt_no)
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
                                // display:materialData.samecategory_list[index].is_clipped==false ? 'block':'none'
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
                                
                            </Image> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{
                        // console.log(materialData.samecategory_list[index].mt_no)
                        Linking.openURL('/partDetail?mt_no='+moodboardData.material_set[index][innerIndex].mt_no)
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
                    // filter:hoverTwo==index ? 'brightness(90%)':'brightness(100%)'
                    // transform:[{
                    //     translateX:'0px',
                    //     translateY:'0px'
                    // }]
                    }}
                    source={{
                        uri:
                            moodboardData.material_set[index][innerIndex].mt_feature_img_url
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
                      {moodboardData.material_set[index][innerIndex].vd_name}
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
                      {moodboardData.material_set[index][innerIndex].mt_subname}
                      
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
                  {moodboardData.material_set[index][innerIndex].mt_name}
                  
              </Text>
                    
          </View>
          </TouchableOpacity>
        </View>
      
                                        </div>
                                        {/* </div> */}
                                        </div>
                                    )
                                }

                                console.log(innerIndex)
                                
                            })}
                            </View>
                        )  
                    })}
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