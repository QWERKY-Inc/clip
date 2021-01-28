import React,{useEffect} from 'react';
import './navbar.css';
// import Logo from './../logo.svg';
import {TouchableOpacity,Text,View,Modal,TouchableHighlight,Dimensions,TextInput,Picker,Linking,ScrollView,FlatList} from 'react-native';
import Logo from '../assets/header_logo.png'
import { nativeTouchData } from 'react-dom/test-utils';
import searchIcon from '../assets/icnSearch.png'
import userIcon from '../assets/icnUser.png'
import boxIcon from '../assets/icnBox.png'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import {UserProvider,useUser} from './user-context'
const queryString =require('query-string');

const Navbar=() => {
  const [scrolled,setScrolled]=React.useState(false);
  const [userModalVisible,setUserModalVisible]=React.useState(false);
  const [cartModalVisible,setCartModalVisible]=React.useState(false);
  const [height,setHeight]=React.useState(Dimensions.get('window').height)
  const [width,setWidth]=React.useState(Dimensions.get('window').width)
  // const [user,setUser]=useUser()
  const [loginInfo,setLoginInfo]=React.useState(null)
  const[userPhoneNumber,setUserPhoneNumber]=React.useState(null)
  const[password,setPassword]=React.useState(null)
  const [loggedOn,setLoggedOn]=React.useState(false)
  const [entryCorrect,setEntryCorrect]=React.useState(true)
  const [brandListData,setBrandListData]=React.useState(null)
  const [brandsDropDown,setBrandsDropDown]=React.useState(false)
  const [brandsDropDownDisplay,setBrandsDropDownDisplay]=React.useState('none')
  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }
  const toggleUserModal=()=>{
      setUserModalVisible(!userModalVisible)
  }
  const toggleCartModal=()=>{
    setCartModalVisible(!cartModalVisible)
}
  const onPhoneNumberChange=()=>{
  
    if(loginInfo!=null){
      if(localStorage.login&&localStorage.login!=""){
        if(JSON.parse(window.localStorage.login).result=='SUCCESS'){
          console.log(JSON.parse(window.localStorage.getItem('login')))
          console.log('logged on')
          setLoggedOn(true)
          setEntryCorrect(true)
        }
        else{
          console.log(JSON.parse(window.localStorage.getItem('login')))
          console.log('logged off')
          setLoggedOn(false)
          setEntryCorrect(false)
        }
      }
      else{
          setLoggedOn(false)
        console.log('logged off')
      }
    }
    
  }
  const onPasswordChange=()=>{
    // console.log(password)
  }
  const login=()=>{
    fetch('/login?'+
      queryString.stringify({
              mem_jointype:'MOBILE',
              mem_password:password,
              mem_token:null,
              mem_mobile:userPhoneNumber
          })
    )
    .then(res=>res.json())
    .then((incomingData)=>{
      setLoginInfo(incomingData)
      console.log("_______")
      console.log(incomingData)
      window.localStorage.setItem('login',JSON.stringify(incomingData))
      if(incomingData.result=='SUCCESS'){
        setLoggedOn(true)
        setEntryCorrect(true)
      }
      else{
        setLoggedOn(false)
        setEntryCorrect(false)
      }
      // console.log(loggedOn)
    })
    .catch(err=>{
        console.log(err)
    })


    // fetch('http://clip.partners/api/mobile/MemberLogin',{
    //     method: 'post',
    //     headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //     body:queryString.stringify({
    //         mem_jointype:'MOBILE',
    //         mem_password:password,
    //         mem_token:null,
    //         mem_mobile:userPhoneNumber
    //     })

    // })
    // .then(res=>res.json())
    // .then((incomingData)=>{
    //   setLoginInfo(incomingData)
    //   console.log("!_______!")
    //   console.log(loginInfo)
    //   // console.log('data read : ' , data.listCategory[0].ct_img_url);
    //   window.localStorage.setItem('login',JSON.stringify(loginInfo))
    // })
    // .catch(err=>{
    //     console.log(err)
    // })

  }
  const logout=()=>{
    setLoginInfo(null)
    setLoggedOn(false)
    console.log("_______")
    window.localStorage.setItem('login','')
  }
  const onChange=()=>{
    setHeight(Dimensions.get('window').height)
    setWidth(Dimensions.get('window').width)
    // console.log(height+" : "+width)
  }
  const brands=()=>{
    fetch('/brandslist')
    .then(res=>res.json())
    .then((incomingData)=>{
      setBrandListData(incomingData)
    })
    .catch(err=>{
        console.log(err)
    })
  }
  const toggleBrandsDropDown=()=>{
    setBrandsDropDown(!brandsDropDown)
  }
  const brandRenderRow=(brand,index,separators)=>{
    return(
    <TouchableOpacity
      onPress={() => 
        Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
      }
    >
    <div
      style={{
        textAlign:'left',
        padding:'5pt'
      }}
    >

      <Text
        style ={{
          height:'65pt',
          width:'250px',
          fontSize: '15pt',
          fontWeight:'700',
          textDecorationLine:'none',
          color:'black',
          textAlign:'left',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row',
          marginTop:'45pt',
          pointerEvents:'none',
          backgroundColor:'transparent',
          pointerEvents:'none',
          
      }}
      >
        {brand.ct_text}
      </Text>
      <br></br>
    </div>
    </TouchableOpacity>
                        
  
  )}

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
    Dimensions.addEventListener('change',onChange)
    if(localStorage.login&&localStorage.login!=""){
      setLoginInfo(JSON.parse(window.localStorage.getItem('login')))
      if(JSON.parse(window.localStorage.getItem('login')).result=="SUCCESS"){
        setLoggedOn(true)
      }
    }
    else{
      setLoggedOn(false)
    }
    brands()
    // console.log(loggedOn)
  },[])
  useEffect(()=>{
    console.log(loggedOn)
  },[loggedOn])
  useEffect(()=>{
    console.log(brandListData)
  },[brandListData])
  // useEffect(()=>{
  //   console.log(brandsDropDownDisplay)
  //   if(brandsDropDown==true){
  //     setBrandsDropDownDisplay('block')
  //   }
  //   else if(brandsDropDown==false){
  //     setBrandsDropDownDisplay('none')
  //   }
  // },[brandsDropDown])
  
  let x=['navbar'];
  if(scrolled){
    x.push('scrolled');
  }
  if(loggedOn==true){
    if(width>1051){
      if(brandsDropDown){
        return (    
          <header className={x.join(" ")}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>cart Info</Text>

                    <TouchableHighlight
                      onPress={() => {
                        toggleCartModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            <Modal
                animationType="fade"
                transparent={false}
                visible={userModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <TouchableHighlight
                      onPress={() => {
                        logout()
                      }}>
                      <Text>로그아웃</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {
                        toggleUserModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            <div className="headerContainer">
            
              <div className="logo">
                <a
                  href="/clip"
                >
                  <img src={Logo} alt="Logo" title="Logo" />
                </a>
              </div>

                  <TouchableOpacity
                        className="linkTo"
                        id="category"
                        style={{
                            position:'fixed',
                            height:50,
                            width:240,
                            top:38,
                            left:'167pt',
                            backgroundColor:'transparent',
                            zIndex:1
                        }}
                        activeOpacity={0.5}
                    >
                    
                        {/* <Link to="/category">
                          자재카테고리
                        </Link> */}
                        <a 
                        style={
                          {
                            // flex:1,
                            textDecorationLine:'none',
                            // color:'black',
                            // //borderColor:'black',
                            // //borderWidth:2,
                            // backgroundColor:'transparent',
                            // fontSize: '25pt',
                            // fontWeight:'700',
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 2,
                            // // flex:1,
                            // alignItems:'center',
                            // justifyContent:'center',
                            // flexDirection:'row',
                            // textAlign:'center'
                          }} 
                          href="/category">
                <Text
                      selectable={false} 
                      style ={{
                          fontSize: '25px',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          color:'black',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          margin:11,
                          // padding:'auto',
                          pointerEvents:'none'

                      }}
                      >
                        자재카테고리
                      </Text>
              </a>
                  </TouchableOpacity>
                  <TouchableOpacity
                        className='linkTo'
                        style={{
                            position:'fixed',
                            height:50,
                            width:170,
                            top:38,
                            left:'349pt',
                            backgroundColor:'transparent',
                            zIndex:1
                        }}
                        activeOpacity={0.5}
                    >
                      <a 
                        style={
                          {
                            textDecorationLine:'none',
                          }} 
                          href="/constructionpart">
                      <Text
                      selectable={false} 
                      style ={{
                          fontSize: '25px',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          // color:'white',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          color:'black',
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          margin:11,
                          padding:'auto',
                          pointerEvents:'none'
                      }}
                      >
                        사공부위
                      </Text>
                      </a>
                  </TouchableOpacity>
                  <TouchableOpacity
                        className="linkTo"
                        style={{
                            position:'fixed',
                            height:50,
                            width:140,
                            top:38,
                            left:'478pt',
                            backgroundColor:'transparent',
                            zIndex:1
                        }}
                        activeOpacity={0.5}
                        // onMouseEnter={()=>
                        //   console.log('mouse entered')
                        // }
                        onPress={()=>{
                          console.log('toggle dropdown')
                          toggleBrandsDropDown()
                        }}
                    >
                      <a 
                        style={
                          {
                            textDecorationLine:'none',
                          }} 
                          //href="/brands"
                      >
                        <Text
                        selectable={false} 
                        style ={{
                            fontSize: '25px',
                            fontWeight:'700',
                            textDecorationLine:'none',
                            // color:'white',
                            // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 2,
                            color:'black',
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:11,
                            padding:'auto',
                            pointerEvents:'none'
                        }}
                        >
                          브랜드
                        </Text>
                      </a>
                  </TouchableOpacity>
                  <div
                    style={{
                      position:'fixed',
                      height:'100vh',
                      width:'100vw',
                      top:'100px',
                      left:0,
                      backgroundColor:'white',
                      // display:`${brandsDropDownDisplay}%`,
                      display:'block'
                    }}
                  >
                    {/* <FlatList
                      data={brandListData}
                      renderItem={brandRenderRow}
                    /> */}
                    {/* {brandData.bestproducts_brand.map((material)=>
                    
                    
                    <View
                        style={{
                          backgroundColor:'transparent',
                          height:'200px',
                          width:'200px',
                          marginLeft:'auto',
                          marginRight:'auto',
                          marginTop:'200px'
                        }}
                    >
                    <Image
                        style={{
                        display:'block',
                        height:'200pt',
                        width:'200pt',
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        zIndex:1,
                        pointerEvents:'none',
                        transform:[{
                            translateX:'0px',
                            translateY:'0px'
                        }]
                        }}
                        source={{
                            uri:
                                material.mt_feature_img_url
                        }}
            
                    >
                    </Image>
                        <View
                            style ={{
                                height:'60pt',
                                width:'200pt',
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'black',
                                textAlign:'center',
                                flexDirection:'row',
                                pointerEvents:'none',
                                backgroundColor:'rgb(33,33,33)',
                                pointerEvents:'none',
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                                
                            }}
                        >
                            <View
                                style ={{
                                    height:'60pt',
                                    width:'190pt',
                                    fontSize: '15pt',
                                    fontWeight:'700',
                                    textDecorationLine:'none',
                                    borderBottomLeftRadius:10,
                                    borderBottomRightRadius:10,
                                    color:'black',
                                    textAlign:'center',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    marginLeft:'5pt',
                                    pointerEvents:'none',
                                    backgroundColor:"rgb(33,33,33)",
                                    pointerEvents:'none',
                                    
                                }}
                            >
                                <Text
                                    style ={{
                                        height:'65pt',
                                        width:'250px',
                                        fontSize: '15pt',
                                        fontWeight:'700',
                                        textDecorationLine:'none',
                                        color:'white',
                                        textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginLeft:'15px',
                                        marginTop:'45pt',
                                        pointerEvents:'none',
                                        backgroundColor:'transparent',
                                        pointerEvents:'none',
                                        
                                    }}
                                >
                                    {material.vd_name}
                                </Text>
                                <Text
                                    style ={{
                                        height:'65pt',
                                        width:'250px',
                                        fontSize: '15pt',
                                        fontWeight:'700',
                                        textDecorationLine:'none',
                                        color:'white',
                                        textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginTop:'45pt',
                                        pointerEvents:'none',
                                        backgroundColor:'transparent',
                                        pointerEvents:'none',
                                        
                                    }}
                                >
                                    {material.mt_subname}
                                </Text>
                            </View>
                        </View>
                      </View>
                      
                      
                        )} */}
                      <div
                      style={{
                        paddingTop:'50px',
                        paddingLeft:'65px',
                        paddingRight:'65px'
                      }}
                      >
                        <div
                          style={{
                            textAlign:'left',
                            // margin:'25pt'
                            paddingLeft:'25px'
                          }}
                        >

                          <Text
                            style ={{
                              fontSize: '40px',
                              fontWeight:'700',
                              textDecorationLine:'none',
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
                              color:'black',
                              textAlign:'center',
                              alignItems:'center',
                              justifyContent:'center',
                              flexDirection:'row',
                              // margin:11,
                              marginTop:'5px',
                              padding:'auto',
                              pointerEvents:'none'
                            }}
                          >
                            브랜드
                          </Text>
                        </div>
                        <div
                        style={{
                          //padding:'25px',
                          
                        }}
                        >
                        <div
                        style={{
                          // columnCount:3,
                          flexwrap:'wrap',
                          flexDirection:'column',
                          display: 'grid',
                          gridTemplateColumns: 'auto auto auto',
                          width:'100vw',
                          height:'60vh',
                          overflowY: 'scroll',
                        }}
                        >
                      
                        {brandListData.map((brand)=>
                        <TouchableOpacity
                          onPress={() => 
                            Linking.openURL(`/brands?ct_id=${brand.ct_id}`)

                          }
                          
                        >
                        <div>
                        <div
                        style={{
                          textAlign:'left',
                          // width:'300px',
                          height:'15px',
                          paddingLeft:'15px',
                          paddingRight:'15px',
                          // paddingTop:'7px',
                          // paddingBottom:'7px',
                         // margin:'15px',
                          backgroundColor:'transparent'
                        }}
                        >

                          <Text
                            style ={{
                              //height:'65pt',
                              //width:'250px',
                              fontSize: '12pt',
                              fontWeight:'500',
                              textDecorationLine:'none',
                              color:'black',
                              textAlign:'left',
                              alignItems:'center',
                              justifyContent:'center',
                              flexDirection:'row',
                              marginTop:'45pt',
                              pointerEvents:'none',
                              backgroundColor:'transparent',
                              pointerEvents:'none',
                              
                          }}
                          >
                            {brand.ct_text}
                          </Text>
                          
                        </div>
                        </div>
                        </TouchableOpacity>
                        )} 
                          
                        </div>
                        </div>
                      </div>
                  </div>
                  <TouchableOpacity
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'173pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  >
                    <img
                      src={searchIcon}
                    >
                    </img>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'103pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  onPress={() => {
                    toggleCartModal()
                  }}
                  >
                    <img
                      src={boxIcon}
                    >
                    </img>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="linkTo"
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'33pt',
                      backgroundColor:'transparent',
                      zIndex:1,
                  }}
                  onPress={() => {
                    toggleUserModal()
                  }}
                  >
                    <img
                      src={userIcon}
                      style={{
                        height:'47pt',
                      
                      }}
                    >
                    </img>
                  </TouchableOpacity>
                  <Switch>
                    <Route path="/">
                      {/* <Text>
                        Home
                      </Text> */}
                    </Route>
                    <Route path="/category">
                      <Text>
                        category
                      </Text>
                    </Route>
                  </Switch>
                

            </div>
            

              

          </header>
        )
      }
      else{
        return (    
          <header className={x.join(" ")}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>cart Info</Text>

                    <TouchableHighlight
                      onPress={() => {
                        toggleCartModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            <Modal
                animationType="fade"
                transparent={false}
                visible={userModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <TouchableHighlight
                      onPress={() => {
                        logout()
                      }}>
                      <Text>로그아웃</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {
                        toggleUserModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            <div className="headerContainer">
            
              <div className="logo">
                <a
                  href="/clip"
                >
                  <img src={Logo} alt="Logo" title="Logo" />
                </a>
              </div>

                  <TouchableOpacity
                        className="linkTo"
                        id="category"
                        style={{
                            position:'fixed',
                            height:50,
                            width:240,
                            top:38,
                            left:'167pt',
                            backgroundColor:'transparent',
                            zIndex:1
                        }}
                        activeOpacity={0.5}
                    >
                    
                        {/* <Link to="/category">
                          자재카테고리
                        </Link> */}
                        <a 
                        style={
                          {
                            // flex:1,
                            textDecorationLine:'none',
                            // color:'black',
                            // //borderColor:'black',
                            // //borderWidth:2,
                            // backgroundColor:'transparent',
                            // fontSize: '25pt',
                            // fontWeight:'700',
                            // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 2,
                            // // flex:1,
                            // alignItems:'center',
                            // justifyContent:'center',
                            // flexDirection:'row',
                            // textAlign:'center'
                          }} 
                          href="/category">
                <Text
                      selectable={false} 
                      style ={{
                          fontSize: '25px',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          color:'black',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          margin:11,
                          // padding:'auto',
                          pointerEvents:'none'

                      }}
                      >
                        자재카테고리
                      </Text>
              </a>
                  </TouchableOpacity>
                  <TouchableOpacity
                        className='linkTo'
                        style={{
                            position:'fixed',
                            height:50,
                            width:170,
                            top:38,
                            left:'349pt',
                            backgroundColor:'transparent',
                            zIndex:1
                        }}
                        activeOpacity={0.5}
                    >
                      <a 
                        style={
                          {
                            textDecorationLine:'none',
                          }} 
                          href="/constructionpart">
                      <Text
                      selectable={false} 
                      style ={{
                          fontSize: '25px',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          // color:'white',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          color:'black',
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          margin:11,
                          padding:'auto',
                          pointerEvents:'none'
                      }}
                      >
                        사공부위
                      </Text>
                      </a>
                  </TouchableOpacity>
                  <TouchableOpacity
                        className="linkTo"
                        style={{
                            position:'fixed',
                            height:50,
                            width:140,
                            top:38,
                            left:'478pt',
                            backgroundColor:'transparent',
                            zIndex:1
                        }}
                        activeOpacity={0.5}
                        // onMouseEnter={()=>
                        //   console.log('mouse entered')
                        // }
                        onPress={()=>{
                          console.log('toggle dropdown')
                          toggleBrandsDropDown()
                        }}
                    >
                      <a 
                        style={
                          {
                            textDecorationLine:'none',
                          }} 
                          // href="/brands"
                      >
                        <Text
                        selectable={false} 
                        style ={{
                            fontSize: '25px',
                            fontWeight:'700',
                            textDecorationLine:'none',
                            // color:'white',
                            // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 2,
                            color:'black',
                            textAlign:'center',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:11,
                            padding:'auto',
                            pointerEvents:'none'
                        }}
                        >
                          브랜드
                        </Text>
                      </a>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'173pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  >
                    <img
                      src={searchIcon}
                    >
                    </img>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'103pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  onPress={() => {
                    toggleCartModal()
                  }}
                  >
                    <img
                      src={boxIcon}
                    >
                    </img>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="linkTo"
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'33pt',
                      backgroundColor:'transparent',
                      zIndex:1,
                  }}
                  onPress={() => {
                    toggleUserModal()
                  }}
                  >
                    <img
                      src={userIcon}
                      style={{
                        height:'47pt',
                      
                      }}
                    >
                    </img>
                  </TouchableOpacity>
                  <Switch>
                    <Route path="/">
                      {/* <Text>
                        Home
                      </Text> */}
                    </Route>
                    <Route path="/category">
                      <Text>
                        category
                      </Text>
                    </Route>
                  </Switch>
                

            </div>
            

              

          </header>
        )       
      }
    }
    else if(width>449 && width<=1051){
      return(
        <header className={x.join(" ")}>
        <Modal
            animationType="fade"
            transparent={false}
            visible={cartModalVisible}
            onDismiss={() => {
              // alert('Modal has been closed.');
              console.log("user modal has been closed")
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>cart Info</Text>

                <TouchableHighlight
                  onPress={() => {
                    toggleCartModal()
                  }}>
                  <Text>x</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        <Modal
            animationType="fade"
            transparent={false}
            visible={userModalVisible}
            onDismiss={() => {
              // alert('Modal has been closed.');
              console.log("user modal has been closed")
            }}>
            <View style={{marginTop: 22}}>
              <View>
              
                <TouchableHighlight
                  onPress={() => {
                    logout()
                  }}>
                  <Text>로그아웃</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    toggleUserModal()
                  }}>
                  <Text>x</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
        <div className="headerContainer">
        
          <div className="logo">
            <a
              href="/clip"
            >
              <img src={Logo} alt="Logo" title="Logo" />
            </a>
          </div>

              <TouchableOpacity
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'173pt',
                  backgroundColor:'transparent',
                  zIndex:1
              }}
              >
                <img
                  src={searchIcon}
                >
                </img>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'103pt',
                  backgroundColor:'transparent',
                  zIndex:1
              }}
              onPress={() => {
                toggleCartModal()
              }}
              >
                <img
                  src={boxIcon}
                >
                </img>
              </TouchableOpacity>
              <TouchableOpacity
                className="linkTo"
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'33pt',
                  backgroundColor:'transparent',
                  zIndex:1,
              }}
              onPress={() => {
                toggleUserModal()
              }}
              >
                <img
                  src={userIcon}
                  style={{
                    height:'47pt',
                  
                  }}
                >
                </img>
              </TouchableOpacity>
              <Switch>
                <Route path="/">
                  {/* <Text>
                    Home
                  </Text> */}
                </Route>
                <Route path="/category">
                  <Text>
                    category
                  </Text>
                </Route>
              </Switch>
            

        </div>
        

          

      </header>
      )
    }
    else{
      return (    
        <header className={x.join(" ")}>
          <Modal
              animationType="fade"
              transparent={false}
              visible={cartModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed")
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <Text>cart Info</Text>

                  <TouchableHighlight
                    onPress={() => {
                      toggleCartModal()
                    }}>
                    <Text>x</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          <Modal
              animationType="fade"
              transparent={false}
              visible={userModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed")
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <TouchableHighlight
                    onPress={() => {
                      logout()
                    }}>
                    <Text>로그아웃</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      toggleUserModal()
                    }}>
                    <Text>x</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          <div className="headerContainer">
          
            <div className="logo">
              <a
                href="/clip"
              >
                <img src={Logo} alt="Logo" title="Logo" />
              </a>
            </div>

              
                <TouchableOpacity
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'105pt',
                    backgroundColor:'transparent',
                    zIndex:1
                }}
                >
                  <img
                    src={searchIcon}
                  >
                  </img>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'60pt',
                    backgroundColor:'transparent',
                    zIndex:1
                }}
                onPress={() => {
                  toggleCartModal()
                }}
                >
                  <img
                    src={boxIcon}
                  >
                  </img>
                </TouchableOpacity>
                <TouchableOpacity
                  className="linkTo"
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'15pt',
                    backgroundColor:'transparent',
                    zIndex:1,
                }}
                onPress={() => {
                  toggleUserModal()
                }}
                >
                  <img
                    src={userIcon}
                    style={{
                      height:'47pt',
                    
                    }}
                  >
                  </img>
                </TouchableOpacity>
                <Switch>
                  <Route path="/">
                    {/* <Text>
                      Home
                    </Text> */}
                  </Route>
                  <Route path="/category">
                    <Text>
                      category
                    </Text>
                  </Route>
                </Switch>
              

          </div>
          

            

        </header>
      )
    }
  }
  else{
    if(entryCorrect==true){
      if(width>1051){
      return (    
        <header className={x.join(" ")}>
          <Modal
              animationType="fade"
              transparent={false}
              visible={cartModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed")
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <Text>cart Info</Text>

                  <TouchableHighlight
                    onPress={() => {
                      toggleCartModal()
                    }}>
                    <Text>x</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          <Modal
              animationType="fade"
              transparent={false}
              visible={userModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed")
              }}>
              <View style={{marginTop: 22}}>
                <View>
                <Text>전화번호</Text>
                  {/* <TextInput 
                    onChangeText={text=>setUser(text)}
                    value={user}
                  ></TextInput> */}
                  <TextInput 
                    onChangeText={
                      text=>{
                        setUserPhoneNumber(text)
                        onPhoneNumberChange()
                      }
                    }
                    // onBlur={
                    //   onPhoneNumberChange()
                    // }
                    value={userPhoneNumber}
                  ></TextInput>
                  <Text>비밀번호</Text>
                  <TextInput
                    onChangeText={
                      text=>{setPassword(text)
                      onPasswordChange()
                      }
                    }
                    // onBlur={
                    //   onPasswordChange()
                    // }
                    secureTextEntry={true}
                    value={password}
                  ></TextInput>
                  
                  <TouchableHighlight
                    onPress={() => {
                      login()
                    }}>
                    <Text>로그인</Text>
                  </TouchableHighlight>
                  
                  <TouchableHighlight
                    onPress={() => {
                      toggleUserModal()
                    }}>
                    <Text>x</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          <div className="headerContainer">
          
            <div className="logo">
              <a
                href="/clip"
              >
                <img src={Logo} alt="Logo" title="Logo" />
              </a>
            </div>

                <TouchableOpacity
                      className="linkTo"
                      id="category"
                      style={{
                          position:'fixed',
                          height:50,
                          width:240,
                          top:38,
                          left:'167pt',
                          backgroundColor:'transparent',
                          zIndex:1
                      }}
                      activeOpacity={0.5}
                  >
                  
                      {/* <Link to="/category">
                        자재카테고리
                      </Link> */}
                      <a 
                      style={
                        {
                          // flex:1,
                          textDecorationLine:'none',
                          // color:'black',
                          // //borderColor:'black',
                          // //borderWidth:2,
                          // backgroundColor:'transparent',
                          // fontSize: '25pt',
                          // fontWeight:'700',
                          // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          // // flex:1,
                          // alignItems:'center',
                          // justifyContent:'center',
                          // flexDirection:'row',
                          // textAlign:'center'
                        }} 
                        href="/category">
              <Text
                    selectable={false} 
                    style ={{
                        fontSize: '25px',
                        fontWeight:'700',
                        textDecorationLine:'none',
                        color:'black',
                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 2,
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        margin:11,
                        // padding:'auto',
                        pointerEvents:'none'

                    }}
                    >
                      자재카테고리
                    </Text>
            </a>
                </TouchableOpacity>
                <TouchableOpacity
                      className='linkTo'
                      style={{
                          position:'fixed',
                          height:50,
                          width:170,
                          top:38,
                          left:'349pt',
                          backgroundColor:'transparent',
                          zIndex:1
                      }}
                      activeOpacity={0.5}
                  >
                    <a 
                      style={
                        {
                          textDecorationLine:'none',
                        }} 
                        href="/constructionpart">
                    <Text
                    selectable={false} 
                    style ={{
                        fontSize: '25px',
                        fontWeight:'700',
                        textDecorationLine:'none',
                        // color:'white',
                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 2,
                        color:'black',
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        margin:11,
                        padding:'auto',
                        pointerEvents:'none'
                    }}
                    >
                      사공부위
                    </Text>
                    </a>
                </TouchableOpacity>
                <TouchableOpacity
                      className="linkTo"
                      style={{
                          position:'fixed',
                          height:50,
                          width:140,
                          top:38,
                          left:'478pt',
                          backgroundColor:'transparent',
                          zIndex:1
                      }}
                      activeOpacity={0.5}
                      onPress={()=>{
                        console.log('toggle')
                        toggleBrandsDropDown()
                      }
                        
                      }
                  >
                    <a 
                      style={
                        {
                          textDecorationLine:'none',
                        }} 
                        // href="/brands"
                    >
                      <Text
                      selectable={false} 
                      style ={{
                          fontSize: '25px',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          // color:'white',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          color:'black',
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          margin:11,
                          padding:'auto',
                          pointerEvents:'none'
                      }}
                      >
                        브랜드
                      </Text>
                    </a>
                </TouchableOpacity>
              
                <TouchableOpacity
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'173pt',
                    backgroundColor:'transparent',
                    zIndex:1
                }}
                >
                  <img
                    src={searchIcon}
                  >
                  </img>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'103pt',
                    backgroundColor:'transparent',
                    zIndex:1
                }}
                onPress={() => {
                  toggleCartModal()
                }}
                >
                  <img
                    src={boxIcon}
                  >
                  </img>
                </TouchableOpacity>
                <TouchableOpacity
                  className="linkTo"
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'33pt',
                    backgroundColor:'transparent',
                    zIndex:1,
                }}
                onPress={() => {
                  toggleUserModal()
                }}
                >
                  <img
                    src={userIcon}
                    style={{
                      height:'47pt',
                    
                    }}
                  >
                  </img>
                </TouchableOpacity>
                <Switch>
                  <Route path="/">
                    {/* <Text>
                      Home
                    </Text> */}
                  </Route>
                  <Route path="/category">
                    <Text>
                      category
                    </Text>
                  </Route>
                </Switch>
              

          </div>
          

            

        </header>
      )
      }
      else if(width>449 && width<=1051){
        return(
        <header className={x.join(" ")}>
        <Modal
            animationType="fade"
            transparent={false}
            visible={cartModalVisible}
            onDismiss={() => {
              // alert('Modal has been closed.');
              console.log("user modal has been closed")
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>cart Info</Text>

                <TouchableHighlight
                  onPress={() => {
                    toggleCartModal()
                  }}>
                  <Text>x</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        <Modal
            animationType="fade"
            transparent={false}
            visible={userModalVisible}
            onDismiss={() => {
              // alert('Modal has been closed.');
              console.log("user modal has been closed")
            }}>
            <View style={{marginTop: 22}}>
              <View>
              <Text>전화번호</Text>
              {/* <TextInput 
                onChangeText={
                  text=>setUser(text)
                }
                value={user}
              ></TextInput> */}
              <TextInput 
                onChangeText={
                  text=>{
                    setUserPhoneNumber(text)
                    onPhoneNumberChange()
                  }
                }
                // onBlur={
                //   onPhoneNumberChange()
                // }
                value={userPhoneNumber}
              ></TextInput>
              <Text>비밀번호</Text>
              <TextInput
                onChangeText={
                  text=>{setPassword(text)
                  onPasswordChange()
                  }
                }
                // onBlur={
                //   onPasswordChange()
                // }
                secureTextEntry={true}
                value={password}
              ></TextInput>
                <TouchableHighlight
                  onPress={() => {
                    login()
                  }}>
                  <Text>로그인</Text>
                </TouchableHighlight>
                
                <TouchableHighlight
                  onPress={() => {
                    toggleUserModal()
                  }}>
                  <Text>x</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
        <div className="headerContainer">
        
          <div className="logo">
            <a
              href="/clip"
            >
              <img src={Logo} alt="Logo" title="Logo" />
            </a>
          </div>

              <TouchableOpacity
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'173pt',
                  backgroundColor:'transparent',
                  zIndex:1
              }}
              >
                <img
                  src={searchIcon}
                >
                </img>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'103pt',
                  backgroundColor:'transparent',
                  zIndex:1
              }}
              onPress={() => {
                toggleCartModal()
              }}
              >
                <img
                  src={boxIcon}
                >
                </img>
              </TouchableOpacity>
              <TouchableOpacity
                className="linkTo"
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'33pt',
                  backgroundColor:'transparent',
                  zIndex:1,
              }}
              onPress={() => {
                toggleUserModal()
              }}
              >
                <img
                  src={userIcon}
                  style={{
                    height:'47pt',
                  
                  }}
                >
                </img>
              </TouchableOpacity>
              <Switch>
                <Route path="/">
                  {/* <Text>
                    Home
                  </Text> */}
                </Route>
                <Route path="/category">
                  <Text>
                    category
                  </Text>
                </Route>
              </Switch>
            

        </div>
        

          

      </header>
      )
      }
      else{
        return (    
          <header className={x.join(" ")}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>cart Info</Text>

                    <TouchableHighlight
                      onPress={() => {
                        toggleCartModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            <Modal
                animationType="fade"
                transparent={false}
                visible={userModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>전화번호</Text>
                    <TextInput 
                      onChangeText={
                        text=>{
                          setUserPhoneNumber(text)
                          onPhoneNumberChange()
                        }
                      }
                      // onBlur={
                      //   onPhoneNumberChange()
                      // }
                      value={userPhoneNumber}
                    ></TextInput>
                    <Text>비밀번호</Text>
                    <TextInput
                      onChangeText={
                        text=>{setPassword(text)
                        onPasswordChange()
                        }
                      }
                      // onBlur={
                      //   onPasswordChange()
                      // }
                      secureTextEntry={true}
                      
                      value={password}
                    ></TextInput>
                    <TouchableHighlight
                      onPress={() => {
                        login()
                      }}>
                      <Text>로그인</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight
                      onPress={() => {
                        toggleUserModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            <div className="headerContainer">
            
              <div className="logo">
                <a
                  href="/clip"
                >
                  <img src={Logo} alt="Logo" title="Logo" />
                </a>
              </div>

                
                  <TouchableOpacity
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'105pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  >
                    <img
                      src={searchIcon}
                    >
                    </img>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'60pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  onPress={() => {
                    toggleCartModal()
                  }}
                  >
                    <img
                      src={boxIcon}
                    >
                    </img>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="linkTo"
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'15pt',
                      backgroundColor:'transparent',
                      zIndex:1,
                  }}
                  onPress={() => {
                    toggleUserModal()
                  }}
                  >
                    <img
                      src={userIcon}
                      style={{
                        height:'47pt',
                      
                      }}
                    >
                    </img>
                  </TouchableOpacity>
                  <Switch>
                    <Route path="/">
                      {/* <Text>
                        Home
                      </Text> */}
                    </Route>
                    <Route path="/category">
                      <Text>
                        category
                      </Text>
                    </Route>
                  </Switch>
                

            </div>
            

              

          </header>
        )
      }
    }
    else{
      if(width>1051){
      return (    
        <header className={x.join(" ")}>
          <Modal
              animationType="fade"
              transparent={false}
              visible={cartModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed")
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <Text>cart Info</Text>

                  <TouchableHighlight
                    onPress={() => {
                      toggleCartModal()
                    }}>
                    <Text>x</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          <Modal
              animationType="fade"
              transparent={false}
              visible={userModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed")
              }}>
              <View style={{marginTop: 22}}>
                <View>
                <Text>로그인에 실패했습니다. 비밀번호를 다시 확인해 주세요</Text>
                <Text>전화번호</Text>
                  {/* <TextInput 
                    onChangeText={text=>setUser(text)}
                    value={user}
                  ></TextInput> */}
                  <TextInput 
                    onChangeText={
                      text=>{
                        setUserPhoneNumber(text)
                        onPhoneNumberChange()
                      }
                    }
                    // onBlur={
                    //   onPhoneNumberChange()
                    // }
                    value={userPhoneNumber}
                  ></TextInput>
                  <Text>비밀번호</Text>
                  <TextInput
                    onChangeText={
                      text=>{setPassword(text)
                      onPasswordChange()
                      }
                    }
                    // onBlur={
                    //   onPasswordChange()
                    // }
                    secureTextEntry={true}
                    value={password}
                  ></TextInput>
                  
                  <TouchableHighlight
                    onPress={() => {
                      login()
                    }}>
                    <Text>로그인</Text>
                  </TouchableHighlight>
                  
                  <TouchableHighlight
                    onPress={() => {
                      toggleUserModal()
                    }}>
                    <Text>x</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          <div className="headerContainer">
          
            <div className="logo">
              <a
                href="/clip"
              >
                <img src={Logo} alt="Logo" title="Logo" />
              </a>
            </div>

                <TouchableOpacity
                      className="linkTo"
                      id="category"
                      style={{
                          position:'fixed',
                          height:50,
                          width:240,
                          top:38,
                          left:'167pt',
                          backgroundColor:'transparent',
                          zIndex:1
                      }}
                      activeOpacity={0.5}
                  >
                  
                      {/* <Link to="/category">
                        자재카테고리
                      </Link> */}
                      <a 
                      style={
                        {
                          // flex:1,
                          textDecorationLine:'none',
                          // color:'black',
                          // //borderColor:'black',
                          // //borderWidth:2,
                          // backgroundColor:'transparent',
                          // fontSize: '25pt',
                          // fontWeight:'700',
                          // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          // // flex:1,
                          // alignItems:'center',
                          // justifyContent:'center',
                          // flexDirection:'row',
                          // textAlign:'center'
                        }} 
                        href="/category">
              <Text
                    selectable={false} 
                    style ={{
                        fontSize: '25px',
                        fontWeight:'700',
                        textDecorationLine:'none',
                        color:'black',
                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 2,
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        margin:11,
                        // padding:'auto',
                        pointerEvents:'none'

                    }}
                    >
                      자재카테고리
                    </Text>
            </a>
                </TouchableOpacity>
                <TouchableOpacity
                      className='linkTo'
                      style={{
                          position:'fixed',
                          height:50,
                          width:170,
                          top:38,
                          left:'349pt',
                          backgroundColor:'transparent',
                          zIndex:1
                      }}
                      activeOpacity={0.5}
                  >
                    <a 
                      style={
                        {
                          textDecorationLine:'none',
                        }} 
                        href="/constructionpart">
                    <Text
                    selectable={false} 
                    style ={{
                        fontSize: '25px',
                        fontWeight:'700',
                        textDecorationLine:'none',
                        // color:'white',
                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 2,
                        color:'black',
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        margin:11,
                        padding:'auto',
                        pointerEvents:'none'
                    }}
                    >
                      사공부위
                    </Text>
                    </a>
                </TouchableOpacity>
                <TouchableOpacity
                      className="linkTo"
                      style={{
                          position:'fixed',
                          height:50,
                          width:140,
                          top:38,
                          left:'478pt',
                          backgroundColor:'transparent',
                          zIndex:1
                      }}
                      activeOpacity={0.5}
                      onPress={()=>{
                        console.log('tbdd')
                        toggleBrandsDropDown()
                      }}
                  >
                    <a 
                      style={
                        {
                          textDecorationLine:'none',
                        }} 
                        // href="/brands"
                    >
                      <Text
                      selectable={false} 
                      style ={{
                          fontSize: '25px',
                          fontWeight:'700',
                          textDecorationLine:'none',
                          // color:'white',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          color:'black',
                          textAlign:'center',
                          alignItems:'center',
                          justifyContent:'center',
                          flexDirection:'row',
                          margin:11,
                          padding:'auto',
                          pointerEvents:'none'
                      }}
                      >
                        브랜드
                      </Text>
                    </a>
                </TouchableOpacity>
                {/* <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker> */}
                
                <TouchableOpacity
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'173pt',
                    backgroundColor:'transparent',
                    zIndex:1
                }}
                >
                  <img
                    src={searchIcon}
                  >
                  </img>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'103pt',
                    backgroundColor:'transparent',
                    zIndex:1
                }}
                onPress={() => {
                  toggleCartModal()
                }}
                >
                  <img
                    src={boxIcon}
                  >
                  </img>
                </TouchableOpacity>
                <TouchableOpacity
                  className="linkTo"
                  style={{
                    position:'fixed',
                    height:47,
                    width:47,
                    top:'29px',
                    right:'33pt',
                    backgroundColor:'transparent',
                    zIndex:1
                }}
                onPress={() => {
                  toggleUserModal()
                }}
                >
                  <img
                    src={userIcon}
                    style={{
                      height:'47pt',
                    
                    }}
                  >
                  </img>
                </TouchableOpacity>
                <Switch>
                  <Route path="/">
                    {/* <Text>
                      Home
                    </Text> */}
                  </Route>
                  <Route path="/category">
                    <Text>
                      category
                    </Text>
                  </Route>
                </Switch>
              

          </div>
          

            

        </header>
      )
      }
      else if(width>449 && width<=1051){
        return(
        <header className={x.join(" ")}>
        <Modal
            animationType="fade"
            transparent={false}
            visible={cartModalVisible}
            onDismiss={() => {
              // alert('Modal has been closed.');
              console.log("user modal has been closed")
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>cart Info</Text>

                <TouchableHighlight
                  onPress={() => {
                    toggleCartModal()
                  }}>
                  <Text>x</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        <Modal
            animationType="fade"
            transparent={false}
            visible={userModalVisible}
            onDismiss={() => {
              // alert('Modal has been closed.');
              console.log("user modal has been closed")
            }}>
            <View style={{marginTop: 22}}>
              <View>
              <Text>로그인에 실패했습니다. 비밀번호를 다시 확인해 주세요</Text>
              <Text>전화번호</Text>
              {/* <TextInput 
                onChangeText={
                  text=>setUser(text)
                }
                value={user}
              ></TextInput> */}
              <TextInput 
                onChangeText={
                  text=>{
                    setUserPhoneNumber(text)
                    onPhoneNumberChange()
                  }
                }
                // onBlur={
                //   onPhoneNumberChange()
                // }
                value={userPhoneNumber}
              ></TextInput>
              <Text>비밀번호</Text>
              <TextInput
                onChangeText={
                  text=>{setPassword(text)
                  onPasswordChange()
                  }
                }
                // onBlur={
                //   onPasswordChange()
                // }
                secureTextEntry={true}
                value={password}
              ></TextInput>
                <TouchableHighlight
                  onPress={() => {
                    login()
                  }}>
                  <Text>로그인</Text>
                </TouchableHighlight>
                
                <TouchableHighlight
                  onPress={() => {
                    toggleUserModal()
                  }}>
                  <Text>x</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>
        <div className="headerContainer">
        
          <div className="logo">
            <a
              href="/clip"
            >
              <img src={Logo} alt="Logo" title="Logo" />
            </a>
          </div>

              <TouchableOpacity
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'173pt',
                  backgroundColor:'transparent',
                  zIndex:1
              }}
              >
                <img
                  src={searchIcon}
                >
                </img>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'103pt',
                  backgroundColor:'transparent',
                  zIndex:1
              }}
              onPress={() => {
                toggleCartModal()
              }}
              >
                <img
                  src={boxIcon}
                >
                </img>
              </TouchableOpacity>
              <TouchableOpacity
                className="linkTo"
                style={{
                  position:'fixed',
                  height:47,
                  width:47,
                  top:'29px',
                  right:'33pt',
                  backgroundColor:'transparent',
                  zIndex:1
              }}
              onPress={() => {
                toggleUserModal()
              }}
              >
                <img
                  src={userIcon}
                  style={{
                    height:'47pt',
                  
                  }}
                >
                </img>
              </TouchableOpacity>
              <Switch>
                <Route path="/">
                  {/* <Text>
                    Home
                  </Text> */}
                </Route>
                <Route path="/category">
                  <Text>
                    category
                  </Text>
                </Route>
              </Switch>
            

        </div>
        

          

      </header>
      )
      }
      else{
        return (    
          <header className={x.join(" ")}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>cart Info</Text>

                    <TouchableHighlight
                      onPress={() => {
                        toggleCartModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            <Modal
                animationType="fade"
                transparent={false}
                visible={userModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <Text>로그인에 실패했습니다. 비밀번호를 다시 확인해 주세요</Text>
                    <Text>전화번호</Text>
                    <TextInput 
                      onChangeText={
                        text=>{
                          setUserPhoneNumber(text)
                          onPhoneNumberChange()
                        }
                      }
                      // onBlur={
                      //   onPhoneNumberChange()
                      // }
                      value={userPhoneNumber}
                    ></TextInput>
                    <Text>비밀번호</Text>
                    <TextInput
                      onChangeText={
                        text=>{setPassword(text)
                        onPasswordChange()
                        }
                      }
                      // onBlur={
                      //   onPasswordChange()
                      // }
                      secureTextEntry={true}
                      
                      value={password}
                    ></TextInput>
                    <TouchableHighlight
                      onPress={() => {
                        login()
                      }}>
                      <Text>로그인</Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight
                      onPress={() => {
                        toggleUserModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            <div className="headerContainer">
            
              <div className="logo">
                <a
                  href="/clip"
                >
                  <img src={Logo} alt="Logo" title="Logo" />
                </a>
              </div>

                
                  <TouchableOpacity
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'105pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  >
                    <img
                      src={searchIcon}
                    >
                    </img>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'60pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  onPress={() => {
                    toggleCartModal()
                  }}
                  >
                    <img
                      src={boxIcon}
                    >
                    </img>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="linkTo"
                    style={{
                      position:'fixed',
                      height:47,
                      width:47,
                      top:'29px',
                      right:'15pt',
                      backgroundColor:'transparent',
                      zIndex:1
                  }}
                  onPress={() => {
                    toggleUserModal()
                  }}
                  >
                    <img
                      src={userIcon}
                      style={{
                        height:'47pt',
                      
                      }}
                    >
                    </img>
                  </TouchableOpacity>
                  <Switch>
                    <Route path="/">
                      {/* <Text>
                        Home
                      </Text> */}
                    </Route>
                    <Route path="/category">
                      <Text>
                        category
                      </Text>
                    </Route>
                  </Switch>
                

            </div>
            

              

          </header>
        )
      }
    }
  }
};

export default Navbar;