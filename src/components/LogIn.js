import React, { useEffect } from "react";
import KakaoAuth from "./KakaoAuth";
import AppleAuth from "./AppleAuth";
import NoExistMember from "./NoExistMember";
import WrongPinCode from "./WrongPinCode";
import SentMessage from "./SentMessage";
import SentEmail from "./SentEmail";
import AlreadyMemberMessage from "./AlreadyMemberMessage";
import TermsOfServicePopUp from "./TermsOfServicePopUp";
import PrivacyPolicyPopUp from "./PrivacyPolicyPopUp";
import RegistrationSuccess from "./RegistrationSuccess";
import EmailAlreadyExists from "./EmailAlreadyExists";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image,
  Linking,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";
import xIcon from "../assets/x.png";
import eyeIcon from "../assets/eye-solid.svg";
import eyeSlashIcon from "../assets/eye-slash-solid.svg";
import ImageUploader from "react-images-upload";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import "./Login.css";
import fetch from "node-fetch";
const queryString = require("query-string");

function LogIn(props) {
  const [height, setHeight] = React.useState(Dimensions.get("window").height);
  const [width, setWidth] = React.useState(Dimensions.get("window").width);
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [passwordCheckVisible, setPasswordCheckVisible] = React.useState(true);
  const [emailLogIn, setEmailLogIn] = React.useState(false);
  const [findPassWord, setFindPassWord] = React.useState(false);
  const [findEmail, setFindEmail] = React.useState(false);
  const [sentEmailShow, setSentEmailShow] = React.useState(false);
  const [secureEmailString, setSecureEmailString] = React.useState("");
  const [passwordPopUp, setPasswordPopUp] = React.useState("none");
  const [noExistMemberShow, setNoExistMemberShow] = React.useState(false);
  const [sentMessageShow, setSentMessageShow] = React.useState(false);
  const [registrationScreen, setRegistrationScreen] = React.useState(0);
  const [pincodeValue, setPincodeValue] = React.useState("");
  const [pincodeAnswer, setPincodeAnswer] = React.useState("");
  const [
    alreadyMemberMessageShow,
    setAlreadyMemberMessageShow,
  ] = React.useState(false);
  const [wrongPinCodeShow, setWrongPinCodeShow] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [
    membershipButtonDisabled,
    setMembershipButtonDisabled,
  ] = React.useState(true);
  const [privacyPolicyPopUpShow, setPrivacyPolicyPopUpShow] = React.useState(
    false
  );
  const [termsOfServicePopUpShow, setTermsOfServicePopUpShow] = React.useState(
    false
  );
  const [
    showRegistrationSuccessScreen,
    setShowRegistrationSuccessScreen,
  ] = React.useState(false);
  const [
    emailAlreadyExistsScreen,
    setEmailAlreadyExistsScreen,
  ] = React.useState(false);
  const [
    showDuplicateEmailScreen,
    setShowDuplicateEmailScreen,
  ] = React.useState(false);
  const [imageUploaded, setImageUploaded] = React.useState(false);
  const [picture, setPicture] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);
  const ref = useBlurOnFulfill({ pincodeValue, cellCount: 6 });
  const [codeFileProps, getCellOnLayoutHandler] = useClearByFocusCell({
    pincodeValue,
    setPincodeValue,
  });
  const onChange = () => {
    setHeight(Dimensions.get("window").height);
    setWidth(Dimensions.get("window").width);
    // console.log(height+" : "+width)
  };
  const onDrop = (picture) => {
    console.log(picture);
    setImageUploaded(true);
    setPicture(picture);
  };
  const handleImagePreview = (e) => {
    // let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    // var binaryString = window.atob(image_as_base64);
    // var binaryLen = binaryString.length;
    const data = new FormData();
    let image_as_files = e.target.files[0];
    data.append("inputname", image_as_files);
    setImageFile(data);
    // setImageFile(image_as_files)
  };
  //   const handleSubmitFile =() =>{
  //       let formData = new FormData()
  //       formData.append('customFile',this.state.)

  //   }
  const findPasswordFunction = (obj) => {
    // console.log(qStr)
    fetch("/FindPassword?" + queryString.stringify(obj))
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
        if (incomingData.result == "FAILURE") {
          setPasswordPopUp("FAILURE");
          setNoExistMemberShow(true);
        } else if (incomingData.result == "SUCCESS") {
          setPasswordPopUp("SUCCESS");
          setSentMessageShow(true);
          setFindPassWord(false);
        }
        // setClipBoardData(incomingData.sort(function(a,b){
        //     var textA = a.cb_name.toUpperCase()
        //     var textB = b.cb_name.toUpperCase()
        //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        // }))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const findEmailFunction = (obj) => {
    // console.log(qStr)
    fetch("/FindEmail?" + queryString.stringify(obj))
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
        if (incomingData.result == "FAILURE") {
          // setPasswordPopUp("FAILURE")
          setNoExistMemberShow(true);
        } else if (incomingData.result == "SUCCESS") {
          // setPasswordPopUp('SUCCESS')
          //setSentMessageShow(true)
          setSecureEmailString(incomingData.message);
          setSentEmailShow(true);
          setFindEmail(false);
        }
        // setClipBoardData(incomingData.sort(function(a,b){
        //     var textA = a.cb_name.toUpperCase()
        //     var textB = b.cb_name.toUpperCase()
        //     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        // }))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendPincodeFunction = (obj) => {
    // console.log(qStr)
    fetch("/SendPincode?" + queryString.stringify(obj))
      .then((res) => res.json())
      .then((incomingData) => {
        // console.log(incomingData)
        //setPincodeAnswer(incomingData.message)
        props.setPincodeAnswer(incomingData.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const memberRegistrationFunction = (obj) => {
    fetch("/Member?" + queryString.stringify(obj))
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
        if (incomingData.result == "SUCCESS") {
          //setRegistrationScreen(0)
          props.setRegistrationScreen(0);
          props.setJoinType("MOBILE");
          props.setSNSID(null);
          setShowRegistrationSuccessScreen(true);
          var imageUploadOBJ = {
            ap_dbtable: "MEMBER",
            pic_ownder: incomingData.message.split("_")[0],
            imagecolumn: "mem_company_img",
            multiupload: "true",
            // mem_company_img:[picture]
            mem_company_img: [imageFile],
          };
          fetch("/Picture?" + queryString.stringify(imageUploadOBJ))
            .then((res) => res.json())
            .then((incomingDataTwo) => {
              console.log(imageUploadOBJ);
              console.log(incomingDataTwo);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (incomingData.message == "ALREADY_EMAIL") {
          setEmailLogIn(true);
          //setRegistrationScreen(0)
          props.setRegistrationScreen(0);
          props.setJoinType("MOBILE");
          props.setSNSID(null);
          setEmailAlreadyExistsScreen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkExistMemberFunction = (obj) => {
    // console.log(qStr)
    fetch("/CheckExistMember?" + queryString.stringify(obj))
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleEmailLogIn = () => {
    setEmailLogIn(!emailLogIn);
  };
  const toggleNoExistMemberShow = () => {
    setNoExistMemberShow(!noExistMemberShow);
  };
  const toggleSentMessageShow = () => {
    setSentMessageShow(!sentMessageShow);
  };
  const togglePasswordCheckVisible = () => {
    setPasswordCheckVisible(!passwordCheckVisible);
  };
  const toggleWrongPinCodeShow = () => {
    setWrongPinCodeShow(!wrongPinCodeShow);
  };
  const toggleAlreadyMemberMessageShow = () => {
    setAlreadyMemberMessageShow(!alreadyMemberMessageShow);
  };
  const toggleTermsOfServicePopUpShow = () => {
    setTermsOfServicePopUpShow(!termsOfServicePopUpShow);
  };
  const togglePrivacyPolicyPopUpShow = () => {
    setPrivacyPolicyPopUpShow(!privacyPolicyPopUpShow);
  };
  const toggleShowRegistrationSuccessScreen = () => {
    setShowRegistrationSuccessScreen(!showRegistrationSuccessScreen);
  };
  const toggleEmailAlreadyExistsScreen = () => {
    setEmailAlreadyExistsScreen(!emailAlreadyExistsScreen);
  };
  const toggleSentEmailShow = () => {
    setSentEmailShow(!sentEmailShow);
  };
  const checkboxClicked = (e) => {
    if (e.target.checked == true) {
      setChecked(true);
    } else if (e.target.checked == false) {
      setChecked(false);
    }
  };
  const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderRadius: 4,
      borderColor: "#00000030",
      textAlign: "center",
    },
    focusCell: {
      borderColor: "#000",
    },
  });
  useEffect(() => {
    if (
      props.userName != "" &&
      props.userEmail != "" &&
      props.userCompanyName != "" &&
      props.userCompanyWebSite != "" &&
      props.password != "" &&
      props.passwordCheck != "" &&
      checked == true
      // &&
      // imageUploaded==true
    ) {
      setMembershipButtonDisabled(false);
    } else {
      setMembershipButtonDisabled(true);
    }
  }, [
    props.username,
    props.userEmail,
    props.userCompanyName,
    props.userCompanyWebSite,
    props.password,
    props.passwordCheck,
    checked,
  ]);
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
  }, []);
  useEffect(() => {
    console.log(registrationScreen);
  }, [registrationScreen]);

  if (findPassWord) {
    return (
      <div>
        <div
          style={{
            display: noExistMemberShow ? "block" : "none",
          }}
        >
          <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
        </div>
        <div
          style={{
            display: sentMessageShow ? "block" : "none",
          }}
        >
          <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
        </div>
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "block",
            //   padding:'160px',
            zIndex: 101,
          }}
        >
          <div
            style={{
              paddingTop: "100px",
              // paddingLeft:'65px',
              // paddingRight:'65px'
            }}
          >
            <div
              style={{
                textAlign: "left",
                // margin:'25pt'
                paddingLeft: "0px",
                paddingRight: "0px",
                backgroundColor: "transparent",
              }}
            ></div>

            <div
              style={{
                borderRadius: "10px",
                backgroundColor: "white",
                width: "500px",
                height: "300px",
                paddingTop: "15px",
                // columnCount:3,
                // flexwrap:'wrap',
                // flexDirection:'column',
                // display: 'grid',
                // gridTemplateColumns: 'auto auto',
                // // padding:'100px',
                overflowY: "scroll",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: "298px",
                  width: "100%",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <View
                  style={{
                    position: "relative",
                    top: 0,
                    height: "30px",
                    width: "100%",
                    backgroundColor: "white",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottom: "1px solid rgb(221,221,221)",
                  }}
                >
                  <div
                    style={{
                      height: "25px",
                      width: "25px",
                      backgroundColor: "transparent",
                      position: "relative",
                      top: "15px",
                      left: "15px",
                      zIndex: 102,
                    }}
                  >
                    {/* <TouchableOpacity
                onPress={()=>{
                    setFindPassWord(false)
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

                </TouchableOpacity> */}
                    <TouchableOpacity
                      onPress={() => {
                        //console.log('close project list')
                        setFindPassWord(false);
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "transparent",
                          height: "25px",
                          width: "100%",
                          borderRadius: "10px",
                          // border:'2px solid black',
                          textAlign: "left",
                          justifyContent: "center",
                          lineHeight: "25px",
                          padding: "15px",
                          alignItems: "center",
                          transform: "translate(0px,-23px)",
                        }}
                      >
                        <Text
                          style={
                            {
                              // position:'fixed',
                              // right:'100px'
                            }
                          }
                        >
                          &lt;
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </div>

                  <Text
                    style={{
                      fontWeight: 700,
                      transform: "translate(0px,-23px)",
                    }}
                  >
                    비밀번호 찾기
                  </Text>
                </View>
                <View
                  style={{
                    textAlign: "left",
                    padding: "15px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: "15px",
                      marginBottom: "5px",
                    }}
                  >
                    비밀번호를 잊으셨나요?
                  </Text>
                  <Text>
                    비밀번호를 다시 설정하기 위해 가입 당시의 휴대폰 번호를
                    입력해 주세요.
                  </Text>
                </View>
                <div
                  style={{
                    display: "block",
                    textAlign: "left",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    // paddingTop:'5px',
                    overflowY: "scroll",
                    backgroundColor: "white",
                    height: "100%",
                  }}
                >
                  <Text>휴대폰번호</Text>

                  <TextInput
                    onChangeText={(text) => {
                      props.setUserPhoneNumber(text);
                      // props.onPhoneNumberChange()
                    }}
                    style={{
                      marginTop: "10px",
                      border: "1px solid black",
                      borderRadius: "0px",
                    }}
                    placeholder="'-' 없이 입력"
                    value={props.userPhoneNumber}
                  ></TextInput>
                </div>
                <div
                  style={{
                    // display: emailLogIn ? 'none':'block',
                    borderTop: "1px solid rgb(221,221,221)",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginTop: "15px",
                      backgroundColor: "rgb(255,123,88)",
                      borderRadius: "10px",
                      height: "40px",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      // props.logInFunction(
                      //     {
                      //         mem_jointype:'MOBILE',
                      //         mem_password:props.password,
                      //         mem_token:null,
                      //         mem_mobile:props.userPhoneNumber
                      //     }
                      // )
                      findPasswordFunction({
                        mem_mobile: props.userPhoneNumber,
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      확인
                    </Text>
                  </TouchableOpacity>
                </div>
              </View>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (findEmail) {
    return (
      <div>
        <div
          style={{
            display: noExistMemberShow ? "block" : "none",
          }}
        >
          <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
        </div>
        <div
          style={{
            display: sentMessageShow ? "block" : "none",
          }}
        >
          <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
        </div>
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "block",
            //   padding:'160px',
            zIndex: 101,
          }}
        >
          <div
            style={{
              paddingTop: "100px",
              //paddingLeft:'65px',
              //paddingRight:'65px'
            }}
          >
            <div
              style={{
                textAlign: "left",
                // margin:'25pt'
                paddingLeft: "0px",
                paddingRight: "0px",
                backgroundColor: "transparent",
              }}
            ></div>

            <div
              style={{
                borderRadius: "10px",
                backgroundColor: "white",
                width: "500px",
                height: "250px",
                paddingTop: "15px",
                // columnCount:3,
                // flexwrap:'wrap',
                // flexDirection:'column',
                // display: 'grid',
                // gridTemplateColumns: 'auto auto',
                // // padding:'100px',
                overflowY: "scroll",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: "248px",
                  width: "100%",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <View
                  style={{
                    position: "relative",
                    top: 0,
                    height: "30px",
                    width: "100%",
                    backgroundColor: "white",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottom: "1px solid rgb(221,221,221)",
                  }}
                >
                  <div
                    style={{
                      height: "25px",
                      width: "25px",
                      backgroundColor: "transparent",
                      position: "relative",
                      top: "15px",
                      left: "15px",
                      zIndex: 102,
                    }}
                  >
                    {/* <TouchableOpacity
                onPress={()=>{
                    setFindPassWord(false)
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

                </TouchableOpacity> */}
                    <TouchableOpacity
                      onPress={() => {
                        //console.log('close project list')
                        setFindEmail(false);
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "transparent",
                          height: "25px",
                          width: "100%",
                          borderRadius: "10px",
                          // border:'2px solid black',
                          textAlign: "left",
                          justifyContent: "center",
                          lineHeight: "25px",
                          padding: "15px",
                          alignItems: "center",
                          transform: "translate(0px,-23px)",
                        }}
                      >
                        <Text
                          style={
                            {
                              // position:'fixed',
                              // right:'100px'
                            }
                          }
                        >
                          &lt;
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </div>

                  <Text
                    style={{
                      fontWeight: 700,
                      transform: "translate(0px,-23px)",
                    }}
                  >
                    이메일 찾기
                  </Text>
                </View>
                <View
                  style={{
                    textAlign: "left",
                    padding: "15px",
                  }}
                >
                  {/* <Text
                            style={{
                                fontWeight:700,
                                fontSize:'15px',
                                marginBottom:'5px'
                            }}
                        >
                            비밀번호를 잊으셨나요?
                        </Text> */}
                  <Text>
                    이메일을 찾기 위해서 가입 당시의 휴대폰 번호를 입력해
                    주세요.
                  </Text>
                </View>
                <div
                  style={{
                    display: "block",
                    textAlign: "left",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    // paddingTop:'5px',
                    overflowY: "scroll",
                    backgroundColor: "white",
                    height: "100%",
                  }}
                >
                  <Text>휴대폰 번호</Text>

                  <TextInput
                    onChangeText={(text) => {
                      props.setUserPhoneNumber(text);
                      // props.onPhoneNumberChange()
                    }}
                    style={{
                      marginTop: "10px",
                      border: "1px solid black",
                      borderRadius: "0px",
                    }}
                    placeholder="'-' 없이 입력"
                    value={props.userPhoneNumber}
                  ></TextInput>
                </div>
                <div
                  style={{
                    // display: emailLogIn ? 'none':'block',
                    borderTop: "1px solid rgb(221,221,221)",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginTop: "15px",
                      backgroundColor: "rgb(255,123,88)",
                      borderRadius: "10px",
                      height: "40px",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      // props.logInFunction(
                      //     {
                      //         mem_jointype:'MOBILE',
                      //         mem_password:props.password,
                      //         mem_token:null,
                      //         mem_mobile:props.userPhoneNumber
                      //     }
                      // )
                      findEmailFunction({
                        mem_mobile: props.userPhoneNumber,
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      확인
                    </Text>
                  </TouchableOpacity>
                </div>
              </View>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // else if(registrationScreen!=0){
  //     if(registrationScreen==1){
  else if (props.registrationScreen != 0) {
    if (props.registrationScreen == 1) {
      return (
        <div>
          <div
            style={{
              display: noExistMemberShow ? "block" : "none",
            }}
          >
            <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
          </div>
          <div
            style={{
              display: sentMessageShow ? "block" : "none",
            }}
          >
            <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
          </div>
          <div
            style={{
              display: alreadyMemberMessageShow ? "block" : "none",
            }}
          >
            <AlreadyMemberMessage
              toggleAlreadyMemberMessageShow={toggleAlreadyMemberMessageShow}
            />
          </div>

          <div
            style={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "block",
              //   padding:'160px',
              zIndex: 101,
            }}
          >
            <div
              style={{
                paddingTop: "100px",
                // paddingLeft:'65px',
                // paddingRight:'65px'
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  // margin:'25pt'
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  backgroundColor: "transparent",
                }}
              ></div>

              <div
                style={{
                  borderRadius: "10px",
                  backgroundColor: "white",
                  width: "500px",
                  height: "260px",
                  paddingTop: "15px",
                  // columnCount:3,
                  // flexwrap:'wrap',
                  // flexDirection:'column',
                  // display: 'grid',
                  // gridTemplateColumns: 'auto auto',
                  // // padding:'100px',
                  overflowY: "scroll",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    height: "258px",
                    width: "100%",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <View
                    style={{
                      position: "relative",
                      top: 0,
                      height: "30px",
                      width: "100%",
                      backgroundColor: "white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      borderBottom: "1px solid rgb(221,221,221)",
                    }}
                  >
                    <div
                      style={{
                        height: "25px",
                        width: "25px",
                        backgroundColor: "transparent",
                        position: "relative",
                        top: "15px",
                        left: "15px",
                        zIndex: 102,
                      }}
                    >
                      {/* <TouchableOpacity
                    onPress={()=>{
                        setFindPassWord(false)
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

                    </TouchableOpacity> */}
                      <TouchableOpacity
                        onPress={() => {
                          //console.log('close project list')
                          setFindPassWord(false);
                          // setRegistrationScreen(0)
                          props.setRegistrationScreen(0);
                          props.setJoinType("MOBILE");
                          props.setSNSID(null);
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "transparent",
                            height: "25px",
                            width: "100%",
                            borderRadius: "10px",
                            // border:'2px solid black',
                            textAlign: "left",
                            justifyContent: "center",
                            lineHeight: "25px",
                            padding: "15px",
                            alignItems: "center",
                            transform: "translate(0px,-23px)",
                          }}
                        >
                          <Text
                            style={
                              {
                                // position:'fixed',
                                // right:'100px'
                              }
                            }
                          >
                            &lt;
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </div>

                    <Text
                      style={{
                        fontWeight: 700,
                        transform: "translate(0px,-23px)",
                      }}
                    >
                      회원가입
                    </Text>
                  </View>
                  {/* <View
                            style={{
                                textAlign:'left',
                                padding:'15px'
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight:700,
                                    fontSize:'15px',
                                    marginBottom:'5px'
                                }}
                            >
                                비밀번호를 잊으셨나요?
                            </Text>
                            <Text>
                                비밀번호를 다시 설정하기 위해 가입 당시의 휴대폰 번호를 입력해 주세요.
                            </Text>
                        </View> */}
                  <div
                    style={{
                      display: "block",
                      textAlign: "left",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingTop: "15px",
                      overflowY: "scroll",
                      backgroundColor: "transparent",
                      height: "75px",
                    }}
                  >
                    <Text>휴대폰번호</Text>

                    <TextInput
                      onChangeText={(text) => {
                        props.setUserPhoneNumber(text);
                        // props.onPhoneNumberChange()
                      }}
                      style={{
                        marginTop: "0px",
                        border: "1px solid black",
                        borderRadius: "0px",
                      }}
                      placeholder="'-' 없이 입력"
                      value={props.userPhoneNumber}
                    ></TextInput>
                  </div>
                  <View
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      top: 0,
                      backgroundColor: "transparent",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        marginBottom: "5px",
                      }}
                    >
                      이미 계정을 보유하고 계시나요?
                    </Text>

                    <TouchableOpacity>
                      <Text
                        style={{
                          fontWeight: 700,
                          fontSize: "15px",
                          marginLeft: "5px",
                        }}
                        onPress={() => {
                          // setRegistrationScreen(0)
                          props.setRegistrationScreen(0);
                          props.setJoinType("MOBILE");
                          props.setSNSID(null);
                        }}
                      >
                        로그인
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <div
                    style={{
                      // display: emailLogIn ? 'none':'block',
                      borderTop: "1px solid rgb(221,221,221)",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        marginTop: "15px",
                        backgroundColor: "rgb(255,123,88)",
                        borderRadius: "10px",
                        height: "40px",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        fetch(
                          "/CheckExistMember?" +
                            queryString.stringify({
                              mem_mobile: props.userPhoneNumber,
                            })
                        )
                          .then((res) => res.json())
                          .then((incomingData) => {
                            console.log(incomingData);
                            if (incomingData.result == "SUCCESS") {
                              sendPincodeFunction({
                                mem_mobile: props.userPhoneNumber,
                              });
                              //setRegistrationScreen(2)
                              props.setRegistrationScreen(2);
                            } else {
                              console.log("Already a member");
                              //setRegistrationScreen(0)
                              setAlreadyMemberMessageShow(true);
                            }
                            // setRegistrationScreen(3)
                          })
                          .catch((err) => {
                            console.log(err);
                          });

                        // sendPincodeFunction({
                        //     mem_mobile:props.userPhoneNumber
                        // })
                        // setRegistrationScreen(2)

                        // setRegistrationScreen(3)
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        계속
                      </Text>
                    </TouchableOpacity>
                  </div>
                </View>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // else if(registrationScreen==2){
    else if (props.registrationScreen == 2) {
      return (
        <div>
          <div
            style={{
              display: wrongPinCodeShow ? "block" : "none",
            }}
          >
            <WrongPinCode toggleWrongPinCodeShow={toggleWrongPinCodeShow} />
          </div>
          <div
            style={{
              display: sentMessageShow ? "block" : "none",
            }}
          >
            <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
          </div>
          <div
            style={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "block",
              //   padding:'160px',
              zIndex: 101,
            }}
          >
            <div
              style={{
                paddingTop: "100px",
                // paddingLeft:'65px',
                // paddingRight:'65px'
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  // margin:'25pt'
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  backgroundColor: "transparent",
                }}
              ></div>

              <div
                style={{
                  borderRadius: "10px",
                  backgroundColor: "white",
                  width: "500px",
                  height: "300px",
                  paddingTop: "15px",
                  // columnCount:3,
                  // flexwrap:'wrap',
                  // flexDirection:'column',
                  // display: 'grid',
                  // gridTemplateColumns: 'auto auto',
                  // // padding:'100px',
                  overflowY: "scroll",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    height: "298px",
                    width: "100%",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <View
                    style={{
                      position: "relative",
                      top: 0,
                      height: "30px",
                      width: "100%",
                      backgroundColor: "white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      borderBottom: "1px solid rgb(221,221,221)",
                    }}
                  >
                    <div
                      style={{
                        height: "25px",
                        width: "25px",
                        backgroundColor: "transparent",
                        position: "relative",
                        top: "15px",
                        left: "15px",
                        zIndex: 102,
                        transform: "translate(0px,-20px)",
                      }}
                    >
                      {/* <TouchableOpacity
                    onPress={()=>{
                        setFindPassWord(false)
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

                    </TouchableOpacity> */}
                      <TouchableOpacity
                        onPress={() => {
                          //console.log('close project list')
                          setFindPassWord(false);
                          //setRegistrationScreen(0)
                          props.setRegistrationScreen(0);
                          props.setJoinType("MOBILE");
                          props.setSNSID(null);
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "transparent",
                            height: "25px",
                            width: "100%",
                            borderRadius: "10px",
                            // border:'2px solid black',
                            textAlign: "left",
                            justifyContent: "center",
                            lineHeight: "25px",
                            padding: "15px",
                            alignItems: "center",
                            transform: "translate(0px,-5px)",
                          }}
                        >
                          <Text
                            style={
                              {
                                // position:'fixed',
                                // right:'100px'
                              }
                            }
                          >
                            &lt;
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </div>
                    <Text
                      style={{
                        fontWeight: 700,
                        transform: "translate(0px,-23px)",
                      }}
                    >
                      회원가입
                    </Text>
                  </View>
                  {/* <View
                            style={{
                                textAlign:'left',
                                padding:'15px'
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight:700,
                                    fontSize:'15px',
                                    marginBottom:'5px'
                                }}
                            >
                                비밀번호를 잊으셨나요?
                            </Text>
                            <Text>
                                비밀번호를 다시 설정하기 위해 가입 당시의 휴대폰 번호를 입력해 주세요.
                            </Text>
                        </View> */}
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingTop: "15px",
                      overflowY: "scroll",
                      backgroundColor: "transparent",
                      height: "150px",
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      본인인증
                    </Text>
                    <Text
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                      }}
                    >
                      휴대폰 번호로 전송된 인증번호를 입력해 주세요
                    </Text>
                    {/* <TextInput 
                                onChangeText={
                                text=>{
                                    props.setUserPhoneNumber(text)
                                    // props.onPhoneNumberChange()
                                }
                                }
                                style={{
                                    marginTop:'0px',
                                    border:"1px solid black",
                                    borderRadius:'0px',
                                }}
                                placeholder="'-' 없이 입력"
                                value={props.userPhoneNumber}
                            ></TextInput> */}
                    <CodeField
                      ref={ref}
                      {...codeFileProps}
                      value={pincodeValue}
                      onChangeText={setPincodeValue}
                      cellCount={6}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({ index, symbol, isFocused }) => (
                        <Text
                          key={index}
                          style={[styles.cell, isFocused && styles.focusCell]}
                          onLayout={getCellOnLayoutHandler(index)}
                        >
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      )}
                    />
                  </div>
                  <View
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      top: 0,
                      backgroundColor: "transparent",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        marginBottom: "5px",
                      }}
                    >
                      메시지를 못받았습니다
                    </Text>

                    <TouchableOpacity>
                      <Text
                        style={{
                          fontWeight: 700,
                          fontSize: "15px",
                          marginLeft: "5px",
                        }}
                        onPress={() => {
                          //setRegistrationScreen(1)
                          props.setRegistrationScreen(1);
                        }}
                      >
                        다시 받아보기
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <div
                    style={{
                      // display: emailLogIn ? 'none':'block',
                      borderTop: "1px solid rgb(221,221,221)",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        marginTop: "15px",
                        backgroundColor: "rgb(255,123,88)",
                        borderRadius: "10px",
                        height: "40px",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        // props.logInFunction(
                        //     {
                        //         mem_jointype:'MOBILE',
                        //         mem_password:props.password,
                        //         mem_token:null,
                        //         mem_mobile:props.userPhoneNumber
                        //     }
                        // )
                        // findPasswordFunction({
                        //     mem_mobile:props.userPhoneNumber
                        // })
                        console.log("'" + pincodeValue.toString() + "'");
                        // console.log(pincodeAnswer)
                        // var temp = pincodeAnswer.slice()
                        var temp = props.pincodeAnswer.slice();
                        if (pincodeValue.toString() != "") {
                          //console.log('in')
                          //if("'"+pincodeValue.toString()+"'"==pincodeAnswer){
                          if (
                            "'" + pincodeValue.toString() + "'" ==
                            props.pincodeAnswer
                          ) {
                            //console.log('next')
                            // setRegistrationScreen(3)
                            props.setRegistrationScreen(3);
                          } else {
                            setWrongPinCodeShow(true);
                          }
                        }
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        계속
                      </Text>
                    </TouchableOpacity>
                  </div>
                </View>
              </div>
            </div>
          </div>
        </div>
      );
    }
    //else if (registrationScreen==3){
    else if (props.registrationScreen == 3) {
      return (
        <div>
          <div
            style={{
              display: termsOfServicePopUpShow ? "block" : "none",
            }}
          >
            <TermsOfServicePopUp
              toggleTermsOfServicePopUpShow={toggleTermsOfServicePopUpShow}
            />
          </div>
          <div
            style={{
              display: privacyPolicyPopUpShow ? "block" : "none",
            }}
          >
            <PrivacyPolicyPopUp
              togglePrivacyPolicyPopUpShow={togglePrivacyPolicyPopUpShow}
            />
          </div>
          <div
            style={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "block",
              //   padding:'160px',
              zIndex: 101,
            }}
          >
            <div
              style={{
                paddingTop: "100px",
                // paddingLeft:'65px',
                // paddingRight:'65px'
              }}
            >
              <div
                style={{
                  textAlign: "left",
                  // margin:'25pt'
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  backgroundColor: "transparent",
                }}
              ></div>

              <div
                style={{
                  borderRadius: "10px",
                  backgroundColor: "white",
                  width: "500px",
                  height: "500px",
                  paddingTop: "15px",
                  // columnCount:3,
                  // flexwrap:'wrap',
                  // flexDirection:'column',
                  // display: 'grid',
                  // gridTemplateColumns: 'auto auto',
                  // // padding:'100px',
                  overflowY: "scroll",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    height: "498px",
                    width: "100%",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <View
                    style={{
                      position: "relative",
                      top: 0,
                      height: "30px",
                      width: "100%",
                      backgroundColor: "white",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      borderBottom: "1px solid rgb(221,221,221)",
                    }}
                  >
                    <div
                      style={{
                        height: "25px",
                        width: "25px",
                        backgroundColor: "transparent",
                        position: "relative",
                        top: "15px",
                        left: "15px",
                        zIndex: 102,
                      }}
                    >
                      {/* <TouchableOpacity
                    onPress={()=>{
                        setFindPassWord(false)
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

                    </TouchableOpacity> */}
                      <TouchableOpacity
                        onPress={() => {
                          //console.log('close project list')
                          setFindPassWord(false);
                          // setRegistrationScreen(0)
                          props.setRegistrationScreen(0);
                          props.setJoinType("MOBILE");
                          props.setSNSID(null);
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "transparent",
                            height: "25px",
                            width: "100%",
                            borderRadius: "10px",
                            // border:'2px solid black',
                            textAlign: "left",
                            justifyContent: "center",
                            lineHeight: "25px",
                            padding: "15px",
                            alignItems: "center",
                            transform: "translate(0px,-23px)",
                          }}
                        >
                          <Text
                            style={
                              {
                                // position:'fixed',
                                // right:'100px'
                              }
                            }
                          >
                            &lt;
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </div>
                    <Text
                      style={{
                        fontWeight: 700,
                        transform: "translate(0px,-23px)",
                      }}
                    >
                      회원가입
                    </Text>
                  </View>
                  {/* <View
                            style={{
                                textAlign:'left',
                                padding:'15px'
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight:700,
                                    fontSize:'15px',
                                    marginBottom:'5px'
                                }}
                            >
                                비밀번호를 잊으셨나요?
                            </Text>
                            <Text>
                                비밀번호를 다시 설정하기 위해 가입 당시의 휴대폰 번호를 입력해 주세요.
                            </Text>
                        </View> */}
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingTop: "15px",
                      overflowY: "scroll",
                      backgroundColor: "transparent",
                      height: "400px",
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                      }}
                    >
                      디자인 전문가 회원정보 입력
                    </Text>
                    <Text
                      style={{
                        fontSize: "15px",
                        marginTop: "5px",
                      }}
                    >
                      디자인 전문가 가입이 완료되면 겁색부터 샘플 주문까지 모두
                      무료로 사용이 가능합니다.클립에서는 보다 원활한 서비스
                      운영을 위해 신청해주신 분들 중 1)사업자등록증 + 명함 2)
                      홈페이지/블로그/인스타그램 등을 통해 포트폴리오 열람이
                      가능한 가입자에게 승인 처리해드리고 있습니다.
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: "5px",

                          lineHeight: "30px",
                        }}
                      >
                        이름
                      </Text>

                      <TextInput
                        onChangeText={(text) => {
                          props.setUserName(text);

                          // props.onPhoneNumberChange()
                        }}
                        style={{
                          marginTop: "5px",
                          border: "1px solid black",
                          // borderRadius:'10px',
                          marginBottom: "5px",
                          height: "30px",
                        }}
                        placeholder="실명"
                        value={props.userName}
                      ></TextInput>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: "5px",

                          lineHeight: "30px",
                        }}
                      >
                        이메일
                      </Text>
                      <TextInput
                        onChangeText={(text) => {
                          props.setUserEmail(text);

                          // props.onPhoneNumberChange()
                        }}
                        style={{
                          marginTop: "5px",
                          border: "1px solid black",
                          // borderRadius:'10px',
                          marginBottom: "5px",
                          height: "30px",
                        }}
                        placeholder="이메일 입력"
                        value={props.userEmail}
                      ></TextInput>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: "5px",

                          lineHeight: "30px",
                        }}
                      >
                        회사명
                      </Text>
                      <TextInput
                        onChangeText={(text) => {
                          props.setUserCompanyName(text);

                          // props.onPhoneNumberChange()
                        }}
                        style={{
                          marginTop: "5px",
                          border: "1px solid black",
                          // borderRadius:'10px',
                          marginBottom: "5px",
                          height: "30px",
                        }}
                        placeholder="회사명 입력"
                        value={props.userCompanyName}
                      ></TextInput>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: "5px",

                          lineHeight: "30px",
                        }}
                      >
                        회사 웹사이트 또는 블로그
                      </Text>
                      <TextInput
                        onChangeText={(text) => {
                          props.setUserCompanyWebSite(text);

                          // props.onPhoneNumberChange()
                        }}
                        style={{
                          marginTop: "5px",
                          border: "1px solid black",
                          // borderRadius:'10px',
                          marginBottom: "5px",
                          height: "30px",
                        }}
                        placeholder="회사 웹사이트 또는 블로그 주소 입력"
                        value={props.userCompanyWebSite}
                      ></TextInput>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: "5px",

                          lineHeight: "30px",
                        }}
                      >
                        비밀번호
                      </Text>
                      <div
                        style={{
                          border: "1px solid black",
                          borderRadius: "0px",
                          marginBottom: "15px",
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingRight: "8px",
                          height: "30px",
                        }}
                      >
                        <TextInput
                          onChangeText={(text) => {
                            props.setPassword(text);
                            // props.onPasswordChange()
                          }}
                          // onBlur={
                          //   onPasswordChange()
                          // }
                          style={{}}
                          placeholder="영문,숫자 포함 8-16자"
                          secureTextEntry={passwordVisible}
                          value={props.password}
                        ></TextInput>
                        <TouchableOpacity
                          onPress={() => {
                            togglePasswordVisible();
                          }}
                        >
                          <div
                            style={{
                              display: passwordVisible ? "none" : "block",
                            }}
                          >
                            <img
                              src={eyeIcon}
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: passwordVisible ? "block" : "none",
                            }}
                          >
                            <img
                              src={eyeSlashIcon}
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                            />
                          </div>
                        </TouchableOpacity>
                      </div>
                      {/* <TextInput 
                                onChangeText={
                                text=>{
                                    props.setPassword(text)

                                    // props.onPhoneNumberChange()
                                }
                                }
                                style={{
                                    marginTop:'5px',
                                    border:"1px solid black",
                                    // borderRadius:'10px',
                                    marginBottom:'5px',
                                    height:'30px',
                                }}
                                placeholder="영문,숫자 포함 8-16자"
                                value={props.password}
                            ></TextInput>
                            <TouchableOpacity
                                onPress={()=>{
                                    togglePasswordVisible()
                                }}
                            >
                                <div
                                    style={{
                                        display:passwordVisible?'none':'block'
                                    }}
                                >
                                    <img src={eyeIcon} 
                                    style={{
                                        height:'25px',
                                        width:'25px'
                                    }} />
                                </div>
                                <div
                                    style={{
                                        display:passwordVisible?'block':'none'
                                    }}
                                >
                                    <img src={eyeSlashIcon} 
                                    style={{
                                        height:'25px',
                                        width:'25px'
                                    }} />
                                </div>
                                
                                
                            </TouchableOpacity> */}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{
                          // marginTop:'5px',

                          lineHeight: "30px",
                        }}
                      >
                        비밀번호 확인
                      </Text>
                      <div
                        style={{
                          border: "1px solid black",
                          borderRadius: "0px",
                          marginBottom: "15px",
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingRight: "8px",
                          height: "30px",
                        }}
                      >
                        <TextInput
                          onChangeText={(text) => {
                            props.setPasswordCheck(text);
                            // props.onPasswordChange()
                          }}
                          // onBlur={
                          //   onPasswordChange()
                          // }
                          style={{}}
                          placeholder="영문,숫자 포함 8-16자"
                          secureTextEntry={passwordCheckVisible}
                          value={props.passwordCheck}
                        ></TextInput>

                        <TouchableOpacity
                          onPress={() => {
                            togglePasswordCheckVisible();
                          }}
                        >
                          <div
                            style={{
                              display: passwordCheckVisible ? "none" : "block",
                            }}
                          >
                            <img
                              src={eyeIcon}
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: passwordCheckVisible ? "block" : "none",
                            }}
                          >
                            <img
                              src={eyeSlashIcon}
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                            />
                          </div>
                        </TouchableOpacity>
                      </div>
                      {/* <Text>사업자등록증 및 명함 업로드</Text> */}
                      {/* <ImageUploader
                        withIcon={true}
                        buttonText="이미지 업로드"
                        onChange={onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                      /> */}
                      {/* <label>이미지 업로드</label> */}
                      {/* <input type="file" onChange={handleImagePreview} /> */}

                      {/* <input type="submit" onClick={handleSubmitFile} value="Submit"/> */}

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: 700,
                            marginBottom: "8px",
                            marginTop: "8px",
                          }}
                        >
                          약관동의
                        </Text>
                        <Text
                          style={{
                            color: "rgb(119,119,119)",
                            marginBottom: "8px",
                          }}
                        >
                          서비스 이용을 위해서 약관을 확인해 주세요.
                        </Text>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "8px",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              toggleTermsOfServicePopUpShow();
                            }}
                          >
                            <Text
                              style={{
                                textDecoration: "underline",
                              }}
                            >
                              서비스 이용 약관,
                            </Text>
                          </TouchableOpacity>
                          <Text>&nbsp;</Text>
                          <TouchableOpacity
                            onPress={() => {
                              togglePrivacyPolicyPopUpShow();
                            }}
                          >
                            <Text
                              style={{
                                textDecoration: "underline",
                              }}
                            >
                              개인정보 취급 방침
                            </Text>
                          </TouchableOpacity>
                          <Text>에 동의하시겠습니까?</Text>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            marginTop: "4px",
                            marginBottom: "8px",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{
                              width: "18px",
                              height: "18px",
                              marginRight: "8px",
                            }}
                            onChange={
                              (e) => checkboxClicked(e)
                              // categoryCheckboxClicked(index,e,category.code_name,category.code_text)
                            }
                          />
                          <Text
                            style={{
                              lineHeight: "18px",
                            }}
                          >
                            약관을 확인했으며, 동의합니다
                          </Text>
                        </div>
                      </div>
                    </div>
                    {/* <div
                                style={{
                                    display:'flex',
                                    flexDirection:'column'
                                }}
                            >
                            <Text
                                style={{
                                    marginTop:'5px',
                                    
                                    lineHeight:'30px'
                                }}
                            >
                                비밀번호 확인
                            </Text>
                            <TextInput 
                                onChangeText={
                                text=>{
                                    props.setPasswordCheck(text)

                                    // props.onPhoneNumberChange()
                                }
                                }
                                style={{
                                    marginTop:'5px',
                                    border:"1px solid black",
                                    // borderRadius:'10px',
                                    marginBottom:'5px',
                                    height:'30px',
                                }}
                                placeholder="영문,숫자 포함 8-16자"
                                value={props.passwordCheck}
                            ></TextInput>
                            </div> */}
                  </div>

                  <div
                    style={{
                      // display: emailLogIn ? 'none':'block',
                      borderTop: "1px solid rgb(221,221,221)",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        marginTop: "15px",
                        backgroundColor: membershipButtonDisabled
                          ? "rgb(170,170,170)"
                          : "rgb(255,123,88)",
                        borderRadius: "10px",
                        height: "40px",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                      disabled={membershipButtonDisabled}
                      onPress={() => {
                        // props.logInFunction(
                        //     {
                        //         mem_jointype:'MOBILE',
                        //         mem_password:props.password,
                        //         mem_token:null,
                        //         mem_mobile:props.userPhoneNumber
                        //     }
                        // )
                        // findPasswordFunction({
                        //     mem_mobile:props.userPhoneNumber
                        // })
                        // console.log("'"+pincodeValue.toString()+"'")
                        // console.log(pincodeAnswer)
                        // var temp = pincodeAnswer.slice()
                        // if(pincodeValue.toString()!=''){
                        //     console.log('in')
                        //     if("'"+pincodeValue.toString()+"'"==pincodeAnswer){
                        //         console.log('next')
                        //         setRegistrationScreen(3)
                        //     }
                        // }
                        var memberObj = {
                          mem_name: props.userName,
                          mem_email: props.userEmail,
                          mem_mobile: props.userPhoneNumber,
                          // mem_jointype:'MOBILE',
                          mem_jointype: props.joinType,
                          // mem_level:'NORMAL',
                          mem_level: "EXPERT",
                          mem_password: props.password,
                          mem_company_name: props.userCompanyName,
                          mem_company_url: props.userCompanyWebSite,
                          mem_snsid: props.SNSID,
                        };
                        if (props.SNSID == null) {
                          delete memberObj.mem_snsid;
                        }

                        memberRegistrationFunction(memberObj);
                        // setRegistrationScreen(1)
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        확인
                      </Text>
                    </TouchableOpacity>
                  </div>
                </View>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <div
          style={{
            display: noExistMemberShow ? "block" : "none",
          }}
        >
          <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
        </div>
        <div
          style={{
            display: sentMessageShow ? "block" : "none",
          }}
        >
          <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
        </div>
        <div
          style={{
            display: sentEmailShow ? "block" : "none",
          }}
        >
          <SentEmail
            secureEmailString={secureEmailString}
            toggleSentEmailShow={toggleSentEmailShow}
          />
        </div>
        <div
          style={{
            display: showRegistrationSuccessScreen ? "block" : "none",
          }}
        >
          <RegistrationSuccess
            toggleShowRegistrationSuccessScreen={
              toggleShowRegistrationSuccessScreen
            }
          />
        </div>
        <div
          style={{
            display: emailAlreadyExistsScreen ? "block" : "none",
          }}
        >
          <EmailAlreadyExists
            toggleEmailAlreadyExistsScreen={toggleEmailAlreadyExistsScreen}
          />
        </div>
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "block",
            //   padding:'160px',
            zIndex: 101,
          }}
        >
          <div
            style={{
              paddingTop: "100px",
              // paddingLeft:'65px',
              // paddingRight:'65px'
            }}
          >
            <div
              style={{
                textAlign: "left",
                // margin:'25pt'
                paddingLeft: "0px",
                paddingRight: "0px",
                backgroundColor: "transparent",
              }}
            ></div>

            <div
              style={{
                borderRadius: "10px",
                backgroundColor: "white",
                // width:'100%',
                width: "500px",
                height: emailLogIn ? "490px" : "475px",
                paddingTop: "15px",
                // columnCount:3,
                // flexwrap:'wrap',
                // flexDirection:'column',
                // display: 'grid',
                // gridTemplateColumns: 'auto auto',
                // // padding:'100px',
                overflowY: "scroll",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: emailLogIn ? "488px" : "473px",
                  width: "100%",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <View
                  style={{
                    position: "relative",
                    top: 0,
                    height: "30px",
                    width: "100%",
                    backgroundColor: "white",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottom: "1px solid rgb(221,221,221)",
                  }}
                >
                  <div
                    style={{
                      height: "25px",
                      width: "25px",
                      backgroundColor: "transparent",
                      position: "relative",
                      top: "15px",
                      left: "15px",
                      zIndex: 102,
                      transform: "translate(0px,-18px)",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        props.toggleLogInShow();
                      }}
                    >
                      <img
                        src={xIcon}
                        style={{
                          height: "25px",
                          width: "25px",
                        }}
                      ></img>
                    </TouchableOpacity>
                  </div>
                  <Text
                    style={{
                      fontWeight: 700,
                      transform: "translate(0px,-25px)",
                    }}
                  >
                    로그인
                  </Text>
                </View>

                <div
                  style={{
                    display: "block",
                    textAlign: "left",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingTop: "15px",
                    overflowY: "scroll",
                    backgroundColor: "white",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: emailLogIn ? "none" : "block",
                    }}
                  >
                    <Text>휴대폰번호</Text>

                    <TextInput
                      onChangeText={(text) => {
                        props.setUserPhoneNumber(text);
                        // props.onPhoneNumberChange()
                      }}
                      style={{
                        border: "1px solid black",
                        borderRadius: "0px",
                      }}
                      placeholder="'-' 없이 입력"
                      value={props.userPhoneNumber}
                    ></TextInput>
                  </div>
                  <div
                    style={{
                      display: emailLogIn ? "block" : "none",
                    }}
                  >
                    <Text>이메일 주소</Text>

                    <TextInput
                      onChangeText={(text) => {
                        props.setUserEmail(text);
                        // props.onPhoneNumberChange()
                      }}
                      style={{
                        border: "1px solid black",
                        borderRadius: "0px",
                      }}
                      placeholder="이메일 주소 입력"
                      value={props.userEmail}
                    ></TextInput>
                  </div>
                  <Text>비밀번호</Text>
                  <div
                    style={{
                      border: "1px solid black",
                      borderRadius: "0px",
                      marginBottom: "15px",
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingRight: "8px",
                    }}
                  >
                    <TextInput
                      onChangeText={(text) => {
                        props.setPassword(text);
                        // props.onPasswordChange()
                      }}
                      // onBlur={
                      //   onPasswordChange()
                      // }
                      style={{}}
                      placeholder="영문,숫자 포함 8-16자"
                      secureTextEntry={passwordVisible}
                      value={props.password}
                    ></TextInput>
                    <TouchableOpacity
                      onPress={() => {
                        togglePasswordVisible();
                      }}
                    >
                      <div
                        style={{
                          display: passwordVisible ? "none" : "block",
                        }}
                      >
                        <img
                          src={eyeIcon}
                          style={{
                            height: "25px",
                            width: "25px",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: passwordVisible ? "block" : "none",
                        }}
                      >
                        <img
                          src={eyeSlashIcon}
                          style={{
                            height: "25px",
                            width: "25px",
                          }}
                        />
                      </div>
                    </TouchableOpacity>
                  </div>
                  <TouchableOpacity
                    onPress={() => {
                      setFindPassWord(true);
                    }}
                  >
                    <Text>비밀번호를 잊으셨나요?</Text>
                  </TouchableOpacity>
                  <div
                    style={{
                      display: emailLogIn ? "block" : "none",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        console.log("Email find on");
                        setFindEmail(true);
                      }}
                    >
                      <Text>이메일 찾기</Text>
                    </TouchableOpacity>
                  </div>
                  <hr></hr>
                  <div
                    style={{
                      display: emailLogIn ? "none" : "block",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        height: "40px",
                        textAlign: "center",
                        justifyContent: "center",
                        marginBottom: "15px",
                      }}
                      onPress={() => {
                        toggleEmailLogIn();
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                        }}
                      >
                        이메일로 로그인
                      </Text>
                    </TouchableOpacity>
                  </div>
                  <div
                    style={{
                      display: emailLogIn ? "block" : "none",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        height: "40px",
                        textAlign: "center",
                        justifyContent: "center",
                        marginBottom: "15px",
                      }}
                      onPress={() => {
                        toggleEmailLogIn();
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                        }}
                      >
                        휴대폰 번호로 로그인
                      </Text>
                    </TouchableOpacity>
                  </div>
                  {/* <TouchableOpacity
                        style={{
                            border:"1px solid black",
                            borderRadius:"10px",
                            height:'40px',
                            textAlign:'center',
                            justifyContent:'center',
                            marginBottom:'15px'
                        }}
                        onPress={()=>{
                            
                        }}
                    >
                        <Text
                            style={{
                                color:'black'
                            }}
                        >
                            카카오로 시작하기
                        </Text>
                    </TouchableOpacity> */}
                  <TouchableOpacity>
                    <KakaoAuth
                      logInFunction={props.logInFunction}
                      setUserEmail={props.setUserEmail}
                      setSNSID={props.setSNSID}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      height: "40px",
                      textAlign: "center",
                      justifyContent: "center",
                      marginBottom: "15px",
                    }}
                    onPress={() => {}}
                  >
                    <Text
                      style={{
                        color: "black",
                      }}
                    >
                      Apple 계정으로 계속하기
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity>
                        <AppleAuth/>
                    </TouchableOpacity> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text>아직 회원이 아니신가요?</Text>
                    <TouchableOpacity
                      style={{
                        borderRadius: "10px",
                        height: "100%",
                        textAlign: "center",
                        justifyContent: "center",
                        marginRight: "15px",
                      }}
                      onPress={() => {
                        console.log("registration 1");

                        // setRegistrationScreen(1)
                        props.setRegistrationScreen(1);
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: "10px",
                          color: "black",
                          fontWeight: 700,
                          marginRight: "10px",
                        }}
                      >
                        회원가입
                      </Text>
                    </TouchableOpacity>
                  </div>
                </div>
                <div
                  style={{
                    display: emailLogIn ? "none" : "block",
                    borderTop: "1px solid rgb(221,221,221)",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginTop: "15px",
                      backgroundColor: "rgb(255,123,88)",
                      borderRadius: "10px",
                      height: "40px",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      props.logInFunction({
                        mem_jointype: "MOBILE",
                        mem_password: props.password,
                        mem_token: null,
                        mem_mobile: props.userPhoneNumber,
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      로그인
                    </Text>
                  </TouchableOpacity>
                </div>
                <div
                  style={{
                    display: emailLogIn ? "block" : "none",
                    borderTop: "1px solid rgb(221,221,221)",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginTop: "15px",
                      backgroundColor: "rgb(255,123,88)",
                      borderRadius: "10px",
                      height: "40px",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => {
                      props.logInFunction({
                        mem_jointype: "MOBILE",
                        mem_password: props.password,
                        mem_token: null,
                        mem_email: props.userEmail,
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                      }}
                    >
                      로그인
                    </Text>
                  </TouchableOpacity>
                </div>
              </View>
              {/* <Text>{props.material_num}</Text> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LogIn;
