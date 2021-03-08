import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions,textInput} from 'react-native';
import xIcon from '../assets/x.png';
import { RadioButton } from 'react-native-paper';
// import DatePicker from 'react-native-date-picker'
//import DateTimePicker from '@react-native-community/datetimepicker'
//import DatePicker from "react-datepicker"
import DatePicker from 'react-date-picker';

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
    const [projectInfo,setProjectInfo]=React.useState([])
    const [projectListShow,setProjectListShow]=React.useState(false)
    const [selectedProject,setSelectedProject]=React.useState(null)
    const [projectName,setProjectName]=React.useState('프로젝트를 선택하세요')
    const [addProjectShow,setAddProjectShow]=React.useState(false)
    const [date,setDate]=React.useState(new Date())
    const [newProjectName,setNewProjectName]=React.useState('')
    const [newProjectSize,setNewProjectSize]=React.useState('')
    const [newProjectDescription,setNewProjectDescription]=React.useState('')
    const [projectCategoryList,setProjectCategoryList]=React.useState([])
    const [selectedCategory,setSelectedCategory]=React.useState('')
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    const getProjectInfo=(qStr)=>{
        console.log(qStr)
        fetch('/projectInfo?'+qStr
        )
        .then(res=>res.json())
        .then((incomingData)=>{
            console.log(incomingData)
            // setProjectInfo(incomingData)
            setProjectInfo(incomingData.sort(function(a,b){
                var textA = a.prj_name.toUpperCase()
                var textB = b.prj_name.toUpperCase()
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }))
            })
        .catch(err=>{
            console.log(err)
        })  
    }
    const AddToCart=(qStr)=>{
        console.log(qStr)
        fetch('/AddToCart?'+qStr
        )
        .then(res=>res.json())
        .then((incomingData)=>{
            console.log(incomingData)
            })
        .catch(err=>{
            console.log(err)
        })  
    }
    const dateChange = (event, selectedDate)=>{
        const currentDate=selectedDate||date;
        setDate(currentDate)
    }
    const updateNewProjectName=(e)=>{
        setNewProjectName(e.target.value)
    //     if(e.target.value!=""){
    //       // setMakeButtonEnable(true)
    //       setSearchTermEnable(true)
    //   }
    //   else{
    //       // setMakeButtonEnable(false)
    //       setSearchTermEnable(false)
    //   }
    }
    const updateNewProjectSize=(e)=>{
        setNewProjectSize(e.target.value)
    //     if(e.target.value!=""){
    //       // setMakeButtonEnable(true)
    //       setSearchTermEnable(true)
    //   }
    //   else{
    //       // setMakeButtonEnable(false)
    //       setSearchTermEnable(false)
    //   }
    }
    // const AddToCart=(jsonObj)=>{
    //     fetch('http://clip.partners/api/mobile/AddToCart',{
    //     method: 'post',
    //     headers: {'Content-Type':'application/json'},
    //     body:JSON.stringify(jsonObj)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }
    const updateNewProjectDescription=(e)=>{
        setNewProjectDescription(e.target.value)
    //     if(e.target.value!=""){
    //       // setMakeButtonEnable(true)
    //       setSearchTermEnable(true)
    //   }
    //   else{
    //       // setMakeButtonEnable(false)
    //       setSearchTermEnable(false)
    //   }
    }
    const getProjectCategoryList=()=>{
        fetch('/getProjectCategoryList'
        )
        .then(res=>res.json())
        .then((incomingData)=>{
            console.log(incomingData)
            setProjectCategoryList(incomingData)
            })
        .catch(err=>{
            console.log(err)
        }) 
    }
    const AddProject=(jsonObj)=>{
        fetch('/AddProject?'+queryString.stringify(jsonObj)
        )
        .then(res=>res.json())
        .then((incomingData)=>{
            console.log(incomingData)
            })
        .catch(err=>{
            console.log(err)
        }) 
    }
    
    useEffect(()=>{
        console.log('hello world')
        console.log(props.material_data)
        // const parsed = queryString.parse(props.location.search);
        const parsed = {};
        var mem_no=undefined
        if(localStorage.login!=undefined){
            if(JSON.parse(localStorage.login).result!="FAILURE"){
                mem_no=JSON.parse(localStorage.login).message.split('_')[0]
                parsed.mem_no=mem_no 
            
            }
            else{
                parsed.mem_no=""
            }
        }
        else{
            parsed.mem_no=""
        }
        parsed.type="LIST"
        console.log(parsed)
        getProjectInfo(queryString.stringify(parsed))
        getProjectCategoryList()
    },[])
    useEffect(()=>{
        console.log(projectInfo)
    },[projectInfo])
        if(projectListShow==false)
            {
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
                        backgroundColor:'transparent',
                        
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
                    overflowX:'hidden',
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
                                <TouchableOpacity
                                    onPress={()=>{
                                        console.log('open project list')
                                        setProjectListShow(true)
                                    }}
                                >
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
                                        &gt;
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
                                backgroundColor:'transparent',
                                borderBottomLeftRadius:'10px',
                                borderBottomRightRadius:'10px',
                                zIndex:100
                            }}
                            onPress={()=>{
                                console.log('make a new board')
                                setNewBoard(!newBoard)
                                setRefresh(refresh+1)
                                const parsed = {};
                                var mem_no=undefined
                                if(localStorage.login!=undefined){
                                    if(JSON.parse(localStorage.login).result!="FAILURE"){
                                        mem_no=JSON.parse(localStorage.login).message.split('_')[0]
                                        parsed.mem_no=mem_no 
                                    
                                    }
                                    else{
                                        parsed.mem_no=""
                                    }
                                }
                                else{
                                    parsed.mem_no=""
                                }
                                // parsed.list_material=[
                                //     {
                                //         vd_no:props.material_data.vd_no,
                                //         brd_no:props.material_data.brd_no,
                                //         mt_no:props.material_data.mt_no,
                                //         prj_no:selectedProject,
                                //         mt_shipfrom:props.material_data.mt_shipfrom
                                //     }
                                // ]
                                parsed.list_material=[
                                    
                                        [props.material_data.vd_no],
                                        [props.material_data.brd_no],
                                        [props.material_data.mt_no],
                                        [selectedProject],
                                        [props.material_data.mt_shipfrom]
                                ]
                                console.log(parsed)
                                AddToCart(queryString.stringify(parsed))
                                // AddToCart(parsed)
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
        else{
            if(addProjectShow==false)
            {
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
                        backgroundColor:'transparent',
                        
                    }}
                    >
                    
                    
                    
                    
                    </div>
            
            
                    <div
                    style={{
                    borderRadius:'10px',
                    backgroundColor:'white',
                    width:'100%',
                    height:'400px',
                    paddingTop:'15px',
                    // columnCount:3,
                    // flexwrap:'wrap',
                    // flexDirection:'column',
                    // display: 'grid',
                    // gridTemplateColumns: 'auto auto',
                    // // padding:'100px',
                    overflowX:'hidden',
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
                                        console.log('close project list')
                                        setProjectListShow(false)
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor:'transparent',
                                            height:'25px',
                                            width:'100%',
                                            borderRadius:'10px',
                                            // border:'2px solid black',
                                            textAlign:'left',
                                            justifyContent:'center',
                                            lineHeight:'25px',
                                            padding:'15px',
                                            alignItems:'center',
                                            transform:'translate(0px,-5px)'
                                        }}
                                    >
                                    
                                    <Text
                                        style={{
                                            // position:'fixed',
                                            // right:'100px'
                                        }}
                                    >
                                        &lt;
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                    </div>
                    
                        <View
                        style={{
                            backgroundColor:'transparent',
                            height:'395px',
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
                            >프로젝트 선택</Text>
                            <TouchableOpacity
                                    onPress={()=>{
                                        console.log('make new project ')
                                        // setProjectListShow(true)
                                        setAddProjectShow(true)
                                    }}
                                >
                                    <View
                                        style={{
                                            position:'fixed',
                                            right:'70px',
                                            backgroundColor:'transparent',
                                            height:'25px',
                                            width:'120px',
                                            borderRadius:'10px',
                                            // border:'2px solid black',
                                            textAlign:'left',
                                            justifyContent:'center',
                                            lineHeight:'25px',
                                            padding:'15px',
                                            alignItems:'center',
                                            transform:'translate(0px,-25px)'
                                        }}
                                    >
                                    
                                    <Text
                                        style={{
                                            // position:'fixed',
                                            // right:'100px'
                                            color:'rgb(109,114,120)'
                                        }}
                                    >
                                        프로젝트 추가
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        <View
                            style={{
                                // display: clipBoardData.length==0 ? 'block':'none',
                                textAlign:'left',
                                // padding:'15px',
                            }}
                        >
                            
                        
                        </View>
                        <div
                            style={{
                            // display: clipBoardData.length==0 ? 'none':'block',
                            marginTop:'10px',
                            textAlign:'left',
                            paddingLeft:'15px',
                            paddingRight:'15px',
                            overflowY:'scroll',
                            overflowX:'scroll',
                            backgroundColor:'transparent'
                        }} 
                        >
                        {projectInfo.map((oneProject,index)=>{
                            // console.log(oneProject)
                        return( 
                            <div
                                style={{
                                    display:'flex',
                                    flexDirection:'row'
                                }}
                            > 
                            <div
                                style={{
                                    backgroundColor:'transparent',
                                    height:'50px',
                                    width:'50px',
                                    borderRadius:10,
                                    transform:'translate(0px,3px)',
                                    // border:'2px solid black',
                                }}
                            >
                            {/* <Image
                                style={{
                                    display:'block',
                                    height:'50px',
                                    width:'50px',
                                    // borderTopLeftRadius:10,
                                    // borderTopRightRadius:10,
                                    borderRadius:'10px',
                                    pointerEvents:'none',
                                    // marginLeft:'auto',
                                    // marginRight:'auto',
                                    // position:'absolute',
                                    // top:'15px',
                                    // left:'15px',
                                    // transform:[{
                                    //     translateX:'0px',
                                    //     translateY:'0px'
                                    // }]
                                }}
                
                                source={{
                                    uri:
                                        oneProject.detail.pictures_project[0].pic_url
                                }}

                                >
                                </Image> */}
                                {/* <div
                                style={{
                                    borderRadius:'10px',
                                    backgroundColor:'grey',
                                    height:'50px',
                                    width:'50px',
                                    display:'flex',
                                    flexDirection:'column',
                                }}
                            >
                                <div
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        height:'25px',
                                        width:'50px'
                                    }}
                                >
                                    <div
                                        style={{
                                            height:'25px',
                                            width:'25px',
                                            backgroundColor:'grey',
                                            borderTopLeftRadius:'10px'
                                        }}
                                    >
                                        <Image
                                            style={{
                                            display:'block',
                                            height:'25px',
                                            width:'25px',
                                            // borderTopLeftRadius:10,
                                            // borderTopRightRadius:10,
                                            borderTopLeftRadius:'10px',
                                            pointerEvents:'none',
                                            marginLeft:'0px',
                                            marginRight:'0px',
                                            position:'relative',
                                            left:'0px'
                                            // transform:[{
                                            //     translateX:'0px',
                                            //     translateY:'0px'
                                            // }]
                                            }}
                            
                                            source={{
                                                uri:
                                                oneProject.detail.pictures_project[0].pic_url
                                            }}
        
                                            >
                                            </Image>
                                    </div>
                                    <div
                                        style={{
                                            height:'25px',
                                            width:'25px',
                                            backgroundColor:'grey',
                                            borderTopRightRadius:'10px'
                                        }}
                                    >
                                        
                                        <Image
                                            style={{
                                            display:oneProject.detail.pictures_project[1]==undefined?'none':'block',
                                            height:'25px',
                                            width:'25px',
                                            // borderTopLeftRadius:10,
                                            // borderTopRightRadius:10,
                                            borderTopRightRadius:'10px',
                                            pointerEvents:'none',
                                            marginLeft:'0px',
                                            marginRight:'0px',
                                            position:'relative',
                                            left:'0px'
                                            // transform:[{
                                            //     translateX:'0px',
                                            //     translateY:'0px'
                                            // }]
                                            }}
                            
                                            source={{
                                                uri:
                                                oneProject.detail.pictures_project[1].pic_url
                                            }}
        
                                            >
                                            </Image>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        height:'25px',
                                        width:'50px'
                                    }}
                                >
                                    <div
                                        style={{
                                            height:'25px',
                                            width:'25px',
                                            backgroundColor:'grey',
                                            borderBottomLeftRadius:'10px'
                                        }}
                                    >
                                        <Image
                                            style={{
                                            display:'block',
                                            height:'25px',
                                            width:'25px',
                                            // borderTopLeftRadius:10,
                                            // borderTopRightRadius:10,
                                            borderBottomLeftRadius:'10px',
                                            pointerEvents:'none',
                                            marginLeft:'0px',
                                            marginRight:'0px',
                                            position:'relative',
                                            left:'0px'
                                            // transform:[{
                                            //     translateX:'0px',
                                            //     translateY:'0px'
                                            // }]
                                            }}
                            
                                            source={{
                                                uri:
                                                    oneProject.detail.pictures_project[2].pic_url
                                            }}
        
                                            >
                                            </Image>
                                    </div>
                                    <div
                                        style={{
                                            height:'25px',
                                            width:'25px',
                                            backgroundColor:'grey',
                                            borderBottomRightRadius:'10px'
                                        }}
                                    >
                                        <Image
                                            style={{
                                            display:'block',
                                            height:'25px',
                                            width:'25px',
                                            // borderTopLeftRadius:10,
                                            // borderTopRightRadius:10,
                                            borderBottomRightRadius:'10px',
                                            pointerEvents:'none',
                                            marginLeft:'0px',
                                            marginRight:'0px',
                                            position:'relative',
                                            left:'0px'
                                            // transform:[{
                                            //     translateX:'0px',
                                            //     translateY:'0px'
                                            // }]
                                            }}
                            
                                            source={{
                                                uri:
                                                    oneProject.detail.pictures_project[3].pic_url
                                            }}
        
                                            >
                                            </Image>
                                    </div>
                                </div>
        
                            </div>
                            */}
                            </div>
                            <div
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    textAlign:'left',
                                    justifyContent:'space-between',
                                    backgroundColor:'transparent',
                                    width:'100%'
                                }}
                            >
                            <div
                            style={{
                                transform:'translate(15px,3px)',
                                display:'flex',
                                flexDirection:'column',
                                textAlign:'left',
                                backgroundColor:'transparent',
                                width:'300px'
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
                                
                                {/* {props.material_data.brd_name_eng} */}
                                {oneProject.prj_name}
                            </Text>
                            <Text 
                                style={{
                                    fontWeight:700,
                                    fontSize:'12px',
                                    whiteSpace:'nowrap',
                                    color:'rgb(109,114,120)'
                                }}
                            >
                                
                            프로젝트 부문: {oneProject.prj_category_text}
                            </Text>
                            <Text 
                                style={{
                                    fontWeight:500,
                                    fontSize:'12px',
                                    whiteSpace:'nowrap',
                                    color:'rgb(109,114,120)',
                                    marginBottom:'15px'
                                }}
                            >
                            
                            프로젝트 규모: {oneProject.prj_size}
                            </Text>
                        </div>
                        <div
                            style={{
                                width:'100%',
                                backgroundColor:'transparent',
                                alignItems:'center',
                                // justifyContent:'center',
                                flexDirection:'row',
                                display:'flex'
                            }}
                        >
                            <div
                                    style={{
                                        height:'25px',
                                        // marginRight:'15px',
                                        width:'100%',
                                        backgroundColor:'transparent'

                                    }}
                                >
                            </div>
                            <div
                                style={{
                                    position:'relative',
                                    // right:width-400+"px",
                                    height:'25px',
                                    width:'28px',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:'transparent',
                                    // paddingRight:'5px',
                                    // paddingBottom:'5px',
                                    display:'flex',
                                    verticalAlign:'top',
                                    marginRight:'15px'
                                    
                                }}
                            >
                                
                                <RadioButton
                                    
                                    value={oneProject.prj_no}
                                    // status={ checked === 'first' ? 'checked' : 'unchecked' }
                                    // onPress={() => setChecked('first')}
                                    status={ selectedProject === oneProject.prj_no ? 'checked' : 'unchecked' }
                                    onPress={() => {
                                        setSelectedProject(oneProject.prj_no)
                                        setProjectName(oneProject.prj_name)
                                    }}
                                    color="rgb(255,123,88)"
                                />
                                
                            </div>
                            </div>
                            </div>
                        </div>
                        )
                        })}
                        <div
                        style={{
                            height:'50px',
                            width:'100%',
                            backgroundColor:'transparent',
                            zIndex:99
                        }}
                        >
                            
                        </div>
                        </div>
                        <div>
                        <TouchableOpacity
                            style={{
                                position:'absolute',
                                bottom:0,
                                height:'50px',
                                width:'100%',
                                backgroundColor:'transparent',
                                borderBottomLeftRadius:'10px',
                                borderBottomRightRadius:'10px',
                                zIndex:100
                            }}
                            onPress={()=>{
                                console.log('confirm')
                                setNewBoard(!newBoard)
                                setRefresh(refresh+1)
                                
                                setProjectListShow(false)
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
                                확인
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
            else{
                return(
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
                        backgroundColor:'transparent',
                        
                    }}
                    >
                    
                    
                    
                    
                    </div>
            
            
                    <div
                    style={{
                    borderRadius:'10px',
                    backgroundColor:'white',
                    width:'100%',
                    height:'400px',
                    paddingTop:'15px',
                    // columnCount:3,
                    // flexwrap:'wrap',
                    // flexDirection:'column',
                    // display: 'grid',
                    // gridTemplateColumns: 'auto auto',
                    // // padding:'100px',
                    overflowX:'hidden',
                    overflowY: 'scroll',
                    }}
                    >
                        
                    
                        <View
                        style={{
                            backgroundColor:'transparent',
                            height:'395px',
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
                                <div
                        style={{
                        height:'25px',
                        width:'25px',
                        backgroundColor:'transparent',
                        // position: 'absolute',
                        top:'110px',
                        left:'75px',
                        zIndex:102,
                        }}
                    >
                        <TouchableOpacity
                                    onPress={()=>{
                                        console.log('close project list')
                                        // setProjectListShow(false)
                                        setAddProjectShow(false)
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor:'transparent',
                                            height:'25px',
                                            width:'100%',
                                            borderRadius:'10px',
                                            // border:'2px solid black',
                                            textAlign:'left',
                                            justifyContent:'center',
                                            lineHeight:'25px',
                                            padding:'15px',
                                            alignItems:'center',
                                            transform:'translate(10px,-10px)'
                                        }}
                                    >
                                    
                                    <Text
                                        style={{
                                            // position:'fixed',
                                            // right:'100px'
                                        }}
                                    >
                                        &lt;
                                    </Text>
                                    </View>
                                </TouchableOpacity>
                    </div>
                    <View
                        style={{
                            transform:'translate(0px,-25px)'
                        }}
                    >
                            <Text
                                style={{
                                    fontWeight:700,
                                }}
                            >프로젝트 추가</Text>
                    </View>    
                            </View>
                        <View
                            style={{
                                // display: clipBoardData.length==0 ? 'block':'none',
                                textAlign:'left',
                                padding:'15px',
                                
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight:700,
                                }}
                            >
                                프로젝트명
                            </Text>
                            <input 
                                style={{
                                    overflow:'hidden', 
                                    width:'100%',
                                    height:'30px',
                                    padding:'12px 12px',
                                    margin:"8px 0",
                                    border:"1px solid black",
                                    borderRadius:'0px',
                                    boxSizing:'border-box',
                                    // position:'fixed',
                                    // top:20,
                                    // right:280
                                }}
                                value={newProjectName} 
                                onChange={updateNewProjectName}
                                placeholder={'프로젝트명 입력'}
                            />
                            <Text
                                style={{
                                    fontWeight:700,
                                    marginBottom:'10px'
                                }}
                            >
                                프로젝트 부문
                            </Text>
                            <select value={selectedCategory}
                                onChange={(e)=>{
                                    console.log(e.target.value)
                                    setSelectedCategory(e.target.value)
                                }}
                                style={{
                                    width:'100%',
                                    padding:'5px 12px',
                                    border: '1px solid black',
                                    appearance:'none'
                                }}
                            >
                                <option key='선택' value='선택' selected hidden
                                    style={{
                                        color: 'grey'
                                    }}
                                >
                                    선택
                                </option>
                                {projectCategoryList.map((option)=>{
                                    // console.log(option)
                                    return(
                                        <option key={option.code_text} value={option.code_name}>
                                            {option.code_text}
                                        </option>
                                        )
                                })}

                            </select>
                            <Text
                                style={{
                                    marginTop:'10px',
                                    fontWeight:700,
                                }}
                            >
                                프로젝트 규모
                            </Text>
                            <input 
                                style={{
                                    overflow:'hidden', 
                                    width:'100%',
                                    height:'30px',
                                    padding:'12px 12px',
                                    margin:"8px 0",
                                    border:"1px solid black",
                                    borderRadius:'0px',
                                    boxSizing:'border-box',
                                    // position:'fixed',
                                    // top:20,
                                    // right:280
                                }}
                                value={newProjectSize} 
                                onChange={updateNewProjectSize}
                                placeholder={'프로젝트 규모 입력'}
                            />
                            {/* <DatePicker
                            date={date}
                            onDateChange={setDate}
                            /> */}
                            {/* <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            /> */}
                            {/* <DatePicker selected={date} onChange={date => setDate(date)} /> */}
                            <Text
                                style={{
                                    fontWeight:700,
                                    marginTop:'0px',
                                    marginBottom:'10px'
                                }}
                            >
                                자재 필요시기
                            </Text>
                            <DatePicker
                                onChange={(data)=>{
                                    console.log(data.getFullYear())
                                    console.log(data.getMonth()+1)
                                    console.log(data.getDate())
                                    setDate(data)
                                }}
                                value={date}
                                style={{
                                    padding:'5px 12px'
                                }}
                            />
                            <Text
                                style={{
                                    marginTop:'10px',
                                    fontWeight:700,
                                }}
                            >
                                프로젝트 내용
                            </Text>
                            <Text
                                style={{
                                    // marginTop:'10px',
                                    fontWeight:500,
                                }}
                            >
                                주문하시는 자재샘플이 첨부된 도면 또는 렌더링 이미지에 어떤방식으로 적용될지 설명해주세요
                            </Text>
                            <div
                            style={{
                                backgroundColor:'transparent',
                                marginRight:'26px'
                            }}>
                            <textarea 
                                style={{
                                    // overflow:'hidden', 
                                    width:'100%',
                                    height:'100px',
                                    padding:'12px 12px',
                                    // margin:"8px 0",
                                    border:"1px solid black",
                                    borderRadius:'0px',
                                    // boxSizing:'border-box',
                                    // // position:'fixed',
                                    // // top:20,
                                    // // right:280
                                    marginRight:'7px'
                                }}
                                value={newProjectDescription} 
                                onChange={updateNewProjectDescription}
                                placeholder={'메시지를 남겨주세요'}
                            />
                            </div>
                        </View>
                        <div
                            style={{
                            // display: clipBoardData.length==0 ? 'none':'block',
                            marginTop:'10px',
                            textAlign:'left',
                            paddingLeft:'15px',
                            paddingRight:'15px',
                            overflowY:'scroll',
                            overflowX:'scroll',
                            backgroundColor:'transparent'
                        }} 
                        >
                        
                        
                        </div>
                        <div>
                        <TouchableOpacity
                            style={{
                                // position:'absolute',
                                // bottom:0,
                                height:'50px',
                                width:'100%',
                                backgroundColor:'transparent',
                                borderBottomLeftRadius:'10px',
                                borderBottomRightRadius:'10px',
                                zIndex:100
                            }}
                            onPress={()=>{
                                console.log('confirm')
                                // setNewBoard(!newBoard)
                                // setRefresh(refresh+1)
                                setAddProjectShow(false)
                                setProjectListShow(false)

                                var obj={}
                                obj.mem_no=JSON.parse(localStorage.login).message.split('_')[0]
                                obj.prj_name=newProjectName
                                obj.prj_category=selectedCategory
                                obj.prj_size=newProjectSize
                                obj.prj_date= date.getFullYear()+'년 '+(Number(date.getMonth())+1)+'월'
                                obj.prj_description=newProjectDescription
                                console.log(obj)
                                AddProject(obj)
                                window.location.reload()
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
                                추가하기
                            </Text>
                            </View>
                        </TouchableOpacity>
                        </div>
                        </View>
                        {/* <Text>{props.material_num}</Text> */}
                    </div>
                </div>
            </div>
                )
            }
        }
    
}
export default AddToShoppingCart