import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import Navbar from './Navbar';
import NavBarFiller from './NavBarFiller';
import ClipBoard from './ClipBoard';
import MoodClipBoard from './MoodClipBoard';
import Card from './Card';
import parse from 'html-react-parser';
import { Carousel } from 'react-responsive-carousel';
import chatIcon from '../assets/chat.png'
import boxIcon from '../assets/icnBox.png'
import clipOff from '../assets/clipOff.png'
import clipOn from '../assets/clipOn.png'
const queryString = require('query-string');
function MoodboardDetail(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)
    const [q,setQ]=React.useState(undefined)
    const [moodboardData,setMoodboardData]=React.useState(undefined)
    const [hoverOne, setHoverOne]=React.useState(null)
    const [hoverTwo, setHoverTwo]=React.useState(null)
    const [clipBoard,setClipBoard]=React.useState(false)
    const [moodClipBoard,setMoodClipBoard]=React.useState(false)
    const [moodboardClipBoard,setMoodboardClipBoard]=React.useState(false)
    const [moodBoardNumber,setMoodBoardNumber]=React.useState(null)
    const [refreshClipboard,setRefreshClipboard]=React.useState(0)
    const [materialNumber,setMaterialNumber]=React.useState(undefined)
    
    const toggleClipBoard=()=>{
        setClipBoard(!clipBoard)
    }
    const toggleMoodClipBoard=()=>{
        setMoodClipBoard(!moodClipBoard)
    }
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    const moodboardInfo=(qStr)=>{
    // console.log(qStr)
    fetch('/MoodboardDetails?'+qStr
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
        console.log('q = '+queryString.stringify(parsed))
        
     
        
      },[])
      if(moodboardData!=undefined){
        return(
            <div>
                    <div
                        style={{
                            display: clipBoard ? 'block':'none' 
                        }}
                    >
                        <ClipBoard toggleClipBoard={toggleClipBoard} material_num={materialNumber} refresh={clipBoard}/>
                    </div>
                    <div
                        style={{
                            display: moodClipBoard ? 'block':'none' 
                        }}
                    >
                        <MoodClipBoard toggleClipBoard={toggleMoodClipBoard} moodboard_num={moodBoardNumber} refresh={moodClipBoard}/>
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
                            alignItems:'center',
                            // overflowY:'hidden'
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
                                console.log(moodboardData)
                                setMoodBoardNumber(moodboardData.mb_no)
                                toggleMoodClipBoard()
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
                            
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex:1,
                                flexDirection:'column',
                                backgroundColor:'transparent',
                                width:width-800,
                                height:'400px',
                                justifyContent:'left',
                                textAlign:'left',
                                paddingLeft:'15px',
                                paddingRight:'15px',
                                overflowY:'hidden'
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
                                width:'100%',
                                // maxWidth:'250px',
                                justifyContent:'center',
                                alignItems:'center',
                                height:'40px',
                                paddingLeft:'0px',
                                position:'absolute',
                                bottom:'0px',
                                paddingRight:'160px'
                            }}
                        >
                        <TouchableOpacity
                            style={{
                                display:'block',
                                height:'40px',
                                width:width-750,
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
                        paddingRight:'160px',
                        marginTop:'15px'
                    }}
                >
                    {moodboardData.material_set.map((category,index)=>{
                        return(
                            <View
                             style={{
                                flexwrap:'wrap',
                                justifyContent:'space-between',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto auto auto',
                             }}
                            >
                            {category.map((material,innerIndex)=>{  
                                 
                                if(innerIndex==0){
                                    return(
                                        <div
                                            style={{
                                                backgroundColor:'transparent',
                                                height:"300px",
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
                                            width:"170px",
                                            position:'absolute',
                                            top:"30px",
                                            backgroundColor: 'transparent',
                                            lineHeight:'30px',
                                            marginBottom:'30px',
                                        }}
                                        >
                                            <Text
                                                style={{
                                                    fontWeight:700
                                                }}
                                            >
                                                표시된 상품
                                            </Text>
                                        </div>
                                        <div
                                            style={{
                                                position:'absolute',
                                                bottom:'15px'
                                            }}
                                        >
                                        <Card
                                            material={material}
                                            toggleClipBoard={toggleClipBoard}
                                        />
                                        </div>

                                
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
                                        <Text
                                            style={{
                                                fontWeight:700
                                            }}
                                        >
                                            유사 상품
                                        </Text>
                                        </div>

                                        
                                        
                                        <div
                                            style={{
                                                position:'absolute',
                                                bottom:'15px'
                                            }}
                                        >
                                        <Card
                                            material={material}
                                            toggleClipBoard={toggleClipBoard}
                                        />
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
                                       
                                       
                                        <div
                                            style={{
                                                position:'absolute',
                                                bottom:'15px'
                                            }}
                                        >
                                        <Card
                                            material={material}
                                            toggleClipBoard={toggleClipBoard}
                                        />
                                        </div>

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
export default MoodboardDetail