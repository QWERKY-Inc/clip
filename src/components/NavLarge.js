import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking} from 'react-native';
const queryString = require('query-string');

function NavLarge(props) {
  // var bestProducts
  const[brandListData,setBrandListData]=React.useState([])
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
  const oneBrand=(ct_id)=>{
      fetch('/onebrand?'+
        queryString.stringify({
              ct_id:ct_id
            })
      )
      .then(res=>res.json())
      .then((incomingData)=>{
        // console.log(incomingData)
        setBrandData(incomingData)
        })
      .catch(err=>{
          console.log(err)
      })
    
  }
  useEffect(() => {
      
    const parsed = queryString.parse(props.location.search);
    console.log(parsed.ct_id==undefined)
    if(parsed.ct_id==undefined){
      brands()
      setDetailView(false)
    }
    else{
      oneBrand(parsed.ct_id)
      setBrandId(parsed.ct_id)
      setDetailView(true)
    }
    
  },[])
  useEffect(()=>{
    console.log(typeof(brandListData))
    console.log(brandListData)

  },[brandListData])
  useEffect(()=>{
    if(brandData.bestproducts_brand){
      console.log(brandData.bestproducts_brand)
    }
  },[brandData])
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
              {/* <div
                style={{
                  position:'fixed',
                  height:'100vh',
                  width:'100vw',
                  top:'100px',
                  left:0,
                  backgroundColor:'red'
                }}
              >
              </div> */}
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
  export default NavLarge;