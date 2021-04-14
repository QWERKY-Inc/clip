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
} from "react-native";
import Font from "react-font";
const queryString = require("query-string");

function PersonalInfo(props) {
  const [data, setData] = React.useState({});
  const [catQ, setCatQ] = React.useState({ cat_num: null });
  useEffect(() => {
    fetch("/data")
      .then((res) => res.json())
      .then(
        (data) => setData(data),
        () => {
          console.log("data read : ", data);
        }
      );
    const parsed = queryString.parse(props.location.search);

    console.log(parsed);
    setCatQ(parsed);
  }, []);
  return (
    <Font family="Noto Sans KR">
        <div className="mypage">
            <Navbar />
            <NavBarFiller />
            <div
            style={{
                // margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "240px 100%",
                gridGap: "1px",
                backgroundColor:'black',
                height:'calc(100vh-100px)',
                width:'100%'
              }}>
            <div>
            <div
                style={{
                    height:'100%',
                    width:'100%',
                    backgroundColor:'white',
                    display:'flex',
                    flexDirection:'column'
                }}
            >
                
                <div
                    style={{
                        height:'50px',
                        width:'240px',
                        paddingLeft:'0px',
                        lineHeight:'50px',
                        backgroundColor:'white',
                        textAlign:'left',
                        display:'flex',
                        flexDirection:'row'

                    }}
                >   
                <div
                    style={{
                        marginLeft:'1px',
                        width:'2px',
                        height:'100%',
                        backgroundColor:'black'
                    }}
                >

                </div>
                    <div
                        style={{
                            paddingLeft:"30px",

                        }}
                    >
                        <span
                            style={{
                                fontWeight:700
                            }}
                        >개인정보
                        </span>
                    </div>
                </div>
                
                <div
                    style={{
                        height:'50px',
                        width:'240px',
                        paddingLeft:'30px',
                        lineHeight:'50px',
                        backgroundColor:'white',
                        textAlign:'left'

                    }}
                >   
                    <span>알림설정</span>
                </div>
                <div
                    style={{
                        height:'50px',
                        width:'240px',
                        paddingLeft:'30px',
                        lineHeight:'50px',
                        backgroundColor:'white',
                        textAlign:'left'

                    }}
                >   
                    <span>디자인 전문가 계정 신청</span>
                </div>
                <div
                    style={{
                        height:'50px',
                        width:'240px',
                        paddingLeft:'30px',
                        lineHeight:'50px',
                        backgroundColor:'white',
                        textAlign:'left'

                    }}
                >   
                    <span>사용방법</span>
                </div>
                <div
                    style={{
                        height:'50px',
                        width:'240px',
                        paddingLeft:'30px',
                        lineHeight:'50px',
                        backgroundColor:'white',
                        textAlign:'left'

                    }}
                >   
                    <span>자주 묻는 질문</span>
                </div>
                <div
                    style={{
                        height:'50px',
                        width:'240px',
                        paddingLeft:'30px',
                        lineHeight:'50px',
                        backgroundColor:'white',
                        textAlign:'left'

                    }}
                >   
                    <span>이용약관</span>
                </div>
                <div
                    style={{
                        height:'50px',
                        width:'240px',
                        paddingLeft:'30px',
                        lineHeight:'50px',
                        backgroundColor:'white',
                        textAlign:'left'

                    }}
                >   
                    <span>개인정보 처리방침</span>
                </div>
                <div
                    style={{
                        height:'50px',
                        width:'240px',
                        paddingLeft:'30px',
                        lineHeight:'50px',
                        backgroundColor:'white',
                        textAlign:'left'

                    }}
                >   
                    <span>로그아웃</span>
                </div>
            </div>
            </div>
            <div>
            <div
                style={{
                    height:'100%',
                    width:'100%',
                    backgroundColor:'red'
                }}
            >

            </div>
            </div>
            </div>
        </div>
    </Font>
  );
}

export default PersonalInfo;
