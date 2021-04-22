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
import Font from "react-font";
import styled from "styled-components";
const queryString = require("query-string");

const ToggleDiv = styled.div`
  display: ${(props) => (props.toggle ? "block" : "none")};
`;

const ContainerOne = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  display: block;
  //   padding:'160px';
  z-index: 101;
`

const ContainerTwo = styled.div`
  padding-top: 100px;
`
const ContainerThree = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 500px;
  height: 300px;
  padding-top: 15px;
  overflow-y: hidden;
  margin-left: auto;
  margin-right: auto;
`
const ContainerFour = styled.div`
  background-color: white;
  height: 298px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow-y: hidden;
`
const ContainerFive = styled.div`
  position: relative;
  top: 0;
  height: 30px;
  width: 100%;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid rgb(221,221,221);
`


const ContainerSix = styled.div`
  height: 25px;
  width: 25px;
  background-color: transparent;
  position: relative;
  top: 15px;
  left: 15px;
  z-index: 102;
`

const ContainerSeven =styled.div`
  background-color: transparent;
  height: 25px;
  width: 100%;
  border-radius: 10px;
  text-align: left;
  justify-content: center;
  line-height: 25px;
  padding: 15px;
  align-items: center;
  transform: translate(0px,-34px);
`


const ContainerEight = styled.div`
  transform: translate(0px,-26px);
`

const TitleSpan = styled.span`
  font-weight: 700;
`
const ContainerNine = styled.div`
  text-align: left;
  padding: 15px;
  display: flex;
  flex-direction: column;
`
const SubTitleSpan = styled.span`
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 5px;
`
const ContainerTen = styled.div`
  display: block;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  overflow-y: scroll;
  background-color: white;
  height: 100%;
`



const Container11 = styled.div`
  position: relative;
  top: 0px;
  border-top: 1px solid rgb(221,221,221);
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  transform: translate(0px,-210px);
`

const Container12 = styled.div`
  margin-top: 15px;
  background-color: rgb(255,123,88);
  border-radius: 10px;
  height: 40px;
  text-align: center;
  justify-content: center;
`

const Container13 = styled.div`
  transform: translate(0px,10px);
`
const ButtonSpan = styled.span`
  color: white;          
`
const Container14 = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 500px;
  height: 265px;
  padding-top: 15px;
  overflow-y: hidden;
  margin-left: auto;
  margin-right: auto;
`
const Container15 =styled.div`
  background-color: white;
  height: 248px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const Container16 = styled.div`
  position: relative;
  top: 0;
  height: 30px;
  width: 100%;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid rgb(221,221,221);
`

const Container17 = styled.div`
  height: 25px;
  width: 25px;
  background-color: transparent;
  position: relative;
  top: 15px;
  left: 15px;
  z-index: 102;
`
const Container18 = styled.div`
  background-color: transparent;
  height: 25px;
  width: 100%;
  border-radius: 10px;
  text-align: left;
  justify-content: center;
  line-height: 25px;
  padding: 15px;
  align-items: center;
  transform: translate(0px,-30px);
`
const Container19 = styled.div`
  transform: translate(0px,-23px);
`
const Container20 = styled.div`
  border-top: 1px solid rgb(221,221,221);
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  transform:translate(0px,-160px);
`

const Container21 = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 500px;
  height: 260px;
  padding-top: 15px;
  overflow-y: hidden;
  margin-left: auto;
  margin-right: auto;
`
const Container22 = styled.div`
  background-color: white;
  height: 258px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const Container23 = styled.div`
  cursor: pointer;
`
const Container24 = styled.div`
  display: block;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  overflow-y: scroll;
  background-color: transparent;
  height: 80px;
`
const Container25 = styled.div`
  text-align: left;
  padding: 15px;
  top: 0;
  background-color: transparent;
  display: flex;
  flex-direction: row;
`
const MiscSpanOne = styled.span`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 5px;
`
const MiscSpanTwo = styled.span`
  font-weight: 700;
  font-size: 15px;
  margin-left: 5px;
`
const Container26=styled.div`
  border-top: 1px solid rgb(221,221,221);
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`
const Container27 = styled.div`
  margin-top: 15px;
  background-color: rgb(255,123,88);
  border-radius: 10px;
  height: 40px;
  text-align: center;
  justify-content: center;
  line-height: 40px;
  cursor: pointer;
`
const Container28 = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 500px;
  height: 300px;
  padding-top: 15px;
  overflow-y: hidden;
  margin-left: auto;
  margin-right: auto;
`
const Container29 = styled.div`
  background-color: white;
  height: 298px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const Container30 = styled.div`
  height: 25px;
  width: 25px;
  background-color: transparent;
  position: relative;
  top: 15px;
  left: 15px;
  z-index: 102;
  transform: translate(0px,-20px);
`
const Container31 = styled.div`
  background-color: transparent;
  height: 25px;
  width: 100%;
  border-radius: 10px;
  // border:'2px solid black';
  text-align: left;
  justify-content: center;
  line-height: 25px;
  padding: 15px;
  align-items: center;
  transform: translate(0px,-14px);
`
const Container32 = styled.div`
  transform: translate(0px,-28px);
`
const TitleSpan2 = styled.span`
  font-weight: 700;
  transform: translate(0px,-23px);
`
const Container33 = styled.div`
  display: flex;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  overflow-y: scroll;
  background-color: transparent;
  height: 150px;
  flex-direction: column;
`
const Container34 = styled.div`
  font-size: 18px;
  font-weight: 700;
`
const Container35 = styled.div`
  font-size: 15px;
  margin-top: 5px;
`
const Container36 = styled.div`
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  top: 0;
  background-color: transparent;
  display: flex;
  flex-direction: row;
`
const Container37 = styled.div`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 5px;
`
const Container38 = styled.div`
  font-weight: 700;
  font-size: 15px;
  margin-left: 5px;
  margin-bottom:5px;
`
const Container39 = styled.div`
  border-top: 1px solid rgb(221,221,221);
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`
const Container40 = styled.div`
  margin-top: 15px;
  background-color: rgb(255,123,88);
  border-radius: 10px;
  height: 40px;
  text-align: center;
  justify-content: center;
`
const Container41 = styled.div`
  transform: translate(0px,6px);
`
const Container42 = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 500px;
  height: 520px;
  padding-top: 15px;
  overflow-y: scroll;
  margin-left: auto;
  margin-right: auto;
`
const Container43 = styled.div`
  background-color: white;
  height: 498px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const Container44 = styled.div`
  transform: translate(0px,-30px);
`
const Container45 = styled.div`
  display: flex;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  overflow-y: scroll;
  background-color: transparent;
  height: 400px;
  flex-direction: column;
`
const Container46 = styled.div`
  font-size: 15px;
  margin-top: 5px;
` 
const Container47 = styled.div`
  display: flex;
  flex-direction: column;
`
const Container48 = styled.div`
  margin-top: 5px;
  line-height: 30px;
`
const Container49 = styled.div`
  border: 1px solid black;
  border-radius: 0px;
  margin-bottom: 15px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  height: 30px;
`

const Container50 = styled.div`
  display: ${(props)=>props.toggle?"none" : "block"};
`
const Img = styled.img`
  height: 25px;
  width: 25px;
`
const Container51 = styled.div`
  display: ${(props)=>props.toggle?"block" : "none"};
`
const Container52 = styled.div`
  line-height: 30px;
`
const Container53 = styled.div`
  font-weight: 700;
  margin-bottom: 8px;
  margin-top: 8px;
`
const Container54 = styled.div`
  color: rgb(119,119,119);
  margin-bottom: 8px;
`
const Container55 = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`
const Container56 = styled.div`
  text-decoration: underline;
`
const Container57 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 4px;
  margin-bottom: 8px;
`
const CheckBox1 = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`
const Container58 = styled.div`
  line-height: 18px;
`
const Container59 = styled.div`
  border-top: 1px solid rgb(221,221,221);
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`
const Container60 = styled.div`
  margin-top: 15px;
  background-color: ${(props)=>props.toggle ? "rgb(170,170,170)": "rgb(255,123,88)"};
  border-radius: 10px;
  height: 40px;
  text-align: center;
  justify-content: center;
  pointer-events: ${(props)=>props.toggle ? "none"  : "auto"};
  cursor: pointer;
`
const Container61 = styled.div`
  transform: translate(0px,6px);
`
const Container62 = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 500px;
  height: ${(props)=>props.toggle ? "520px" : "500px"};
  padding-top: 15px;
  overflow-y: hidden;
  margin-left: auto;
  margin-right: auto;
`
const Container63 = styled.div`
  background-color: white;
  height: ${(props)=>props.toggle ? "415px" : "390px"};
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const Container64 = styled.div`
  position: relative;
  top: 0;
  height: 30px;
  width: 100%;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid rgb(221,221,221);
`
const Container65 = styled.div`
  height: 25px;
  width: 25px;
  background-color: transparent;
  position: relative;
  top: 15px;
  left: 15px;
  z-index: 102;
  transform: translate(0px,-18px);
`
const Container66 = styled.div`
  transform: translate(0px,-25px);
`
const Container67 = styled.div`
  display: block;
  text-align: left;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  overflow-y: scroll;
  background-color: white;
  height: 100%;
`
const Container68 = styled.div`
  font-size: 14px;
`
const Container69 = styled.div`
  border: 1px solid black;
  border-radius: 0px;
  margin-bottom: 15px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
`
const Container70 = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  height: 40px;
  text-align: center;
  justify-content: center;
  margin-bottom: 15px;
  cursor: pointer;
`

const Container71 = styled.div`
  color: black;
  font-size: 14px;
  transform: translate(0px,3px);
`
const Container72 = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  height: 40px;
  text-align: center;
  justify-content: center;
  margin-bottom: 15px;
  cursor: pointer;
  line-height: 40px;
`
const Container73 = styled.div`
  color: black;
  font-size: 14px;
  transform:translate(0px,-1px);
`
const Container74 = styled.div`
  color: black;
  font-size: 14px;
`
const Container75 = styled.div`
  display: flex;
  flex-direction: row;
`
const Container76 = styled.div`
  border-radius: 10px;
  height: 100%;
  text-align: center;
  justify-content: center;
  margin-right: 15px;
  cursor: pointer;
`
const Containter77 = styled.div`
  margin-left: 10px;
  color: black;
  font-weight: 700;
  margin-right: 10px;
  font-size: 14px;
  transform:translate(0px,2px);
`
const Container78 = styled.div`
  display: ${(props)=>props.toggle ? "none" : "block"};
  border-top: 1px solid rgb(221,221,221);
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`
const Container79 =styled.div`
  margin-top: 15px;
  background-color: rgb(255,123,88);
  border-radius: 10px;
  height: 40px;
  text-align: center;
  justify-content: center;
  line-height: 40px;
  cursor: pointer;
`

const Container80 = styled.div`
  color: white;
  font-size: 14px;
`
const Container81 = styled.div`
  display:${(props)=>props.toggle ? "block" : "none"};
  border-top: 1px solid rgb(221,221,221);
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`
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
  const handleSubmitFile = (e) => {
    // let formData = new FormData()
    // formData.append('customFile',this.state.)
    fetch("/Picture?" + queryString.stringify(imageFile))
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            "mem_company_img[]": [imageFile],
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
        <ToggleDiv toggle={noExistMemberShow}>
          <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
        </ToggleDiv>

        <ToggleDiv toggle={sentMessageShow}>
          <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
        </ToggleDiv>

        <ContainerOne>
          <ContainerTwo>


            <ContainerThree>
              <ContainerFour>
                <ContainerFive>
                  <ContainerSix>
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
                    <div
                      onClick={() => {
                        //console.log('close project list')
                        setFindPassWord(false);
                      }}
                    >
                      <ContainerSeven>
                        <span>
                          &lt;
                        </span>
                      </ContainerSeven>
                    </div>
                  </ContainerSix>
                  <ContainerEight>
                    <TitleSpan>
                      비밀번호 찾기
                    </TitleSpan>
                  </ContainerEight>
                </ContainerFive>
                <ContainerNine>
                  <SubTitleSpan>
                    비밀번호를 잊으셨나요?
                  </SubTitleSpan>
                  <span>
                    비밀번호를 다시 설정하기 위해 가입 당시의 휴대폰 번호를
                    입력해 주세요.
                  </span>
                </ContainerNine>
                <ContainerTen>
                  <span>휴대폰번호</span>

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
                </ContainerTen>
                <Container11>
                  <Container12
                    onClick={() => {
                      findPasswordFunction({
                        mem_mobile: props.userPhoneNumber,
                      });
                    }}
                  >
                    <Container13
                    >
                      <ButtonSpan>
                        확인
                      </ButtonSpan>
                    </Container13>
                  </Container12>
                </Container11>
              </ContainerFour>
            </ContainerThree>
          </ContainerTwo>
        </ContainerOne>
      </div>
    );
  } else if (findEmail) {
    return (
      <div>
        <ToggleDiv toggle={noExistMemberShow}>
          <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
        </ToggleDiv>
        <ToggleDiv toggle={sentMessageShow}>
          <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
        </ToggleDiv>
        <ContainerOne>
          <ContainerTwo>
            <Container14>
              <Container15>
                <Container16>
                  <Container17>
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
                    <div
                      onClick={() => {
                        //console.log('close project list')
                        setFindEmail(false);
                      }}
                    >
                      <Container18>
                        <span
                          style={
                            {
                              // position:'fixed',
                              // right:'100px'
                            }
                          }
                        >
                          &lt;
                        </span>
                      </Container18>
                    </div>
                  </Container17>
                  <Container19>
                  <TitleSpan>
                    이메일 찾기
                  </TitleSpan>
                  </Container19>
                </Container16>
                <ContainerNine>
                  {/* <Text
                            style={{
                                fontWeight:700,
                                fontSize:'15px',
                                marginBottom:'5px'
                            }}
                        >
                            비밀번호를 잊으셨나요?
                        </Text> */}
                  <span>
                    이메일을 찾기 위해서 가입 당시의 휴대폰 번호를 입력해
                    주세요.
                  </span>
                </ContainerNine>
                <ContainerTen>
                  <span>휴대폰 번호</span>

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
                </ContainerTen>
                <Container20>
                  <Container12
                    onClick={() => {
                      findEmailFunction({
                        mem_mobile: props.userPhoneNumber,
                      });
                    }}
                  >
                    <Container13>
                    <ButtonSpan>
                      확인
                    </ButtonSpan>
                    </Container13>
                  </Container12>
                </Container20>
              </Container15>
            </Container14>
          </ContainerTwo>
        </ContainerOne>
      </div>
    );
  }
  // else if(registrationScreen!=0){
  //     if(registrationScreen==1){
  else if (props.registrationScreen != 0) {
    if (props.registrationScreen == 1) {
      return (
        <Font family="Noto Sans KR">
          <div>

            <ToggleDiv toggle={noExistMemberShow}>
              <NoExistMember
                toggleNoExistMemberShow={toggleNoExistMemberShow}
              />
            </ToggleDiv>
            <ToggleDiv toggle={sentMessageShow}>
              <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
            
            </ToggleDiv>
            <ToggleDiv toggle={alreadyMemberMessageShow}> 
              <AlreadyMemberMessage
                toggleAlreadyMemberMessageShow={toggleAlreadyMemberMessageShow}
              />
            </ToggleDiv>

            <ContainerOne>
              <ContainerTwo>
                <Container21>
                  <Container22>
                    <ContainerFive>
                      <ContainerSix>
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
                        <Container23
                          onClick={() => {
                            //console.log('close project list')
                            setFindPassWord(false);
                            // setRegistrationScreen(0)
                            props.setRegistrationScreen(0);
                            props.setJoinType("MOBILE");
                            props.setSNSID(null);
                          }}
                        >
                          <ContainerSeven>
                            <span
                              style={
                                {
                                  // position:'fixed',
                                  // right:'100px'
                                }
                              }
                            >
                              &lt;
                            </span>
                          </ContainerSeven>
                        </Container23>
                      </ContainerSix>
                      <ContainerEight>
                        <TitleSpan>
                          회원가입
                        </TitleSpan>
                      </ContainerEight>
                    </ContainerFive>
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
                    <Container24>
                      <SubTitleSpan>
                        휴대폰번호
                      </SubTitleSpan>
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
                    </Container24>
                    <Container25>
                      <MiscSpanOne>
                        이미 계정을 보유하고 계시나요?
                      </MiscSpanOne>

                      <Container23
                        onClick={() => {
                          // setRegistrationScreen(0)
                          props.setRegistrationScreen(0);
                          props.setJoinType("MOBILE");
                          props.setSNSID(null);
                        }}

                      >
                        <MiscSpanTwo
                        >
                          로그인
                        </MiscSpanTwo>
                      </Container23>
                    </Container25>
                    <Container26>
                      <Container27
                        onClick={() => {
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
                        <ButtonSpan
                        >
                          계속
                        </ButtonSpan>
                      </Container27>
                    </Container26>
                  </Container22>
                </Container21>
              </ContainerTwo>
            </ContainerOne>
          </div>
        </Font>
      );
    }
    // else if(registrationScreen==2){
    else if (props.registrationScreen == 2) {
      return (
        <Font family="Noto Sans KR">
          <div>

            <ToggleDiv toggle={wrongPinCodeShow}>
              <WrongPinCode toggleWrongPinCodeShow={toggleWrongPinCodeShow} />
            </ToggleDiv>

           
            <ToggleDiv toggle={sentMessageShow}>
              <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
            </ToggleDiv>
            
            <ContainerOne>
              <ContainerTwo>
                <Container28>
                  <Container29>
                    <ContainerFive>
                      <Container30>
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
                        <Container23
                          onClick={() => {
                            //console.log('close project list')
                            setFindPassWord(false);
                            //setRegistrationScreen(0)
                            props.setRegistrationScreen(0);
                            props.setJoinType("MOBILE");
                            props.setSNSID(null);
                          }}
                        >
                          <Container31>
                            <span>
                              &lt;
                            </span>
                          </Container31>
                        </Container23>
                      </Container30>
                      <Container32>
                        <TitleSpan2>
                          회원가입
                        </TitleSpan2>
                      </Container32>
                    </ContainerFive>
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
                    <Container33>
                      <Container34>
                        본인인증
                      </Container34>
                      <Container35>
                        휴대폰 번호로 전송된 인증번호를 입력해 주세요
                      </Container35>
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
                    </Container33>
                    <Container36>
                      <Container37>
                        메시지를 못받았습니다
                      </Container37>

                      <div
                        onClick={() => {
                          //setRegistrationScreen(1)
                          props.setRegistrationScreen(1);
                        }}
                      >
                        <Container38>
                          다시 받아보기
                        </Container38>
                      </div>
                    </Container36>
                    <Container39>
                      <Container40
                        onClick={() => {
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
                        <Container41>
                          <ButtonSpan>
                            계속
                          </ButtonSpan>
                        </Container41>
                      </Container40>
                    </Container39>
                  </Container29>
                </Container28>
              </ContainerTwo>
            </ContainerOne>
          </div>
        </Font>
      );
    }
    //else if (registrationScreen==3){
    else if (props.registrationScreen == 3) {
      return (
        <Font family="Noto Sans KR">
          <div>

            <ToggleDiv toggle={termsOfServicePopUpShow}>
              <TermsOfServicePopUp
                toggleTermsOfServicePopUpShow={toggleTermsOfServicePopUpShow}
              />
            </ToggleDiv>

            <ToggleDiv toggle={privacyPolicyPopUpShow}>
              <PrivacyPolicyPopUp
                togglePrivacyPolicyPopUpShow={togglePrivacyPolicyPopUpShow}
              />
            </ToggleDiv>
            <ContainerOne>
              <ContainerTwo
                style={{
                  paddingTop: "100px",
                  // paddingLeft:'65px',
                  // paddingRight:'65px'
                }}
              >

                <Container42>
                  <Container43>
                    <ContainerFive>
                      <ContainerSix>
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
                        <div
                          onClick={() => {
                            //console.log('close project list')
                            setFindPassWord(false);
                            // setRegistrationScreen(0)
                            props.setRegistrationScreen(0);
                            props.setJoinType("MOBILE");
                            props.setSNSID(null);
                          }}
                        >
                          <ContainerSeven>
                            <span>
                              &lt;
                            </span>
                          </ContainerSeven>
                        </div>
                      </ContainerSix>
                      <Container44>
                        <TitleSpan>
                          회원가입
                        </TitleSpan>
                      </Container44>
                    </ContainerFive>
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
                    <Container45>
                      <Container34>
                        디자인 전문가 회원정보 입력
                      </Container34>
                      <Container46>
                        디자인 전문가 가입이 완료되면 겁색부터 샘플 주문까지
                        모두 무료로 사용이 가능합니다.클립에서는 보다 원활한
                        서비스 운영을 위해 신청해주신 분들 중 1)사업자등록증 +
                        명함 2) 홈페이지/블로그/인스타그램 등을 통해 포트폴리오
                        열람이 가능한 가입자에게 승인 처리해드리고 있습니다.
                      </Container46>
                      <Container47>
                        <Container48>
                          이름
                        </Container48>

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
                      </Container47>
                      <Container47>
                        <Container48>
                          이메일
                        </Container48>
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
                      </Container47>
                      <Container47>
                        <Container48>
                          회사명
                        </Container48>
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
                      </Container47>
                      <Container47>
                        <Container48>
                          회사 웹사이트 또는 블로그
                        </Container48>
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
                      </Container47>
                      <Container47
                      >
                        <Container48>
                          비밀번호
                        </Container48>
                        <Container49>
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
                          <div
                            onClick={() => {
                              togglePasswordVisible();
                            }}
                          >
                            
                            <Container50 toggle={passwordVisible}>
                              <Img src={eyeIcon}/>
                            </Container50>
                            
                            <Container51 toggle={passwordVisible}>
                              <Img src={eyeSlashIcon}/>
                            </Container51>
                          </div>
                        </Container49>
                      </Container47>
                      <Container47>
                        <Container52>
                          비밀번호 확인
                        </Container52>
                        <Container49>
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

                          <div
                            onClick={() => {
                              togglePasswordCheckVisible();
                            }}
                          >
                            <Container50 toggle={passwordCheckVisible}>
                              <Img src={eyeIcon}/>
                            </Container50>
                            <Container51 toggle={passwordCheckVisible}>
                              <Img src={eyeSlashIcon}/>
                            </Container51>
                          </div>
                        </Container49>
                        <span>사업자등록증 및 명함 업로드</span>
                        {/* <ImageUploader
                        withIcon={true}
                        buttonText="이미지 업로드"
                        onChange={onDrop}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                      /> */}
                        {/* <label>이미지 업로드</label> */}
                        <input type="file" onChange={handleImagePreview} />

                        {/* <input type="submit" onClick={handleSubmitFile} value="Submit"/> */}

                        <Container47>
                          <Container53>
                            약관동의
                          </Container53>
                          <Container54>
                            서비스 이용을 위해서 약관을 확인해 주세요.
                          </Container54>
                          <Container55>
                            <div
                              onClick={() => {
                                toggleTermsOfServicePopUpShow();
                              }}
                            >
                              <Container56>
                                서비스 이용 약관,
                              </Container56>
                            </div>
                            <span>&nbsp;</span>
                            <div
                              onClick={() => {
                                togglePrivacyPolicyPopUpShow();
                              }}
                            >
                              <Container56>
                                개인정보 취급 방침
                              </Container56>
                            </div>
                            <span>에 동의하시겠습니까?</span>
                          </Container55>
                          <Container57>
                            <CheckBox1
                              type="checkbox"
                              onChange={
                                (e) => checkboxClicked(e)
                                // categoryCheckboxClicked(index,e,category.code_name,category.code_text)
                              }
                            />
                            <Container58>
                              약관을 확인했으며, 동의합니다
                            </Container58>
                          </Container57>
                        </Container47>
                      </Container47>
                    </Container45>
                    <Container59>
                      <Container60
                        toggle={membershipButtonDisabled}
                        disabled={membershipButtonDisabled}
                        onClick={() => {

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
                        <Container61>
                          <ButtonSpan>
                            확인
                          </ButtonSpan>
                        </Container61>
                      </Container60>
                    </Container59>
                  </Container43>
                </Container42>
              </ContainerTwo>
            </ContainerOne>
          </div>
        </Font>
      );
    }
  } else {
    return (
      <Font family="Noto Sans KR">
        <div>

          <ToggleDiv toggle={noExistMemberShow}>
            <NoExistMember toggleNoExistMemberShow={toggleNoExistMemberShow} />
          </ToggleDiv>


          <ToggleDiv toggle={sentMessageShow}>
            <SentMessage toggleSentMessageShow={toggleSentMessageShow} />
          </ToggleDiv>

          <ToggleDiv toggle={sentEmailShow}>
            <SentEmail
              secureEmailString={secureEmailString}
              toggleSentEmailShow={toggleSentEmailShow}
            />
          </ToggleDiv>

          <ToggleDiv toggle={showRegistrationSuccessScreen}>
            <RegistrationSuccess
              toggleShowRegistrationSuccessScreen={
                toggleShowRegistrationSuccessScreen
              }
            />
          </ToggleDiv>


          <ToggleDiv toggle={emailAlreadyExistsScreen}>
            <EmailAlreadyExists
              toggleEmailAlreadyExistsScreen={toggleEmailAlreadyExistsScreen}
            />
          </ToggleDiv>
          <ContainerOne>
            <ContainerTwo>

              <Container62 toggle={emailLogIn}>
                <Container63 toggle={emailLogIn}>
                  <Container64>
                    <Container65>
                      <div
                        // onPress={() => {
                        //   props.toggleLogInShow();
                        // }}
                        onClick={() => {
                          props.toggleLogInShow();
                        }}
                      >
                        <Img
                          src={xIcon}
                        />
                      </div>
                    </Container65>
                    <Container66>
                      <TitleSpan>
                        로그인
                      </TitleSpan>
                    </Container66>
                  </Container64>

                  <Container67>
                    <Container50
                      toggle={emailLogIn}
                    >
                      <Container47>
                        <Container68>
                          휴대폰번호
                        </Container68>

                        <TextInput
                          onChangeText={(text) => {
                            props.setUserPhoneNumber(text);
                            // props.onPhoneNumberChange()
                          }}
                          style={{
                            border: "1px solid black",
                            borderRadius: "0px",
                            resize: "none",
                          }}
                          placeholder="'-' 없이 입력"
                          value={props.userPhoneNumber}
                        ></TextInput>
                      </Container47>
                    </Container50>
                    <Container51
                      toggle={emailLogIn}
                    >
                      <Container47>
                        <Container68>
                          이메일 주소
                        </Container68>

                        <TextInput
                          onChangeText={(text) => {
                            props.setUserEmail(text);
                            // props.onPhoneNumberChange()
                          }}
                          style={{
                            border: "1px solid black",
                            borderRadius: "0px",
                            resize: "none",
                          }}
                          placeholder="이메일 주소 입력"
                          value={props.userEmail}
                        ></TextInput>
                      </Container47>
                    </Container51>
                    <Container68>
                      비밀번호
                    </Container68>
                    <Container69>
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
                      <div
                        onClick={() => {
                          togglePasswordVisible();
                        }}
                      >
                        <Container50
                          toggle={passwordVisible}
                        >
                          <Img src={eyeIcon}/>
                        </Container50>
                        <Container51
                          toggle={passwordVisible}
                        >
                          <Img src={eyeSlashIcon} />
                        </Container51>
                      </div>
                    </Container69>
                    <Container23
                      onClick={() => {
                        setFindPassWord(true);
                      }}
                    >
                      <Container68>
                        비밀번호를 잊으셨나요?
                      </Container68>
                    </Container23>
                    <Container51
                      toggle={emailLogIn}
                    >
                      <Container23
                        onClick={() => {
                          console.log("Email find on");
                          setFindEmail(true);
                        }}
                      >
                        <Container68>
                          이메일 찾기
                        </Container68>
                      </Container23>
                    </Container51>
                    <hr></hr>
                    <Container50
                      toggle={emailLogIn}
                    >
                      <Container70
                        onClick={() => {
                          toggleEmailLogIn();
                        }}
                      >
                        <Container41>
                          <Container71>
                            이메일로 로그인
                          </Container71>
                        </Container41>
                      </Container70>
                    </Container50>
                    <Container51
                      toggle={emailLogIn}
                    >
                      <Container72
                        onClick={() => {
                          toggleEmailLogIn();
                        }}
                      >
                        <Container73>
                          휴대폰 번호로 로그인
                        </Container73>
                      </Container72>
                    </Container51>
                    <div>
                      <KakaoAuth
                        logInFunction={props.logInFunction}
                        setUserEmail={props.setUserEmail}
                        setSNSID={props.setSNSID}
                      />
                    </div>
                    <Container72
                      onClick={() => {}}
                    >
                      <Container74>
                        Apple 계정으로 계속하기
                      </Container74>
                    </Container72>
                    <Container75>
                      <span>아직 회원이 아니신가요?</span>
                      <Container76
                        onClick={() => {
                          console.log("registration 1");
                          props.setRegistrationScreen(1);
                        }}
                      >
                        <Containter77>
                          회원가입
                        </Containter77>
                      </Container76>
                    </Container75>
                  </Container67>
                  <Container78
                    toggle={emailLogIn}
                  >
                    <Container79
                      onClick={() => {
                        props.logInFunction({
                          mem_jointype: "MOBILE",
                          mem_password: props.password,
                          mem_token: null,
                          mem_mobile: props.userPhoneNumber,
                        });
                      }}
                    >
                      <Container80>
                        로그인
                      </Container80>
                    </Container79>
                  </Container78>
                  <Container81
                    toggle={emailLogIn}
                  >
                    <Container79
                      onClick={() => {
                        props.logInFunction({
                          mem_jointype: "MOBILE",
                          mem_password: props.password,
                          mem_token: null,
                          mem_email: props.userEmail,
                        });
                      }}
                    >
                      <Container80>
                        로그인
                      </Container80>
                    </Container79>
                  </Container81>
                </Container63>
                {/* <Text>{props.material_num}</Text> */}
              </Container62>
            </ContainerTwo>
          </ContainerOne>
        </div>
      </Font>
    );
  }
}
export default LogIn;
