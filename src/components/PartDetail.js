import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import Navbar from './Navbar';
import NavBarFiller from './NavBarFiller';
import parse from 'html-react-parser';
import chatIcon from '../assets/chat.png'
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
    // var stringToHTML=function(str){
    //     var parser=new DOMParser();
    //     var doc = parser.parseFromString(str,'text/html')
    //     return doc.body;
    // }
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
      if(materialData!=undefined){
        return(
            <div>
                <Navbar />
                <NavBarFiller/>
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