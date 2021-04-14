import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions,textInput} from 'react-native';
import xIcon from '../assets/x.png';
const queryString = require('query-string');

function ClipBoard(props){
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
    const onChange=()=>{
        setHeight(Dimensions.get('window').height)
        setWidth(Dimensions.get('window').width)
        // console.log(height+" : "+width)
      }
    const clipBoardInfo=(qStr)=>{
    // console.log(qStr)
    fetch('/clipboardInfo?'+qStr
    )
    .then(res=>res.json())
    .then((incomingData)=>{
        console.log(incomingData)
        setClipBoardData(incomingData.sort(function(a,b){
            var textA = a.cb_name.toUpperCase()
            var textB = b.cb_name.toUpperCase()
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }))
        })
    .catch(err=>{
        console.log(err)
    })
    }
    // const clipBoardDetailInfo=(qStr)=>{
    //     // console.log(qStr)
    //     fetch('/clipboardDetailInfo?'+qStr
    //     )
    //     .then(res=>res.json())
    //     .then((incomingData)=>{
    //         console.log(incomingData)
    //         setClipBoardDataDetail([...clipBoardDataDetail,...incomingData])
    //         })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    //     }
    const checkboxClicked=(index,e,cb_no,details)=>{
        console.log('clicked')
        console.log(details.cb_no)
        var mem_no=undefined
        if(localStorage.login!=undefined){
            mem_no=JSON.parse(localStorage.login).message.split('_')[0]
            //parsed.mem_no=mem_no 
            console.log(mem_no)
        }
        else{
            mem_no=""
        }
        fetch('/ScrapClipboard?'+
            queryString.stringify({
                    mem_no:mem_no,
                    cb_no:details.cb_no,
                    ce_type:"MATERIAL",
                    ce_detail:props.material_num
                })
        )
        .then(res=>res.json())
        .then((incomingData)=>{
            console.log(incomingData)
            setRefresh(refresh+1)
        })
        .catch(err=>{
            console.log(err)
        })
        
        // e.target.checked=true
        // setActivePage(1)
        // if(e.target.checked==true){
        //     var numbers=checkedCategory
        //     numbers.push(String(category_name))
        //     setCheckedCategory(numbers)
        //     var filterQ={...filter}
        //     filterQ.list_category=numbers
        //     filterQ.page=1
        //     setFilter(filterQ)
        // }
        // else if(e.target.checked==false){
        //     var numbers=checkedCategory
        //     var indexOfCategory=numbers.indexOf(String(category_name))
        //     numbers.splice(indexOfCategory,1)
        //     //console.log(numbers)
        //     setCheckedCategory(numbers)
        //     var filterQ={...filter}
        //     filterQ.list_category=numbers
        //     filterQ.page=1
        //     setFilter(filterQ)
        // }

        
        
      }
      const updateInputValue=(e)=>{
          setInputValue(e.target.value)
          if(e.target.value!=""){
              setMakeButtonEnable(true)
          }
          else{
              setMakeButtonEnable(false)
          }
      }
      const addClipboard=(cb_name)=>{
        var mem_no=undefined
        if(localStorage.login!=undefined){
            mem_no=JSON.parse(localStorage.login).message.split('_')[0]
        }
        else{
            mem_no=""
        }
        console.log({mem_no:mem_no,cb_name:cb_name})
        fetch('/AddClipboard?'+
            queryString.stringify({
                    mem_no:mem_no,
                    cb_name:cb_name
                })
        )
        .then(res=>res.json())
        .then((incomingData)=>{
            console.log(incomingData)
            //setNewBoard(!newBoard)
            //setRefresh(refresh+1)
            window.location.reload()
        })
        .catch(err=>{
            console.log(err)
        })       
      }
    const materialNumberMatch=(materialNumber,object)=>{
        var value=false
        for(var i=0; i<object.detail.list_material.length; i++){
            // console.log(object.detail.list_material[i].mt_no)
            // console.log(materialNumber)
            // console.log(object.detail.list_material[i].mt_no==materialNumber)
            if(object.detail.list_material[i].mt_no==materialNumber){
                value=true
            }
        }
        console.log('number match = '+value)
        return value
    }
    useEffect(() => {
        Dimensions.addEventListener('change',onChange)
        // const parsed = queryString.parse(props.location.search);
        var parsed = {}
        //console.log(localStorage.login==undefined)
        if(localStorage.login!=undefined){
            var mem_no=undefined
            mem_no=JSON.parse(localStorage.login).message.split('_')[0]
            parsed.mem_no=mem_no 
        }
        else{
            parsed.mem_no=""
        }
        parsed.cb_type='INDIV'
        console.log(parsed)
        clipBoardInfo(queryString.stringify(parsed)) 
        console.log('q = '+JSON.stringify(parsed))

        
      },[])
      useEffect(() => {
        var parsed = {}
        // console.log(localStorage.login==undefined)
        if(localStorage.login!=undefined){
            var mem_no=undefined
            mem_no=JSON.parse(localStorage.login).message.split('_')[0]
            parsed.mem_no=mem_no 
        }
        else{
            parsed.mem_no=""
        }
        parsed.cb_type='INDIV'
        console.log(parsed)
        clipBoardInfo(queryString.stringify(parsed)) 
  
      },[props.refresh,refresh])
    useEffect(()=>{
        // console.log("clipboard length ")
        // console.log(clipBoardData.length == 0)
        // if(clipBoardData.length!=0){
        //     for(var i=0;i<clipBoardData.length;i++){
        //         console.log(clipBoardData[i].cb_no)
        //         clipBoardDetailInfo(queryString.stringify({cb_no:clipBoardData[i].cb_no}))
        //     }
        // }
        // console.log(clipBoardData)
        if(clipBoardData.length!=0){
            var temp=checkButtonChecked.slice()
            for(var i=0;i<clipBoardData.length;i++){
                //console.log(clipBoardData[i].detail.list_material)
                var checked=false
                for(var j=0; j<clipBoardData[i].detail.list_material.length;j++){
                    if(props.material_num==clipBoardData[i].detail.list_material[j].mt_no){
                        checked=true
                    }
                }
                temp[i]=checked
            }
            console.log(temp)
            setCheckButtonChecked(temp)
            //setRefresh(refresh+1)
        }
        
        
    },[clipBoardData])
    // useEffect(()=>{
    //     console.log(clipBoardDataDetail)
    // })
    if(newBoard){
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
            zIndex:200
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
            height:'315px',
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
                    props.toggleClipBoard()
                    setNewBoard(false)
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
                    >새로운 클립보드 생성</Text>
                    </View>

                <div
                    style={{
                    display: 'block',
                    textAlign:'left',
                    padding:'15px',
                    overflowY:'scroll',
                    backgroundColor:'white',
                    height:'100%'
                }} 
                >
                    <Text
                        style={{
                            fontWeight:700
                        }}
                    >보드명</Text>
                    <div>
                        <input 
                            style={{
                                overflow:'hidden', 
                                width:'100%',
                                height:'40px',
                                padding:'12px 20px',
                                margin:"8px 0",
                                border:"1px solid #ccc",
                                borderRadius:'4px',
                                boxSizing:'border-box'
                            }}
                            value={inputValue} 
                            onChange={updateInputValue}
                            placeholder={'입력'}
                        />
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
                        //setNewBoard(!newBoard)
                        
                        addClipboard(inputValue)
                        // setRefresh(refresh+1)
                        // setInputValue('')
                        
                    }}
                    disabled={
                        !makeButtonEnable
                    }
                >
                    <View
                        style={{
                            backgroundColor:makeButtonEnable==true ? 'white':'silver',
                            borderTop:'1px solid rgb(221,221,221)',
                            zIndex:200
                        }}
                    >
                    <Text
                        style={{
                            lineHeight:'50px',
                            fontWeight:700,
                            color:makeButtonEnable==false ? 'grey':'black'
                        }}
                    >
                        새로 만들기
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
            height:'315px',
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
                    props.toggleClipBoard()
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
                    >클립하기</Text>
                    </View>
                <View
                    style={{
                        display: clipBoardData.length==0 ? 'block':'none',
                        textAlign:'left',
                        padding:'15px'
                    }}
                >
                    <Text
                    style={{
                        fontWeight:700,
                    }}
                    >
                        생성된 보드가 아직 없습니다.
                    </Text>
                    <br></br>
                    <Text>
                        진행하고 있는 프로젝트에 필요한 자재를 클립할 보드를 만들어보세요.
                    </Text>
                </View>
                <div
                    style={{
                    display: clipBoardData.length==0 ? 'none':'block',
                    textAlign:'left',
                    padding:'15px',
                    overflowY:'scroll',
                    backgroundColor:'transparent'
                }} 
                >
                {clipBoardData.map((clipboard,index)=>
                            
                    <div
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            backgroundColor:'transparent',
                            paddingLeft:'15px',
                            paddingRight:'15px',
                            justifyContent:'space-between'
                        }}
                    >
                        <div
                            style={{
                                display:'flex',
                                flexDirection:'row',
                                backgroundColor:'transparent',
                                padding:'15px',
                            }}
                        >
                        <div
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
                                                clipboard.cb_images[0]
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
                                        display:'block',
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
                                                clipboard.cb_images[1]
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
                                                clipboard.cb_images[2]
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
                                                clipboard.cb_images[3]
                                        }}
    
                                        >
                                        </Image>
                                </div>
                            </div>
    
                        </div>
                        <div
                            style={{
                                display:'flex',
                                flexDirection:'column',
                                backgroundColor:'transparent',
                                padding:'0px' 
                            }}
                        >
                        <div
                            style={{
                                backgroundColor:'transparent',
                                height:'25px',
                                width:'165px',
                                // display:'inline-block',
                                alignItems:'center',
                                justifyContent:'center',
                                textAlign:'left',
                                // paddingTop:'11px',
                                paddingLeft:'5px',
                                lineHeight:'20px'
                            }}
                        >
                            <Text
                            style={{
                                display:'inline-block',
                                lineHeight:'25px',
                                fontWeight:700
                            }}
                        >{clipboard.cb_name}</Text>
                        </div>
                        <div
                            style={{
                                backgroundColor:'transparent',
                                height:'25px',
                                width:'165px',
                                // display:'inline-block',
                                alignItems:'center',
                                justifyContent:'center',
                                textAlign:'left',
                                paddingTop:'0px',
                                paddingLeft:'5px',
                                lineHeight:'15px'
                            }}
                        >
                            <Text
                            style={{
                                display:'inline-block',
                                color:'grey',
                                fontSize:'10px',
                                lineHeight:'25px'
                            }}
                        >클립된 항목 {clipboard.cb_num_element}개
                        </Text>
                        </div>
                        </div>
                        </div>
    
                        <div
                            className='checkContainer'
                            style={{
                                // position:'absolute',
                                right:'0px',
                                //top:'5px',
                                marginTop:'10px',
                                backgroundColor:'transparent',
                                height:'50px',
                                width:'50px',
                                // display:'inline-block',
                                paddingTop:"5px",
                                // marginTop:"5px",
                                // transform:[{
                                //         translateX:'0px',
                                //         translateY:'15px'
                                //     }]
                                alignItems:'center',
                                justifyContent:'center',
                                zIndex:98
    
                            }}
                        >   
                            <div
                                style={{
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginTop:'15px'
                                }}
                            >
                            <input 
                                className='checkbox'
                                type="checkbox" 
                                id={clipboard.cb_no}
                                style={{
                                    height:'20px',
                                    width:'20px',
                                    margin:'auto',
                                    zIndex:99,
                                    // flex:1,
                                    //left:0,
                                    // backgroundColor: 'orange'
                                    
                                }}
                                // checked={true}
                                //defaultChecked={materialNumberMatch(props.material_num,clipboard)}
                                //defaultChecked={checkButtonChecked[index]}
                                checked={checkButtonChecked[index]}
                                onClick={(e)=>
                                    // checkboxClicked(index,e,category.code_name,category.code_text)
                                    checkboxClicked(index,e,clipboard.cb_no,clipboard.detail)
                                    
                                    // console.log(e)
                                }
    
                        
                        ></input>
                        </div>
                        </div>
                    </div>
                )}
                    <div
                        style={{
                            height:'50px',
                            width:'100%',
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
                        새로운 보드 생성
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
}
export default ClipBoard