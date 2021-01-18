import React,{useEffect} from 'react';
import Navbar from './Navbar';

import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,Image,View,Modal,TouchableHighlight,Dimensions,Linking} from 'react-native';

function MainMaterialCategory() {

    const[data,setData]=React.useState(undefined)
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
      useEffect(() => {
        Dimensions.addEventListener('change',onChange)
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
      },[])
    
    if(width>1000){

        if(data!=undefined){
            return (
                <div className="MainContent"
                    style={{
                        display:'block',
                        height:'auto',

                    }}
                >
                <div
                    style={{
                        display:'block',
                        height:'50px',
                        backgroundColor:'transparent',
                        topMargin:'77pt',
                        flexDirection:'column',
                        textAlign:'left',
                        paddingLeft:'100pt'
                    }}
                >
                    <Text
                        style={{
                            fontSize: '25px',
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
                </div>   
                        <View
                            style={{
                                flex: 1, 
                                // flexDirection: 'row',
                                // justifyContent: 'space-between',
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto auto',
                                padding: '10px'
                            }}
                        >
                            
                        
                    {data.listCategory.map((listCategory)=>

                    
                        <TouchableOpacity
                        style={{
                            borderRadius:10,
                            height:'65pt',
                            width:"350px",
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
                                marginLeft:'auto',
                                marginRight:'auto',
                                marginTop:'25pt',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            
                        }}
                        onPress={() => Linking.openURL(`/category?cat_num=${listCategory.ct_id}`)}
                    >
                    
                    <Image
                        style={{
                        display:'block',
                        height:'65pt',
                        width:'99pt',
                        borderTopLeftRadius:10,
                        borderBottomLeftRadius:10,
                        zIndex:1,
                        pointerEvents:'none',
                        transform:[{
                            translateX:'-10px',
                            translateY:'-100px'
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
                            translateX:'100px'
                        }]
                        }}
                    >
                        <View
                            style ={{
                                height:'65pt',
                                width:'200px',
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                // color:'white',
                                // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                // textShadowOffset: {width: 0, height: 0},
                                // textShadowRadius: 2,
                                color:'black',
                                textAlign:'center',
                                // alignItems:'center',
                                // justifyContent:'center',
                                flexDirection:'row',
                                // margin:11,
                                // padding:'auto',
                                pointerEvents:'none',
                                borderTopRightRadius:10,
                                borderBottomRightRadius:10,
                                backgroundColor:'white',
                                // zIndex:99,
                                pointerEvents:'none',
                                
                            }}
                        >
                            <View
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
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:'white',
                                    // zIndex:99,
                                    pointerEvents:'none',
                                    
                                }}
                            >
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
                                        textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginTop:'45pt',
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
                            </View>
                        </View>
                    </a>
                    </TouchableOpacity>
                    )}
                    </View>
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
                    {/* <Content/> */}
                    
                    
                
                </div>
            );
        }
        else{
            return (
                <div className="MainContent">
                
                    <Navbar />
                    <NavBarFiller/>
                    <Text>
                    로딩중 ...
                    </Text>
                    {/* <Content/> */}
                    
                    
                
                </div>
            );
        }
    
    }
    else if(width>684 && width<=1000){
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
                            fontSize: '25px',
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
                        <View
                            style={{
                                flex: 1, 
                                // flexDirection: 'row',
                                // justifyContent: 'space-between',
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto',
                                padding: '10px'
                            }}
                        >
                            
                        
                    {data.listCategory.map((listCategory)=>

                    
                        <TouchableOpacity
                        style={{
                            borderRadius:10,
                            height:'65pt',
                            width:"350px",
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
                                marginLeft:'auto',
                                marginRight:'auto',
                                marginTop:'25pt',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            
                        }}
                        onPress={() => Linking.openURL(`/category?cat_num=${listCategory.ct_id}`)}
                    >
                    
                    <Image
                        style={{
                        display:'block',
                        height:'65pt',
                        width:'99pt',
                        borderTopLeftRadius:10,
                        borderBottomLeftRadius:10,
                        zIndex:1,
                        pointerEvents:'none',
                        transform:[{
                            translateX:'-10px',
                            translateY:'-100px'
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
                            translateX:'100px'
                        }]
                        }}
                    >
                        <View
                            style ={{
                                height:'65pt',
                                width:'200px',
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                // color:'white',
                                // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                // textShadowOffset: {width: 0, height: 0},
                                // textShadowRadius: 2,
                                color:'black',
                                textAlign:'center',
                                // alignItems:'center',
                                // justifyContent:'center',
                                flexDirection:'row',
                                // margin:11,
                                // padding:'auto',
                                pointerEvents:'none',
                                borderTopRightRadius:10,
                                borderBottomRightRadius:10,
                                backgroundColor:'white',
                                // zIndex:99,
                                pointerEvents:'none',
                                
                            }}
                        >
                            <View
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
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:'white',
                                    // zIndex:99,
                                    pointerEvents:'none',
                                    
                                }}
                            >
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
                                        textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginTop:'45pt',
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
                            </View>
                        </View>
                    </a>
                    </TouchableOpacity>
                    )}
                    </View>
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
                    {/* <Content/> */}
                    
                    
                
                </div>
            );
        }
        else{
            return (
                <div className="MainContent">
                
                    <Navbar />
                    <NavBarFiller/>
                    <Text>
                    로딩중 ...
                    </Text>
                    {/* <Content/> */}
                    
                    
                
                </div>
            );
        }
    }
    else{
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
                            fontSize: '25px',
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
                        <View
                            style={{
                                flex: 1, 
                                // flexDirection: 'row',
                                // justifyContent: 'space-between',
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto',
                                padding: '10px'
                            }}
                        >
                            
                        
                    {data.listCategory.map((listCategory)=>

                    
                        <TouchableOpacity
                        style={{
                            borderRadius:10,
                            height:'65pt',
                            width:"350px",
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
                                marginLeft:'auto',
                                marginRight:'auto',
                                marginTop:'25pt',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                        }}
                        // onPress={() => Linking.openURL(`/category:${listCategory.ct_id}`)}
                        onPress={() => Linking.openURL(`/category?cat_num=${listCategory.ct_id}`)}
                    >
                    
                    <Image
                        style={{
                        display:'block',
                        height:'65pt',
                        width:'99pt',
                        borderTopLeftRadius:10,
                        borderBottomLeftRadius:10,
                        zIndex:1,
                        pointerEvents:'none',
                        transform:[{
                            translateX:'-10px',
                            translateY:'-100px'
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
                            translateX:'100px'
                        }]
                        }}
                    >
                        <View
                            style ={{
                                height:'65pt',
                                width:'200px',
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                // color:'white',
                                // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                // textShadowOffset: {width: 0, height: 0},
                                // textShadowRadius: 2,
                                color:'black',
                                textAlign:'center',
                                // alignItems:'center',
                                // justifyContent:'center',
                                flexDirection:'row',
                                // margin:11,
                                // padding:'auto',
                                pointerEvents:'none',
                                borderTopRightRadius:10,
                                borderBottomRightRadius:10,
                                backgroundColor:'white',
                                // zIndex:99,
                                pointerEvents:'none',
                                
                            }}
                        >
                            <View
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
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:'white',
                                    // zIndex:99,
                                    pointerEvents:'none',
                                    
                                }}
                            >
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
                                        textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginTop:'45pt',
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
                            </View>
                        </View>
                    </a>
                    </TouchableOpacity>
                    )}
                    </View>
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
                    {/* <Content/> */}
                    
                    
                
                </div>
            );
        }
        else{
            return (
                <div className="MainContent">
                
                    <Navbar />
                    <NavBarFiller/>
                    <Text>
                    로딩중 ...
                    </Text>
                    {/* <Content/> */}
                    
                    
                
                </div>
            );
        }
    }
}
  
  export default MainMaterialCategory;