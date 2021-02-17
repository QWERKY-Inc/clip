import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import xIcon from '../assets/x.png';
const queryString = require('query-string');

function ClipBoard(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)
    const[clipBoardData,setClipBoardData]=React.useState([])
    // const[clipBoardDataDetail,setClipBoardDataDetail]=React.useState([])
    const [boardBuilding,setBoardBuilding]=React.useState(false)
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    const clipBoardInfo=(qStr)=>{
    // console.log(qStr)
    fetch('/clipboardInfo?'+qStr
    )
    .then(res=>res.json())
    .then((incomingData)=>{
        console.log(incomingData)
        setClipBoardData(incomingData)
        })
    .catch(err=>{
        console.log(err)
    })
    }
    // const clipBoardDetailInfo=(qStr)=>{
    //     // console.log(qStr)
    //     fetch('/clipboardDetailInfo?'+qStr
    //     )
    //     .then(res=>res.json())
    //     .then((incomingData)=>{
    //         console.log(incomingData)
    //         setClipBoardDataDetail([...clipBoardDataDetail,...incomingData])
    //         })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    //     }
    useEffect(() => {
        Dimensions.addEventListener('change',onChange)
        // const parsed = queryString.parse(props.location.search);
        var parsed = {}
        console.log(localStorage.login==undefined)
        if(localStorage.login!=undefined){
            var mem_no=undefined
            mem_no=JSON.parse(localStorage.login).message.split('_')[0]
            parsed.mem_no=mem_no 
        }
        else{
            parsed.mem_no=""
        }
        parsed.cb_type='INDIV'
        console.log(parsed)
        clipBoardInfo(queryString.stringify(parsed)) 
        console.log('q = '+JSON.stringify(parsed))

        
      },[])
    // useEffect(()=>{
    //     // console.log("clipboard length ")
    //     // console.log(clipBoardData.length == 0)
    //     if(clipBoardData.length!=0){
    //         for(var i=0;i<clipBoardData.length;i++){
    //             console.log(clipBoardData[i].cb_no)
    //             clipBoardDetailInfo(queryString.stringify({cb_no:clipBoardData[i].cb_no}))
    //         }
    //     }
        
    // },[clipBoardData])
    // useEffect(()=>{
    //     console.log(clipBoardDataDetail)
    // })
    // if(clipBoardData){
        return (
          <div
          style={{
          position:'fixed',
          height:'100vh',
          width:'100vw',
          top:0,
          left:0,
          backgroundColor:'rgba(0,0,0,0.5)',
          display:'block',
        //   padding:'160px',
          zIndex:101
          }}
      >
        <div
        style={{
          paddingTop:'100px',
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
          
            
            
           
          </div>

  
          <div
          style={{
            borderRadius:'10px',
            backgroundColor:'white',
            width:'100%',
            height:'300px',
            paddingTop:'15px',
            // columnCount:3,
            // flexwrap:'wrap',
            // flexDirection:'column',
            // display: 'grid',
            // gridTemplateColumns: 'auto auto',
            // // padding:'100px',
            overflowY: 'scroll',
          }}
          >
              <div
              style={{
                height:'25px',
                width:'25px',
                backgroundColor:'transparent',
                position: 'absolute',
                top:'110px',
                left:'75px',
                zIndex:102,
              }}
            >
              <TouchableOpacity
                onPress={()=>{
                  // console.log(detailedCategoryData)
                  props.toggleClipBoard()
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
            
              <View
                style={{
                    backgroundColor:'white',
                    height:'298px',
                    width:'100%',
                    borderBottomLeftRadius:'10px',
                    borderBottomRightRadius:'10px'

                }}
              >
                  <View
                    style={{
                        position:'relative',
                        top:0,
                        height:'30px',
                        width:'100%',
                        backgroundColor:'white',
                        borderTopLeftRadius:'10px',
                        borderTopRightRadius:'10px',
                        borderBottom:'1px solid rgb(221,221,221)'
                    }}
                >
                <Text
                    style={{
                        fontWeight:700,
                    }}
                >클립하기</Text>
                </View>
                <View
                    style={{
                        display: clipBoardData.length==0 ? 'block':'none',
                        textAlign:'left',
                        padding:'15px'
                    }}
                >
                  <Text
                    style={{
                        fontWeight:700,
                    }}
                  >
                      생성된 보드가 아직 없습니다.
                  </Text>
                  <br></br>
                  <Text>
                      진행하고 있는 프로젝트에 필요한 자재를 클립할 보드를 만들어보세요.
                  </Text>
                </View>
                <TouchableOpacity
                    style={{
                        position:'absolute',
                        bottom:0,
                        height:'50px',
                        width:'100%',
                        backgroundColor:'white',
                        borderBottomLeftRadius:'10px',
                        borderBottomRightRadius:'10px',
                        
                    }}
                >
                    <View
                        style={{
                            backgroundColor:'white',
                            borderTop:'1px solid rgb(221,221,221)'
                        }}
                    >
                    <Text
                        style={{
                            lineHeight:'50px',
                            fontWeight:700,
                        }}
                    >
                        새로운 보드 생성
                    </Text>
                    </View>
                </TouchableOpacity>
              </View>
                {/* <Text>{props.material_num}</Text> */}
          </div>
        </div>
    </div>
        );
    //   }
    //     else{
    //         return(
    //             <div>
    //                 <Text>
    //                 로딩중 ...
    //                 </Text>
    //             </div>
    //         )
    //     }
}
export default ClipBoard