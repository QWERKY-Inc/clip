import React,{useEffect} from 'react';
import Navbar from './Navbar';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,Image,View,Modal,TouchableHighlight,Dimensions} from 'react-native';

function MainMoodBoard() {

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
            // console.log(data)
            console.log('data read : ' , data.listCategory[0].ct_img_url);
            })
            .catch(err=>{
                console.log(err)
            })
      },[])
    
    if(width>940){

        if(data!=undefined){
            return (
                <div className="MainContent"
                    style={{
                        display:'block',
                        height:'auto',
                        backgroundColor:'black',
                        paddingTop:'77pt'
                    }}
                >
                    <div
                        style={{
                            display:'block',
                            height:'150px',
                            backgroundColor:'transparent',
                            topMargin:'77pt',
                            flexDirection:'column',
                            textAlign:'left',
                            paddingLeft:'100px'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '25pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                        무드보드
                        </Text> 
                        <br></br>
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                            새로운 아이디어와 컨셉을 찾아보세요.
                        </Text> 
                        <br></br>
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                            어떤 자재가 어떤 컨셉으로 활용되는지 알아볼 수 있습니다.
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
                                paddingLeft: '77pt',
                                paddingRight: '77pt'
                            }}
                        >
                            
                        
                    {data.listMoodboard.map((listMoodboard)=>

                    
                        <TouchableOpacity
                        style={{
                            flexDirection:'column',
                            borderRadius:10,
                            height:'260pt',
                            width:"200pt",
                            backgroundColor:'rgb(33,33,33)',
                            // boxShadow:'0px 0px 2px',
                            
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
                                flexDirection:'column',
                                marginLeft:'25pt',
                                marginRight:'25pt',
                                marginTop:'25pt',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            
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
                                // data.listCategory[i].ct_img_url
                                listMoodboard.mb_img_url
                        }}

                    >
                    </Image>
                    {/* <a
                        style={{
                        transform:[{
                            translateX:'100px'
                        }]
                        }}
                    > */}
                        <View
                            style ={{
                                height:'60pt',
                                width:'200pt',
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
                                // borderTopRightRadius:20,
                                // borderBottomRightRadius:20,
                                backgroundColor:'rgb(33,33,33)',
                                // zIndex:99,
                                pointerEvents:'none',
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                                // left:0,
                                
                            }}
                        >
                            <View
                                style ={{
                                    height:'60pt',
                                    width:'190pt',
                                    fontSize: '15pt',
                                    fontWeight:'700',
                                    textDecorationLine:'none',
                                    // color:'white',
                                    // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                    // textShadowOffset: {width: 0, height: 0},
                                    // textShadowRadius: 2,
                                    borderBottomLeftRadius:10,
                                    borderBottomRightRadius:10,
                                    color:'black',
                                    textAlign:'center',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:"rgb(33,33,33)",
                                    // zIndex:99,
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
                                        // color:'white',
                                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                        // textShadowOffset: {width: 0, height: 0},
                                        // textShadowRadius: 2,
                                        color:'white',
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
                                    {listMoodboard.mb_name}
                                </Text>
                            </View>
                        </View>
                    {/* </a> */}
                    </TouchableOpacity>
                    )}
                    </View>
                   
                    
                
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
    else if(width > 760 && width<=940){

        if(data!=undefined){
            return (
                <div className="MainContent"
                    style={{
                        display:'block',
                        height:'auto',
                        backgroundColor:'black',
                        paddingTop:'77pt'

                    }}
                >
                    <div
                        style={{
                            display:'block',
                            height:'150px',
                            backgroundColor:'transparent',
                            topMargin:'77pt',
                            flexDirection:'column',
                            textAlign:'left',
                            paddingLeft:'100px'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '25pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                        무드보드
                        </Text> 
                        <br></br>
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                            새로운 아이디어와 컨셉을 찾아보세요.
                        </Text> 
                        <br></br>
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                            어떤 자재가 어떤 컨셉으로 활용되는지 알아볼 수 있습니다.
                        </Text> 
                    </div>
                        <View
                            style={{
                                flex: 1, 
                                // flexDirection: 'row',
                                // justifyContent: 'space-between',
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto',
                                paddingLeft: '77pt',
                                paddingRight: '77pt'
                            }}
                        >
                            
                        
                    {data.listMoodboard.map((listMoodboard)=>

                    
                        <TouchableOpacity
                        style={{
                            flexDirection:'column',
                            borderRadius:10,
                            height:'260pt',
                            width:"200pt",
                            backgroundColor:'rgb(33,33,33)',
                            // boxShadow:'0px 0px 2px',
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
                            flexDirection:'column',
                            marginLeft:'25pt',
                            marginRight:'25pt',
                            marginTop:'25pt',
                            padding:'auto',
                            zIndex:2
                                // backgroundColor:'red'
                            
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
                                // data.listCategory[i].ct_img_url
                                listMoodboard.mb_img_url
                        }}

                    >
                    </Image>
                    {/* <a
                        style={{
                        transform:[{
                            translateX:'100px'
                        }]
                        }}
                    > */}
                        <View
                            style ={{
                                height:'60pt',
                                width:'200pt',
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
                                // borderTopRightRadius:20,
                                // borderBottomRightRadius:20,
                                backgroundColor:'rgb(33,33,33)',
                                // zIndex:99,
                                pointerEvents:'none',
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                                // left:0,
                                
                            }}
                        >
                            <View
                                style ={{
                                    height:'60pt',
                                    width:'190pt',
                                    fontSize: '15pt',
                                    fontWeight:'700',
                                    textDecorationLine:'none',
                                    // color:'white',
                                    // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                    // textShadowOffset: {width: 0, height: 0},
                                    // textShadowRadius: 2,
                                    borderBottomLeftRadius:10,
                                    borderBottomRightRadius:10,
                                    color:'black',
                                    textAlign:'center',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:"rgb(33,33,33)",
                                    // zIndex:99,
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
                                        // color:'white',
                                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                        // textShadowOffset: {width: 0, height: 0},
                                        // textShadowRadius: 2,
                                        color:'white',
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
                                    {listMoodboard.mb_name}
                                </Text>
                            </View>
                        </View>
                    {/* </a> */}
                    </TouchableOpacity>
                    )}
                    </View>
                   
                    
                
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
    else if(width > 512 && width<=760){

        if(data!=undefined){
            return (
                <div className="MainContent"
                    style={{
                        display:'block',
                        height:'auto',
                        backgroundColor:'black',
                        paddingTop:'77pt'
                    }}
                >
                    <div
                        style={{
                            display:'block',
                            height:'150px',
                            backgroundColor:'transparent',
                            topMargin:'77pt',
                            flexDirection:'column',
                            textAlign:'left',
                            paddingLeft:'100px'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '25pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                        무드보드
                        </Text> 
                        <br></br>
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                            새로운 아이디어와 컨셉을 찾아보세요.
                        </Text> 
                        <br></br>
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                            어떤 자재가 어떤 컨셉으로 활용되는지 알아볼 수 있습니다.
                        </Text> 
                    </div>
                        <View
                            style={{
                                flex: 1, 
                                // flexDirection: 'row',
                                // justifyContent: 'space-between',
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto',
                                paddingLeft: '77pt',
                                paddingRight: '77pt'
                            }}
                        >
                            
                        
                    {data.listMoodboard.map((listMoodboard)=>

                    
                        <TouchableOpacity
                        style={{
                            flexDirection:'column',
                            borderRadius:10,
                            height:'260pt',
                            width:"200pt",
                            backgroundColor:'rgb(33,33,33)',
                            // boxShadow:'0px 0px 2px',
                            
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
                                flexDirection:'column',
                                marginLeft:'auto',
                                marginRight:'auto',
                                marginTop:'25pt',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            
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
                                // data.listCategory[i].ct_img_url
                                listMoodboard.mb_img_url
                        }}

                    >
                    </Image>
                    {/* <a
                        style={{
                        transform:[{
                            translateX:'100px'
                        }]
                        }}
                    > */}
                        <View
                            style ={{
                                height:'60pt',
                                width:'200pt',
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
                                // borderTopRightRadius:20,
                                // borderBottomRightRadius:20,
                                backgroundColor:'rgb(33,33,33)',
                                // zIndex:99,
                                pointerEvents:'none',
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                                // left:0,
                                
                            }}
                        >
                            <View
                                style ={{
                                    height:'60pt',
                                    width:'190pt',
                                    fontSize: '15pt',
                                    fontWeight:'700',
                                    textDecorationLine:'none',
                                    // color:'white',
                                    // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                    // textShadowOffset: {width: 0, height: 0},
                                    // textShadowRadius: 2,
                                    borderBottomLeftRadius:10,
                                    borderBottomRightRadius:10,
                                    color:'black',
                                    textAlign:'center',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:"rgb(33,33,33)",
                                    // zIndex:99,
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
                                        // color:'white',
                                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                        // textShadowOffset: {width: 0, height: 0},
                                        // textShadowRadius: 2,
                                        color:'white',
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
                                    {listMoodboard.mb_name}
                                </Text>
                            </View>
                        </View>
                    {/* </a> */}
                    </TouchableOpacity>
                    )}
                    </View>
                   
                    
                
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
    else {

        if(data!=undefined){
            return (
                <div className="MainContent"
                    style={{
                        display:'block',
                        height:'auto',
                        backgroundColor:'black',
                        paddingTop:'77pt'
                    }}
                >
                    <div
                        style={{
                            display:'block',
                            height:'150px',
                            backgroundColor:'transparent',
                            topMargin:'77pt',
                            flexDirection:'column',
                            textAlign:'left',
                            // paddingLeft:'auto',
                            // paddingRight:'auto'
                            paddingLeft:'45px',
                            paddingRight:'45px'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: '25pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'center',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                        무드보드
                        </Text> 
                        <br></br>
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                            새로운 아이디어와 컨셉을 찾아보세요.
                        </Text> 
                        <br></br>
                        <Text
                            style={{
                                fontSize: '15pt',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'white',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginTop:'40px',
                                marginBottom:'40px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            }}
                        > 
                            어떤 자재가 어떤 컨셉으로 활용되는지 알아볼 수 있습니다.
                        </Text> 
                    </div>
                        <View
                            style={{
                                flex: 1, 
                                // flexDirection: 'row',
                                justifyContent: 'center',
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto',
                                paddingLeft: 'auto',
                                paddingRight: 'auto'
                            }}
                        >
                            
                        
                    {data.listMoodboard.map((listMoodboard)=>

                    
                        <TouchableOpacity
                        style={{
                            flexDirection:'column',
                            borderRadius:10,
                            height:'260pt',
                            width:"200pt",
                            backgroundColor:'rgb(33,33,33)',
                            // boxShadow:'0px 0px 2px',
                            
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
                                flexDirection:'column',
                                marginLeft:'25px',
                                marginRight:'25px',
                                marginTop:'25px',
                                padding:'auto',
                                zIndex:2
                                // backgroundColor:'red'
                            
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
                                // data.listCategory[i].ct_img_url
                                listMoodboard.mb_img_url
                        }}

                    >
                    </Image>
                    {/* <a
                        style={{
                        transform:[{
                            translateX:'100px'
                        }]
                        }}
                    > */}
                        <View
                            style ={{
                                height:'60pt',
                                width:'200pt',
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
                                // borderTopRightRadius:20,
                                // borderBottomRightRadius:20,
                                backgroundColor:'rgb(33,33,33)',
                                // zIndex:99,
                                pointerEvents:'none',
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                                // left:0,
                                
                            }}
                        >
                            <View
                                style ={{
                                    height:'60pt',
                                    width:'190pt',
                                    fontSize: '15pt',
                                    fontWeight:'700',
                                    textDecorationLine:'none',
                                    // color:'white',
                                    // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                    // textShadowOffset: {width: 0, height: 0},
                                    // textShadowRadius: 2,
                                    borderBottomLeftRadius:10,
                                    borderBottomRightRadius:10,
                                    color:'black',
                                    textAlign:'center',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:"rgb(33,33,33)",
                                    // zIndex:99,
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
                                        // color:'white',
                                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                        // textShadowOffset: {width: 0, height: 0},
                                        // textShadowRadius: 2,
                                        color:'white',
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
                                    {listMoodboard.mb_name}
                                </Text>
                            </View>
                        </View>
                    {/* </a> */}
                    </TouchableOpacity>
                    )}
                    </View>
                   
                    
                
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
  
  export default MainMoodBoard;