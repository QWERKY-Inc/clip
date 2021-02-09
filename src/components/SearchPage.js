import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination'
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import { RadioButton } from 'react-native-paper';
import plusIcon from '../assets/plus.png';
import minusIcon from '../assets/minus.png'
import './searchpage.css'
// import Pagination from "react-js-pagination";
// import ReactPaginate from 'react-paginate';
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
  const [materialScope,setMaterialScope]=React.useState('ALL')
  const [sortMethod,setSortMethod]=React.useState('RANKING')
  const [categoryOpened, setCategoryOpened]=React.useState(false)
  const [useOpened, setUseOpened]=React.useState(false)
  const [brandOpened, setBrandOpened]=React.useState(false)
  const [colorOpened, setColorOpened]=React.useState(false)
  const [patternOpened, setPatternOpened]=React.useState(false)
  const [filter,setFilter]=React.useState({})
  const [checkedCategory, setCheckedCategory]=React.useState([])
  const [checkedUse,setCheckedUse]=React.useState([])
  const [checkedBrand,setCheckedBrand]=React.useState([])
  const [checkedColors,setCheckedColors]=React.useState([])
  const [checkedPatterns,setCheckedPatterns]=React.useState([])
  const [activePage,setActivePage]=React.useState(1)
  const [endPage,setEndPage]=React.useState(1)

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
    queryString.stringify({
           pagination:true,
        //    page:activePage,
          ...jsonObj
            }
        )
        
    )
    .then(res=>res.json())
    .then((incomingData)=>{
        console.log(incomingData)
        setSecondSearchData(incomingData)
        //setEndPage(incomingData.pageInfo.totalPage)
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
  const onScroll=()=>{
    //   if(document.body.offsetHeight+document.body.scrollTop===document.body.scrollHeight){

    //   }
    const position=window.innerHeight+window.pageYOffset;
    // console.log(position+'/'+document.body.scrollHeight+' reached')
    if(secondSearchData!=undefined){
        if(position>=document.body.scrollHeight){
            //if(activePage<secondSearchData.pageInfo.totalPage){
            // if(activePage<endPage) {
                console.log(activePage+ " / "+endPage )
                setActivePage(activePage+1)
            //   }
            //console.log(secondSearchData.pageInfo)
        }
    }
  }

  const checkboxClicked=(index,e,category_name,category_text)=>{
      //console.log('clicked')
      console.log(category_name)
      console.log(e.target.checked)
  }
  const sortMethodSelected=(e)=>{
    setSortMethod(e.target.options[e.target.selectedIndex].value)
    var filterQ={...filter}
    filterQ.sort_method=e.target.options[e.target.selectedIndex].value
    setFilter(filterQ)
  }
  const categoryCheckboxClicked=(index,e,category_name,category_text)=>{
    //console.log('clicked')
    setActivePage(1)
    if(e.target.checked==true){
        var numbers=checkedCategory
        numbers.push(String(category_name))
        //console.log(numbers)
        setCheckedCategory(numbers)
        var filterQ={...filter}
        filterQ.list_category=numbers
        filterQ.page=1
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
        filterQ.page=1
        setFilter(filterQ)
    }
    //console.log(filterQ)
    
  }
  const useageCheckboxClicked=(index,e,use_name,use_text)=>{
    //console.log('clicked')
    setActivePage(1)
    if(e.target.checked==true){
        var numbers=checkedUse
        numbers.push(String(use_name))
        //console.log(numbers)
        setCheckedUse(numbers)
        var filterQ={...filter}
        filterQ.list_use=numbers
        filterQ.page=1
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
        filterQ.page=1
        setFilter(filterQ)
    }
    //console.log(filterQ)
    
  }
  const brandCheckboxClicked=(index,e,brand_name,brand_text)=>{
    //console.log('clicked')
    setActivePage(1)
    if(e.target.checked==true){
        var numbers=checkedBrand
        numbers.push(String(brand_name))
        //console.log(numbers)
        setCheckedBrand(numbers)
        var filterQ={...filter}
        filterQ.list_brand=numbers
        filterQ.page=1
        setFilter(filterQ)
    }
    else if(e.target.checked==false){
        var numbers=checkedBrand
        var indexOfBrand=numbers.indexOf(String(brand_name))
        numbers.splice(indexOfBrand,1)
        //console.log(numbers)
        setCheckedBrand(numbers)
        var filterQ={...filter}
        filterQ.list_use=numbers
        filterQ.page=1
        setFilter(filterQ)
    }
    //console.log(filterQ)
    
  }
  const colorCheckboxClicked=(index,e,color_name,color_text)=>{
    //console.log('clicked')
    setActivePage(1)
    if(e.target.checked==true){
        var colorStrings=checkedColors
        colorStrings.push(String(color_name))
        //console.log(numbers)
        setCheckedColors(colorStrings)
        var filterQ={...filter}
        filterQ.list_color=colorStrings
        filterQ.page=1
        setFilter(filterQ)
    }
    else if(e.target.checked==false){
        var colorStrings=checkedCategory
        var indexOfColor=colorStrings.indexOf(String(color_name))
        colorStrings.splice(indexOfColor,1)
        //console.log(numbers)
        setCheckedColors(colorStrings)
        var filterQ={...filter}
        filterQ.list_color=colorStrings
        filterQ.page=1
        setFilter(filterQ)
    }
    //console.log(filterQ)
    
  }
  const patternCheckboxClicked=(index,e,pattern_name,pattern_text)=>{
    //console.log('clicked')
    setActivePage(1)
    if(e.target.checked==true){
        var patternStrings=checkedPatterns
        patternStrings.push(String(pattern_name))
        //console.log(numbers)
        setCheckedPatterns(patternStrings)
        var filterQ={...filter}
        filterQ.list_pattern=patternStrings
        filterQ.page=1
        setFilter(filterQ)
    }
    else if(e.target.checked==false){
        var patternStrings=checkedCategory
        var indexOfPattern=patternStrings.indexOf(String(pattern_name))
        patternStrings.splice(indexOfPattern,1)
        //console.log(numbers)
        setCheckedPatterns(patternStrings)
        var filterQ={...filter}
        filterQ.list_pattern=patternStrings
        filterQ.page=1
        setFilter(filterQ)
    }
    //console.log(filterQ)
    
  }
  const currentPageTo=(pageNumber)=>{
    // let page=data.selectedIndex
    setActivePage(pageNumber)
  }
  const leftPageJump=()=>{
      if(activePage-3>1){
          setActivePage(activePage-3)
      }
      else{
          setActivePage(1)
      }
  }
  const rightPageJump=()=>{
    if(secondSearchData.pageInfo.totalPage<activePage+3){
        setActivePage(secondSearchData.pageInfo.totalPage)
    }
    else{
        setActivePage(activePage+3)
    }
}
  useEffect(() => {
    Dimensions.addEventListener('change',onChange)
    //window.addEventListener('scroll',onScroll,{passive:true})
    const parsed = queryString.parse(props.location.search);
    console.log(parsed.ct_id==undefined)
    firstPage(parsed)
    // secondPage(parsed)

    // secondPage(
    //     {mem_no: "63", search_target: null, search_value: null, list_color: ["GOLDSILVER","RED","BLACK"], list_pattern: ["METAL","SOLID","GEOMETRIC"], list_brand: ["62","101"], list_category: ["45"], list_use: ["56","9"], pagination: true, page: 1}
    // )
  },[])
  useEffect(()=>{
    console.log(activePage)
    var filterQ={...filter}
    filterQ.page=activePage
    setFilter(filterQ)
  },[activePage])

  useEffect(()=>{
    var filterQ={...filter}
    filterQ.material_scope=materialScope
    setFilter(filterQ)
  },[materialScope])

  useEffect(()=>{
    var filterQ={...filter}
    filterQ.sort_method=sortMethod
    setFilter(filterQ)
  },[sortMethod])

  useEffect(() => {
    //console.log({...queryString.parse(props.location.search),...filter})
    const parsed = {...queryString.parse(props.location.search),...filter}
    secondPage(parsed)
    // var testObj= {mem_no: "63", keyword: "시트", search_target: null, search_value: null, list_color: ["GOLDSILVER","RED","BLACK"], list_pattern: ["METAL","SOLID","GEOMETRIC"], list_brand: ["62","101"], list_category: ["45"], list_use: ["56","9"], material_scope: "ALL", pagination: true, page: 1}
    // secondPage(testObj)
    console.log(filter.page)
},[filter])
  if(secondSearchData!=undefined && originalSearchData!=undefined){

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
                            // onPress={() => setChecked('first')}
                            onPress={() => setMaterialScope('ALL')}
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
                            // status={ checked === 'first' ? 'checked' : 'unchecked' }
                            // onPress={() => setChecked('first')}
                            status={ materialScope === 'ALL' ? 'checked' : 'unchecked' }
                            onPress={() => setMaterialScope('ALL')}
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
                            //onPress={() => setChecked('second')}
                            onPress={() => setMaterialScope('DELIVERYABLE')}
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
                        // status={ checked === 'second' ? 'checked' : 'unchecked' }
                        // onPress={() => setChecked('second')}
                        status={ materialScope === 'DELIVERYABLE' ? 'checked' : 'unchecked' }
                        onPress={() => setMaterialScope('DELIVERYABLE')}
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
                            // onPress={() => setChecked('third')}
                            onPress={() => setMaterialScope('ONLY_CLIPDELIVERY')}
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
                        // status={ checked === 'third' ? 'checked' : 'unchecked' }
                        // onPress={() => setChecked('third')}
                        status={ materialScope === 'ONLY_CLIPDELIVERY' ? 'checked' : 'unchecked' }
                        onPress={() => setMaterialScope('ONLY_CLIPDELIVERY')}
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
                                        className='checkContainer'
                                        style={{
                                            backgroundColor:'transparent',
                                            height:'25px',
                                            width:'25px',
                                            // display:'inline-block',
                                            paddingTop:"5px",
                                            marginTop:"5px"

                                        }}
                                    >   
                                     <input 
                                            className='checkbox'
                                            type="checkbox" 
                                            id={category.code_name}
                                            style={{
                                                height:'20px',
                                                width:'20px',
                                                // flex:1,
                                                //left:0,
                                                // backgroundColor: 'orange'
                                                
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
                                            onChange={(e)=>brandCheckboxClicked(index,e,brand.code_name,brand.code_text)}
                                    
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
                                        onChange={(e)=>colorCheckboxClicked(index,e,color.code_name,color.code_text)}
                                
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
                                        onChange={(e)=>patternCheckboxClicked(index,e,pattern.code_name,pattern.code_text)}
                                
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
                    <View
                        style={{
                            position:'relative',
                            display:'flex',
                            flexDirection:'row'
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
                                position:'absolute',
                                backgroundColor:'transparent',
                                right:0,
                            }}
                        >
                            <select name="sort_method" id="sort_method"
                            onChange={(e)=>{
                                //console.log("select changed")
                                //console.log(e.target.options[e.target.selectedIndex].value)
                                //sortMethodSelected(e)
                                setSortMethod(e.target.options[e.target.selectedIndex].value)
                            }}
                            style={{
                                borderColor: '#fff transparent transparent transparent'
                            }}
                            >
                                <option value="RANKING">인기순</option>
                                <option value="m.mt_budget asc">가격 오름차순</option>
                                <option value="m.mt_budget desc">가격 내림차순</option>
                            </select>
                        </View>
                    </View>
                    <View
                        style={{
                            flexwrap:'wrap',
                            justifyContent:'space-between',
                            display: 'grid',
                            gridTemplateColumns: 'auto auto auto auto',
                        }}
                    >
                    
                    {secondSearchData.resultList.map((result,index)=>
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
                    <View
                        style={{
                            position:'relative',
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:'transparent'
                        }}
                    >
                        <Pagination currentPage={activePage} leftPageJump={leftPageJump} rightPageJump={rightPageJump} currentPageTo={currentPageTo} endPage={secondSearchData.pageInfo.totalPage}/>
                    </View>
                    {/* <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={secondSearchData.pageInfo.totalCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    /> */}
                    {/* <Pagination
                    activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={handlePageClick}
                    /> */}
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