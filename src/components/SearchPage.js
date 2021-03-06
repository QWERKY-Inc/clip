import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Content from "./Content";
import NavBarFiller from "./NavBarFiller";
import Pagination from "./Pagination";
import ClipBoard from "./ClipBoard";
import MoodClipBoard from "./MoodClipBoard";
import Card from "./Card";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image,
  TouchableHighlight,
  Linking,
  Dimensions,
} from "react-native";
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//import { Carousel } from 'react-responsive-carousel';
import { RadioButton } from "react-native-paper";
import { useHistory } from "react-router-dom";
import plusIcon from "../assets/plus.png";
import minusIcon from "../assets/minus.png";
import boxIcon from "../assets/icnBox.png";
import clipOff from "../assets/clipOff.png";
import clipOn from "../assets/clipOn.png";
import "./searchpage.css";
import styled from "styled-components"
// import Pagination from "react-js-pagination";
// import ReactPaginate from 'react-paginate';
// import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css'

const queryString = require("query-string");

const MaterialModeButton = styled.div`
  border-radius: 15px;
  /* background-color:${props=> props.mode == "material" ? "rgb(255,123,88)" : "transparent"}; */
  background-color:${props=> props.mode == "material" ? props.theme.colors.main : "transparent"};
  width: 100px;
  height: 30px;
  margin-top: 10px;
  /* border:${props=>props.mode == "material" ? "none" : "2px solid rgb(221,221,221)"}; */
  border:${props=>props.mode == "material" ? "none" : `2px solid ${props.theme.colors.grey[800]}`};
`
const ModeButton = styled.div`
  border-radius: 15px;
  background-color:${props=> props.mode == props.matchword ? props.theme.colors.main : "transparent"};
  width: 100px;
  height: 30px;
  margin-left: ${props=>props.marginLeft};
  /* margin-left: "15px"; */
  margin-top: 10px;
  border:${props=>props.mode == props.matchword ? "none" : `2px solid ${props.theme.colors.grey[200]}`};
   
`


function SearchPage(props) {
  // var bestProducts
  let history = useHistory();
  const [brandListData, setBrandListData] = React.useState([]);
  const [originalSearchData, setOriginalSearchData] = React.useState(undefined);
  const [secondSearchData, setSecondSearchData] = React.useState(undefined);
  const [detailView, setDetailView] = React.useState(false);
  const [brandId, setBrandId] = React.useState(null);
  const [height, setHeight] = React.useState(Dimensions.get("window").height);
  const [width, setWidth] = React.useState(Dimensions.get("window").width);
  const [checked, setChecked] = React.useState("first");
  const [materialScope, setMaterialScope] = React.useState("ALL");
  const [sortMethod, setSortMethod] = React.useState("RANKING");
  const [categoryOpened, setCategoryOpened] = React.useState(false);
  const [useOpened, setUseOpened] = React.useState(false);
  const [brandOpened, setBrandOpened] = React.useState(false);
  const [colorOpened, setColorOpened] = React.useState(false);
  const [patternOpened, setPatternOpened] = React.useState(false);
  const [filter, setFilter] = React.useState({});
  const [moodboardFilter, setMoodboardFilter] = React.useState({});
  const [checkedCategory, setCheckedCategory] = React.useState([]);
  const [checkedUse, setCheckedUse] = React.useState([]);
  const [checkedBrand, setCheckedBrand] = React.useState([]);
  const [checkedColors, setCheckedColors] = React.useState([]);
  const [checkedPatterns, setCheckedPatterns] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);
  const [endPage, setEndPage] = React.useState(1);
  const [hover, setHover] = React.useState(null);
  const [clipBoard, setClipBoard] = React.useState(false);
  const [moodClipBoard, setMoodClipBoard] = React.useState(false);
  const [materialNumber, setMaterialNumber] = React.useState(undefined);
  const [mode, setMode] = React.useState("material");
  const [moodboardPage, setMoodboardPage] = React.useState(undefined);
  const [moodboardActivePage, setMoodboardActivePage] = React.useState(1);
  const [moodboardHover, setMoodboardHover] = React.useState(null);
  const [moodBoardNumber, setMoodBoardNumber] = React.useState(null);
  const firstPage = (jsonObj) => {
    console.log(jsonObj);
    fetch(
      "/search?" +
        queryString.stringify({
          pagination: true,
          ...jsonObj,
        })
    )
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
        setOriginalSearchData(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const secondPage = (jsonObj) => {
    console.log(jsonObj);

    fetch(
      "/detailedsearch?" +
        queryString.stringify({
          pagination: true,
          //    page:activePage,
          ...jsonObj,
        })
    )
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
        setSecondSearchData(incomingData);
        //setEndPage(incomingData.pageInfo.totalPage)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const moodboardPageSearch = (jsonObj) => {
    console.log(jsonObj);
    fetch(
      "/Moodboard?" +
        queryString.stringify({
          pagination: true,
          //    page:activePage,
          ...jsonObj,
        })
    )
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
        setMoodboardPage(incomingData);
        //setEndPage(incomingData.pageInfo.totalPage)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChange = () => {
    setHeight(Dimensions.get("window").height);
    setWidth(Dimensions.get("window").width);
    // console.log(height+" : "+width)
  };
  const onScroll = () => {
    //   if(document.body.offsetHeight+document.body.scrollTop===document.body.scrollHeight){

    //   }
    const position = window.innerHeight + window.pageYOffset;
    // console.log(position+'/'+document.body.scrollHeight+' reached')
    if (secondSearchData != undefined) {
      if (position >= document.body.scrollHeight) {
        //if(activePage<secondSearchData.pageInfo.totalPage){
        // if(activePage<endPage) {
        console.log(activePage + " / " + endPage);
        setActivePage(activePage + 1);
        //   }
        //console.log(secondSearchData.pageInfo)
      }
    }
  };

  const checkboxClicked = (index, e, category_name, category_text) => {
    //console.log('clicked')
    console.log(category_name);
    console.log(e.target.checked);
  };
  const sortMethodSelected = (e) => {
    setSortMethod(e.target.options[e.target.selectedIndex].value);
    var filterQ = { ...filter };
    filterQ.sort_method = e.target.options[e.target.selectedIndex].value;
    setFilter(filterQ);
  };
  const categoryCheckboxClicked = (index, e, category_name, category_text) => {
    //console.log('clicked')
    setActivePage(1);
    if (e.target.checked == true) {
      var numbers = checkedCategory;
      numbers.push(String(category_name));
      //console.log(numbers)
      setCheckedCategory(numbers);
      var filterQ = { ...filter };
      filterQ.list_category = numbers;
      filterQ.page = 1;
      setFilter(filterQ);
    } else if (e.target.checked == false) {
      var numbers = checkedCategory;
      var indexOfCategory = numbers.indexOf(String(category_name));
      numbers.splice(indexOfCategory, 1);
      //console.log(numbers)
      setCheckedCategory(numbers);
      var filterQ = { ...filter };
      filterQ.list_category = numbers;
      filterQ.page = 1;
      setFilter(filterQ);
    }
    //console.log(filterQ)
  };
  const useageCheckboxClicked = (index, e, use_name, use_text) => {
    //console.log('clicked')
    setActivePage(1);
    if (e.target.checked == true) {
      var numbers = checkedUse;
      numbers.push(String(use_name));
      //console.log(numbers)
      setCheckedUse(numbers);
      var filterQ = { ...filter };
      filterQ.list_use = numbers;
      filterQ.page = 1;
      setFilter(filterQ);
    } else if (e.target.checked == false) {
      var numbers = checkedUse;
      var indexOfUse = numbers.indexOf(String(use_name));
      numbers.splice(indexOfUse, 1);
      //console.log(numbers)
      setCheckedUse(numbers);
      var filterQ = { ...filter };
      filterQ.list_use = numbers;
      filterQ.page = 1;
      setFilter(filterQ);
    }
    //console.log(filterQ)
  };
  const brandCheckboxClicked = (index, e, brand_name, brand_text) => {
    //console.log('clicked')
    setActivePage(1);
    if (e.target.checked == true) {
      var numbers = checkedBrand;
      numbers.push(String(brand_name));
      //console.log(numbers)
      setCheckedBrand(numbers);
      var filterQ = { ...filter };
      filterQ.list_brand = numbers;
      filterQ.page = 1;
      setFilter(filterQ);
    } else if (e.target.checked == false) {
      var numbers = checkedBrand;
      var indexOfBrand = numbers.indexOf(String(brand_name));
      numbers.splice(indexOfBrand, 1);
      //console.log(numbers)
      setCheckedBrand(numbers);
      var filterQ = { ...filter };
      filterQ.list_use = numbers;
      filterQ.page = 1;
      setFilter(filterQ);
    }
    //console.log(filterQ)
  };
  const colorCheckboxClicked = (index, e, color_name, color_text) => {
    //console.log('clicked')
    setActivePage(1);
    if (e.target.checked == true) {
      var colorStrings = checkedColors;
      colorStrings.push(String(color_name));
      //console.log(numbers)
      setCheckedColors(colorStrings);
      var filterQ = { ...filter };
      filterQ.list_color = colorStrings;
      filterQ.page = 1;
      setFilter(filterQ);
    } else if (e.target.checked == false) {
      var colorStrings = checkedColors;
      var indexOfColor = colorStrings.indexOf(String(color_name));
      colorStrings.splice(indexOfColor, 1);
      //console.log(numbers)
      setCheckedColors(colorStrings);
      var filterQ = { ...filter };
      filterQ.list_color = colorStrings;
      filterQ.page = 1;
      setFilter(filterQ);
    }
    //console.log(filterQ)
  };
  const patternCheckboxClicked = (index, e, pattern_name, pattern_text) => {
    //console.log('clicked')
    setActivePage(1);
    if (e.target.checked == true) {
      var patternStrings = checkedPatterns;
      patternStrings.push(String(pattern_name));
      //console.log(numbers)
      setCheckedPatterns(patternStrings);
      var filterQ = { ...filter };
      filterQ.list_pattern = patternStrings;
      filterQ.page = 1;
      setFilter(filterQ);
    } else if (e.target.checked == false) {
      var patternStrings = checkedPatterns;
      var indexOfPattern = patternStrings.indexOf(String(pattern_name));
      patternStrings.splice(indexOfPattern, 1);
      //console.log(numbers)
      setCheckedPatterns(patternStrings);
      var filterQ = { ...filter };
      filterQ.list_pattern = patternStrings;
      filterQ.page = 1;
      setFilter(filterQ);
    }
    //console.log(filterQ)
  };
  const currentPageTo = (pageNumber) => {
    // let page=data.selectedIndex
    setActivePage(pageNumber);
  };
  const currentMoodboardPageTo = (pageNumber) => {
    // let page=data.selectedIndex
    setMoodboardActivePage(pageNumber);
    // setMoodboardPage(pageNumber)
  };
  const leftPageJump = () => {
    if (activePage - 3 > 1) {
      setActivePage(activePage - 3);
    } else {
      setActivePage(1);
    }
  };
  const leftMoodboardPageJump = () => {
    if (moodboardActivePage - 3 > 1) {
      setMoodboardActivePage(moodboardActivePage - 3);
    } else {
      setMoodboardActivePage(1);
    }
  };
  const rightPageJump = () => {
    if (secondSearchData.pageInfo.totalPage < activePage + 3) {
      setActivePage(secondSearchData.pageInfo.totalPage);
    } else {
      setActivePage(activePage + 3);
    }
  };
  const rightMoodboardPageJump = () => {
    if (moodboardPage.pageInfo.totalPage < moodboardActivePage + 3) {
      setMoodboardActivePage(moodboardPage.pageInfo.totalPage);
    } else {
      setMoodboardActivePage(moodboardActivePage + 3);
    }
  };
  const toggleClipBoard = () => {
    setClipBoard(!clipBoard);
  };
  const toggleMoodClipBoard = () => {
    setMoodClipBoard(!moodClipBoard);
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    //window.addEventListener('scroll',onScroll,{passive:true})

    // if(props.location.search.mode!=undefined){

    //     setMode(props.location.search.mode)
    // }
    const parsed = queryString.parse(props.location.search);
    if (parsed.mode != undefined) {
      setMode(parsed.mode);
    }
    var mem_no = undefined;

    if (localStorage.login != undefined) {
      if (JSON.parse(localStorage.login).result == "SUCCESS") {
        mem_no = JSON.parse(localStorage.login).message.split("_")[0];
        parsed.mem_no = mem_no;
      } else {
        parsed.mem_no = "";
      }
    } else {
      parsed.mem_no = "";
    }
    console.log(parsed.ct_id == undefined);

    console.log("fired");
    firstPage(parsed);
    // secondPage(parsed)

    // secondPage(
    //     {mem_no: "63", search_target: null, search_value: null, list_color: ["GOLDSILVER","RED","BLACK"], list_pattern: ["METAL","SOLID","GEOMETRIC"], list_brand: ["62","101"], list_category: ["45"], list_use: ["56","9"], pagination: true, page: 1}
    // )
    moodboardPageSearch({ mem_no: mem_no });
  }, []);
  useEffect(() => {
    console.log(activePage);
    var filterQ = { ...filter };
    filterQ.page = activePage;
    setFilter(filterQ);
  }, [activePage]);
  useEffect(() => {
    console.log(moodboardActivePage);
    var moodboardFilterQ = { ...moodboardFilter };
    moodboardFilterQ.page = moodboardActivePage;
    setMoodboardFilter(moodboardFilterQ);
  }, [moodboardActivePage]);

  useEffect(() => {
    var filterQ = { ...filter };
    filterQ.material_scope = materialScope;
    setFilter(filterQ);
  }, [materialScope]);

  useEffect(() => {
    var filterQ = { ...filter };
    filterQ.sort_method = sortMethod;
    setFilter(filterQ);
  }, [sortMethod]);

  useEffect(() => {
    //console.log({...queryString.parse(props.location.search),...filter})
    const parsed = { ...queryString.parse(props.location.search), ...filter };
    // if(localStorage.login!=undefined){
    //     var mem_no=undefined
    //     mem_no=JSON.parse(localStorage.login).message.split('_')[0]
    //     parsed.mem_no=mem_no
    // }
    // else{
    //     parsed.mem_no=""
    // }

    if (localStorage.login != undefined) {
      if (JSON.parse(localStorage.login).result == "SUCCESS") {
        var mem_no = undefined;
        mem_no = JSON.parse(localStorage.login).message.split("_")[0];
        parsed.mem_no = mem_no;
      } else {
        parsed.mem_no = "";
      }
    } else {
      parsed.mem_no = "";
    }

    secondPage(parsed);
    firstPage(parsed);
    history.push("/searchpage?" + queryString.stringify(parsed));
    // var testObj= {mem_no: "63", keyword: "시트", search_target: null, search_value: null, list_color: ["GOLDSILVER","RED","BLACK"], list_pattern: ["METAL","SOLID","GEOMETRIC"], list_brand: ["62","101"], list_category: ["45"], list_use: ["56","9"], material_scope: "ALL", pagination: true, page: 1}
    // secondPage(testObj)
    console.log(filter.page);
  }, [filter]);
  useEffect(() => {
    //console.log({...queryString.parse(props.location.search),...filter})
    const parsed = { ...moodboardFilter };
    console.log(localStorage.login);
    // if(localStorage.login!=undefined){
    //     var mem_no=undefined
    //     mem_no=JSON.parse(localStorage.login).message.split('_')[0]
    //     parsed.mem_no=mem_no
    // }
    // else{
    //     parsed.mem_no=""
    // }
    if (localStorage.login != undefined) {
      if (JSON.parse(localStorage.login).result == "SUCCESS") {
        var mem_no = undefined;
        mem_no = JSON.parse(localStorage.login).message.split("_")[0];
        parsed.mem_no = mem_no;
      } else {
        parsed.mem_no = "";
      }
    } else {
      parsed.mem_no = "";
    }
    console.log("searching page " + moodboardFilter.page);
    moodboardPageSearch(parsed);
    // var testObj= {mem_no: "63", keyword: "시트", search_target: null, search_value: null, list_color: ["GOLDSILVER","RED","BLACK"], list_pattern: ["METAL","SOLID","GEOMETRIC"], list_brand: ["62","101"], list_category: ["45"], list_use: ["56","9"], material_scope: "ALL", pagination: true, page: 1}
    // secondPage(testObj)
    console.log(moodboardFilter.page);
  }, [moodboardFilter]);
  if (secondSearchData != undefined && originalSearchData != undefined) {
    if (mode == "material") {
      return (
        <div>
          <div
            style={{
              display: clipBoard ? "block" : "none",
            }}
          >
            <ClipBoard
              toggleClipBoard={toggleClipBoard}
              material_num={materialNumber}
              refresh={clipBoard}
            />
          </div>

          <Navbar />
          <NavBarFiller />
          <div
            style={{
              width: "100vw",
              height: "50px",
              backgroundColor: "transparent",
              paddingLeft: "65px",
              paddingRight: "65px",
              // paddingTop:'15px',
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => setMode("material")}>
              {/* <div
                style={{
                  borderRadius: "15px",
                  backgroundColor:
                    mode == "material" ? "rgb(255,123,88)" : "transparent",
                  width: "100px",
                  height: "30px",
                  marginTop: "10px",
                  border:
                    mode == "material" ? "none" : "2px solid rgb(221,221,221)",
                }}
              > */}
              {/* <MaterialModeButton mode={mode}> */}
              <ModeButton marginLeft="0px" mode={mode} matchword='material'>
                <Text
                  style={{
                    lineHeight: "30px",
                    color: mode == "material" ? "white" : "black",
                    fontSize: "18px",
                  }}
                >
                  자재
                </Text>
              </ModeButton>
              {/* </div> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode("moodboard")}>
              {/* <div
                style={{
                  borderRadius: "15px",
                  backgroundColor:
                    mode == "moodboard" ? "rgb(255,123,88)" : "transparent",
                  width: "100px",
                  height: "30px",
                  marginLeft: "15px",
                  marginTop: "10px",
                  border:
                    mode == "moodboard" ? "none" : "2px solid rgb(221,221,221)",
                }}
              > */}
              <ModeButton marginLeft="15px" mode={mode} matchword='moodboard'>
                <Text
                  style={{
                    lineHeight: "30px",
                    color: mode == "moodboard" ? "white" : "black",
                    fontSize: "18px",
                  }}
                >
                  무드보드
                </Text>
              </ModeButton>
              {/* </div> */}
            </TouchableOpacity>
          </div>
          <div
            className="MainContent"
            style={{
              width: "100vw",
              height: "calc(100vh-100px)",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  alignItems: "center",
                  paddingLeft: "65px",
                  paddingRight: "65px",
                }}
              >
                <TouchableOpacity
                  // onPress={() => setChecked('first')}
                  onPress={() => {
                    setMaterialScope("ALL");
                    setActivePage(1);
                  }}
                  style={{
                    width: "157px",
                    textAlign: "left",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    모든 품목 보기
                  </Text>
                </TouchableOpacity>
                <RadioButton
                  value="first"
                  // status={ checked === 'first' ? 'checked' : 'unchecked' }
                  // onPress={() => setChecked('first')}
                  status={materialScope === "ALL" ? "checked" : "unchecked"}
                  onPress={() => {
                    setMaterialScope("ALL");
                    setActivePage(1);
                  }}
                  color="rgb(255,123,88)"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  alignItems: "center",
                  paddingLeft: "65px",
                  paddingRight: "65px",
                }}
              >
                <TouchableOpacity
                  //onPress={() => setChecked('second')}

                  onPress={() => {
                    setMaterialScope("DELIVERYABLE");
                    setActivePage(1);
                  }}
                  style={{
                    width: "157px",
                    textAlign: "left",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    샘플 주문 가능한 품목
                  </Text>
                </TouchableOpacity>

                <RadioButton
                  value="second"
                  // status={ checked === 'second' ? 'checked' : 'unchecked' }
                  // onPress={() => setChecked('second')}
                  status={
                    materialScope === "DELIVERYABLE" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    setMaterialScope("DELIVERYABLE");
                    setActivePage(1);
                  }}
                  color="rgb(255,123,88)"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  alignItems: "center",
                  paddingLeft: "65px",
                  paddingRight: "65px",
                }}
              >
                <TouchableOpacity
                  // onPress={() => setChecked('third')}
                  // onPress={() => setMaterialScope('ONLY_CLIPDELIVERY')}
                  onPress={() => {
                    setMaterialScope("ONLY_CLIPDELIVERY");
                    setActivePage(1);
                  }}
                  style={{
                    width: "157px",
                    textAlign: "left",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    클립 당일 묵음발송 품목
                  </Text>
                </TouchableOpacity>
                <RadioButton
                  value="third"
                  // status={ checked === 'third' ? 'checked' : 'unchecked' }
                  // onPress={() => setChecked('third')}
                  status={
                    materialScope === "ONLY_CLIPDELIVERY"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setMaterialScope("ONLY_CLIPDELIVERY");
                    setActivePage(1);
                  }}
                  color="rgb(255,123,88)"
                />
              </View>
              <div
                style={{
                  paddingTop: "15px",
                  paddingLeft: "65px",
                  paddingRight: "65px",
                }}
              >
                <div
                  style={{
                    height: "1px",
                    width: "187px",
                    // border:'none',
                    color: "rgb(219,219,219)",
                    backgroundColor: "rgb(219,219,219)",
                  }}
                ></div>
              </div>
              <View>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "transparent",
                    // alignItems:'center',
                    marginLeft: "65px",
                    // marginRight:'65px',
                    paddingTop: "15px",
                    width: "200px",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "transparent",
                      width: "187px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                      }}
                    >
                      자재 카테고리
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setCategoryOpened(!categoryOpened);
                      }}
                      style={{
                        position: "absolute",
                        right: "0px",
                      }}
                    >
                      <img
                        src={plusIcon}
                        style={{
                          display: categoryOpened ? "none" : "block",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          right: "15px",
                        }}
                      ></img>
                      <img
                        src={minusIcon}
                        style={{
                          display: categoryOpened ? "block" : "none",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          right: "15px",
                        }}
                      ></img>
                    </TouchableOpacity>
                  </div>
                  <div
                    style={{
                      // backgroundColor:'red',
                      maxHeight: categoryOpened ? "400px" : "0px",
                      overflow: "scroll",
                      transition: "0.25s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    {originalSearchData.filter.category.map(
                      (category, index) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            backgroundColor: "transparent",
                            padding: "0px",
                          }}
                        >
                          <div
                            className="checkContainer"
                            style={{
                              backgroundColor: "transparent",
                              height: "25px",
                              width: "25px",
                              // display:'inline-block',
                              paddingTop: "5px",
                              marginTop: "5px",
                            }}
                          >
                            <input
                              className="checkbox"
                              type="checkbox"
                              id={category.code_name}
                              style={{
                                height: "20px",
                                width: "20px",
                                // flex:1,
                                //left:0,
                                // backgroundColor: 'orange'
                              }}
                              onChange={(e) =>
                                // checkboxClicked(index,e,category.code_name,category.code_text)
                                categoryCheckboxClicked(
                                  index,
                                  e,
                                  category.code_name,
                                  category.code_text
                                )
                              }
                            ></input>
                          </div>
                          <div
                            style={{
                              backgroundColor: "transparent",
                              height: "30px",
                              width: "165px",
                              // display:'inline-block',
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "left",
                              paddingTop: "11px",
                              paddingLeft: "5px",
                            }}
                          >
                            <Text
                              style={{
                                display: "inline-block",
                              }}
                            >
                              {category.code_text}
                            </Text>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div
                    style={{
                      paddingTop: "15px",
                      // paddingLeft:'65px',
                      // paddingRight:'65px'
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        height: "1px",
                        width: "187px",
                        // border:'none',
                        color: "rgb(219,219,219)",
                        backgroundColor: "rgb(219,219,219)",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      width: "187px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                      }}
                    >
                      사용 부위
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setUseOpened(!useOpened);
                      }}
                      style={{
                        position: "absolute",
                        right: "0px",
                      }}
                    >
                      <img
                        src={plusIcon}
                        style={{
                          display: useOpened ? "none" : "block",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          right: "15px",
                        }}
                      ></img>
                      <img
                        src={minusIcon}
                        style={{
                          display: useOpened ? "block" : "none",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          right: "15px",
                        }}
                      ></img>
                    </TouchableOpacity>
                  </div>
                  <div
                    style={{
                      maxHeight: useOpened ? "400px" : "0px",
                      overflow: "scroll",
                      transition: "0.25s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    {originalSearchData.filter.use.map((use, index) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          backgroundColor: "transparent",
                          padding: "0px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "transparent",
                            height: "25px",
                            width: "25px",
                            // display:'inline-block',
                            paddingTop: "5px",
                            marginTop: "5px",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{
                              height: "20px",
                              width: "20px",
                              //flex:1,
                              //left:0,
                            }}
                            onChange={(e) =>
                              useageCheckboxClicked(
                                index,
                                e,
                                use.code_name,
                                use.code_text
                              )
                            }
                          ></input>
                        </div>
                        <div
                          style={{
                            backgroundColor: "transparent",
                            height: "30px",
                            width: "165px",
                            // display:'inline-block',
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "left",
                            paddingTop: "11px",
                            paddingLeft: "5px",
                          }}
                        >
                          <Text
                            style={{
                              display: "inline-block",
                            }}
                          >
                            {use.code_text}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      paddingTop: "15px",
                      // paddingLeft:'65px',
                      // paddingRight:'65px'
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        height: "1px",
                        width: "187px",
                        // border:'none',
                        color: "rgb(219,219,219)",
                        backgroundColor: "rgb(219,219,219)",
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "transparent",
                      width: "187px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                      }}
                    >
                      브랜드
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setBrandOpened(!brandOpened);
                      }}
                      style={{
                        position: "absolute",
                        right: "0px",
                      }}
                    >
                      <img
                        src={plusIcon}
                        style={{
                          display: brandOpened ? "none" : "block",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          right: "15px",
                        }}
                      ></img>
                      <img
                        src={minusIcon}
                        style={{
                          display: brandOpened ? "block" : "none",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          right: "15px",
                        }}
                      ></img>
                    </TouchableOpacity>
                  </div>

                  <div
                    style={{
                      maxHeight: brandOpened ? "400px" : "0px",
                      overflow: "scroll",
                      transition: "0.25s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    {originalSearchData.filter.brand.map((brand, index) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          backgroundColor: "transparent",
                          padding: "0px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "transparent",
                            height: "25px",
                            width: "25px",
                            // display:'inline-block',
                            paddingTop: "5px",
                            marginTop: "5px",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{
                              height: "20px",
                              width: "20px",
                              // flex:1,
                              //left:0,
                            }}
                            onChange={(e) =>
                              brandCheckboxClicked(
                                index,
                                e,
                                brand.code_name,
                                brand.code_text
                              )
                            }
                          ></input>
                        </div>
                        <div
                          style={{
                            backgroundColor: "transparent",
                            height: "30px",
                            width: "165px",
                            // display:'inline-block',
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "left",
                            paddingTop: "11px",
                            paddingLeft: "5px",
                          }}
                        >
                          <Text
                            style={{
                              display: "inline-block",
                            }}
                          >
                            {brand.code_text}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      paddingTop: "15px",
                      // paddingLeft:'65px',
                      // paddingRight:'65px'
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        height: "1px",
                        width: "187px",
                        // border:'none',
                        color: "rgb(219,219,219)",
                        backgroundColor: "rgb(219,219,219)",
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "transparent",
                      width: "187px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                      }}
                    >
                      색상
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setColorOpened(!colorOpened);
                      }}
                      style={{
                        position: "absolute",
                        right: "0px",
                      }}
                    >
                      <img
                        src={plusIcon}
                        style={{
                          display: colorOpened ? "none" : "block",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          right: "15px",
                        }}
                      ></img>
                      <img
                        src={minusIcon}
                        style={{
                          display: colorOpened ? "block" : "none",
                          width: "20px",
                          height: "20px",
                          position: "absolute",
                          right: "15px",
                        }}
                      ></img>
                    </TouchableOpacity>
                  </div>
                  <div
                    style={{
                      maxHeight: colorOpened ? "400px" : "0px",
                      overflow: "scroll",
                      transition: "0.25s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    {originalSearchData.filter.color.map((color, index) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          backgroundColor: "transparent",
                          padding: "0px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "transparent",
                            height: "25px",
                            width: "25px",
                            // display:'inline-block',
                            paddingTop: "5px",
                            marginTop: "5px",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{
                              height: "20px",
                              width: "20px",
                              //flex:1,
                              //left:0,
                            }}
                            onChange={(e) =>
                              colorCheckboxClicked(
                                index,
                                e,
                                color.code_name,
                                color.code_text
                              )
                            }
                          ></input>
                        </div>
                        <div
                          style={{
                            backgroundColor: "transparent",
                            height: "30px",
                            width: "165px",
                            // display:'inline-block',
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "left",
                            paddingTop: "11px",
                            paddingLeft: "5px",
                          }}
                        >
                          <Text
                            style={{
                              display: "inline-block",
                            }}
                          >
                            {color.code_text}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      paddingTop: "15px",
                      // paddingLeft:'65px',
                      // paddingRight:'65px'
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        height: "1px",
                        width: "187px",
                        // border:'none',
                        color: "rgb(219,219,219)",
                        backgroundColor: "rgb(219,219,219)",
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      style={{
                        backgroundColor: "transparent",
                        width: "187px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                        }}
                      >
                        패턴
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setPatternOpened(!patternOpened);
                        }}
                        style={{
                          position: "absolute",
                          right: "0px",
                        }}
                      >
                        <img
                          src={plusIcon}
                          style={{
                            display: patternOpened ? "none" : "block",
                            width: "20px",
                            height: "20px",
                            position: "absolute",
                            right: "15px",
                          }}
                        ></img>
                        <img
                          src={minusIcon}
                          style={{
                            display: patternOpened ? "block" : "none",
                            width: "20px",
                            height: "20px",
                            position: "absolute",
                            right: "15px",
                          }}
                        ></img>
                      </TouchableOpacity>
                    </div>
                  </div>
                  <div
                    style={{
                      maxHeight: patternOpened ? "400px" : "0px",
                      overflow: "scroll",
                      transition: "0.25s",
                      transitionTimingFunction: "ease-in-out",
                    }}
                  >
                    {originalSearchData.filter.pattern.map((pattern, index) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          backgroundColor: "transparent",
                          padding: "0px",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "transparent",
                            height: "25px",
                            width: "25px",
                            // display:'inline-block',
                            paddingTop: "5px",
                            marginTop: "5px",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{
                              height: "20px",
                              width: "20px",
                              //flex:1,
                              //left:0,
                            }}
                            onChange={(e) =>
                              patternCheckboxClicked(
                                index,
                                e,
                                pattern.code_name,
                                pattern.code_text
                              )
                            }
                          ></input>
                        </div>
                        <div
                          style={{
                            backgroundColor: "transparent",
                            height: "30px",
                            width: "165px",
                            // display:'inline-block',
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "left",
                            paddingTop: "11px",
                            paddingLeft: "5px",
                          }}
                        >
                          <Text
                            style={{
                              display: "inline-block",
                            }}
                          >
                            {pattern.code_text}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                </View>
              </View>
            </View>
            <View
              id="SearchResults"
              style={{
                position: "absolute",
                top: "150px",
                left: "350px",
                backgroundColor: "transparent",
                height: "100vh",
                // width:`calc(100vw-265px)`,
                width: `calc(62vw)`,
                textAlign: "left",
                // columnCount:3,
              }}
            >
              <View
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  검색 결과
                </Text>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "transparent",
                    right: 0,
                  }}
                >
                  <select
                    name="sort_method"
                    id="sort_method"
                    onChange={(e) => {
                      //console.log("select changed")
                      //console.log(e.target.options[e.target.selectedIndex].value)
                      //sortMethodSelected(e)
                      setSortMethod(
                        e.target.options[e.target.selectedIndex].value
                      );
                    }}
                    style={{
                      borderColor: "#fff transparent transparent transparent",
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
                  flexwrap: "wrap",
                  justifyContent: "space-between",
                  display: "grid",
                  gridTemplateColumns: "auto auto auto auto",
                }}
              >
                {secondSearchData.resultList.map(
                  (result, index) => (
                    <Card material={result} toggleClipBoard={toggleClipBoard} />
                  )
                  // <TouchableOpacity
                  // style={{
                  //     backgroundColor:'transparent',
                  //     height:'240px',
                  //     width:'170px',
                  //     // marginLeft:'auto',
                  //     // marginRight:'auto',
                  //     marginTop:'20px',
                  //     borderRadius:10,
                  //     boxShadow:'0px 0px 3px black',
                  //     backgroundColor: hover==index ? 'rgba(0,0,0,0.1)':'transparent'
                  //     }}
                  // onPress={()=>{
                  //     console.log('pressed material ' + result.mt_no)
                  //     Linking.openURL(`/partDetail?mt_no=${result.mt_no}`)
                  // }}
                  // onMouseEnter={()=>{
                  //         console.log('entered ' + index)
                  //         if(localStorage.login!=undefined){
                  //             var mem_no=JSON.parse(localStorage.login).message.split('_')
                  //             console.log(mem_no)
                  //         }
                  //         setHover(index)
                  //         console.log(secondSearchData.resultList[index])
                  //     }
                  // }
                  // onMouseLeave={()=>{
                  //     setHover(null)
                  //     console.log('exited '+index)
                  // }}

                  // >
                  //     <div
                  //         style={{
                  //             backgroundColor:'white',
                  //             width:'55px',
                  //             height:'12px',
                  //             position:'absolute',
                  //             zIndex:100,
                  //             top:'6px',
                  //             left:'6px',
                  //             borderRadius:'6px',
                  //             display:hover==index ? 'block':'none'
                  //         }}
                  //         onPress={()=>{
                  //             console.log('pressed clip ' + result.mt_no)
                  //         }}
                  //     >
                  //         <Text
                  //             style={{
                  //                 transform:'translate(2px,-2px)',
                  //                 position:'absolute',
                  //                 top:'1px',
                  //                 left:'2px',
                  //                 fontWeight:50,
                  //                 fontSize:'12px',
                  //                 color:secondSearchData.resultList[index].mt_budget<1 ? 'rgb(219,219,219)':'black'
                  //             }}
                  //         >₩</Text>
                  //     <Text
                  //             style={{
                  //                 transform:'translate(2px,-2px)',
                  //                 position:'absolute',
                  //                 top:'1px',
                  //                 left:'12px',
                  //                 fontWeight:50,
                  //                 fontSize:'12px',
                  //                 color:secondSearchData.resultList[index].mt_budget<2 ? 'rgb(219,219,219)':'black'
                  //             }}
                  //         >₩</Text>
                  //         <Text
                  //             style={{
                  //                 transform:'translate(2px,-2px)',
                  //                 position:'absolute',
                  //                 top:'1px',
                  //                 left:'22px',
                  //                 fontWeight:50,
                  //                 fontSize:'12px',
                  //                 color:secondSearchData.resultList[index].mt_budget<3 ? 'rgb(219,219,219)':'black'
                  //             }}
                  //         >₩</Text>
                  //         <Text
                  //             style={{
                  //                 transform:'translate(2px,-2px)',
                  //                 position:'absolute',
                  //                 top:'1px',
                  //                 left:'32px',
                  //                 fontWeight:50,
                  //                 fontSize:'12px',
                  //                 color:secondSearchData.resultList[index].mt_budget<4 ? 'rgb(219,219,219)':'black'
                  //             }}
                  //         >₩</Text>
                  //         <Text
                  //             style={{
                  //                 transform:'translate(2px,-2px)',
                  //                 position:'absolute',
                  //                 top:'1px',
                  //                 left:'42px',
                  //                 fontWeight:50,
                  //                 fontSize:'12px',
                  //                 color:secondSearchData.resultList[index].mt_budget<5 ? 'rgb(219,219,219)':'black'
                  //             }}
                  //         >₩</Text>
                  //     </div>

                  //     <TouchableOpacity
                  //         style={{
                  //             backgroundColor:'transparent',
                  //             width:'20px',
                  //             height:'20px',
                  //             position:'absolute',
                  //             zIndex:100,
                  //             top:'6px',
                  //             right:'6px',
                  //             display:hover==index ? 'block':'none'
                  //         }}
                  //         onPress={()=>{
                  //             console.log('pressed clip ' + result.mt_no)
                  //             setMaterialNumber(result.mt_no)
                  //             toggleClipBoard()
                  //         }}
                  //     >
                  //         <Image
                  //             style={{
                  //             display:'block',
                  //             height:'20px',
                  //             width:'20px',
                  //             borderTopLeftRadius:10,
                  //             borderTopRightRadius:10,
                  //             zIndex:1,
                  //             pointerEvents:'none',
                  //             // display:result.is_clipped==false ? 'block':'none'
                  //             // transform:[{
                  //             //     translateX:'0px',
                  //             //     translateY:'0px'
                  //             // }]
                  //             }}
                  //             source={clipOff}

                  //             >

                  //         </Image>
                  //         {/* <Image
                  //             style={{
                  //             display:'block',
                  //             height:'20px',
                  //             width:'20px',
                  //             borderTopLeftRadius:10,
                  //             borderTopRightRadius:10,
                  //             zIndex:1,
                  //             pointerEvents:'none',
                  //             display:result.is_clipped==true ? 'block':'none'

                  //             }}
                  //             source={clipOn}

                  //             >

                  //         </Image> */}
                  //     </TouchableOpacity>

                  // <Image
                  // style={{
                  // display:'block',
                  // height:'170px',
                  // width:'170px',
                  // borderTopLeftRadius:10,
                  // borderTopRightRadius:10,
                  // zIndex:1,
                  // pointerEvents:'none',
                  // filter:hover==index ? 'brightness(90%)':'brightness(100%)'
                  // // transform:[{
                  // //     translateX:'0px',
                  // //     translateY:'0px'
                  // // }]
                  // }}
                  // source={{
                  //     uri:
                  //         result.mt_feature_img_url
                  // }}

                  // >

                  // </Image>

                  // <View
                  // style ={{
                  //     height:'70px',
                  //     width:'170px',
                  //     fontSize: '12pt',
                  //     fontWeight:'500',
                  //     textDecorationLine:'none',
                  //     color:'white',
                  //     textAlign:'center',
                  //     flexDirection:'column',
                  //     // pointerEvents:'none',
                  //     backgroundColor:'transparent',
                  //     // pointerEvents:'none',
                  //     borderBottomLeftRadius:10,
                  //     borderBottomRightRadius:10,
                  //     padding:'10px'
                  // }}
                  // >
                  //     <TouchableOpacity
                  //         style={{
                  //             zIndex:100,
                  //             backgroundColor:'transparent',
                  //             position:'absolute',
                  //             top:'7px',
                  //             right:'7px',
                  //             height:'30px',
                  //             width:'30px',
                  //             display:result.mt_isdelivery=="Y"?"block":"none"
                  //         }}
                  //         onPress={()=>{
                  //             console.log(result.mt_isdelivery)
                  //         }}
                  //     >
                  //     <View
                  //     style={{
                  //         backgroundColor:'transparent',
                  //         display:'flex',
                  //         height:'30px',
                  //         width:'30px',
                  //         // position:'absolute',
                  //         // top:'7px',
                  //         // right:'15px'
                  //     }}
                  //     >

                  //         <img
                  //                 src={boxIcon}
                  //                 style={{
                  //                     //display: categoryOpened? 'none': 'block',
                  //                     width:'30px',
                  //                     height:'30px',
                  //                     right:'15px'
                  //                 }}
                  //             >
                  //             </img>

                  //     </View>
                  //     </TouchableOpacity>
                  // <View
                  // style={{
                  //     backgroundColor:'transparent',
                  //     width:result.mt_isdelivery=="Y"?"123px":"100%",
                  //     overflow:'hidden',

                  // }}
                  // >
                  // <Text
                  //     style ={{
                  //         // height:'65pt',
                  //         // width:'250px',
                  //         fontSize: '8pt',
                  //         fontWeight:'700',
                  //         textDecorationLine:'none',
                  //         color:'black',
                  //         textAlign:'left',
                  //         //alignItems:'center',
                  //         //justifyContent:'center',
                  //         //flexDirection:'row',
                  //         //marginTop:'45pt',
                  //         pointerEvents:'none',
                  //         backgroundColor:'transparent',
                  //         pointerEvents:'none',
                  //         whiteSpace:'nowrap',
                  //         textOverflow: 'ellipsis',
                  //         overflow:'hidden'

                  //     }}
                  // >
                  //     {result.vd_name}
                  // </Text>
                  // </View>
                  // <View
                  //     style={{
                  //         backgroundColor:'transparent',
                  //         height:'20px',
                  //         width:result.mt_isdelivery=="Y"?"123px":"100%",
                  //         overflow:'hidden'
                  //     }}
                  // >
                  // <Text
                  //         style ={{
                  //             // height:'100px',
                  //             width:'120px',
                  //             fontSize: '8pt',
                  //             fontWeight:'500',
                  //             textDecorationLine:'none',
                  //             color:'black',
                  //             textAlign:'left',
                  //             alignItems:'center',
                  //             justifyContent:'center',
                  //             flexDirection:'row',
                  //             // marginLeft:'1px',
                  //             // marginTop:'1px',
                  //             pointerEvents:'none',
                  //             backgroundColor:'transparent',
                  //             whiteSpace:'nowrap',
                  //             textOverflow: 'ellipsis',

                  //         }}
                  //     >
                  //     {result.mt_subname}

                  // </Text>
                  // </View>
                  // <View
                  //     style={{
                  //         backgroundColor:'transparent',
                  //         height:'20px',
                  //         width:"100%",
                  //         overflow:'hidden'
                  //     }}
                  // >
                  // <Text
                  //         style ={{
                  //             height:'100px',
                  //             width:'120px',
                  //             fontSize: '8pt',
                  //             fontWeight:'500',
                  //             textDecorationLine:'none',
                  //             color:'rgb(85,85,85)',
                  //             textAlign:'left',
                  //             alignItems:'center',
                  //             justifyContent:'center',
                  //             flexDirection:'row',
                  //             // marginLeft:'1px',
                  //             // marginTop:'1px',
                  //             pointerEvents:'none',
                  //             backgroundColor:'transparent',
                  //             pointerEvents:'none',
                  //             whiteSpace:'nowrap',
                  //             textOverflow: 'ellipsis',
                  //             overflow:'hidden'
                  //         }}
                  //     >
                  //     {result.mt_name}

                  // </Text>
                  // </View>
                  // </View>

                  // </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Pagination
                  currentPage={activePage}
                  leftPageJump={leftPageJump}
                  rightPageJump={rightPageJump}
                  currentPageTo={currentPageTo}
                  endPage={secondSearchData.pageInfo.totalPage}
                />
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
    } else if (mode == "moodboard") {
      if (moodboardPage != undefined) {
        return (
          <div>
            <div
              style={{
                display: moodClipBoard ? "block" : "none",
              }}
            >
              <MoodClipBoard
                toggleClipBoard={toggleMoodClipBoard}
                moodboard_num={moodBoardNumber}
                refresh={moodClipBoard}
              />
            </div>
            <Navbar />
            <NavBarFiller />
            <div
              style={{
                width: "100vw",
                height: "50px",
                backgroundColor: "transparent",
                paddingLeft: "65px",
                paddingRight: "65px",
                // paddingTop:'15px',
                display: "flex",
                flexDirection: "row",
              }}
            >
            
              <TouchableOpacity onPress={() => setMode("material")}>
                {/* <div
                  style={{
                    borderRadius: "15px",
                    backgroundColor:
                      mode == "material" ? "rgb(255,123,88)" : "transparent",
                    width: "100px",
                    height: "30px",
                    marginTop: "10px",
                    border:
                      mode == "material"
                        ? "none"
                        : "2px solid rgb(221,221,221)",
                  }}
                > */}
                <ModeButton marginLeft="0px" mode={mode} matchword='material'>
                  <Text
                    style={{
                      lineHeight: "30px",
                      color: mode == "material" ? "white" : "black",
                      fontSize: "18px",
                    }}
                  >
                    자재
                  </Text>
                </ModeButton>
                {/* </div> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMode("moodboard")}>
                {/* <div
                  style={{
                    borderRadius: "15px",
                    backgroundColor:
                      mode == "moodboard" ? "rgb(255,123,88)" : "transparent",
                    width: "100px",
                    height: "30px",
                    marginLeft: "15px",
                    marginTop: "10px",
                    border:
                      mode == "moodboard"
                        ? "none"
                        : "2px solid rgb(221,221,221)",
                  }}
                > */}
                <ModeButton marginLeft="15px" mode={mode} matchword='moodboard'>
                  <Text
                    style={{
                      lineHeight: "30px",
                      color: mode == "moodboard" ? "white" : "black",
                      fontSize: "18px",
                    }}
                  >
                    무드보드
                  </Text>
                </ModeButton>
                {/* </div> */}
              </TouchableOpacity>
            </div>
            <div
              className="MainContent"
              style={{
                width: "100vw",
                height: "calc(100vh-100px)",
              }}
            >
              <View
                style={{
                  flex: 1,
                  // flexDirection: 'row',
                  // justifyContent: 'space-between',
                  flexwrap: "wrap",
                  display: "grid",
                  gridTemplateColumns: "auto auto auto auto",
                  paddingLeft: "77pt",
                  paddingRight: "77pt",
                }}
              >
                {moodboardPage.resultList.map((moodboard, index) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "column",
                      borderRadius: 10,
                      height: "215px",
                      width: "170px",
                      backgroundColor: "transparent",
                      boxShadow: "0px 0px 2px",

                      fontSize: "25pt",
                      fontWeight: "700",
                      textDecorationLine: "none",
                      // color:'white',
                      // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                      // textShadowOffset: {width: 0, height: 0},
                      // textShadowRadius: 2,
                      color: "black",
                      textAlign: "left",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      marginLeft: "25pt",
                      marginRight: "25pt",
                      marginTop: "25pt",
                      padding: "auto",
                      zIndex: 2,
                      // backgroundColor:'red'
                    }}
                    onPress={() => {
                      Linking.openURL(
                        `/moodboarddetail?mb_no=${moodboard.mb_no}`
                      );
                    }}
                    onMouseEnter={() => {
                      console.log("entered " + index);
                      if (localStorage.login != undefined) {
                        var mem_no = JSON.parse(
                          localStorage.login
                        ).message.split("_");
                        // console.log(mem_no)
                      }
                      //here
                      setMoodboardHover(index);
                      console.log(moodboard);
                    }}
                    onMouseLeave={() => {
                      setMoodboardHover(null);
                      console.log("exited " + index);
                    }}
                  >
                    <Image
                      style={{
                        display: "block",
                        height: "170px",
                        width: "170px",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        zIndex: 1,
                        pointerEvents: "none",
                        transform: [
                          {
                            translateX: "0px",
                            translateY: "0px",
                          },
                        ],
                        filter:
                          moodboardHover == index
                            ? "brightness(90%)"
                            : "brightness(100%)",
                      }}
                      source={{
                        uri:
                          // data.listCategory[i].ct_img_url
                          moodboard.mb_img_url,
                      }}
                    ></Image>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "transparent",
                        width: "20px",
                        height: "20px",
                        position: "absolute",
                        zIndex: 100,
                        top: "6px",
                        right: "6px",
                        display: moodboardHover == index ? "block" : "none",
                      }}
                      onPress={() => {
                        console.log(moodboard.mb_no);
                        setMoodBoardNumber(moodboard.mb_no);
                        toggleMoodClipBoard();
                      }}
                    >
                      <Image
                        style={{
                          display: "block",
                          height: "20px",
                          width: "20px",
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          zIndex: 1,
                          pointerEvents: "none",
                          // display:result.is_clipped==false ? 'block':'none'
                          // transform:[{
                          //     translateX:'0px',
                          //     translateY:'0px'
                          // }]
                        }}
                        source={clipOff}
                      ></Image>
                    </TouchableOpacity>
                    {/* <a
                            style={{
                            transform:[{
                                translateX:'100px'
                            }]
                            }}
                        > */}
                    <View
                      style={{
                        height: "45px",
                        width: "170px",
                        fontSize: "15pt",
                        fontWeight: "700",
                        textDecorationLine: "none",
                        // color:'white',
                        // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                        // textShadowOffset: {width: 0, height: 0},
                        // textShadowRadius: 2,
                        // color:'black',
                        textAlign: "center",
                        // alignItems:'center',
                        // justifyContent:'center',
                        flexDirection: "row",
                        // margin:11,
                        // padding:'auto',
                        pointerEvents: "none",
                        // borderTopRightRadius:20,
                        // borderBottomRightRadius:20,
                        backgroundColor: "white",
                        // zIndex:99,
                        pointerEvents: "none",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        // left:0,
                      }}
                    >
                      <View
                        style={{
                          height: "45px",
                          width: "170px",
                          fontSize: "12pt",
                          fontWeight: "700",
                          textDecorationLine: "none",
                          // color:'white',
                          // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                          // textShadowOffset: {width: 0, height: 0},
                          // textShadowRadius: 2,
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          color: "black",
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          marginLeft: "5pt",
                          // padding:'auto',
                          pointerEvents: "none",
                          backgroundColor: "transparent",
                          // zIndex:99,
                          // pointerEvents:'none',
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Text
                          style={{
                            height: "45px",
                            width: "170px",
                            fontSize: "12pt",
                            fontWeight: "700",
                            textDecorationLine: "none",
                            // color:'white',
                            // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                            // textShadowOffset: {width: 0, height: 0},
                            // textShadowRadius: 2,
                            color: "black",
                            textAlign: "left",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            marginTop: "17pt",
                            // padding:'auto',
                            //pointerEvents:'none',
                            backgroundColor: "transparent",
                            // zIndex:99,
                            // pointerEvents:'none',
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {/* {data.listCategory[i].ct_text} */}
                          {moodboard.mb_name}
                        </Text>
                      </View>
                    </View>
                    {/* </a> */}
                  </TouchableOpacity>
                ))}
              </View>
              <View
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Pagination
                  currentPage={moodboardActivePage}
                  leftPageJump={leftMoodboardPageJump}
                  rightPageJump={rightMoodboardPageJump}
                  currentPageTo={currentMoodboardPageTo}
                  endPage={moodboardPage.pageInfo.totalPage}
                />
              </View>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <Navbar />
            <NavBarFiller />
          </div>
        );
      }
    }
  } else {
    // console.log(secondSearchData);
    // console.log(originalSearchData);
    return (
      <div>
        <Navbar />
        <NavBarFiller />
      </div>
    );
  }
}

export default SearchPage;
