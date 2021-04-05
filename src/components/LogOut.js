import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions,textInput} from 'react-native';
import xIcon from '../assets/x.png';
const queryString = require('query-string');

function LogOut(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)

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
        // setClipBoardData(incomingData.sort(function(a,b){
        //     var textA = a.cb_name.toUpperCase()
        //     var textB = b.cb_name.toUpperCase()
        //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        // }))
        })
    .catch(err=>{
        console.log(err)
    })
    }

    
    useEffect(() => {
        Dimensions.addEventListener('change',onChange)
       

        
      },[])

   

   
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
            // paddingLeft:'65px',
            // paddingRight:'65px'
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
            width:'500px',
            height:'300px',
            paddingTop:'15px',
            // columnCount:3,
            // flexwrap:'wrap',
            // flexDirection:'column',
            // display: 'grid',
            // gridTemplateColumns: 'auto auto',
            // // padding:'100px',
            overflowY: 'scroll',
            marginLeft:'auto',
            marginRight:'auto'
            }}
            >
                
            
                <View
                style={{
                    backgroundColor:'white',
                    height:'298px',
                    width:'500px',
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
                    <div
                style={{
                height:'25px',
                width:'25px',
                backgroundColor:'transparent',
                position: 'relative',
                top:'15px',
                left:'15px',
                zIndex:102,
                transform:'translate(0px,-20px)'
                }}
            >
                <TouchableOpacity
                onPress={()=>{
                    props.toggleLogOutShow()
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
                        style={{
                            fontWeight:700,
                            transform:'translate(0px,-23px)'
                        }}
                    >마이페이지</Text>
                    </View>

                <div
                    style={{
                    display: 'block',
                    textAlign:'left',
                    padding:'15px',
                    overflowY:'scroll',
                    backgroundColor:'white',
                    height:'100%'
                }} 
                >
                    <Text>
                        filler info
                    </Text>
                   <TouchableHighlight
                        onPress={()=>{
                            props.logOutFunction()
                        }}
                    >
                        <Text>
                            로그아웃
                        </Text>
                    </TouchableHighlight>
                </div>
               
                </View>
                {/* <Text>{props.material_num}</Text> */}
            </div>
        </div>
    </div>
        );
    

}
export default LogOut