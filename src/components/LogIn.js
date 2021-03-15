import React,{useEffect} from 'react';
import KakaoAuth from './KakaoAuth';
import NoExistMember from './NoExistMember';
import SentMessage from './SentMessage';
import {TouchableOpacity,Text,View,Modal,Image,Linking,Dimensions,TextInput} from 'react-native';
import xIcon from '../assets/x.png';
import eyeIcon from '../assets/eye-solid.svg'
import eyeSlashIcon from '../assets/eye-slash-solid.svg'
import './Login.css'
const queryString = require('query-string');

function LogIn(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)
    const [passwordVisible,setPasswordVisible]=React.useState(true)
    const [emailLogIn,setEmailLogIn]=React.useState(false)
    const [findPassWord, setFindPassWord]=React.useState(false)
    const [passwordPopUp,setPasswordPopUp]=React.useState('none')
    const [noExistMemberShow,setNoExistMemberShow]=React.useState(false)
    const [sentMessageShow,setSentMessageShow]=React.useState(false)
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    const findPasswordFunction=(obj)=>{
    // console.log(qStr)
    fetch('/FindPassword?'+queryString.stringify(obj)
    )
    .then(res=>res.json())
    .then((incomingData)=>{
        console.log(incomingData)
        if(incomingData.result=="FAILURE"){
            setPasswordPopUp("FAILURE")
            setNoExistMemberShow(true)
        }
        else if(incomingData.result=="SUCCESS"){
            setPasswordPopUp('SUCCESS')
            setSentMessageShow(true)
            setFindPassWord(false)
        }
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
    const toggleEmailLogIn=()=>{
        setEmailLogIn(!emailLogIn)
    }
    const toggleNoExistMemberShow=()=>{
        setNoExistMemberShow(!noExistMemberShow)
    }
    const toggleSentMessageShow=()=>{
        setSentMessageShow(!sentMessageShow)
    }
    useEffect(() => {
        Dimensions.addEventListener('change',onChange)
       

        
      },[])

    if(findPassWord){
        return(
            <div>
            <div
              style={{
                  display: noExistMemberShow ? 'block':'none' 
              }}
            >
              <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
            </div>
            <div
              style={{
                  display: sentMessageShow ? 'block':'none' 
              }}
            >
              <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
            </div>
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
                height:'25px',
                width:'25px',
                backgroundColor:'transparent',
                position: 'absolute',
                top:'110px',
                left:'75px',
                zIndex:102,
                }}
            >
                {/* <TouchableOpacity
                onPress={()=>{
                    setFindPassWord(false)
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

                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={()=>{
                        //console.log('close project list')
                        setFindPassWord(false)
                    }}
                >
                    <View
                        style={{
                            backgroundColor:'transparent',
                            height:'25px',
                            width:'100%',
                            borderRadius:'10px',
                            // border:'2px solid black',
                            textAlign:'left',
                            justifyContent:'center',
                            lineHeight:'25px',
                            padding:'15px',
                            alignItems:'center',
                            transform:'translate(0px,-5px)'
                        }}
                    >
                    
                    <Text
                        style={{
                            // position:'fixed',
                            // right:'100px'
                        }}
                    >
                        &lt;
                    </Text>
                    </View>
                </TouchableOpacity>
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
                    >비밀번호 찾기</Text>
                    </View>
                    <View
                        style={{
                            textAlign:'left',
                            padding:'15px'
                        }}
                    >
                        <Text
                            style={{
                                fontWeight:700,
                                fontSize:'15px',
                                marginBottom:'5px'
                            }}
                        >
                            비밀번호를 잊으셨나요?
                        </Text>
                        <Text>
                            비밀번호를 다시 설정하기 위해 가입 당시의 휴대폰 번호를 입력해 주세요.
                        </Text>
                    </View>
                    <div
                        style={{
                        display: 'block',
                        textAlign:'left',
                        paddingLeft:'15px',
                        paddingRight:'15px',
                        // paddingTop:'5px',
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
                                // props.onPhoneNumberChange()
                            }
                            }
                            style={{
                                marginTop:'10px',
                                border:"1px solid black",
                                borderRadius:'0px',
                            }}
                            placeholder="'-' 없이 입력"
                            value={props.userPhoneNumber}
                        ></TextInput>
                    </div>
                    <div
                        style={{
                            // display: emailLogIn ? 'none':'block',
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
                            // props.logInFunction(
                            //     {
                            //         mem_jointype:'MOBILE',
                            //         mem_password:props.password,
                            //         mem_token:null,
                            //         mem_mobile:props.userPhoneNumber
                            //     }
                            // )
                            findPasswordFunction({
                                mem_mobile:props.userPhoneNumber
                            })
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
               
            </div>
            </div>
            </div>
            </div>
        )
    }

    else{
        return (
        <div>
            <div
              style={{
                  display: noExistMemberShow ? 'block':'none' 
              }}
            >
              <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
            </div>
            <div
              style={{
                  display: sentMessageShow ? 'block':'none' 
              }}
            >
              <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
            </div>
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
                    <div
                        style={{
                            display:emailLogIn?'none':'block'
                        }}
                    >
                    <Text>휴대폰번호</Text>
                    
                    <TextInput 
                        onChangeText={
                        text=>{
                            props.setUserPhoneNumber(text)
                            // props.onPhoneNumberChange()
                        }
                        }
                        style={{
                            border:"1px solid black",
                            borderRadius:'0px',
                        }}
                        placeholder="'-' 없이 입력"
                        value={props.userPhoneNumber}
                    ></TextInput>
                    </div>
                    <div
                        style={{
                            display:emailLogIn?'block':'none'
                        }}
                    >
                    <Text>이메일 주소</Text>
                    
                    <TextInput 
                        onChangeText={
                        text=>{
                            props.setUserEmail(text)
                            // props.onPhoneNumberChange()
                        }
                        }
                        style={{
                            border:"1px solid black",
                            borderRadius:'0px',
                        }}
                        placeholder="이메일 주소 입력"
                        value={props.userEmail}
                    ></TextInput>
                    </div>
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
                    <TouchableOpacity
                        onPress={()=>{
                            setFindPassWord(true)
                        }}
                    >


                        <Text>
                            비밀번호를 잊으셨나요?
                        </Text>
                    </TouchableOpacity>
                   <hr></hr>
                   <div
                        style={{
                            display:emailLogIn?'none':'block'
                        }}
                    >
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
                            toggleEmailLogIn()
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
                    </div>
                    <div
                        style={{
                            display:emailLogIn?'block':'none'
                        }}
                    >
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
                            toggleEmailLogIn()
                        }}
                    >
                        <Text
                            style={{
                                color:'black'
                            }}
                        >
                            휴대폰 번호로 로그인
                        </Text>
                    </TouchableOpacity>
                    </div>
                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                    <KakaoAuth logInFunction={props.logInFunction}/>
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
                            display: emailLogIn ? 'none':'block',
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
                    <div
                        style={{
                            display:emailLogIn?'block':'none',
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
                                    mem_email:props.userEmail
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
   
        </div>    
        );
    }

}
export default LogIn