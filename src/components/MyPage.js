import React, { useEffect } from "react";
import "./mypage.css";
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

function MyPage(props) {
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
          className="wrapper"
          style={{
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "65% 35%",
            gridGap: "16px",
          }}
        >
          <article className="content">
            <div
              className="panel"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "red",
              }}
            >
                <span>
                    개인정보
                </span>

            </div>
            <div
              className="panel"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "blue",
              }}
            >
                <span>
                    알림설정
                </span>

            </div>
            <div
              className="panel"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "green",
              }}
            >
                <span>
                    디자인 전문가 계정신청
                </span>
            </div>
            <div
              className="panel"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "orange",
              }}
            >
                <span>
                    사용방법
                </span>
            </div>
            <div
              className="panel"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "orange",
              }}
            >
                <span>
                    자주 묻는 질문
                </span>
            </div>
            <div
              className="panel"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "orange",
              }}
            >
                <span>      
                    이용약관
                </span>
            </div>
            <div
              className="panel"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "orange",
              }}
            >
                <span>
                    개인정보 처리방침
                </span>
            </div>
            <div
              className="panel"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "orange",
              }}
            >
                로그아웃
            </div>
          </article>
          <aside
            className="sidebar"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "yellow",
            }}
          >
            Sidebar - Map
          </aside>
        </div>
      </div>
    </Font>
  );
}

export default MyPage;
