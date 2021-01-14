import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,Image,View,Modal,TouchableHighlight} from 'react-native';

function MainContent() {

    const[data,setData]=React.useState(undefined)
    fetch('/Mainitem')
    .then(res=>res.json())
    .catch(err=>{
        console.log(err)
    })
    .then(incomingData=>setData(incomingData),()=>{
    
      console.log(data)
      console.log('data read : ' , data.listCategory[0].ct_img_url);
    })
    .catch(err=>{
        console.log(err)
    })
    if(data!=undefined){
        return (
            <div className="MainContent"
                style={{
                    display:'block',
                    height:'auto',

                }}
            >
                <Text> 
                  MainContent
                </Text> 
                {/* <Text> */}
                  {/* {data.listCategory[0].ct_img_url} */}
                  {/* construction */}
                  {/* <img 
                    style={{
                      height:'65pt',
                      width:'99pt',
                    }} src={data.listCategory[0].ct_img_url}
                  /> */}
                  <TouchableOpacity
                    style={{
                        borderRadius:20,
                        height:'65pt',
                        width:350,
                        backgroundColor:'white',
                        boxShadow:'0px 0px 2px',
                        
                            fontSize: '25pt',
                            fontWeight:'700',
                            textDecorationLine:'none',
                            // color:'white',
                            // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 2,
                            color:'black',
                            textAlign:'left',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                            margin:11,
                            padding:'auto',
                            // zIndex:100
                            // backgroundColor:'red'
                        
                    }}
                  >
                  <Image
                    style={{
                      height:'65pt',
                      width:'99pt',
                      borderTopLeftRadius:20,
                      borderBottomLeftRadius:20,
                    //   zIndex:99,
                      pointerEvents:'none',
                      transform:[{
                          translateX:'-80px'
                      }]
                    }}
                    source={{
                        uri:
                            data.listCategory[0].ct_img_url
                    }}

                  >
                  </Image>
                  <a
                    style={{
                        transform:[{
                            translateX:'-100px'
                        }]
                    }}
                  >
                      <Text
                        style ={{
                            height:'65pt',
                            width:'99pt',
                            fontSize: '15pt',
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
                            pointerEvents:'none',
                            backgroundColor:'transparent',
                            // zIndex:99,
                            pointerEvents:'none',
                            
                        }}
                      >
                          {data.listCategory[0].ct_text}
                      </Text>
                  </a>
                  </TouchableOpacity>
                {/* </Text> */}
                <Content/>
                  
                
              
            </div>
          );
    }
    else{
        return (
            <div className="MainContent">
             
                <Navbar />
                <NavBarFiller/>
                <Text> 
                  MainContent
                </Text> 
                <br></br>
                <Text>
                  loading
                </Text>
                <Content/>
                  
                
              
            </div>
          );
    }
    
  }
  
  export default MainContent;