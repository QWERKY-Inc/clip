import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,Linking,Dimensions,TextInput} from 'react-native';
import xIcon from '../assets/x.png';
import './Login.css'
const queryString = require('query-string');

function RegistrationSuccess(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)

    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
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
            zIndex:103
            }}
        >
        <div
        style={{
            paddingTop:'100px',
            paddingLeft:'100px',
            paddingRight:'100px'
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
                left:'110px',
                zIndex:102,
                }}
            >
                <TouchableOpacity
                onPress={()=>{
                    props.toggleEmailAlreadyExistsScreen()
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
                    >등록된 이메일</Text>
                    </View>

                <div
                    style={{
                    display: 'flex',
                    textAlign:'left',
                    padding:'15px',
                    overflowY:'scroll',
                    backgroundColor:'white',
                    height:'100%',
                    flexDirection:'column',
                }} 
                >
                    <Text>이미 등록된 이메일 주소 입니다. 등록된 이메일로 로그인 해주세요.</Text>
                    
                </div>
                <div
                    style={{
                        
                        borderTop:'1px solid rgb(221,221,221)',
                        paddingLeft:'15px',
                        paddingRight:'15px',
                        paddingBottom:'15px'
                    }}
                >
                   <TouchableOpacity
                        style={{
                            marginTop:'15px',
                            backgroundColor:'rgb(255,123,88)',
                            borderRadius:"10px",
                            height:'40px',
                            textAlign:'center',
                            justifyContent:'center'
                        }}
                        onPress={()=>{
                            props.toggleEmailAlreadyExistsScreen()
                        }}
                    >
                        <Text
                            style={{
                                color:'white'
                            }}
                        >
                            확인
                        </Text>
                    </TouchableOpacity>
                    </div>
                </View>
                {/* <Text>{props.material_num}</Text> */}
            </div>
        </div>
    </div>
        );
    

}
export default RegistrationSuccess