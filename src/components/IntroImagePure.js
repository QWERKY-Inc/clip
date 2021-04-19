import React, { useEffect } from "react";
import IntroImg from "../assets/introImage.png";
import "./content.css";
import Font from "react-font";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import {TouchableOpacity,Text,Linking,Dimensions,View,Image} from 'react-native';
const queryString = require("query-string");

const Container = styled.div`
  background-color: transparent;
  margin: 0;
  height: auto;
`;
const ImgLink = styled(Link)`
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: white;
`;
const Name = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 700;
  text-shadow: 1px 1px black;
  z-index: 0;
  text-decoration: none;
`;
const InnerContainer = styled.div`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  padding-left: auto;
  padding-right: auto;
`;
const Img = styled.img`
  display: block;
  height: 300px;
  width: auto;
  border-radius: 10px;
  z-index: 0;
  margin-left: auto;
  margin-right: auto;
`;
const LinkContainerOne = styled.div`
  background-color: transparent;
  height: 300px;
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  padding-left: auto;
  padding-right: auto;
`;
const LinkContainerTwo = styled.div`
  position: relative;
  background-color: transparent;
  min-width: 250px;
  min-height: 300px;
  display: table;
  margin-left: auto;
  margin-right: auto;
`;
const NameContainer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background-color: transparent;
  z-index: 0;
  display: flex;
  flex-direction: column;
`;

const IntroImage = () => {
  const [data, setData] = React.useState(undefined);
  const [banner, setBanner] = React.useState(undefined);
  const [bannerData, setBannerData] = React.useState(undefined);
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth);

  // const oneBanner = (jsonObj) => {
  //   console.log(jsonObj);
  //   fetch(
  //     "/banner?" +
  //       queryString.stringify({
  //         ...jsonObj,
  //       })
  //   )
  //     .then((res) => res.json())
  //     .then((incomingData) => {
  //       console.log(incomingData);
  //       setData(incomingData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const oneBanner = async (jsonObj) => {
    const res = await fetch("/banner?" + queryString.stringify({ ...jsonObj }));
    const data = await res.json();
    return data;
  };
  const handleResize = (e) => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const parsed = {};
    if (localStorage.login != undefined) {
      var mem_no = undefined;
      mem_no = JSON.parse(localStorage.login).message.split("_")[0];
      parsed.mem_no = mem_no;
    } else {
      parsed.mem_no = "";
    }
    const getData = async () => {
      const incomingData = await oneBanner(parsed);
      setData(incomingData);
    };
    // oneBanner(parsed);
    getData();
  }, []);
  useEffect(() => {}, [data]);

  if (data != undefined) {
    return (
      <Container
        className="introImageContainer"
        // style={{
        //   backgroundColor: "transparent",
        //   margin: 0,
        //   height: "auto",
        // }}
      >
        <InnerContainer
          id="introImageDiv"
          // style={{
          //   backgroundColor: "transparent",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   paddingLeft: "auto",
          //   paddingRight: "auto",
          // }}
        >
          <ImgLink to={`/brands?ct_id=${data[0].banner_detail}`}>
            <LinkContainerOne>
              <LinkContainerTwo
                style={{
                  position: "relative",
                  backgroundColor: "transparent",
                  minWidth: "250px",
                  minHeight: "300px",
                  display: "table",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Font family="Noto Sans KR">
                  <NameContainer>
                    <Name>{data[0].detail.brd_name_eng}</Name>
                    <Name>{data[0].detail.brd_name_kor}</Name>
                  </NameContainer>
                </Font>
                <Img
                  // style={{
                  //   display: "block",
                  //   height: "300px",
                  //   width: "auto",
                  //   borderRadius: "10px",
                  //   zIndex: 0,
                  //   marginLeft: "auto",
                  //   marginRight: "auto",
                  // }}
                  src={data[0].detail.brd_feature_img_url}
                ></Img>
              </LinkContainerTwo>
            </LinkContainerOne>
          </ImgLink>
        </InnerContainer>
      </Container>
    );
  } else {
    return (
      <div>
        <Font family="Noto Sans KR">
          <a>로딩중 ...</a>
        </Font>
      </div>
    );
  }
};

export default IntroImage;
