import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions,textInput} from 'react-native';
import xIcon from '../assets/x.png';
const queryString = require('query-string');

function AddToShoppingCart(props){
    const [height,setHeight]=React.useState(Dimensions.get('window').height)
    const [width,setWidth]=React.useState(Dimensions.get('window').width)
    const[clipBoardData,setClipBoardData]=React.useState([])
    const [checkButtonChecked,setCheckButtonChecked]=React.useState([])
    // const[clipBoardDataDetail,setClipBoardDataDetail]=React.useState([])
    const [boardBuilding,setBoardBuilding]=React.useState(false)
    const [refresh,setRefresh]=React.useState(0)
    const [newBoard,setNewBoard]=React.useState(false)
    const [inputValue,setInputValue]=React.useState("")
    const [makeButtonEnable,setMakeButtonEnable]=React.useState(false)
    const [projectName,setProjectName]=React.useState('프로젝트를 선택하세요')
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    
    useEffect(()=>{
        console.log('hello world')
        console.log(props.material_data)
    },[])
    
        return (
            <div
            style={{
            position:'fixed',
            height:'100vh',
            width:'100vw',
            top:0,
            left:0,
            backgroundColor:'rgba(0,0,0,0.5)',
            display:'block',
        //   padding:'160px',
            zIndex:101
            }}
        >
        <div
        style={{
            paddingTop:'100px',
            paddingLeft:'65px',
            paddingRight:'65px'
        }}
        >
            <div
            style={{
                textAlign:'left',
                // margin:'25pt'
                paddingLeft:'0px',
                paddingRight:'0px',
                backgroundColor:'transparent'
            }}
            >
            
            
            
            
            </div>
    
    
            <div
            style={{
            borderRadius:'10px',
            backgroundColor:'white',
            width:'100%',
            height:'300px',
            paddingTop:'15px',
            // columnCount:3,
            // flexwrap:'wrap',
            // flexDirection:'column',
            // display: 'grid',
            // gridTemplateColumns: 'auto auto',
            // // padding:'100px',
            overflowY: 'scroll',
            }}
            >
                <div
                style={{
                height:'25px',
                width:'25px',
                backgroundColor:'transparent',
                position: 'absolute',
                top:'110px',
                left:'75px',
                zIndex:102,
                }}
            >
                <TouchableOpacity
                onPress={()=>{
                    // console.log(detailedCategoryData)
                    props.toggleShoppingCart()
                    setRefresh(refresh+1)
                }}
                >
                <img
                src={xIcon}
                style={{
                    height:'25px',
                    width:'25px',
                }}
                >
                </img>
                </TouchableOpacity>
            </div>
            
                <View
                style={{
                    backgroundColor:'white',
                    height:'298px',
                    width:'100%',
                    borderBottomLeftRadius:'10px',
                    borderBottomRightRadius:'10px'
    
                }}
                >
                    <View
                        style={{
                            position:'relative',
                            top:0,
                            height:'30px',
                            width:'100%',
                            backgroundColor:'white',
                            borderTopLeftRadius:'10px',
                            borderTopRightRadius:'10px',
                            borderBottom:'1px solid rgb(221,221,221)'
                        }}
                    >
                    <Text
                        style={{
                            fontWeight:700,
                        }}
                    >샘플을 장바구니에 추가하기</Text>
                    </View>
                <View
                    style={{
                        // display: clipBoardData.length==0 ? 'block':'none',
                        textAlign:'left',
                        padding:'15px',
                    }}
                >
                    <Image
                            style={{
                            display:'block',
                            height:'70px',
                            width:'70px',
                            // borderTopLeftRadius:10,
                            // borderTopRightRadius:10,
                            borderRadius:'10px',
                            pointerEvents:'none',
                            marginLeft:'auto',
                            marginRight:'auto',
                            position:'absolute',
                            top:'15px',
                            left:'15px',
                            // transform:[{
                            //     translateX:'0px',
                            //     translateY:'0px'
                            // }]
                            }}
             
                            source={{
                                uri:
                                    props.material_data.mt_feature_img_url
                            }}

                            >
                            </Image>

                </View>
                <div
                    style={{
                        transform:'translate(100px,-2px)',
                        display:'flex',
                        flexDirection:'column',
                        textAlign:'left',

                    }}
                >
                    <Text
                        style={{
                            fontWeight:700,
                            fontSize:'12px',
                            whiteSpace:'nowrap',
                            textOverflow:'ellipsis'
                        }}
                    >
                        
                        {props.material_data.brd_name_eng}
                    </Text>
                    <Text 
                        style={{
                            fontWeight:700,
                            fontSize:'12px',
                            whiteSpace:'nowrap',
                        }}
                    >
                        
                        {props.material_data.brd_name_kor}
                    </Text>
                    <Text 
                        style={{
                            fontWeight:500,
                            fontSize:'12px',
                            whiteSpace:'nowrap',
                            color:'rgb(109,114,120)'
                        }}
                    >
                      
                        {props.material_data.mt_subname}
                    </Text>
                </div>
                <div
                    style={{
                    // display: clipBoardData.length==0 ? 'none':'block',
                    marginTop:'10px',
                    textAlign:'left',
                    paddingLeft:'15px',
                    paddingRight:'15px',
                    overflowY:'scroll',
                    backgroundColor:'transparent'
                }} 
                >

                    <div
                        style={{
                            backgroundColor:'transparent',
                            height:'25px',
                            width:'100%',
                            marginTop:'15px',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight:600,
                            }}
                        >
                            프로젝트 선택
                        </Text>
                    </div>
                    <div
                     style={{
                        backgroundColor:'transparent',
                        height:'47px',
                        width:'100%',
                        paddingTop:'7px'
                    }}
                    >
                        <TouchableOpacity>
                            <View
                                style={{
                                    backgroundColor:'transparent',
                                    height:'40px',
                                    width:'100%',
                                    borderRadius:'10px',
                                    border:'2px solid black',
                                    textAlign:'left',
                                    justifyContent:'center',
                                    lineHeight:'40px',
                                    padding:'15px'
                                    // alignItems:'center'
                                }}
                            >
                            <Text
                            
                            >
                                {projectName}
                            </Text>
                            <Text
                                style={{
                                    position:'fixed',
                                    right:'100px'
                                }}
                            >
                                >
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </div>
                </div>
                <div>
                <TouchableOpacity
                    style={{
                        position:'absolute',
                        bottom:0,
                        height:'50px',
                        width:'100%',
                        backgroundColor:'white',
                        borderBottomLeftRadius:'10px',
                        borderBottomRightRadius:'10px',
                        zIndex:100
                    }}
                    onPress={()=>{
                        console.log('make a new board')
                        setNewBoard(!newBoard)
                        setRefresh(refresh+1)
                    }}
                >
                    <View
                        style={{
                            backgroundColor:'white',
                            borderTop:'1px solid rgb(221,221,221)',
                            zIndex:200
                        }}
                    >
                    <Text
                        style={{
                            lineHeight:'50px',
                            fontWeight:700,
                        }}
                    >
                        장바구니에 샘플 담기
                    </Text>
                    </View>
                </TouchableOpacity>
                </div>
                </View>
                {/* <Text>{props.material_num}</Text> */}
            </div>
        </div>
    </div>
        );
    
}
export default AddToShoppingCart