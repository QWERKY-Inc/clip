import React,{useEffect} from 'react';
import Navbar from './Navbar';

import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,Image,View,Modal,TouchableHighlight,Dimensions,Linking} from 'react-native';
import Font from 'react-font'
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
                <Font family='Noto Sans KR'>
                <div className="MainContent"
                    style={{
                        display:'block',
                        height:'auto',
                        textAlign:'left',
                    }}
                >
                 
                    <span
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
                            marginLeft:'100px',
                            padding:'auto',
                            zIndex:2,
                            // backgroundColor:'red'
                        }}
                    > 
                    자재 카테고리
                    </span> 
                        <div
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

                    
                        <a
                        style={{
                            borderRadius:10,
                            height:'50pt',
                            width:"350px",
                            backgroundColor:'white',
                            boxShadow:'0px 0px 2px',
                            display:'flex',
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
                                zIndex:2,
                                backgroundColor:'white',
                                
                            
                        }}
                        //onPress={() => Linking.openURL(`/category?cat_num=${listCategory.ct_id}`)}
                        // onPress={() => Linking.openURL(`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`)}
                        href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                    >
                    <div
                        style={{
                            transform:'translate(-36px,0px)'
                        }}
                    >
                        <img
                            style={{
                            display:'block',
                            height:'50pt',
                            width:'60pt',
                            borderTopLeftRadius:10,
                            borderBottomLeftRadius:10,
                            zIndex:1,
                            pointerEvents:'none',
                            // transform:[{
                            //     translateX:'-35px',
                            //     translateY:'-100px'
                            // }]
                            }}
                            // source={{
                            //     uri:
                            //         // data.listCategory[i].ct_img_url
                            //         listCategory.ct_img_url
                            // }}
                            src={listCategory.ct_img_url}

                        >
                        </img>
                    </div>
                    <a
                        style={{
                        transform:"translate(-15px,0px)",
                        backgroundColor:'transparent'
                        }}
                    >
                        <div
                            style ={{
                                height:'50pt',
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
                                backgroundColor:'transparent',
                                // zIndex:99,
                                pointerEvents:'none',
                                
                            }}
                        >
                            <div
                                style ={{
                                    height:'40pt',
                                    width:'99px',
                                    fontSize: '15pt',
                                    fontWeight:'700',
                                    textDecorationLine:'none',
                                    // color:'white',
                                    // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                    // textShadowOffset: {width: 0, height: 0},
                                    // textShadowRadius: 2,
                                    color:'black',
                                    // textAlign:'center',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:'transparent',
                                    // zIndex:99,
                                    pointerEvents:'none',
                                    lineHeight:'50pt',
                                    textAlign:'left',
                                }}
                            >
                                <span
                                    style ={{
                                        height:'50pt',
                                        width:'99px',
                                        fontSize: '15pt',
                                        fontWeight:'700',
                                        textDecorationLine:'none',
                                        // color:'white',
                                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                        // textShadowOffset: {width: 0, height: 0},
                                        // textShadowRadius: 2,
                                        color:'black',
                                        // textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginTop:'45pt',
                                        // padding:'auto',
                                        pointerEvents:'none',
                                        backgroundColor:'transparent',
                                        // zIndex:99,
                                        pointerEvents:'none',
                                        whiteSpace:'nowrap'
                                    }}
                                >
                                    {/* {data.listCategory[i].ct_text} */}
                                    {listCategory.ct_text}
                                </span>
                            </div>
                        </div>
                    </a>
                    </a>
                    )}
                    </div>
                    {/* <span> */}
                    {/* {data.listCategory[0].ct_img_url} */}
                    {/* construction */}
                    {/* <img 
                        style={{
                        height:'65pt',
                        width:'99pt',
                        }} src={data.listCategory[0].ct_img_url}
                    /> */}
                    
                    
                    {/* </span> */}
                    {/* <Content/> */}
                    
                    
                
                </div>
                </Font>
            );
        }
        else{
            return (
                <Font family='Noto Sans KR'>
                <div className="MainContent">
                
                    <Navbar />
                    <NavBarFiller/>
                    <span>
                    로딩중 ...
                    </span>
                    {/* <Content/> */}
                    
                    
                
                </div>
                </Font>
            );
        }
    
    }
    else if(width>803 && width<=1000){
        if(data!=undefined){
            return (
                <Font family='Noto Sans KR'>
                <div className="MainContent"
                    style={{
                        display:'block',
                        height:'auto',
                        textAlign:'left',
                    }}
                >
                 
                    <span
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
                            marginLeft:'100px',
                            padding:'auto',
                            zIndex:2,
                            // backgroundColor:'red'
                        }}
                    > 
                    자재 카테고리
                    </span> 
                        <div
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

                    
                        <a
                        style={{
                            borderRadius:10,
                            height:'50pt',
                            width:"350px",
                            backgroundColor:'white',
                            boxShadow:'0px 0px 2px',
                            display:'flex',
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
                                zIndex:2,
                                backgroundColor:'white',
                                
                            
                        }}
                        //onPress={() => Linking.openURL(`/category?cat_num=${listCategory.ct_id}`)}
                        // onPress={() => Linking.openURL(`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`)}
                        href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                    >
                    <div
                        style={{
                            transform:'translate(-36px,0px)'
                        }}
                    >
                        <img
                            style={{
                            display:'block',
                            height:'50pt',
                            width:'60pt',
                            borderTopLeftRadius:10,
                            borderBottomLeftRadius:10,
                            zIndex:1,
                            pointerEvents:'none',
                            // transform:[{
                            //     translateX:'-35px',
                            //     translateY:'-100px'
                            // }]
                            }}
                            // source={{
                            //     uri:
                            //         // data.listCategory[i].ct_img_url
                            //         listCategory.ct_img_url
                            // }}
                            src={listCategory.ct_img_url}

                        >
                        </img>
                    </div>
                    <a
                        style={{
                        transform:"translate(-15px,0px)",
                        backgroundColor:'transparent'
                        }}
                    >
                        <div
                            style ={{
                                height:'50pt',
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
                                backgroundColor:'transparent',
                                // zIndex:99,
                                pointerEvents:'none',
                                
                            }}
                        >
                            <div
                                style ={{
                                    height:'40pt',
                                    width:'99px',
                                    fontSize: '15pt',
                                    fontWeight:'700',
                                    textDecorationLine:'none',
                                    // color:'white',
                                    // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                    // textShadowOffset: {width: 0, height: 0},
                                    // textShadowRadius: 2,
                                    color:'black',
                                    // textAlign:'center',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:'transparent',
                                    // zIndex:99,
                                    pointerEvents:'none',
                                    lineHeight:'50pt',
                                    textAlign:'left',
                                }}
                            >
                                <span
                                    style ={{
                                        height:'50pt',
                                        width:'99px',
                                        fontSize: '15pt',
                                        fontWeight:'700',
                                        textDecorationLine:'none',
                                        // color:'white',
                                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                        // textShadowOffset: {width: 0, height: 0},
                                        // textShadowRadius: 2,
                                        color:'black',
                                        // textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginTop:'45pt',
                                        // padding:'auto',
                                        pointerEvents:'none',
                                        backgroundColor:'transparent',
                                        // zIndex:99,
                                        pointerEvents:'none',
                                        whiteSpace:'nowrap'
                                    }}
                                >
                                    {/* {data.listCategory[i].ct_text} */}
                                    {listCategory.ct_text}
                                </span>
                            </div>
                        </div>
                    </a>
                    </a>
                    )}
                    </div>
                    {/* <span> */}
                    {/* {data.listCategory[0].ct_img_url} */}
                    {/* construction */}
                    {/* <img 
                        style={{
                        height:'65pt',
                        width:'99pt',
                        }} src={data.listCategory[0].ct_img_url}
                    /> */}
                    
                    
                    {/* </span> */}
                    {/* <Content/> */}
                    
                    
                
                </div>
                </Font>
            );
        }
        else{
            return (
                <Font family='Noto Sans KR'>
                <div className="MainContent">
                
                    <Navbar />
                    <NavBarFiller/>
                    <span>
                    로딩중 ...
                    </span>
                    {/* <Content/> */}
                    
                    
                
                </div>
                </Font>
            );
        }
    }
    else{
        if(data!=undefined){
            return (
                <Font family='Noto Sans KR'>
                <div className="MainContent"
                    style={{
                        display:'block',
                        height:'auto',
                        textAlign:'center',
                    }}
                >
                   

                    <span
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
                            // margin:11,
                            marginLeft:'auto',
                            marginRight:'auto',
                            padding:'auto',
                            zIndex:2,
                            // backgroundColor:'red'
                        }}
                    > 
                    자재 카테고리
                    </span> 
                   
                        <div
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

                    
                        <a
                        style={{
                            borderRadius:10,
                            height:'50pt',
                            width:"350px",
                            backgroundColor:'white',
                            boxShadow:'0px 0px 2px',
                            display:'flex',
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
                                zIndex:2,
                                backgroundColor:'white',
                                
                            
                        }}
                        //onPress={() => Linking.openURL(`/category?cat_num=${listCategory.ct_id}`)}
                        // onPress={() => Linking.openURL(`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`)}
                        href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                    >
                    <div
                        style={{
                            transform:'translate(-36px,0px)'
                        }}
                    >
                        <img
                            style={{
                            display:'block',
                            height:'50pt',
                            width:'60pt',
                            borderTopLeftRadius:10,
                            borderBottomLeftRadius:10,
                            zIndex:1,
                            pointerEvents:'none',
                            // transform:[{
                            //     translateX:'-35px',
                            //     translateY:'-100px'
                            // }]
                            }}
                            // source={{
                            //     uri:
                            //         // data.listCategory[i].ct_img_url
                            //         listCategory.ct_img_url
                            // }}
                            src={listCategory.ct_img_url}

                        >
                        </img>
                    </div>
                    <a
                        style={{
                        transform:"translate(-15px,0px)",
                        backgroundColor:'transparent'
                        }}
                    >
                        <div
                            style ={{
                                height:'50pt',
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
                                backgroundColor:'transparent',
                                // zIndex:99,
                                pointerEvents:'none',
                                
                            }}
                        >
                            <div
                                style ={{
                                    height:'40pt',
                                    width:'99px',
                                    fontSize: '15pt',
                                    fontWeight:'700',
                                    textDecorationLine:'none',
                                    // color:'white',
                                    // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                    // textShadowOffset: {width: 0, height: 0},
                                    // textShadowRadius: 2,
                                    color:'black',
                                    // textAlign:'center',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    flexDirection:'row',
                                    marginLeft:'5pt',
                                    // padding:'auto',
                                    pointerEvents:'none',
                                    backgroundColor:'transparent',
                                    // zIndex:99,
                                    pointerEvents:'none',
                                    lineHeight:'50pt',
                                    textAlign:'left',
                                }}
                            >
                                <span
                                    style ={{
                                        height:'50pt',
                                        width:'99px',
                                        fontSize: '15pt',
                                        fontWeight:'700',
                                        textDecorationLine:'none',
                                        // color:'white',
                                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                                        // textShadowOffset: {width: 0, height: 0},
                                        // textShadowRadius: 2,
                                        color:'black',
                                        // textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginTop:'45pt',
                                        // padding:'auto',
                                        pointerEvents:'none',
                                        backgroundColor:'transparent',
                                        // zIndex:99,
                                        pointerEvents:'none',
                                        whiteSpace:'nowrap'
                                    }}
                                >
                                    {/* {data.listCategory[i].ct_text} */}
                                    {listCategory.ct_text}
                                </span>
                            </div>
                        </div>
                    </a>
                    </a>
                    )}
                    </div>
                    {/* <span> */}
                    {/* {data.listCategory[0].ct_img_url} */}
                    {/* construction */}
                    {/* <img 
                        style={{
                        height:'65pt',
                        width:'99pt',
                        }} src={data.listCategory[0].ct_img_url}
                    /> */}
                    
                    
                    {/* </span> */}
                    {/* <Content/> */}
                    
                    
                
                </div>
                </Font>
            );
        }
        else{
            return (
                <Font family='Noto Sans KR'>
                <div className="MainContent">
                
                    <Navbar />
                    <NavBarFiller/>
                    <span>
                    로딩중 ...
                    </span>
                    {/* <Content/> */}
                    
                    
                
                </div>
                </Font>
            );
        }
    }
}
  
  export default MainMaterialCategory;