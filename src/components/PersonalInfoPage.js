import React, { useEffect } from "react";
// import "./mypage.css";
import Navbar from "./Navbar";
import Content from "./Content";
import NavBarFiller from "./NavBarFiller";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  TouchableHighlight,
  Linking,
  Dimensions,
  TextInput,
} from "react-native";
import Font from "react-font";
// import "./PersonalInfoPage.css";
const queryString = require("query-string");

function PersonalInfoPage(props) {
  const [data, setData] = React.useState({});
  const [catQ, setCatQ] = React.useState({ cat_num: null });
  const [height, setHeight] = React.useState(Dimensions.get("window").height);
  const [width, setWidth] = React.useState(Dimensions.get("window").width);
  const [memno, setMemno] = React.useState(null);
  const [memberDetail, setMemberDetail] = React.useState(null);
  //const [mainWidth,setMainWidth]=React.useState(0);
  const onChange = () => {
    setHeight(Dimensions.get("window").height);
    setWidth(Dimensions.get("window").width);
    // console.log(height+" : "+width)
  };
  const getMemberDetail = (jsonObj) => {
    console.log(jsonObj);
    fetch(
      "/MemberDetail?" +
        queryString.stringify({
          ...jsonObj,
        })
    )
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
        setMemberDetail(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    const parsed = queryString.parse(props.location.search);
    var mem_no = undefined;

    if (localStorage.login != undefined) {
      if (JSON.parse(localStorage.login).result == "SUCCESS") {
        mem_no = JSON.parse(localStorage.login).message.split("_")[0];
        parsed.mem_no = mem_no;
        setMemno(mem_no);
        getMemberDetail({ mem_no: mem_no });
      } else {
        parsed.mem_no = "";
      }
    } else {
      parsed.mem_no = "";
    }
  }, []);
  if (memberDetail != null) {
    return (
      <Font family="Noto Sans KR">
        <div className="mypage">
          <Navbar />
          <NavBarFiller />
          <div
            style={{
              // margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "240px " + (width - 240) + "px",
              gridGap: "1px",
              backgroundColor: "black",
              height: "100%",
              width: "100%",
            }}
          >
            <div>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: "50px",
                    width: "240px",
                    paddingLeft: "0px",
                    lineHeight: "50px",
                    backgroundColor: "white",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      marginLeft: "1px",
                      width: "2px",
                      height: "100%",
                      backgroundColor: "black",
                    }}
                  ></div>
                  <div
                    style={{
                      paddingLeft: "30px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      개인정보
                    </span>
                  </div>
                </div>

                <TouchableOpacity
                  style={{
                    height: "50px",
                    width: "240px",
                    paddingLeft: "30px",
                    lineHeight: "50px",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                  onPress={() => {
                    Linking.openURL("/alarmsettings");
                  }}
                >
                  <span>알림설정</span>
                </TouchableOpacity>
                <div
                  style={{
                    height: "50px",
                    width: "240px",
                    paddingLeft: "30px",
                    lineHeight: "50px",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <span>디자인 전문가 계정 신청</span>
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "240px",
                    paddingLeft: "30px",
                    lineHeight: "50px",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <span>사용방법</span>
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "240px",
                    paddingLeft: "30px",
                    lineHeight: "50px",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <span>자주 묻는 질문</span>
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "240px",
                    paddingLeft: "30px",
                    lineHeight: "50px",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <span>이용약관</span>
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "240px",
                    paddingLeft: "30px",
                    lineHeight: "50px",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <span>개인정보 처리방침</span>
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "240px",
                    paddingLeft: "30px",
                    lineHeight: "50px",
                    backgroundColor: "white",
                    textAlign: "left",
                  }}
                >
                  <span>로그아웃</span>
                </div>
              </div>
            </div>
            <div>
              <div
                className="main"
                style={{
                  height: height - 100 + "px",
                  width: width - 240 + "px",
                  backgroundColor: "white",
                  overflowY: "scroll",
                }}
              >
                {/* <div
                style={{
                  height: "1000px",
                  width: width - 255 + "px",
                  backgroundColor: "yellow",
                }}
              ></div> */}
                <div
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span>개인정보 수정</span>
                  <br></br>
                  <span>기본정보</span>
                  <div
                    style={{
                      display: "grid",
                      flexDirection: "row",
                      gridTemplateColumns: "150px " + (width - 420) + "px",
                      textAlign: "right",
                      lineheight: "30px",
                      height: "30px",
                    }}
                  >
                    <div
                      style={{
                        height: "30px",
                        backgroundColor: "transparent",
                        paddingRight: "30px",
                      }}
                    >
                      <span>이름</span>
                    </div>
                    <div
                      style={{
                        transform: "translate(0px,-10px)",
                      }}
                    >
                      <TextInput
                        onChangeText={(text) => {
                          // props.setUserPhoneNumber(text);
                          // props.onPhoneNumberChange()
                          var temp = { ...memberDetail };
                          temp.mem_name = text;
                          setMemberDetail(temp);
                        }}
                        style={{
                          marginTop: "10px",
                          border: "1px solid black",
                          borderRadius: "0px",
                          height: "30px",
                        }}
                        // placeholder="'-' 없이 입력"
                        value={memberDetail.mem_name}
                      ></TextInput>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      flexDirection: "row",
                      gridTemplateColumns: "150px " + (width - 420) + "px",
                      textAlign: "right",
                      lineheight: "30px",
                      height: "30px",
                    }}
                  >
                    <div
                      style={{
                        height: "30px",
                        backgroundColor: "transparent",
                        paddingRight: "30px",
                      }}
                    >
                      <span>이메일</span>
                    </div>
                    <div
                      style={{
                        transform: "translate(0px,-10px)",
                      }}
                    >
                      <TextInput
                        onChangeText={(text) => {
                          // props.setUserPhoneNumber(text);
                          // props.onPhoneNumberChange()
                          var temp = { ...memberDetail };
                          temp.mem_email = text;
                          setMemberDetail(temp);
                        }}
                        style={{
                          marginTop: "10px",
                          border: "1px solid black",
                          borderRadius: "0px",
                          height: "30px",
                        }}
                        // placeholder="'-' 없이 입력"
                        value={memberDetail.mem_email}
                      ></TextInput>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      flexDirection: "row",
                      gridTemplateColumns: "150px " + (width - 420) + "px",
                      textAlign: "right",
                      lineheight: "30px",
                      height: "30px",
                    }}
                  >
                    <div
                      style={{
                        height: "30px",
                        backgroundColor: "transparent",
                        paddingRight: "30px",
                      }}
                    >
                      <span>휴대폰</span>
                    </div>
                    <div
                      style={{
                        transform: "translate(0px,-10px)",
                      }}
                    >
                      <TextInput
                        onChangeText={(text) => {
                          // props.setUserPhoneNumber(text);
                          // props.onPhoneNumberChange()
                          var temp = { ...memberDetail };
                          temp.mem_mobile = text;
                          setMemberDetail(temp);
                        }}
                        style={{
                          marginTop: "10px",
                          border: "1px solid black",
                          borderRadius: "0px",
                          height: "30px",
                        }}
                        // placeholder="'-' 없이 입력"
                        value={memberDetail.mem_mobile}
                      ></TextInput>
                    </div>
                  </div>
                  <span>비밀번호 변경</span>
                  <span>기존 비밀번호</span>
                  <span>새 비밀번호</span>
                  <span>새 비밀번호 확인</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Font>
    );
  } else {
    return (
      <Font family="Noto Sans KR">
        <Navbar />
        <NavBarFiller />
        <div>
          <span>로딩중...</span>
        </div>
      </Font>
    );
  }
}

export default PersonalInfoPage;
