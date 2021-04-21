import React, { useEffect } from "react";
import "./mypage.css";
import Navbar from "./Navbar";
import Content from "./Content";
import NavBarFiller from "./NavBarFiller";
import ClipBoard from "./ClipBoard";
import Font from "react-font";
// import ClipBoardUpdate from './ClipBoardUpdate';
import clipOff from "../assets/clipOff.png";
import boxIcon from "../assets/icnBox.png";
import styled from "styled-components";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image,
  TouchableHighlight,
  Linking,
  TextInput,
  Dimensions,
} from "react-native";

const queryString = require("query-string");

const ContainerDivOne = styled.div`
  height: 240px;
  width: 170px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.hover == true ? "rgba(0,0,0,0.1)" : "transparent"};
  position: relative;
`;
const LinkOne = styled.a`
  text-decoration: none;
`;
const ContainerDivTwo = styled.div`
  background-color: white;
  width: 55px;
  height: 12px;
  position: absolute;
  z-index: 100;
  top: 6px;
  left: 6px;
  border-radius: 6px;
  display: ${(props) => (props.hover == true ? "block" : "none")};
`;
const PriceSignSpanOne = styled.span`
  transform: translate(2px, -4px);
  position: absolute;
  top: 1px;
  left: 2px;
  font-weight: 50;
  font-size: 12px;
  color: ${(props) => (props.mt_budget < 1 ? "rgb(219,219,219)" : "black")};
`;
const PriceSignSpanTwo = styled.span`
  transform: translate(2px, -4px);
  position: absolute;
  top: 1px;
  left: 12px;
  font-weight: 50;
  font-size: 12px;
  color: ${(props) => (props.mt_budget < 2 ? "rgb(219,219,219)" : "black")};
`;
const PriceSignSpanThree = styled.span`
  transform: translate(2px, -4px);
  position: absolute;
  top: 1px;
  left: 22px;
  font-weight: 50;
  font-size: 12px;
  color: ${(props) => (props.mt_budget < 3 ? "rgb(219,219,219)" : "black")};
`;
const PriceSignSpanFour = styled.span`
  transform: translate(2px, -4px);
  position: absolute;
  top: 1px;
  left: 32px;
  font-weight: 50;
  font-size: 12px;
  color: ${(props) => (props.mt_budget < 4 ? "rgb(219,219,219)" : "black")};
`;
const PriceSignSpanFive = styled.span`
  transform: translate(2px, -4px);
  position: absolute;
  top: 1px;
  left: 42px;
  font-weight: 50;
  font-size: 12px;
  color: ${(props) => (props.mt_budget < 5 ? "rgb(219,219,219)" : "black")};
`;
const ClipDiv = styled.div`
  background-color: transparent;
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 100;
  top: 6px;
  right: 6px;
  display: ${(props) => (props.hover == true ? "block" : "none")};
  cursor: pointer;
`;
const ClipImg = styled.img`
  display: block;
  height: 20px;
  width: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 1;
  pointer-events: none;
`;
const MainImg = styled.img`
  display: block;
  height: 170px;
  width: 170px;
  //   borderTopLeftRadius: 10;
  //   borderTopRightRadius: 10;
  border-radius: 10px;
  z-index: 1;
  pointer-events: none;
  filter: ${(props) =>
    props.hover == true ? "brightness(90%)" : "brightness(100%)"};
`;
const ContainerDivThree = styled.div`
  height: 70px;
  width: 170px;
  font-size: 12pt;
  font-weight: 500;
  text-decoration-line: none;
  color: white;
  text-align: center;
  flex-direction: column;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  position: relative;
`;
const BoxIconDivOne = styled.div`
  z-index: 100;
  background-color: transparent;
  position: absolute;
  top: 7px;
  right: 7px;
  height: 30px;
  width: 30px;
  display: ${(props) => (props.mt_isdelivery == "Y" ? "block" : "none")};
`;
const BoxIconDivTwo = styled.div`
  background-color: transparent;
  display: flex;
  height: 30px;
  width: 30px;
  position: relative;
`;
const BoxIconImg = styled.img`
  width: 30px;
  height: 30px;
  right: 15px;
`;
const ContainerDivFour = styled.div`
  background-color: transparent;
  width: ${(props) => (props.mt_isdelivery == "Y" ? "123px" : "100%")};
  overflow: hidden;
  text-align: left;
`;
const TitleSpanOne = styled.span`
  font-size: 8pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: left;
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const ContainerDivFive = styled.div`
  background-color: transparent;
  height: 20px;
  width: ${(props) => (props.mt_isdelivery == "Y" ? "123px" : "100%")};
  overflow: hidden;
  text-align: left;
`;
const TitleSpanTwo = styled.span`
  width: 120px;
  font-size: 8pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  // marginLeft:'1px';
  // marginTop:'1px';
  pointer-events: none;
  background-color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ContainerDivSix = styled.div`
  background-color: transparent;
  height: 20px;
  width: 100%;
  overflow: hidden;
  text-align: left;
`;
const TitleSpanThree = styled.span`
  height: 100px;
  width: 120px;
  font-size: 8pt;
  font-weight: 700;
  text-decoration-line: none;
  color: rgb(85, 85, 85);
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  // marginLeft:'1px';
  // marginTop:'1px';
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
function Card(props) {
  const [hover, setHover] = React.useState(false);
  const [materialNumber, setMaterialNumber] = React.useState(null);
  const [clipBoardOne, setClipBoardOne] = React.useState(false);
  //   const toggleClipBoardOne=()=>{
  //     setClipBoardOne(!clipBoardOne)
  //   }
  useEffect(() => {}, []);
  return (
    <Font family="Noto Sans KR">
      <ContainerDivOne
        hover={hover}
        onMouseEnter={() => {
          if (localStorage.login != undefined) {
            var mem_no = JSON.parse(localStorage.login).message.split("_");
            console.log(mem_no);
          }
          setHover(true);
          console.log(props.material);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <ContainerDivTwo
          hover={hover}
          onClick={() => {
            console.log("pressed clip " + props.material.mt_no);
          }}
        >
          <PriceSignSpanOne mt_budget={props.material.mt_budget}>
            ₩
          </PriceSignSpanOne>
          <PriceSignSpanTwo mt_budget={props.material.mt_budget}>
            ₩
          </PriceSignSpanTwo>
          <PriceSignSpanThree mt_budget={props.material.mt_budget}>
            ₩
          </PriceSignSpanThree>
          <PriceSignSpanFour mt_budget={props.material.mt_budget}>
            ₩
          </PriceSignSpanFour>
          <PriceSignSpanFive mt_budget={props.material.mt_budget}>
            ₩
          </PriceSignSpanFive>
        </ContainerDivTwo>

        <ClipDiv
          // style={{
          //   backgroundColor: "transparent",
          //   width: "20px",
          //   height: "20px",
          //   position: "absolute",
          //   zIndex: 100,
          //   top: "6px",
          //   right: "6px",
          //   display: hover == true ? "block" : "none",
          // }}
          hover={hover}
          onClick={() => {
            console.log("pressed clip " + props.material.mt_no);
            setMaterialNumber(props.material.mt_no);
            props.toggleClipBoard();
          }}
        >
          <ClipImg src={clipOff} />
        </ClipDiv>
        <LinkOne href={`/partDetail?mt_no=${props.material.mt_no}`}>
          <MainImg
            // style={{
            //   display: "block",
            //   height: "170px",
            //   width: "170px",
            //   borderRadius: "10px",
            //   zIndex: 1,
            //   pointerEvents: "none",
            //   filter: hover == true ? "brightness(90%)" : "brightness(100%)",
            // }}
            // source={{
            //   uri: props.material.mt_feature_img_url,
            // }}
            hover={hover}
            src={props.material.mt_feature_img_url}
          />

          <ContainerDivThree>
            <BoxIconDivOne
              mt_isdelivery={props.material.mt_isdelivery}
              onClick={() => {
                console.log(props.material.mt_isdelivery);
              }}
            >
              <BoxIconDivTwo>
                <BoxIconImg src={boxIcon} />
              </BoxIconDivTwo>
            </BoxIconDivOne>
            <ContainerDivFour>
              <TitleSpanOne>{props.material.vd_name}</TitleSpanOne>
            </ContainerDivFour>
            <ContainerDivFive mt_isdelivery={props.material.mt_isdelivery}>
              <TitleSpanTwo>{props.material.mt_subname}</TitleSpanTwo>
            </ContainerDivFive>
            <ContainerDivSix>
              <TitleSpanThree>{props.material.mt_name}</TitleSpanThree>
            </ContainerDivSix>
          </ContainerDivThree>
        </LinkOne>
      </ContainerDivOne>
    </Font>
  );
}

export default Card;
