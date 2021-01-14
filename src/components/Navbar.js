import React,{useEffect} from 'react';
import './navbar.css';
// import Logo from './../logo.svg';
import {TouchableOpacity,Text,View,Modal,TouchableHighlight,Dimensions} from 'react-native';
import Logo from '../assets/header_logo.png'
import { nativeTouchData } from 'react-dom/test-utils';
import searchIcon from '../assets/icnSearch.png'
import userIcon from '../assets/icnUser.png'
import boxIcon from '../assets/icnBox.png'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'

const Navbar=() => {
  const [scrolled,setScrolled]=React.useState(false);
  const [userModalVisible,setUserModalVisible]=React.useState(false);
  const [cartModalVisible,setCartModalVisible]=React.useState(false);
  const [height,setHeight]=React.useState(Dimensions.get('window').height)
  const [width,setWidth]=React.useState(Dimensions.get('window').width)

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
  const onChange=()=>{
    setHeight(Dimensions.get('window').height)
    setWidth(Dimensions.get('window').width)
    console.log(height+" : "+width)
  }
  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
    Dimensions.addEventListener('change',onChange)
  })

  let x=['navbar'];
  if(scrolled){
    x.push('scrolled');
  }
  if(width>1024){
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
                <Text>exit</Text>
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
              <Text>user Info</Text>

              <TouchableHighlight
                onPress={() => {
                  toggleUserModal()
                }}>
                <Text>exit</Text>
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
                      top:44,
                      left:'167pt',
                      backgroundColor:'transparent',
                      zIndex:101
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
                    fontSize: '25pt',
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
                      top:44,
                      left:'349pt',
                      backgroundColor:'transparent',
                      zIndex:101
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
                    fontSize: '25pt',
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
                      top:44,
                      left:'478pt',
                      backgroundColor:'transparent',
                      zIndex:101
                  }}
                  activeOpacity={0.5}
              >
                <a 
                  style={
                    {
                      textDecorationLine:'none',
                    }} 
                    href="/brands">
                  <Text
                  selectable={false} 
                  style ={{
                      fontSize: '25pt',
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
                top:'29pt',
                right:'173pt',
                backgroundColor:'transparent',
                zIndex:101
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
                top:'29pt',
                right:'103pt',
                backgroundColor:'transparent',
                zIndex:101
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
                top:'29pt',
                right:'33pt',
                backgroundColor:'transparent',
                zIndex:101,
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
else if(width>449 && width<=1024){
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
            <Text>exit</Text>
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
          <Text>user Info</Text>

          <TouchableHighlight
            onPress={() => {
              toggleUserModal()
            }}>
            <Text>exit</Text>
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
            top:'29pt',
            right:'173pt',
            backgroundColor:'transparent',
            zIndex:101
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
            top:'29pt',
            right:'103pt',
            backgroundColor:'transparent',
            zIndex:101
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
            top:'29pt',
            right:'33pt',
            backgroundColor:'transparent',
            zIndex:101,
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
                <Text>exit</Text>
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
              <Text>user Info</Text>

              <TouchableHighlight
                onPress={() => {
                  toggleUserModal()
                }}>
                <Text>exit</Text>
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
                top:'29pt',
                right:'105pt',
                backgroundColor:'transparent',
                zIndex:101
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
                top:'29pt',
                right:'60pt',
                backgroundColor:'transparent',
                zIndex:101
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
                top:'29pt',
                right:'15pt',
                backgroundColor:'transparent',
                zIndex:101,
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
};

export default Navbar;