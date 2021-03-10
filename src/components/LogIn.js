import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,Linking,Dimensions,TextInput} from 'react-native';
import xIcon from '../assets/x.png';
import eyeIcon from '../assets/eye-solid.svg'
import eyeSlashIcon from '../assets/eye-slash-solid.svg'
import './Login.css'
const queryString = require('query-string');

function LogIn(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)
    const [passwordVisible,setPasswordVisible]=React.useState(false)
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
    const togglePasswordVisible=()=>{
        setPasswordVisible(!passwordVisible)
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
            height:'475px',
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
                    props.toggleLogInShow()
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
                    height:'473px',
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
                    >로그인</Text>
                    </View>

                <div
                    style={{
                    display: 'block',
                    textAlign:'left',
                    paddingLeft:'15px',
                    paddingRight:'15px',
                    paddingTop:'15px',
                    overflowY:'scroll',
                    backgroundColor:'white',
                    height:'100%'
                }} 
                >
                    <Text>휴대폰번호</Text>
                    
                    <TextInput 
                        onChangeText={
                        text=>{
                            props.setUserPhoneNumber(text)
                            props.onPhoneNumberChange()
                        }
                        }
                        style={{
                            border:"1px solid black",
                            borderRadius:'0px',
                        }}
                        placeholder="'-' 없이 입력"
                        value={props.userPhoneNumber}
                    ></TextInput>
                    <Text>비밀번호</Text>
                    <div
                        style={{
                            border:"1px solid black",
                            borderRadius:'0px',
                            marginBottom:'15px',
                            flexDirection:'row',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-between',
                            paddingRight:'8px'
                        }}
                    >
                    <TextInput
                        onChangeText={
                        text=>{props.setPassword(text)
                        // props.onPasswordChange()
                        }
                        }
                        // onBlur={
                        //   onPasswordChange()
                        // }
                        style={{
                            

                        }}
                        placeholder="영문,숫자 포함 8-16자"
                        secureTextEntry={passwordVisible}
                        value={props.password}
                    ></TextInput>
                    <TouchableOpacity
                        onPress={()=>{
                            togglePasswordVisible()
                        }}
                    >
                        <div
                            style={{
                                display:passwordVisible?'none':'block'
                            }}
                        >
                            <img src={eyeIcon} 
                            style={{
                                height:'25px',
                                width:'25px'
                            }} />
                        </div>
                        <div
                            style={{
                                display:passwordVisible?'block':'none'
                            }}
                        >
                            <img src={eyeSlashIcon} 
                            style={{
                                height:'25px',
                                width:'25px'
                            }} />
                        </div>
                        
                        
                    </TouchableOpacity>
                    </div>
                    <TouchableOpacity>
                        <Text>
                            비밀번호를 잊으셨나요?
                        </Text>
                    </TouchableOpacity>
                   <hr></hr>
                   <TouchableOpacity
                        style={{
                            border:"1px solid black",
                            borderRadius:"10px",
                            height:'40px',
                            textAlign:'center',
                            justifyContent:'center',
                            marginBottom:'15px'
                        }}
                        onPress={()=>{
                            
                        }}
                    >
                        <Text
                            style={{
                                color:'black'
                            }}
                        >
                            이메일로 로그인
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            border:"1px solid black",
                            borderRadius:"10px",
                            height:'40px',
                            textAlign:'center',
                            justifyContent:'center',
                            marginBottom:'15px'
                        }}
                        onPress={()=>{
                            
                        }}
                    >
                        <Text
                            style={{
                                color:'black'
                            }}
                        >
                            카카오로 시작하기
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            border:"1px solid black",
                            borderRadius:"10px",
                            height:'40px',
                            textAlign:'center',
                            justifyContent:'center',
                            marginBottom:'15px'
                        }}
                        onPress={()=>{
                            
                        }}
                    >
                        <Text
                            style={{
                                color:'black'
                            }}
                        >
                            Apple 계정으로 계속하기
                        </Text>
                    </TouchableOpacity>
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'row'
                        }}
                    >
                        <Text>
                            아직 회원이 아니신가요?
                        </Text>
                        <TouchableOpacity
                        style={{
                            borderRadius:"10px",
                            height:'100%',
                            textAlign:'center',
                            justifyContent:'center',
                            marginRight:'15px'
                        }}
                        onPress={()=>{
                            
                        }}
                    >
                        <Text
                            style={{
                                marginLeft:'10px',
                                color:'black',
                                fontWeight:700,
                                marginRight:'10px'
                            }}
                        >
                            회원가입
                        </Text>
                    </TouchableOpacity>
                    </div>
                    
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
                            props.logInFunction(
                                {
                                    mem_jointype:'MOBILE',
                                    mem_password:props.password,
                                    mem_token:null,
                                    mem_mobile:props.userPhoneNumber
                                }
                            )
                        }}
                    >
                        <Text
                            style={{
                                color:'white'
                            }}
                        >
                            로그인
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
export default LogIn