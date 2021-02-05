import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import { RadioButton } from 'react-native-paper';
import plusIcon from '../assets/plus.png';
import minusIcon from '../assets/minus.png'
import './searchpage.css'
// import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css'

const queryString = require('query-string');

function Brands(props) {
  // var bestProducts
  const[brandListData,setBrandListData]=React.useState([])
  const[originalSearchData,setOriginalSearchData]=React.useState(undefined)
  const[secondSearchData,setSecondSearchData]=React.useState(undefined) 
  const[detailView,setDetailView]=React.useState(false)
  const[brandId,setBrandId]=React.useState(null)
  const [height,setHeight]=React.useState(Dimensions.get('window').height)
  const [width,setWidth]=React.useState(Dimensions.get('window').width)
  const [checked, setChecked] = React.useState('first');
  const [categoryOpened, setCategoryOpened]=React.useState(false)
  const [useOpened, setUseOpened]=React.useState(false)
  const [brandOpened, setBrandOpened]=React.useState(false)
  const [colorOpened, setColorOpened]=React.useState(false)
  const [patternOpened, setPatternOpened]=React.useState(false)
  const [filter,setFilter]=React.useState({})
  const [checkedCategory, setCheckedCategory]=React.useState([])
  const [checkedUse,setCheckedUse]=React.useState([])


  const firstPage=(jsonObj)=>{
    console.log(jsonObj)
    fetch('/search?'+
    queryString.stringify({
          pagination:true,
          ...jsonObj
        })
    )
    .then(res=>res.json())
    .then((incomingData)=>{
        console.log(incomingData)
        setOriginalSearchData(incomingData)
        })
    .catch(err=>{
        console.log(err)
    })
  }
  const secondPage=(jsonObj)=>{
    console.log(jsonObj)
    fetch('/detailedsearch?'+
    queryString.stringify(
        //   pagination:true,
          jsonObj
        )
    )
    .then(res=>res.json())
    .then((incomingData)=>{
        console.log(incomingData)
        setSecondSearchData(incomingData)
        })
    .catch(err=>{
        console.log(err)
    })
  }
  const onChange=()=>{
    setHeight(Dimensions.get('window').height)
    setWidth(Dimensions.get('window').width)
    // console.log(height+" : "+width)
  }
  const checkboxClicked=(index,e,category_name,category_text)=>{
      //console.log('clicked')
      console.log(category_name)
      console.log(e.target.checked)
  }
  const categoryCheckboxClicked=(index,e,category_name,category_text)=>{
    //console.log('clicked')
    if(e.target.checked==true){
        var numbers=checkedCategory
        numbers.push(String(category_name))
        //console.log(numbers)
        setCheckedCategory(numbers)
        var filterQ={...filter}
        filterQ.list_category=numbers
        setFilter(filterQ)
    }
    else if(e.target.checked==false){
        var numbers=checkedCategory
        var indexOfCategory=numbers.indexOf(String(category_name))
        numbers.splice(indexOfCategory,1)
        //console.log(numbers)
        setCheckedCategory(numbers)
        var filterQ={...filter}
        filterQ.list_category=numbers
        setFilter(filterQ)
    }
    //console.log(filterQ)
    
  }
  const useageCheckboxClicked=(index,e,use_name,use_text)=>{
    //console.log('clicked')
    if(e.target.checked==true){
        var numbers=checkedUse
        numbers.push(String(use_name))
        //console.log(numbers)
        setCheckedUse(numbers)
        var filterQ={...filter}
        filterQ.list_use=numbers
        setFilter(filterQ)
    }
    else if(e.target.checked==false){
        var numbers=checkedUse
        var indexOfUse=numbers.indexOf(String(use_name))
        numbers.splice(indexOfUse,1)
        //console.log(numbers)
        setCheckedUse(numbers)
        var filterQ={...filter}
        filterQ.list_use=numbers
        setFilter(filterQ)
    }
    //console.log(filterQ)
    
  }
  useEffect(() => {
    Dimensions.addEventListener('change',onChange)
    const parsed = queryString.parse(props.location.search);
    console.log(parsed.ct_id==undefined)
    firstPage(parsed)
    // secondPage(parsed)

    // secondPage(
    //     {mem_no: "63", search_target: null, search_value: null, list_color: ["GOLDSILVER","RED","BLACK"], list_pattern: ["METAL","SOLID","GEOMETRIC"], list_brand: ["62","101"], list_category: ["45"], list_use: ["56","9"], pagination: true, page: 1}
    // )
  },[])
  useEffect(() => {
    //console.log({...queryString.parse(props.location.search),...filter})
    const parsed = {...queryString.parse(props.location.search),...filter}
    secondPage(parsed)
    // var testObj= {mem_no: "63", keyword: "시트", search_target: null, search_value: null, list_color: ["GOLDSILVER","RED","BLACK"], list_pattern: ["METAL","SOLID","GEOMETRIC"], list_brand: ["62","101"], list_category: ["45"], list_use: ["56","9"], material_scope: "ALL", pagination: true, page: 1}
    // secondPage(testObj)
},[filter])
  if(originalSearchData!=undefined){

    return (
        <div>
        <Navbar />
        <NavBarFiller/>
            <div className="MainContent"
                style={{
                    width:'100vw',
                    height:'calc(100vh-100px)'
                }}
            >
                <View>
                    <View
                        style={{
                            flexDirection:'row',
                            backgroundColor:'transparent',
                            alignItems:'center',
                            paddingLeft:'65px',
                            paddingRight:'65px'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setChecked('first')}
                            style={{
                                width:'150px',
                                textAlign:'left'
                            }}
                        >
                            <Text>
                                모든 품목 보기  
                            </Text>
                        </TouchableOpacity>
                        <RadioButton
                            value="first"
                            status={ checked === 'first' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('first')}
                            color="rgb(255,123,88)"
                        />
                    </View>
                    <View
                        style={{
                            flexDirection:'row',
                            backgroundColor:'transparent',
                            alignItems:'center',
                            paddingLeft:'65px',
                            paddingRight:'65px'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setChecked('second')}
                            style={{
                                width:'150px',
                                textAlign:'left'
                            }}
                        >
                            <Text>
                                샘플 주문 가능한 품목
                            </Text>
                        </TouchableOpacity>
                    
                    <RadioButton
                        value="second"
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                        color="rgb(255,123,88)"
                    />
                    </View>
                    <View

                        style={{
                            flexDirection:'row',
                            backgroundColor:'transparent',
                            alignItems:'center',
                            paddingLeft:'65px',
                            paddingRight:'65px'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setChecked('third')}
                            style={{
                                width:'150px',
                                textAlign:'left'
                            }}
                        >
                            <Text>
                                클립 당일 묵음발송 품목
                            </Text>
                        </TouchableOpacity>
                    <RadioButton
                        value="third"
                        status={ checked === 'third' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('third')}
                        color="rgb(255,123,88)"
                    />
                    </View>
                    <div
                        style={{
                            paddingTop:'15px',
                            paddingLeft:'65px',
                            paddingRight:'65px'
                        }}
                    >
                        <div
                        
                        style={{
                        height:'1px',
                        width:'187px',
                        // border:'none',
                        color:'rgb(219,219,219)',
                        backgroundColor:'rgb(219,219,219)'
                        }} 
                    
                        >
                        </div>
                    </div>
                    <View>
                        <View

                            style={{
                                flexDirection:'column',
                                backgroundColor:'transparent',
                                // alignItems:'center',
                                marginLeft:'65px',
                                // marginRight:'65px',
                                paddingTop:'15px',
                                width:'200px',
                                textAlign:'left'
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor:'transparent',
                                    width:'187px',
                                    display:'flex',
                                    flexDirection:'row',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize:'15px',
                                        fontWeight:700
                                    }}
                                >
                                    자재 카테고리
                                </Text>
                                <TouchableOpacity
                                    onPress={()=>{
                                        setCategoryOpened(!categoryOpened)
                                    }}
                                    style={{
                                        position:'absolute',
                                        right:'0px'
                                    }}
                                >
                                <img
                                    src={plusIcon}
                                    style={{
                                        display: categoryOpened? 'none': 'block',
                                        width:'20px',
                                        height:'20px',
                                        position:'absolute',
                                        right:'15px'
                                    }}
                                >
                                </img>
                                <img
                                    src={minusIcon}
                                    style={{
                                        display: categoryOpened? 'block': 'none',
                                        width:'20px',
                                        height:'20px',
                                        position:'absolute',
                                        right:'15px'
                                    }}
                                >
                                </img>
                            </TouchableOpacity>
                            </div>
                            <div
                                style={{
                                    // backgroundColor:'red',
                                    maxHeight: categoryOpened? '400px':'0px',
                                    overflow:'scroll',
                                    transition: '0.25s',
                                    transitionTimingFunction:'ease-in-out'

                                }}
                            >
                            {originalSearchData.filter.category.map((category,index)=>
                            
                                <div
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        backgroundColor:'transparent',
                                        padding:'0px'
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor:'transparent',
                                            height:'25px',
                                            width:'25px',
                                            // display:'inline-block',
                                            paddingTop:"5px",
                                            marginTop:"5px"

                                        }}
                                    >   
                                     <input type="checkbox" 
                                            id={category.code_name}
                                            style={{
                                                height:'20px',
                                                width:'20px'
                                                // flex:1,
                                                //left:0,
                                                
                                            }}
                                            onChange={(e)=>
                                                // checkboxClicked(index,e,category.code_name,category.code_text)
                                                categoryCheckboxClicked(index,e,category.code_name,category.code_text)
                                            }
                                    
                                    ></input>

                                    </div>
                                   <div
                                        style={{
                                            backgroundColor:'transparent',
                                            height:'30px',
                                            width:'165px',
                                            // display:'inline-block',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            textAlign:'left',
                                            paddingTop:'11px',
                                            paddingLeft:'5px'
                                        }}
                                   >
                                       <Text
                                        style={{
                                            display:'inline-block',
                                            
                                        }}
                                    >{category.code_text}</Text>
                                   </div>
                                    
                                </div>
                            )}
                            </div>
                    <div
                        style={{
                            paddingTop:'15px',
                            // paddingLeft:'65px',
                            // paddingRight:'65px'
                            marginBottom:'15px'
                        }}
                    >
                        <div
                        
                        style={{
                        height:'1px',
                        width:'187px',
                        // border:'none',
                        color:'rgb(219,219,219)',
                        backgroundColor:'rgb(219,219,219)'
                        }} 
                    
                        >
                        </div>
                    </div>
                        <div
                            style={{
                                backgroundColor:'transparent',
                                width:'187px',
                                display:'flex',
                                flexDirection:'row',
                            }}
                        >    
                            <Text
                            style={{
                                fontSize:'15px',
                                fontWeight:700
                            }}
                            >사용 부위</Text>
                           <TouchableOpacity
                                onPress={()=>{
                                    setUseOpened(!useOpened)
                                }}
                                style={{
                                    position:'absolute',
                                    right:'0px'
                                }}
                            >
                            <img
                                src={plusIcon}
                                style={{
                                    display: useOpened? 'none': 'block',
                                    width:'20px',
                                    height:'20px',
                                    position:'absolute',
                                    right:'15px'
                                }}
                            >
                            </img>
                            <img
                                src={minusIcon}
                                style={{
                                    display: useOpened? 'block': 'none',
                                    width:'20px',
                                    height:'20px',
                                    position:'absolute',
                                    right:'15px'
                                }}
                            >
                            </img>
                            </TouchableOpacity>
                            </div>
                            <div
                                style={{
                                    maxHeight: useOpened?'400px':'0px',
                                    overflow:'scroll',
                                    transition: '0.25s',
                                    transitionTimingFunction:'ease-in-out'
                                }}
                            >
                            {originalSearchData.filter.use.map((use,index)=>
                            
                            <div
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    backgroundColor:'transparent',
                                    padding:'0px'
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor:'transparent',
                                        height:'25px',
                                        width:'25px',
                                        // display:'inline-block',
                                        paddingTop:"5px",
                                        marginTop:"5px"

                                    }}
                                >   
                                 <input type="checkbox" 
                                        style={{
                                            height:'20px',
                                            width:'20px'
                                            //flex:1,
                                            //left:0,
                                            
                                        }}
                                        onChange={(e)=>useageCheckboxClicked(index,e,use.code_name,use.code_text)}
                                
                                ></input>

                                </div>
                               <div
                                    style={{
                                        backgroundColor:'transparent',
                                        height:'30px',
                                        width:'165px',
                                        // display:'inline-block',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        textAlign:'left',
                                        paddingTop:'11px',
                                        paddingLeft:'5px'
                                    }}
                               >
                                   <Text
                                    style={{
                                        display:'inline-block',
                                        
                                    }}
                                >{use.code_text}</Text>
                               </div>
                                
                            </div>
                            )}
                            </div>
                            <div
                                style={{
                                    paddingTop:'15px',
                                    // paddingLeft:'65px',
                                    // paddingRight:'65px'
                                    marginBottom:'15px'
                                }}
                            >
                                <div
                                
                                style={{
                                height:'1px',
                                width:'187px',
                                // border:'none',
                                color:'rgb(219,219,219)',
                                backgroundColor:'rgb(219,219,219)'
                                }} 
                            
                                >
                                </div>
                            </div>
                            
                                
                                    <div
                                        style={{
                                            backgroundColor:'transparent',
                                            width:'187px',
                                            display:'flex',
                                            flexDirection:'row',
                                        }}
                                    >
 
                                        <Text
                                        style={{
                                            fontSize:'15px',
                                            fontWeight:700
                                        }}
                                        >
                                            브랜드
                                        </Text>
                                        <TouchableOpacity
                                            onPress={()=>{
                                                setBrandOpened(!brandOpened)
                                            }}
                                            style={{
                                                position:'absolute',
                                                right:'0px'
                                            }}
                                        >
                                        <img
                                            src={plusIcon}
                                            style={{
                                                display: brandOpened? 'none': 'block',
                                                width:'20px',
                                                height:'20px',
                                                position:'absolute',
                                                right:'15px'
                                            }}
                                        >
                                        </img>
                                        <img
                                            src={minusIcon}
                                            style={{
                                                display: brandOpened? 'block': 'none',
                                                width:'20px',
                                                height:'20px',
                                                position:'absolute',
                                                right:'15px'
                                            }}
                                        >
                                        </img>
                                        </TouchableOpacity>
                                    </div>
                              
                            <div
                                style={{
                                    maxHeight:brandOpened? '400px':'0px',
                                    overflow:'scroll',
                                    transition: '0.25s',
                                    transitionTimingFunction:'ease-in-out'
                                }}
                            >
                                {originalSearchData.filter.brand.map((brand,index)=>
                                
                                <div
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        backgroundColor:'transparent',
                                        padding:'0px'
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor:'transparent',
                                            height:'25px',
                                            width:'25px',
                                            // display:'inline-block',
                                            paddingTop:"5px",
                                            marginTop:"5px"

                                        }}
                                    >   
                                    <input type="checkbox" 
                                            style={{
                                                height:'20px',
                                                width:'20px'
                                                // flex:1,
                                                //left:0,
                                                
                                            }}
                                            onChange={(e)=>checkboxClicked(index,e,brand.code_name,brand.code_text)}
                                    
                                    ></input>

                                    </div>
                                <div
                                        style={{
                                            backgroundColor:'transparent',
                                            height:'30px',
                                            width:'165px',
                                            // display:'inline-block',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            textAlign:'left',
                                            paddingTop:'11px',
                                            paddingLeft:'5px'
                                        }}
                                >
                                    <Text
                                        style={{
                                            display:'inline-block',
                                            
                                        }}
                                    >{brand.code_text}</Text>
                                </div>
                                    
                                </div>
                                )}
                            </div>
                            <div
                                style={{
                                    paddingTop:'15px',
                                    // paddingLeft:'65px',
                                    // paddingRight:'65px'
                                    marginBottom:'15px'
                                }}
                            >
                                <div
                                
                                style={{
                                height:'1px',
                                width:'187px',
                                // border:'none',
                                color:'rgb(219,219,219)',
                                backgroundColor:'rgb(219,219,219)'
                                }} 
                            
                                >
                                </div>
                            </div>
                            

                            <div
                                style={{
                                    backgroundColor:'transparent',
                                    width:'187px',
                                    display:'flex',
                                    flexDirection:'row',
                                }}
                            >
                            <Text
                                style={{
                                    fontSize:'15px',
                                    fontWeight:700
                                }}
                            >색상</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    setColorOpened(!colorOpened)
                                }}
                                style={{
                                    position:'absolute',
                                    right:'0px'
                                }}
                            >
                            <img
                                src={plusIcon}
                                style={{
                                    display: colorOpened? 'none': 'block',
                                    width:'20px',
                                    height:'20px',
                                    position:'absolute',
                                    right:'15px'
                                }}
                            >
                            </img>
                            <img
                                src={minusIcon}
                                style={{
                                    display: colorOpened? 'block': 'none',
                                    width:'20px',
                                    height:'20px',
                                    position:'absolute',
                                    right:'15px'
                                }}
                            >
                            </img>
                            </TouchableOpacity>
                            </div>
                            <div
                                style={{
                                    maxHeight:colorOpened? '400px':'0px',
                                    overflow:'scroll',
                                    transition: '0.25s',
                                    transitionTimingFunction:'ease-in-out'
                                }}
                            >
                            {originalSearchData.filter.color.map((color,index)=>
                            
                            <div
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    backgroundColor:'transparent',
                                    padding:'0px'
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor:'transparent',
                                        height:'25px',
                                        width:'25px',
                                        // display:'inline-block',
                                        paddingTop:"5px",
                                        marginTop:"5px"

                                    }}
                                >   
                                 <input type="checkbox" 
                                        style={{
                                            height:'20px',
                                            width:'20px'
                                            //flex:1,
                                            //left:0,
                                            
                                        }}
                                        onChange={(e)=>checkboxClicked(index,e,color.code_name,color.code_text)}
                                
                                ></input>

                                </div>
                               <div
                                    style={{
                                        backgroundColor:'transparent',
                                        height:'30px',
                                        width:'165px',
                                        // display:'inline-block',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        textAlign:'left',
                                        paddingTop:'11px',
                                        paddingLeft:'5px'
                                    }}
                               >
                                   <Text
                                    style={{
                                        display:'inline-block',
                                        
                                    }}
                                >{color.code_text}</Text>
                               </div>
                                
                            </div>
                            )}
                            </div>
                            <div
                                style={{
                                    paddingTop:'15px',
                                    // paddingLeft:'65px',
                                    // paddingRight:'65px'
                                    marginBottom:'15px'
                                }}
                            >
                                <div
                                
                                style={{
                                height:'1px',
                                width:'187px',
                                // border:'none',
                                color:'rgb(219,219,219)',
                                backgroundColor:'rgb(219,219,219)'
                                }} 
                            
                                >
                                </div>
                            </div>
                            <div>
                            <div
                                style={{
                                    backgroundColor:'transparent',
                                    width:'187px',
                                    display:'flex',
                                    flexDirection:'row',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize:'15px',
                                        fontWeight:700
                                    }}
                                >
                                    패턴
                                </Text>
                                <TouchableOpacity
                                    onPress={()=>{
                                        setPatternOpened(!patternOpened)
                                    }}
                                    style={{
                                        position:'absolute',
                                        right:'0px'
                                    }}
                                >
                                <img
                                    src={plusIcon}
                                    style={{
                                        display: patternOpened? 'none': 'block',
                                        width:'20px',
                                        height:'20px',
                                        position:'absolute',
                                        right:'15px'
                                    }}
                                >
                                </img>
                                <img
                                    src={minusIcon}
                                    style={{
                                        display: patternOpened? 'block': 'none',
                                        width:'20px',
                                        height:'20px',
                                        position:'absolute',
                                        right:'15px'
                                    }}
                                >
                                </img>
                                </TouchableOpacity>
                            </div>

                            </div>
                            <div
                                style={{
                                    maxHeight:patternOpened? '400px':'0px',
                                    overflow:'scroll',
                                    transition: '0.25s',
                                    transitionTimingFunction:'ease-in-out'
                                }}
                            >
                            {originalSearchData.filter.pattern.map((pattern,index)=>
                            
                            <div
                                style={{
                                    display:'flex',
                                    flexDirection:'row',
                                    backgroundColor:'transparent',
                                    padding:'0px'
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor:'transparent',
                                        height:'25px',
                                        width:'25px',
                                        // display:'inline-block',
                                        paddingTop:"5px",
                                        marginTop:"5px"

                                    }}
                                >   
                                 <input type="checkbox" 
                                        style={{
                                            height:'20px',
                                            width:'20px'
                                            //flex:1,
                                            //left:0,
                                            
                                        }}
                                        onChange={(e)=>checkboxClicked(index,e,pattern.code_name,pattern.code_text)}
                                
                                ></input>

                                </div>
                               <div
                                    style={{
                                        backgroundColor:'transparent',
                                        height:'30px',
                                        width:'165px',
                                        // display:'inline-block',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        textAlign:'left',
                                        paddingTop:'11px',
                                        paddingLeft:'5px'
                                    }}
                               >
                                   <Text
                                    style={{
                                        display:'inline-block',
                                        
                                    }}
                                >{pattern.code_text}</Text>
                               </div>
                                
                            </div>
                             )}
                            </div>
                            
                        </View>
                    </View>
                </View>
                <View
                    id="SearchResults"
                    style={{
                        position:'absolute',
                        top:'100px',
                        left:'265px',
                        backgroundColor:'transparent',
                        height:'100vh',
                        // width:`calc(100vw-265px)`,
                        width:`calc(62vw)`,
                        textAlign:'left',
                            // columnCount:3,
                            
                    }}

                >
                    <Text
                        style={{
                            fontSize:'20px'
                        }}
                    >
                        검색 결과
                    </Text>
                    <View
                        style={{
                            flexwrap:'wrap',
                            justifyContent:'space-between',
                            display: 'grid',
                            gridTemplateColumns: 'auto auto auto auto',
                        }}
                    >
                    {originalSearchData.resultList.map((result,index)=>

                    <View
                    style={{
                        backgroundColor:'transparent',
                        height:'200px',
                        width:'125px',
                        // marginLeft:'auto',
                        // marginRight:'auto',
                        marginTop:'20px',
                        borderRadius:10,
                        boxShadow:'0px 0px 3px black'
                        }}
                    >
                    <Image
                    style={{
                    display:'block',
                    height:'125px',
                    width:'125px',
                    borderTopLeftRadius:10,
                    borderTopRightRadius:10,
                    zIndex:1,
                    pointerEvents:'none',
                    // transform:[{
                    //     translateX:'0px',
                    //     translateY:'0px'
                    // }]
                    }}
                    source={{
                        uri:
                            result.mt_feature_img_url
                    }}

                    >
                    </Image>
                    <View
                    style ={{
                        height:'75px',
                        width:'125px',
                        fontSize: '12pt',
                        fontWeight:'500',
                        textDecorationLine:'none',
                        color:'white',
                        textAlign:'center',
                        flexDirection:'column',
                        pointerEvents:'none',
                        backgroundColor:'white',
                        pointerEvents:'none',
                        borderBottomLeftRadius:10,
                        borderBottomRightRadius:10,
                        padding:'10px'
                    }}
                    >
                    <Text
                        style ={{
                            // height:'65pt',
                            // width:'250px',
                            fontSize: '8pt',
                            fontWeight:'700',
                            textDecorationLine:'none',
                            color:'black',
                            textAlign:'left',
                            //alignItems:'center',
                            //justifyContent:'center',
                            //flexDirection:'row',
                            //marginTop:'45pt',
                            pointerEvents:'none',
                            backgroundColor:'transparent',
                            pointerEvents:'none',
                            
                        }}
                    >
                        {result.vd_name}
                    </Text>
                    <Text
                            style ={{
                                height:'100px',
                                width:'120px',
                                fontSize: '8pt',
                                fontWeight:'500',
                                textDecorationLine:'none',
                                color:'black',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                // marginLeft:'1px',
                                // marginTop:'1px',
                                pointerEvents:'none',
                                backgroundColor:'transparent',
                                pointerEvents:'none',
                                
                                
                            }}
                        >
                        {result.mt_subname}
                        
                    </Text>
                    
                    </View>
                    </View>
                    )}
                    </View>
                </View>
            </div>
        </div>
    );
  }
  else{
    return(
    <div>
        <Navbar />
        <NavBarFiller/>

    </div>
    )
  }
}
  
  export default Brands;