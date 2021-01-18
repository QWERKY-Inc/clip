import React,{useEffect} from 'react';
import {TouchableOpacity,Text,View} from 'react-native';
import Logo from '../assets/header_logo.png'
import instaLogo from '../assets/instagram-brands.svg'
import facebookLogo from '../assets/facebook-f-brands.svg'
import pinterestLogo from '../assets/pinterest-p-brands.svg'
const IntroImage=() => {
	
    return (
        <div className="introImageContainer"
            style={{
                backgroundColor:'white',
                // height:'300pt'
                margin:0,
                height:'400px'
            }}
        >
            <View
                style={{
                    // height:'40px',
                    // marginTop:'15px',
                    // display:'block',
                    // // position:'fixed',
                    // top:'33px',
                    // marginLeft:'29px',
                    // height:'33pt'
                    flexDirection:'column',
                    textAlign:'left'
                }}
            >
            <a
            href="/clip"
          >
            <View    
                style={{
                    height:'40px',
                    width:'150px',
                    marginTop:'0px',
                    display:'block',
                    // position:'fixed',
                    backgroundColor:'transparent',
                    top:'0px',
                    marginLeft:'0px',
                    height:'33pt',
                    flex:1,
                }}
            >
                <img src={Logo} alt="Logo" title="Logo"
                    style={{
                        height:'40px',
                        marginTop:'25px',
                        display:'block',
                        // position:'fixed',
                        top:'35px',
                        marginLeft:'30px',
                        height:'33pt'
                    }}
                />
            </View>
          </a>
          <View
            style={{
                flexDirection:'row'
            }}
          >
          <a
            href='https://www.instagram.com/clip.style.official/'
          >
            <View
            style={{
                height:'40px',
                // marginTop:'15px',
                display:'block',
                // position:'fixed',
                backgroundColor:'transparent',
                // top:'0px',
                marginLeft:'5px',
                height:'33pt',
                flex:1
            }}>
                <img src={instaLogo} alt="Logo" title="Logo"
                    style={{
                        height:'40px',
                        marginTop:'15px',
                        display:'block',
                        // position:'fixed',
                        top:'33px',
                        marginLeft:'25px',
                        height:'33pt'
                    }}
                />

            </View>
          </a>
          <a
            href='https://www.facebook.com/clip.style.official/'
          >
            <View
            style={{
                height:'40px',
                // marginTop:'15px',
                display:'block',
                // position:'fixed',
                backgroundColor:'transparent',
                // top:'0px',
                marginLeft:'5px',
                height:'33pt',
                flex:1
            }}>
                <img src={facebookLogo} alt="Logo" title="Logo"
                    style={{
                        height:'40px',
                        marginTop:'15px',
                        display:'block',
                        // position:'fixed',
                        top:'33px',
                        marginLeft:'15px',
                        height:'33pt'
                    }}
                />

            </View>
          </a>
          <a
            href='https://www.pinterest.co.kr/clip_style/'
          >
            <View
            style={{
                height:'40px',
                // marginTop:'15px',
                display:'block',
                // position:'fixed',
                backgroundColor:'transparent',
                // top:'0px',
                marginLeft:'5px',
                height:'33pt',
                flex:1
            }}>
                <img src={pinterestLogo} alt="Logo" title="Logo"
                    style={{
                        height:'40px',
                        marginTop:'15px',
                        display:'block',
                        // position:'fixed',
                        top:'33px',
                        marginLeft:'15px',
                        height:'33pt'
                    }}
                />

            </View>
          </a>
          </View>
          <View
          style={{
            height:'40px',
            marginTop:'15px',
            display:'block',
            // position:'fixed',
            backgroundColor:'transparent',
            // top:'0px',
            marginLeft:'25px',
            height:'33pt',
            flex:1
          }}>

          
          <Text
            style={{
                // height:'40px',
                // marginTop:'12px',
                display:'block',
                position:'relative',
                // top:'-50px',
                marginLeft:'7px',
                // height:'33pt'
                fontSize: '15pt',
                fontWeight:'500',
                textDecorationLine:'none',
                color:'black',
                textAlign:'left',
                padding:'auto',
              
            }}
          >
          주식회사 쿼키 
        
          </Text>
          </View>
          <View
            style={{
                // height:'40px',
                // marginTop:'15px',
                display:'block',
                // position:'fixed',
                backgroundColor:'transparent',
                // top:'0px',
                marginLeft:'32px',
                // height:'33pt',
                flex:2
            }}
          >
            <View
            style={{
                // height:'40px',
                // marginTop:'15px',
                display:'block',
                // position:'fixed',
                backgroundColor:'transparent',
                // top:'0px',
                marginLeft:'0px',
                // height:'33pt',
                // flex:2
            }}>
                <Text
                style={{
                    fontSize: '15pt',
                    fontWeight:'500',
                    textDecorationLine:'none',
                    color:'black',
                    textAlign:'left',
                    padding:'auto',
                }}
                >
                    서울시 강남구 영동대로 511 2749호
                </Text>
            </View>
            <br></br>
            <View
            style={{
                // height:'40px',
                // marginTop:'15px',
                display:'block',
                // position:'fixed',
                backgroundColor:'transparent',
                // top:'0px',
                marginLeft:'0px',
                // height:'33pt',
                // flex:2
            }}
            >
                <Text
                style={{
                    fontSize: '15pt',
                    fontWeight:'500',
                    textDecorationLine:'none',
                    color:'black',
                    textAlign:'left',
                    padding:'auto',
                }}
                >
                    사업자 등록번호 : 444-81-01756
                </Text>
            </View>
            <View
            style={{
                // height:'40px',
                // marginTop:'15px',
                display:'block',
                // position:'fixed',
                backgroundColor:'transparent',
                // top:'0px',
                marginLeft:'0px',
                // height:'33pt',
                // flex:2
            }}
            >
                <Text
                style={{
                    fontSize: '15pt',
                    fontWeight:'500',
                    textDecorationLine:'none',
                    color:'black',
                    textAlign:'left',
                    padding:'auto',
                }}
                >
                    통신판매업: 2020-서울강남-03319
                </Text>
            </View>
            <br></br>
          </View>
          </View>
          <View
          style={{
              textAlign:'left',
              height:'40px',
              // marginTop:'15px',
              display:'block',
              // position:'fixed',
              backgroundColor:'transparent',
              // top:'0px',
              marginLeft:'32px',
              height:'33pt',
              flex:2,
          }}
          >
            <View
            >
                <a style={{           
                            textDecorationLine:'none',
                            textDecorationStyle:'none',
                            height:"100%",
                            width:"100%",
                            
                          }} href="mailto:help@clip.style" >
                <Text
                style={{
                    fontSize: '15pt',
                    fontWeight:'500',
                    textDecorationLine:'none',
                    color:'black',
                    textAlign:'left',
                    padding:'auto',
                }}
                >
                    헬프데스크: help@clip.style
                </Text>
                </a>
            </View>
            <View>
                <a style={{           
                    textDecorationLine:'none',
                    textDecorationStyle:'none',
                    height:"100%",
                    width:"100%",
                    
                    }} href="mailto:admin@clip.style" >
                <Text
                style={{
                    fontSize: '15pt',
                    fontWeight:'500',
                    textDecorationLine:'none',
                    color:'black',
                    textAlign:'left',
                    padding:'auto',
                }}
                >
                    제휴문의: admin@clip.style
                </Text>
                </a>
            </View>
            <br></br>
            <View>
                <Text
                style={{
                    fontSize: '15pt',
                    fontWeight:'500',
                    textDecorationLine:'none',
                    color:'black',
                    textAlign:'left',
                    padding:'auto',
                }}
                >
                    © 2021 QWERKY Inc. 
                </Text>
            </View>
            <View
                style={{
                    flexDirection:'row'
                }}
            >
                <View>
                    <a
                        href="/privacypolicy"
                        style={{
                            textDecorationLine:'none',
                            textDecorationStyle:'none',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'500',
                                textDecorationLine:'none',
                                color:'black',
                                textAlign:'left',
                                padding:'auto',
                            }}
                        >
                                개인정보 처리방침
                        </Text>
                    </a>
                </View>
                <View>
                    <Text
                    style={{
                        fontSize: '15pt',
                        fontWeight:'500',
                        textDecorationLine:'none',
                        color:'black',
                        textAlign:'left',
                        padding:'auto',
                    }}
                    >
                        &nbsp;|&nbsp;
                    </Text>
                </View>
                <View>
                    <a
                        href="/terms"
                        style={{
                            textDecorationLine:'none',
                            textDecorationStyle:'none',
                        }}
                    >
                        <Text
                        style={{
                            fontSize: '15pt',
                            fontWeight:'500',
                            textDecorationLine:'none',
                            color:'black',
                            textAlign:'left',
                            padding:'auto',
                        }}
                        >
                            이용약관
                        </Text>
                    </a>
                </View>
            </View>
            <br></br>
          </View>
        </div>
    )

}

export default IntroImage;