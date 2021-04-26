import React, { useEffect } from "react";
import "./navbar.css";
// import Logo from './../logo.svg';
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Picker,
  Linking,
  ScrollView,
  FlatList,
} from "react-native";
import Logo from "../assets/header_logo.png";
import { nativeTouchData } from "react-dom/test-utils";
// import searchIcon from '../assets/icnSearch.png'
import searchIcon from "../assets/searchIcon.png";
import userIcon from "../assets/icnUser.png";
import boxIcon from "../assets/icnBox.png";
import xIcon from "../assets/x.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BrandsDropDown from "./BrandsDropDown";
import CategoryDropDown from "./CategoryDropDown";
import UseDropDown from "./UseDropDown";
import LogOut from "./LogOut";
import LogIn from "./LogIn";
import WrongLogIn from "./WrongLogIn";
import AlreadyKakaoMember from "./AlreadyKakaoMember";
import styled from "styled-components";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import {UserProvider,useUser} from './user-context'
const queryString = require("query-string");

const ShowOne = styled.div`
  @media (min-width: 1271px) {
    display: block;
  }
  @media (max-width: 1271px) {
    display: none;
  }
`;
const ShowTwo = styled.div`
  @media (min-width: 1271px) {
    display: none;
  }
  @media (min-width: 636px) and (max-width: 1270px) {
    display: block;
  }
  @media (max-width: 635px) {
    display: none;
  }
`;
const ShowThree = styled.div`
  @media (min-width: 636px) {
    display: none;
  }
  @media (max-width: 635px) {
    display: block;
  }
`;
const CategoryDiv1=styled.div`
  position: fixed;
  height: 50px;
  width: 240px;
  top: 38px;
  left: 167pt;
  background-color: transparent;
  z-index: 1;
`

const CategoryDiv2=styled.div`
  font-size: 25px;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 11;
  pointer-events: none;
`

const UseDiv1 = styled.div`
  position: fixed;
  height: 50px;
  width: 170px;
  top: 38px;
  left: 349pt;
  background-color: transparent;
  z-index: 1;
`

const UseDiv2 = styled.div`
  font-size: 25px;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: auto;
  pointer-events: none;
`
const BrandsDiv1 = styled.div`
  position: fixed;
  height: 50px;
  width: 140px;
  top: 38px;
  left: 478pt;
  background-color: transparent;
  z-index: 1;
`

const BrandsDiv2 = styled.div`
  font-size: 25px;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: auto;
  pointer-events: none;
`
const SearchBarDiv1 = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  width: 252px;
  height: 49px;
  border-radius: 24px;
  position: fixed;
  top: 28px;
  right: 230px;
`

const SearchBarInput = styled.input`
  overflow: hidden;
  width: 200px;
  height: 49px;
  padding: 12px 20px;
  margin: 8px 0;
  border-radius: 24px;
  box-sizing: border-box;
  position: fixed;
  top: 20px;
  right: 280px;
  font-size: 18px;
`
const SearchIconDiv = styled.div`
  position: fixed;
  height: 47px;
  width: 47px;
  top: 29px;
  right: 173pt;
  background-color: transparent;
  z-index: 1;
`


const IconImg = styled.img`
  height: 47px;
  width: 47px;
`
const BoxIconDiv = styled.div`
  position: fixed;
  height: 47;
  width: 47;
  top: 29px;
  right: 103pt;
  background-color: transparent;
  z-index: 1;
`


const UserIconDiv = styled.div`
  position: fixed;
  height: 47px;
  width: 47px;
  top: 29px;
  right: 33pt;
  background-color: transparent;
  z-index: 1;
`

const MarginDiv = styled.div`
  margin-top: 22px;
`
const SearchIconDiv2 = styled.div`
  position: fixed;
  height: 47;
  width: 47;
  top: 29px;
  right: 105pt;
  background-color: transparent;
  z-index: 1;
`

const BoxIconDiv2 = styled.div`
  position: fixed;
  height: 47;
  width: 47;
  top: 29px;
  right: 60pt;
  background-color: transparent;
  z-index: 1;
`


const UserIconDiv2 = styled.div`
  position: fixed;
  height: 47px;
  width: 47px;
  top: 29px;
  right: 15pt;
  background-color: transparent;
  z-index: 1;
`

const ToggleDiv = styled.div`
  display: ${(props) => (props.toggle ? "block" : "none")};
`;
const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [userModalVisible, setUserModalVisible] = React.useState(false);
  const [cartModalVisible, setCartModalVisible] = React.useState(false);
  const [height, setHeight] = React.useState(Dimensions.get("window").height);
  const [width, setWidth] = React.useState(Dimensions.get("window").width);
  // const [user,setUser]=useUser()
  const [loginInfo, setLoginInfo] = React.useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loggedOn, setLoggedOn] = React.useState(false);
  const [entryCorrect, setEntryCorrect] = React.useState(true);
  const [brandListData, setBrandListData] = React.useState(null);
  const [brandsDropDown, setBrandsDropDown] = React.useState(false);
  const [categoryDropDown, setCategoryDropDown] = React.useState(false);
  const [useDropDown, setUseDropDown] = React.useState(false);
  const [brandsDropDownDisplay, setBrandsDropDownDisplay] = React.useState(
    "none"
  );
  const [inputValue, setInputValue] = React.useState("");
  const [searchTermEnable, setSearchTermEnable] = React.useState(false);
  const [logOutShow, setLogOutShow] = React.useState(false);
  const [logInShow, setLogInShow] = React.useState(false);
  const [wrongLogInShow, setWrongLogInShow] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [userCompanyName, setUserCompanyName] = React.useState("");
  const [userCompanyWebSite, setUserCompanyWebSite] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const [registrationScreen, setRegistrationScreen] = React.useState(0);
  const [pincodeAnswer, setPincodeAnswer] = React.useState("");
  const [joinType, setJoinType] = React.useState("MOBILE");
  const [SNSID, setSNSID] = React.useState(null);
  const [alreadyKakaoMemberShow, setAlreadyKakaoMemberShow] = React.useState();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const toggleUserModal = () => {
    setUserModalVisible(!userModalVisible);
  };
  const toggleCartModal = () => {
    setCartModalVisible(!cartModalVisible);
  };
  const onPhoneNumberChange = () => {
    if (loginInfo != null) {
      if (localStorage.login && localStorage.login != "") {
        if (JSON.parse(window.localStorage.login).result == "SUCCESS") {
          console.log(JSON.parse(window.localStorage.getItem("login")));
          console.log("logged on");
          setLoggedOn(true);
          setEntryCorrect(true);
        } else {
          console.log(JSON.parse(window.localStorage.getItem("login")));
          console.log("logged off");
          setLoggedOn(false);
          setEntryCorrect(false);
        }
      } else {
        setLoggedOn(false);
        console.log("logged off");
      }
    }
  };
  const onPasswordChange = () => {
    // console.log(password)
  };
  const login = () => {
    fetch(
      "/login?" +
        queryString.stringify({
          mem_jointype: "MOBILE",
          mem_password: password,
          mem_token: null,
          mem_mobile: userPhoneNumber,
        })
    )
      .then((res) => res.json())
      .then((incomingData) => {
        setLoginInfo(incomingData);
        console.log("_______");
        console.log(incomingData);
        window.localStorage.setItem("login", JSON.stringify(incomingData));
        if (incomingData.result == "SUCCESS") {
          setLoggedOn(true);
          setEntryCorrect(true);
        } else {
          setLoggedOn(false);
          setEntryCorrect(false);
        }
        // console.log(loggedOn)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logInFunction = (obj) => {
    fetch("/login?" + queryString.stringify(obj))
      .then((res) => res.json())
      .then((incomingData) => {
        setLoginInfo(incomingData);
        console.log("_______");
        console.log(incomingData);
        window.localStorage.setItem("login", JSON.stringify(incomingData));
        if (incomingData.result == "SUCCESS") {
          setWrongLogInShow(false);
          setLoggedOn(true);
          setEntryCorrect(true);
        } else if (incomingData.result == "NEED_JOIN") {
          console.log("jointype:" + obj.mem_jointype);
          console.log("SNSID" + obj.mem_snsid);
          setSNSID(obj.mem_snsid);
          setJoinType(obj.mem_jointype);
          setLoggedOn(false);
          setRegistrationScreen(1);
          // console.log('how do i direct users to join using kakao page')
        } else {
          if (incomingData.message == "JOIN_KAKAO") {
            setAlreadyKakaoMemberShow(true);
            console.log("gotta show log in using kakao popup");
          } else if (incomingData.message == "NO_EXIST_MEMBER") {
            setWrongLogInShow(true);
            setLoggedOn(false);
            setEntryCorrect(false);
          }
        }
        // console.log(loggedOn)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logOutFunction = () => {
    setLoginInfo(null);
    setLoggedOn(false);
    console.log("_______");
    // window.localStorage.setItem('login','')
    localStorage.removeItem("login");
  };
  const onChange = () => {
    setHeight(Dimensions.get("window").height);
    setWidth(Dimensions.get("window").width);
    // console.log(height+" : "+width)
  };
  const updateInputValue = (e) => {
    setInputValue(e.target.value);
    if (e.target.value != "") {
      // setMakeButtonEnable(true)
      setSearchTermEnable(true);
    } else {
      // setMakeButtonEnable(false)
      setSearchTermEnable(false);
    }
  };
  const brands = () => {
    fetch("/brandslist")
      .then((res) => res.json())
      .then((incomingData) => {
        setBrandListData(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleBrandsDropDown = () => {
    console.log("brandsDropDown toggled");
    setCategoryDropDown(false);
    setUseDropDown(false);
    setBrandsDropDown(!brandsDropDown);
  };
  const toggleCategoryDropDown = () => {
    console.log("categoryDropDown toggled");
    setBrandsDropDown(false);
    setUseDropDown(false);
    setCategoryDropDown(!categoryDropDown);
  };
  const toggleUseDropDown = () => {
    console.log("useDropDown toggled");
    setBrandsDropDown(false);
    setCategoryDropDown(false);
    setUseDropDown(!useDropDown);
  };
  const toggleLogOutShow = () => {
    setLogOutShow(!logOutShow);
  };
  const toggleLogInShow = () => {
    setLogInShow(!logInShow);
  };
  const toggleWrongLogInShow = () => {
    setWrongLogInShow(!logInShow);
  };
  const toggleAlreadyKakaoMemberShow = () => {
    setAlreadyKakaoMemberShow(!alreadyKakaoMemberShow);
  };
  const brandRenderRow = (brand, index, separators) => {
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(`/brands?ct_id=${brand.ct_id}`)}
      >
        <div
          style={{
            textAlign: "left",
            padding: "5pt",
          }}
        >
          <Text
            style={{
              height: "65pt",
              width: "250px",
              fontSize: "15pt",
              fontWeight: "700",
              textDecorationLine: "none",
              color: "black",
              textAlign: "left",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "45pt",
              pointerEvents: "none",
              backgroundColor: "transparent",
              pointerEvents: "none",
            }}
          >
            {brand.ct_text}
          </Text>
          <br></br>
        </div>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    Dimensions.addEventListener("change", onChange);
    console.log(window.innerWidth);
    if (localStorage.login && localStorage.login != "") {
      setLoginInfo(JSON.parse(window.localStorage.getItem("login")));
      if (
        JSON.parse(window.localStorage.getItem("login")).result == "SUCCESS"
      ) {
        setLoggedOn(true);
      }
    } else {
      setLoggedOn(false);
    }
    //brands()
    // console.log(loggedOn)
  }, []);
  useEffect(() => {
    console.log(loggedOn);
  }, [loggedOn]);
  useEffect(() => {
    console.log(brandListData);
  }, [brandListData]);
  // useEffect(()=>{
  //   console.log(brandsDropDownDisplay)
  //   if(brandsDropDown==true){
  //     setBrandsDropDownDisplay('block')
  //   }
  //   else if(brandsDropDown==false){
  //     setBrandsDropDownDisplay('none')
  //   }
  // },[brandsDropDown])

  let x = ["navbar"];
  if (scrolled) {
    x.push("scrolled");
  }
  if (loggedOn == true) {
    return (
      <div>
        <ShowOne>
          <header className={x.join(" ")}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={cartModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed");
              }}
            >
              <div style={{ marginTop: 22 }}>
                <div>
                  <span>cart Info</span>

                  <div
                    onClick={() => {
                      toggleCartModal();
                    }}
                  >
                    <span>x</span>
                  </div>
                </div>
              </div>
            </Modal>

            <div
              style={{
                display: logOutShow ? "block" : "none",
              }}
            >
              <LogOut
                toggleLogOutShow={toggleLogOutShow}
                logOutFunction={logOutFunction}
              />
            </div>
            <div
              style={{
                display: useDropDown ? "block" : "none",
              }}
            >
              <UseDropDown toggleUseDropDown={toggleUseDropDown} />
            </div>
            <div
              style={{
                display: categoryDropDown ? "block" : "none",
              }}
            >
              <CategoryDropDown
                toggleCategoryDropDown={toggleCategoryDropDown}
              />
            </div>
            <div
              style={{
                display: brandsDropDown ? "block" : "none",
              }}
            >
              <BrandsDropDown toggleBrandsDropDown={toggleBrandsDropDown} />
            </div>

            <div className="headerContainer">
              <div className="logo">
                <a href="/clip">
                  <img src={Logo} alt="Logo" title="Logo" />
                </a>
              </div>

              <div
                className="linkTo"
                id="category"
                style={{
                  position: "fixed",
                  height: 50,
                  width: 240,
                  top: 38,
                  left: "167pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                activeOpacity={0.5}
                onClick={() => {
                  toggleCategoryDropDown();
                }}
              >
                {/* <Link to="/category">
                          자재카테고리
                        </Link> */}
                <a
                  style={{
                    // flex:1,
                    textDecorationLine: "none",
                    // color:'black',
                    // //borderColor:'black',
                    // //borderWidth:2,
                    // backgroundColor:'transparent',
                    // fontSize: '25pt',
                    // fontWeight:'700',
                    // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                    // textShadowOffset: {width: 0, height: 0},
                    // textShadowRadius: 2,
                    // // flex:1,
                    // alignItems:'center',
                    // justifyContent:'center',
                    // flexDirection:'row',
                    // textAlign:'center'
                  }}
                  // href="/category"
                >
                  <span
                    selectable={false}
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      textDecorationLine: "none",
                      color: "black",
                      // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                      // textShadowOffset: {width: 0, height: 0},
                      // textShadowRadius: 2,
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      margin: 11,
                      // padding:'auto',
                      pointerEvents: "none",
                    }}
                  >
                    자재카테고리
                  </span>
                </a>
              </div>

              <div
                className="linkTo"
                style={{
                  position: "fixed",
                  height: 50,
                  width: 170,
                  top: 38,
                  left: "349pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                activeOpacity={0.5}
                onClick={() => {
                  toggleUseDropDown();
                }}
              >
                <a
                  style={{
                    textDecorationLine: "none",
                  }}
                  // href="/constructionpart"
                >
                  <span
                    selectable={false}
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      textDecorationLine: "none",
                      // color:'white',
                      // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                      // textShadowOffset: {width: 0, height: 0},
                      // textShadowRadius: 2,
                      color: "black",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      margin: 11,
                      padding: "auto",
                      pointerEvents: "none",
                    }}
                  >
                    사공부위
                  </span>
                </a>
              </div>
              <div
                className="linkTo"
                style={{
                  position: "fixed",
                  height: 50,
                  width: 140,
                  top: 38,
                  left: "478pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                activeOpacity={0.5}
                // onMouseEnter={()=>
                //   console.log('mouse entered')
                // }
                onClick={() => {
                  console.log("toggle dropdown");
                  toggleBrandsDropDown();
                }}
              >
                <a
                  style={{
                    textDecorationLine: "none",
                  }}
                  // href="/brands"
                >
                  <span
                    selectable={false}
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      textDecorationLine: "none",
                      // color:'white',
                      // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                      // textShadowOffset: {width: 0, height: 0},
                      // textShadowRadius: 2,
                      color: "black",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      margin: 11,
                      padding: "auto",
                      pointerEvents: "none",
                    }}
                  >
                    브랜드
                  </span>
                </a>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  width: 252,
                  height: 49,
                  borderRadius: "24px",
                  position: "fixed",
                  top: 28,
                  right: 230,
                }}
              >
                <input
                  style={{
                    overflow: "hidden",
                    width: "200px",
                    height: "49px",
                    padding: "12px 20px",
                    margin: "8px 0",
                    // border:"1px solid #ccc",
                    borderRadius: "24px",
                    boxSizing: "border-box",
                    position: "fixed",
                    top: 20,
                    right: 280,
                    fontSize: "18px",
                  }}
                  value={inputValue}
                  onChange={updateInputValue}
                  placeholder={"검색"}
                />
                <div
                  onClick={() => {
                    if (searchTermEnable == true) {
                      Linking.openURL(`/searchpage?keyword=` + inputValue);
                    } else {
                      Linking.openURL(`/searchpage`);
                    }
                  }}
                  style={{
                    position: "fixed",
                    height: 47,
                    width: 47,
                    top: "29px",
                    right: "173pt",
                    backgroundColor: "transparent",
                    zIndex: 1,
                  }}
                >
                  <img
                    style={{
                      height: 47,
                      width: 47,
                    }}
                    src={searchIcon}
                  ></img>
                </div>
              </div>
              <div
                style={{
                  position: "fixed",
                  height: 47,
                  width: 47,
                  top: "29px",
                  right: "103pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                onClick={() => {
                  toggleCartModal();
                }}
              >
                <img src={boxIcon}></img>
              </div>
              <div
                className="linkTo"
                style={{
                  position: "fixed",
                  height: 47,
                  width: 47,
                  top: "29px",
                  right: "33pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                onClick={() => {
                  // toggleUserModal()
                  toggleLogOutShow();
                }}
              >
                <img
                  src={userIcon}
                  style={{
                    height: "47px",
                    width: "47px",
                  }}
                ></img>
              </div>
            </div>
          </header>
        </ShowOne>
        <ShowTwo>
          <header className={x.join(" ")}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={cartModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed");
              }}
            >
              <div style={{ marginTop: 22 }}>
                <div>
                  <span>cart Info</span>

                  <div
                    onClick={() => {
                      toggleCartModal();
                    }}
                  >
                    <span>x</span>
                  </div>
                </div>
              </div>
            </Modal>
            {/* <Modal
            animationType="fade"
            transparent={false}
            visible={userModalVisible}
            onDismiss={() => {
              // alert('Modal has been closed.');
              console.log("user modal has been closed")
            }}>
            <View style={{marginTop: 22}}>
              <View>
              
                <TouchableHighlight
                  onPress={() => {
                    logOutFunction()
                  }}>
                  <Text>로그아웃</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    toggleUserModal()
                  }}>
                  <Text>x</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal> */}
            <div
              style={{
                display: logOutShow ? "block" : "none",
              }}
            >
              <LogOut
                toggleLogOutShow={toggleLogOutShow}
                logOutFunction={logOutFunction}
              />
            </div>
            <div className="headerContainer">
              <div className="logo">
                <a href="/clip">
                  <img src={Logo} alt="Logo" title="Logo" />
                </a>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  width: 252,
                  height: 49,
                  borderRadius: "24px",
                  position: "fixed",
                  top: 28,
                  right: 230,
                }}
              >
                <input
                  style={{
                    overflow: "hidden",
                    width: "200px",
                    height: "49px",
                    padding: "12px 20px",
                    margin: "8px 0",
                    // border:"1px solid #ccc",
                    borderRadius: "24px",
                    boxSizing: "border-box",
                    position: "fixed",
                    top: 20,
                    right: 280,
                    fontSize: "18px",
                  }}
                  value={inputValue}
                  onChange={updateInputValue}
                  placeholder={"검색"}
                />
                <div
                  onClick={() => {
                    if (searchTermEnable == true) {
                      Linking.openURL(`/searchpage?keyword=` + inputValue);
                    } else {
                      Linking.openURL(`/searchpage`);
                    }
                  }}
                  style={{
                    position: "fixed",
                    height: 47,
                    width: 47,
                    top: "29px",
                    right: "173pt",
                    backgroundColor: "transparent",
                    zIndex: 1,
                  }}
                >
                  <img
                    style={{
                      height: 47,
                      width: 47,
                    }}
                    src={searchIcon}
                  ></img>
                </div>
              </div>
              <div
                style={{
                  position: "fixed",
                  height: 47,
                  width: 47,
                  top: "29px",
                  right: "103pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                onClick={() => {
                  toggleCartModal();
                }}
              >
                <img src={boxIcon}></img>
              </div>
              <div
                className="linkTo"
                style={{
                  position: "fixed",
                  height: 47,
                  width: 47,
                  top: "29px",
                  right: "33pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                onClick={() => {
                  // toggleUserModal()
                  toggleLogOutShow();
                }}
              >
                <img
                  src={userIcon}
                  style={{
                    height: "47pt",
                  }}
                ></img>
              </div>
            </div>
          </header>
        </ShowTwo>
        <ShowThree>
          <header className={x.join(" ")}>
            <Modal
              animationType="fade"
              transparent={false}
              visible={cartModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed");
              }}
            >
              <div style={{ marginTop: 22 }}>
                <div>
                  <span>cart Info</span>

                  <div
                    onClick={() => {
                      toggleCartModal();
                    }}
                  >
                    <span>x</span>
                  </div>
                </div>
              </div>
            </Modal>
            {/* <Modal
              animationType="fade"
              transparent={false}
              visible={userModalVisible}
              onDismiss={() => {
                // alert('Modal has been closed.');
                console.log("user modal has been closed")
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <TouchableHighlight
                    onPress={() => {
                      logOutFunction()
                    }}>
                    <Text>로그아웃</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      toggleUserModal()
                    }}>
                    <Text>x</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal> */}
            <div
              style={{
                display: logOutShow ? "block" : "none",
              }}
            >
              <LogOut
                toggleLogOutShow={toggleLogOutShow}
                logOutFunction={logOutFunction}
              />
            </div>
            <div className="headerContainer">
              <div className="logo">
                <a href="/clip">
                  <img src={Logo} alt="Logo" title="Logo" />
                </a>
              </div>

              <div
                onClick={() => Linking.openURL(`/searchpage`)}
                style={{
                  position: "fixed",
                  height: 47,
                  width: 47,
                  top: "29px",
                  right: "105pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
              >
                <img
                  style={{
                    height: 47,
                    width: 47,
                  }}
                  src={searchIcon}
                ></img>
              </div>
              <div
                style={{
                  position: "fixed",
                  height: 47,
                  width: 47,
                  top: "29px",
                  right: "60pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                onClick={() => {
                  toggleCartModal();
                }}
              >
                <img src={boxIcon}></img>
              </div>
              <div
                className="linkTo"
                style={{
                  position: "fixed",
                  height: 47,
                  width: 47,
                  top: "29px",
                  right: "15pt",
                  backgroundColor: "transparent",
                  zIndex: 1,
                }}
                onClick={() => {
                  // toggleUserModal()
                  toggleLogOutShow();
                }}
              >
                <img
                  src={userIcon}
                  style={{
                    height: "47pt",
                  }}
                ></img>
              </div>
            </div>
          </header>
        </ShowThree>
      </div>
    );
  } else {
    if (entryCorrect == true) {
      return (
        <div>
          <ShowOne>
            <header className={x.join(" ")}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed");
                }}
              >
                <div style={{ marginTop: 22 }}>
                  <div>
                    <span>cart Info</span>

                    <div
                      onClick={() => {
                        toggleCartModal();
                      }}
                    >
                      <span>x</span>
                    </div>
                  </div>
                </div>
              </Modal>

              <ToggleDiv
                toggle={wrongLogInShow}
              >
                <WrongLogIn toggleWrongLogInShow={toggleWrongLogInShow} />
              </ToggleDiv>
              

              <ToggleDiv
                toggle={alreadyKakaoMemberShow}
              >
                <AlreadyKakaoMember
                  toggleAlreadyKakaoMemberShow={toggleAlreadyKakaoMemberShow}
                />
              </ToggleDiv>

              
              <ToggleDiv
                toggle={logInShow}
              >
                {/* <LogIn toggleLogInShow={toggleLogInShow} logInFunction={logInFunction} setUserPhoneNumber={setUserPhoneNumber} onPhoneNumberChange={onPhoneNumberChange} userPhoneNumber={userPhoneNumber} setPassword={setPassword} onPasswordChange={onPasswordChange} password={password} setUserEmail={setUserEmail} userEmail={userEmail}/> */}
                <LogIn
                  toggleLogInShow={toggleLogInShow}
                  logInFunction={logInFunction}
                  setUserPhoneNumber={setUserPhoneNumber}
                  onPhoneNumberChange={onPhoneNumberChange}
                  userPhoneNumber={userPhoneNumber}
                  setPassword={setPassword}
                  onPasswordChange={onPasswordChange}
                  password={password}
                  setUserEmail={setUserEmail}
                  userEmail={userEmail}
                  setUserName={setUserName}
                  userName={userName}
                  userCompanyName={userCompanyName}
                  setUserCompanyName={setUserCompanyName}
                  userCompanyWebSite={userCompanyWebSite}
                  setUserCompanyWebSite={setUserCompanyWebSite}
                  passwordCheck={passwordCheck}
                  setPasswordCheck={setPasswordCheck}
                  setRegistrationScreen={setRegistrationScreen}
                  registrationScreen={registrationScreen}
                  pincodeAnswer={pincodeAnswer}
                  setPincodeAnswer={setPincodeAnswer}
                  setSNSID={setSNSID}
                  SNSID={SNSID}
                  setJoinType={setJoinType}
                  joinType={joinType}
                />
              </ToggleDiv>
              
              
              <ToggleDiv
                toggle={useDropDown}
              >
                <UseDropDown toggleUseDropDown={toggleUseDropDown} />
              </ToggleDiv>
              
              
              <ToggleDiv
                toggle={categoryDropDown}
              >
                <CategoryDropDown
                  toggleCategoryDropDown={toggleCategoryDropDown}
                />
              </ToggleDiv>
              
              <ToggleDiv
                toggle={brandsDropDown}
              >
                <BrandsDropDown toggleBrandsDropDown={toggleBrandsDropDown} />
              </ToggleDiv>
              

              <div className="headerContainer">
                <div className="logo">
                  <a href="/clip">
                    <img src={Logo} alt="Logo" title="Logo" />
                  </a>
                </div>

                <CategoryDiv1
                  activeOpacity={0.5}
                  onClick={() => {
                    toggleCategoryDropDown();
                  }}
                >
                  {/* <Link to="/category">
                          자재카테고리
                        </Link> */}
                  
                    <CategoryDiv2
                      selectable={false}>
                      자재카테고리
                    </CategoryDiv2>
                  
                </CategoryDiv1>

                <UseDiv1
                  activeOpacity={0.5}
                  onClick={() => {
                    toggleUseDropDown();
                  }}
                >
                  
                    <UseDiv2
                      selectable={false} 
                    >
                      사공부위
                    </UseDiv2>
                  
                </UseDiv1>
                <BrandsDiv1
                  className="linkTo"
                  
                  activeOpacity={0.5}
                  // onMouseEnter={()=>
                  //   console.log('mouse entered')
                  // }
                  onClick={() => {
                    console.log("toggle dropdown");
                    toggleBrandsDropDown();
                  }}
                >
                 
                    <BrandsDiv2
                      selectable={false}
                    >
                      브랜드
                    </BrandsDiv2>
                 
                </BrandsDiv1>

                <SearchBarDiv1
                >
                  <SearchBarInput
                    value={inputValue}
                    onChange={updateInputValue}
                    placeholder={"검색"}
                  />
                  <SearchIconDiv
                    onClick={() => {
                      if (searchTermEnable == true) {
                        Linking.openURL(`/searchpage?keyword=` + inputValue);
                      } else {
                        Linking.openURL(`/searchpage`);
                      }
                    }}
                  >
                    <IconImg
                      src={searchIcon}
                    />
                  </SearchIconDiv>
                </SearchBarDiv1>
                <BoxIconDiv
                  onClick={() => {
                    toggleCartModal();
                  }}
                >
                  <img src={boxIcon}></img>
                </BoxIconDiv>
                <UserIconDiv
                  
                  onClick={() => {
                    // toggleUserModal()
                    toggleLogInShow();
                  }}
                >
                  <IconImg
                    src={userIcon}
                    
                  />
                </UserIconDiv>
              </div>
            </header>
          </ShowOne>
          <ShowTwo>
            <header className={x.join(" ")}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed");
                }}
              >
                <div style={{ marginTop: 22 }}>
                  <div>
                    <span>cart Info</span>

                    <div
                      onClick={() => {
                        toggleCartModal();
                      }}
                    >
                      <span>x</span>
                    </div>
                  </div>
                </div>
              </Modal>
 
                <ToggleDiv
                  toggle={
                    wrongLogInShow
                  }
                >
                <WrongLogIn toggleWrongLogInShow={toggleWrongLogInShow} />
                </ToggleDiv>

 
                <ToggleDiv
                  toggle={alreadyKakaoMemberShow}
                >
                <AlreadyKakaoMember
                  toggleAlreadyKakaoMemberShow={toggleAlreadyKakaoMemberShow}
                />
                </ToggleDiv>
 
         
              <ToggleDiv
                toggle={logInShow}
              >
                <LogIn
                  toggleLogInShow={toggleLogInShow}
                  logInFunction={logInFunction}
                  setUserPhoneNumber={setUserPhoneNumber}
                  onPhoneNumberChange={onPhoneNumberChange}
                  userPhoneNumber={userPhoneNumber}
                  setPassword={setPassword}
                  onPasswordChange={onPasswordChange}
                  password={password}
                  setUserEmail={setUserEmail}
                  userEmail={userEmail}
                  setUserName={setUserName}
                  userName={userName}
                  userCompanyName={userCompanyName}
                  setUserCompanyName={setUserCompanyName}
                  userCompanyWebSite={userCompanyWebSite}
                  setUserCompanyWebSite={setUserCompanyWebSite}
                  passwordCheck={passwordCheck}
                  setPasswordCheck={setPasswordCheck}
                  setRegistrationScreen={setRegistrationScreen}
                  registrationScreen={registrationScreen}
                  pincodeAnswer={pincodeAnswer}
                  setPincodeAnswer={setPincodeAnswer}
                  setSNSID={setSNSID}
                  SNSID={SNSID}
                  setJoinType={setJoinType}
                  joinType={joinType}
                />
              </ToggleDiv>
             
              <div className="headerContainer">
                <div className="logo">
                  <a href="/clip">
                    <img src={Logo} alt="Logo" title="Logo" />
                  </a>
                </div>

                <SearchBarDiv1>
                  <SearchBarInput
                    value={inputValue}
                    onChange={updateInputValue}
                    placeholder={"검색"}
                  />
                  <SearchIconDiv
                    onClick={() => {
                      if (searchTermEnable == true) {
                        Linking.openURL(`/searchpage?keyword=` + inputValue);
                      } else {
                        Linking.openURL(`/searchpage?mem_no=`);
                      }
                    }}
                  >
                    <IconImg
                      src={searchIcon}
                    />
                  </SearchIconDiv>
                </SearchBarDiv1>
                <BoxIconDiv
                  onClick={() => {
                    toggleCartModal();
                  }}
                >
                  <IconImg src={boxIcon}/>
                </BoxIconDiv>
                <UserIconDiv
                  className="linkTo"
                  
                  onClick={() => {
                    // toggleUserModal()
                    toggleLogInShow();
                  }}
                >
                  <IconImg
                    src={userIcon}
                  />
                </UserIconDiv>
              </div>
            </header>
          </ShowTwo>

          <ShowThree>
            <header className={x.join(" ")}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed");
                }}
              >
                <MarginDiv>
                  <div>
                    <span>cart Info</span>

                    <div
                      onClick={() => {
                        toggleCartModal();
                      }}
                    >
                      <span>x</span>
                    </div>
                  </div>
                </MarginDiv>
              </Modal>
              
              <ToggleDiv toggle={wrongLogInShow}>
                <WrongLogIn toggleWrongLogInShow={toggleWrongLogInShow} />
              </ToggleDiv>
              
    
              <ToggleDiv toggle={alreadyKakaoMemberShow}>
                <AlreadyKakaoMember
                  toggleAlreadyKakaoMemberShow={toggleAlreadyKakaoMemberShow}
                />
              </ToggleDiv>
              
              
              <ToggleDiv toggle={logInShow}>
                {/* <LogIn toggleLogInShow={toggleLogInShow} logInFunction={logInFunction} setUserPhoneNumber={setUserPhoneNumber} onPhoneNumberChange={onPhoneNumberChange} userPhoneNumber={userPhoneNumber} setPassword={setPassword} onPasswordChange={onPasswordChange} password={password} setUserEmail={setUserEmail} userEmail={userEmail}/> */}
                <LogIn
                  toggleLogInShow={toggleLogInShow}
                  logInFunction={logInFunction}
                  setUserPhoneNumber={setUserPhoneNumber}
                  onPhoneNumberChange={onPhoneNumberChange}
                  userPhoneNumber={userPhoneNumber}
                  setPassword={setPassword}
                  onPasswordChange={onPasswordChange}
                  password={password}
                  setUserEmail={setUserEmail}
                  userEmail={userEmail}
                  setUserName={setUserName}
                  userName={userName}
                  userCompanyName={userCompanyName}
                  setUserCompanyName={setUserCompanyName}
                  userCompanyWebSite={userCompanyWebSite}
                  setUserCompanyWebSite={setUserCompanyWebSite}
                  passwordCheck={passwordCheck}
                  setPasswordCheck={setPasswordCheck}
                  setRegistrationScreen={setRegistrationScreen}
                  registrationScreen={registrationScreen}
                  pincodeAnswer={pincodeAnswer}
                  setPincodeAnswer={setPincodeAnswer}
                  setSNSID={setSNSID}
                  SNSID={SNSID}
                  setJoinType={setJoinType}
                  joinType={joinType}
                />
              </ToggleDiv>
              
              <div className="headerContainer">
                <div className="logo">
                  <a href="/clip">
                    <img src={Logo} alt="Logo" title="Logo" />
                  </a>
                </div>

                <SearchIconDiv2
                  onClick={() => Linking.openURL(`/searchpage`)}
                  
                >
                  <IconImg
                    src={searchIcon}
                  />
                </SearchIconDiv2>
                <BoxIconDiv2
                  onClick={() => {
                    toggleCartModal();
                  }}
                >
                  <IconImg src={boxIcon}/>
                </BoxIconDiv2>
                <UserIconDiv2
                  className="linkTo"
                  onClick={() => {
                    //toggleUserModal()
                    toggleLogInShow();
                  }}
                >
                  <IconImg
                    src={userIcon}
                  />
                </UserIconDiv2>
              </div>
            </header>
          </ShowThree>
        </div>
      );
    } else {
      return (
        <div>
          <ShowOne>
            <header className={x.join(" ")}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed");
                }}
              >
                <MarginDiv>
                  <div>
                    <span>cart Info</span>

                    <div
                      onClick={() => {
                        toggleCartModal();
                      }}
                    >
                      <span>x</span>
                    </div>
                  </div>
                </MarginDiv>
              </Modal>
              {/* <Modal
                animationType="fade"
                transparent={false}
                visible={userModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed")
                }}>
                <View style={{marginTop: 22}}>
                  <View>
                    <TouchableHighlight
                      onPress={() => {
                        logOutFunction()
                      }}>
                      <Text>로그아웃</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => {
                        toggleUserModal()
                      }}>
                      <Text>x</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
               */}
              {/* <div
                    style={{
                        display: logOutShow ? 'block':'none' 
                    }}
                >
                    <LogOut toggleLogOutShow={toggleLogOutShow} logOutFunction={logOutFunction}/>
                </div> */}
              
              <ToggleDiv toggle={wrongLogInShow}>
                <WrongLogIn toggleWrongLogInShow={toggleWrongLogInShow} />
              </ToggleDiv>
             
              
              <ToggleDiv toggle={alreadyKakaoMemberShow}>
                <AlreadyKakaoMember
                  toggleAlreadyKakaoMemberShow={toggleAlreadyKakaoMemberShow}
                />
              </ToggleDiv>
              
              
              <ToggleDiv toggle={logInShow}>
                {/* <LogIn toggleLogInShow={toggleLogInShow} logInFunction={logInFunction} setUserPhoneNumber={setUserPhoneNumber} onPhoneNumberChange={onPhoneNumberChange} userPhoneNumber={userPhoneNumber} setPassword={setPassword} onPasswordChange={onPasswordChange} password={password} setUserEmail={setUserEmail} userEmail={userEmail}/> */}
                <LogIn
                  toggleLogInShow={toggleLogInShow}
                  logInFunction={logInFunction}
                  setUserPhoneNumber={setUserPhoneNumber}
                  onPhoneNumberChange={onPhoneNumberChange}
                  userPhoneNumber={userPhoneNumber}
                  setPassword={setPassword}
                  onPasswordChange={onPasswordChange}
                  password={password}
                  setUserEmail={setUserEmail}
                  userEmail={userEmail}
                  setUserName={setUserName}
                  userName={userName}
                  userCompanyName={userCompanyName}
                  setUserCompanyName={setUserCompanyName}
                  userCompanyWebSite={userCompanyWebSite}
                  setUserCompanyWebSite={setUserCompanyWebSite}
                  passwordCheck={passwordCheck}
                  setPasswordCheck={setPasswordCheck}
                  setRegistrationScreen={setRegistrationScreen}
                  registrationScreen={registrationScreen}
                  pincodeAnswer={pincodeAnswer}
                  setPincodeAnswer={setPincodeAnswer}
                  setSNSID={setSNSID}
                  SNSID={SNSID}
                  setJoinType={setJoinType}
                  joinType={joinType}
                />
              </ToggleDiv>
              
              <ToggleDiv toggle={useDropDown}>
                <UseDropDown toggleUseDropDown={toggleUseDropDown} />
              </ToggleDiv>
              
              
              <ToggleDiv toggle={categoryDropDown}>
                <CategoryDropDown
                  toggleCategoryDropDown={toggleCategoryDropDown}
                />
              </ToggleDiv>
              
              
              <ToggleDiv toggle={brandsDropDown}>
                <BrandsDropDown toggleBrandsDropDown={toggleBrandsDropDown} />
              </ToggleDiv>
              

              <div className="headerContainer">
                <div className="logo">
                  <a href="/clip">
                    <img src={Logo} alt="Logo" title="Logo" />
                  </a>
                </div>

                <CategoryDiv1
                  className="linkTo"
                  id="category"
                  
                  activeOpacity={0.5}
                  onClick={() => {
                    toggleCategoryDropDown();
                  }}
                >
                  {/* <Link to="/category">
                          자재카테고리
                        </Link> */}
                  <a
                    style={{
                      // flex:1,
                      textDecorationLine: "none",
                      // color:'black',
                      // //borderColor:'black',
                      // //borderWidth:2,
                      // backgroundColor:'transparent',
                      // fontSize: '25pt',
                      // fontWeight:'700',
                      // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                      // textShadowOffset: {width: 0, height: 0},
                      // textShadowRadius: 2,
                      // // flex:1,
                      // alignItems:'center',
                      // justifyContent:'center',
                      // flexDirection:'row',
                      // textAlign:'center'
                    }}
                    // href="/category"
                  >
                    <CategoryDiv2
                      selectable={false}
                      
                    >
                      자재카테고리
                    </CategoryDiv2>
                  </a>
                </CategoryDiv1>

                <UseDiv1
                  className="linkTo"
                  
                  activeOpacity={0.5}
                  onClick={() => {
                    toggleUseDropDown();
                  }}
                >
                  <a
                    style={{
                      textDecorationLine: "none",
                    }}
                    // href="/constructionpart"
                  >
                    <UseDiv2
                      selectable={false}
                    >
                      사공부위
                    </UseDiv2>
                  </a>
                </UseDiv1>
                <BrandsDiv1
                  className="linkTo"
                  
                  activeOpacity={0.5}
                  // onMouseEnter={()=>
                  //   console.log('mouse entered')
                  // }
                  onClick={() => {
                    console.log("toggle dropdown");
                    toggleBrandsDropDown();
                  }}
                >
                  <a
                    style={{
                      textDecorationLine: "none",
                    }}
                    // href="/brands"
                  >
                    <BrandsDiv2
                      selectable={false}
                    >
                      브랜드
                    </BrandsDiv2>
                  </a>
                </BrandsDiv1>

                <SearchBarDiv1>
                  <SearchBarInput
                    value={inputValue}
                    onChange={updateInputValue}
                    placeholder={"검색"}
                  />
                  <SearchIconDiv
                    onClick={() => {
                      if (searchTermEnable == true) {
                        Linking.openURL(`/searchpage?keyword=` + inputValue);
                      } else {
                        Linking.openURL(`/searchpage`);
                      }
                    }}
                  >
                    <IconImg
                      src={searchIcon}
                    />
                  </SearchIconDiv>
                </SearchBarDiv1>
                <BoxIconDiv
                  onClick={() => {
                    toggleCartModal();
                  }}
                >
                  <img src={boxIcon}></img>
                </BoxIconDiv>
                <UserIconDiv
                  className="linkTo"
                  
                  onClick={() => {
                    // toggleUserModal()
                    // toggleLogOutShow()
                    toggleLogInShow();
                  }}
                >
                  <IconImg                    
                    src={userIcon}
                  />
                </UserIconDiv>
              </div>
            </header>
          </ShowOne>
          <ShowTwo>
            <header className={x.join(" ")}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed");
                }}
              >
                <MarginDiv>
                  <div>
                    <span>cart Info</span>

                    <div
                      onClick={() => {
                        toggleCartModal();
                      }}
                    >
                      <span>x</span>
                    </div>
                  </div>
                </MarginDiv>
              </Modal>
              
              <ToggleDiv  toggle={wrongLogInShow}>
                <WrongLogIn toggleWrongLogInShow={toggleWrongLogInShow} />
              </ToggleDiv>
          
             
              <ToggleDiv
                toggle={alreadyKakaoMemberShow}
              >
                <AlreadyKakaoMember
                  toggleAlreadyKakaoMemberShow={toggleAlreadyKakaoMemberShow}
                />
              </ToggleDiv>
              
              <ToggleDiv
                toggle={logInShow}
              >
                {/* <LogIn toggleLogInShow={toggleLogInShow} logInFunction={logInFunction} setUserPhoneNumber={setUserPhoneNumber} onPhoneNumberChange={onPhoneNumberChange} userPhoneNumber={userPhoneNumber} setPassword={setPassword} onPasswordChange={onPasswordChange} password={password} setUserEmail={setUserEmail} userEmail={userEmail}/> */}
                <LogIn
                  toggleLogInShow={toggleLogInShow}
                  logInFunction={logInFunction}
                  setUserPhoneNumber={setUserPhoneNumber}
                  onPhoneNumberChange={onPhoneNumberChange}
                  userPhoneNumber={userPhoneNumber}
                  setPassword={setPassword}
                  onPasswordChange={onPasswordChange}
                  password={password}
                  setUserEmail={setUserEmail}
                  userEmail={userEmail}
                  setUserName={setUserName}
                  userName={userName}
                  userCompanyName={userCompanyName}
                  setUserCompanyName={setUserCompanyName}
                  userCompanyWebSite={userCompanyWebSite}
                  setUserCompanyWebSite={setUserCompanyWebSite}
                  passwordCheck={passwordCheck}
                  setPasswordCheck={setPasswordCheck}
                  setRegistrationScreen={setRegistrationScreen}
                  registrationScreen={registrationScreen}
                  pincodeAnswer={pincodeAnswer}
                  setPincodeAnswer={setPincodeAnswer}
                  setSNSID={setSNSID}
                  SNSID={SNSID}
                  setJoinType={setJoinType}
                  joinType={joinType}
                />
              </ToggleDiv>
              <div className="headerContainer">
                <div className="logo">
                  <a href="/clip">
                    <img src={Logo} alt="Logo" title="Logo" />
                  </a>
                </div>

                <SearchBarDiv1>
                  <SearchBarInput
                    value={inputValue}
                    onChange={updateInputValue}
                    placeholder={"검색"}
                  />
                  <SearchIconDiv
                    onClick={() => {
                      if (searchTermEnable == true) {
                        Linking.openURL(
                          `/searchpage?keyword=` + inputValue + "&mem_no="
                        );
                      } else {
                        Linking.openURL("/searchpage?mem_no=");
                      }
                    }}
                  >
                    <IconImg
                      src={searchIcon}
                    />
                  </SearchIconDiv>
                </SearchBarDiv1>
                <BoxIconDiv
                  onClick={() => {
                    toggleCartModal();
                  }}
                >
                  <IconImg src={boxIcon}/>
                </BoxIconDiv>
                <UserIconDiv
                  className="linkTo"
                  onClick={() => {
                    //toggleUserModal()
                    toggleLogInShow();
                  }}
                >
                  <IconImg
                    src={userIcon}
                  />
                </UserIconDiv>
              </div>
            </header>
          </ShowTwo>
          <ShowThree>
            <header className={x.join(" ")}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={cartModalVisible}
                onDismiss={() => {
                  // alert('Modal has been closed.');
                  console.log("user modal has been closed");
                }}
              >
                <MarginDiv>
                  <div>
                    <span>cart Info</span>

                    <div
                      onPress={() => {
                        toggleCartModal();
                      }}
                    >
                      <span>x</span>
                    </div>
                  </div>
                </MarginDiv>
              </Modal>

              <ToggleDiv toggle={wrongLogInShow}>
                <WrongLogIn toggleWrongLogInShow={toggleWrongLogInShow} />
              </ToggleDiv>
              
              
              <ToggleDiv toggle={alreadyKakaoMemberShow}>
                <AlreadyKakaoMember
                  toggleAlreadyKakaoMemberShow={toggleAlreadyKakaoMemberShow}
                />
              </ToggleDiv>

             
              <ToggleDiv toggle={logInShow}>
                {/* <LogIn toggleLogInShow={toggleLogInShow} logInFunction={logInFunction} setUserPhoneNumber={setUserPhoneNumber} onPhoneNumberChange={onPhoneNumberChange} userPhoneNumber={userPhoneNumber} setPassword={setPassword} onPasswordChange={onPasswordChange} password={password} setUserEmail={setUserEmail} userEmail={userEmail}/> */}
                <LogIn
                  toggleLogInShow={toggleLogInShow}
                  logInFunction={logInFunction}
                  setUserPhoneNumber={setUserPhoneNumber}
                  onPhoneNumberChange={onPhoneNumberChange}
                  userPhoneNumber={userPhoneNumber}
                  setPassword={setPassword}
                  onPasswordChange={onPasswordChange}
                  password={password}
                  setUserEmail={setUserEmail}
                  userEmail={userEmail}
                  setUserName={setUserName}
                  userName={userName}
                  userCompanyName={userCompanyName}
                  setUserCompanyName={setUserCompanyName}
                  userCompanyWebSite={userCompanyWebSite}
                  setUserCompanyWebSite={setUserCompanyWebSite}
                  passwordCheck={passwordCheck}
                  setPasswordCheck={setPasswordCheck}
                  setRegistrationScreen={setRegistrationScreen}
                  registrationScreen={registrationScreen}
                  pincodeAnswer={pincodeAnswer}
                  setPincodeAnswer={setPincodeAnswer}
                  setSNSID={setSNSID}
                  SNSID={SNSID}
                  setJoinType={setJoinType}
                  joinType={joinType}
                />
              </ToggleDiv>
              <div className="headerContainer">
                <div className="logo">
                  <a href="/clip">
                    <img src={Logo} alt="Logo" title="Logo" />
                  </a>
                </div>

                <SearchIconDiv2
                  onClick={() => Linking.openURL(`/searchpage`)}
                  >
                  <IconImg
                    src={searchIcon}
                  />
                </SearchIconDiv2>
                <BoxIconDiv2
                  onClick={() => {
                    toggleCartModal();
                  }}
                >
                  <IconImg src={boxIcon}/>
                </BoxIconDiv2>
                <UserIconDiv2
                  className="linkTo"
                  
                  onClick={() => {
                    //toggleUserModal()
                    toggleLogInShow();
                  }}
                >
                  <IconImg
                    src={userIcon}
                  ></IconImg>
                </UserIconDiv2>
              </div>
            </header>
          </ShowThree>
        </div>
      );
    }
  }
};

export default Navbar;
