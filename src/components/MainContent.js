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
                
                <Text
                    style={{
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
                        zIndex:2
                        // backgroundColor:'red'
                    }}
                > 
                  자재 카테고리
                </Text> 
              
                {data.listCategory.map((listCategory)=>

                
                    <TouchableOpacity
                    style={{
                        borderRadius:20,
                        height:'65pt',
                        width:"90vw",
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
                            margin:'auto',
                            padding:'auto',
                            zIndex:2
                            // backgroundColor:'red'
                        
                    }}
                  >
                  
                  <Image
                    style={{
                      display:'block',
                      height:'65pt',
                      width:'99pt',
                      borderTopLeftRadius:20,
                      borderBottomLeftRadius:20,
                      zIndex:1,
                      pointerEvents:'none',
                      transform:[{
                          translateX:'-110px',
                          translateY:'100px'
                      }]
                    }}
                    source={{
                        uri:
                            // data.listCategory[i].ct_img_url
                            listCategory.ct_img_url
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
                  <div>
                      <Text
                        style ={{
                            height:'65pt',
                            width:'99px',
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
                            // margin:11,
                            // padding:'auto',
                            pointerEvents:'none',
                            backgroundColor:'transparent',
                            // zIndex:99,
                            pointerEvents:'none',
                            
                        }}
                      >
                          {/* {data.listCategory[i].ct_text} */}
                          {listCategory.ct_text}
                      </Text>
                    </div>
                  </a>
                  </TouchableOpacity>
                )}
                {/* <Text> */}
                  {/* {data.listCategory[0].ct_img_url} */}
                  {/* construction */}
                  {/* <img 
                    style={{
                      height:'65pt',
                      width:'99pt',
                    }} src={data.listCategory[0].ct_img_url}
                  /> */}
                  
                  
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