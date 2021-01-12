import React,{useEffect} from 'react';
import './navbar.css';
// import Logo from './../logo.svg';
import {TouchableOpacity,Text,View} from 'react-native';
import Logo from '../assets/header_logo.png'
import { nativeTouchData } from 'react-dom/test-utils';

const Navbar=() => {
  const [scrolled,setScrolled]=React.useState(false);

  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })

  let x=['navbar'];
  if(scrolled){
    x.push('scrolled');
  }
  return (
    <header className={x.join(" ")}>
      <div className="headerContainer">
        <div className="logo">
          <img src={Logo} alt="Logo" title="Logo" />
        </div>
            <TouchableOpacity
                  style={{
                      position:'fixed',
                      height:50,
                      width:200,
                      top:35,
                      left:'187pt',
                      backgroundColor:'transparent',
                      zIndex:101
                  }}
                  activeOpacity={0.5}
              >
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
                    padding:'auto',
                    pointerEvents:'none'
                }}
                >
                  자체카테고리
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                  style={{
                      position:'fixed',
                      height:50,
                      width:150,
                      top:35,
                      left:'349pt',
                      backgroundColor:'transparent',
                      zIndex:101
                  }}
                  activeOpacity={0.5}
              >
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
            </TouchableOpacity>
            <TouchableOpacity
                  style={{
                      position:'fixed',
                      height:50,
                      width:120,
                      top:35,
                      left:'478pt',
                      backgroundColor:'transparent',
                      zIndex:101
                  }}
                  activeOpacity={0.5}
              >
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
            </TouchableOpacity>
          {/* </div> */}
          {/* <div className="headerLinksJoin"> */}
            {/* <button className='linkButton'>
              가입
            </button> */}
             

      </div>
       

        

    </header>
  )
};

export default Navbar;