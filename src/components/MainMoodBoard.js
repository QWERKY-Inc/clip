import React, { useEffect } from "react";
import Navbar from "./Navbar";
import NavBarFiller from "./NavBarFiller";
import { MoodboardCard } from "./MoodboardCard";
// import {
//   TouchableOpacity,
//   Text,
//   Image,
//   View,
//   Modal,
//   TouchableHighlight,
//   Dimensions,
//   Linking,
// } from "react-native";
import styled from "styled-components";
import Font from "react-font";
const ContainerOne = styled.div`
  display: block;
  height: auto;
  background-color: black;
  padding-top: 77pt;
`;
const ContainerTwo = styled.div`
  display: block;
  height: 150px;
  background-color: transparent;
  flex-direction: column;
  text-align: left;
  padding-left: 100px;
`;
const ContainerThree = styled.div`
  display: flex;
  flex-direction: row;
`;
const SpanOne = styled.div`
  font-size: 25pt;
  font-weight: 700;
  text-decoration-line: none;
  color: white;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: auto;
  z-index: 2;
  transform: translate(0px, -44px);
`;
const ContainerFour = styled.div`
  position: absolute;
  right: 100px;
  border-radius: 10px;
  border: 1px solid white;
  height: 30px;
  width: 120px;
  text-align: center;
`;
const SpanTwo = styled.div`
  color: white;
  line-height: 30px;
`;
const ContainerFive = styled.div`
  background-color: transparent;
  transform: translate(0px, -90px);
`;
const SpanThree = styled.div`
  font-size: 15pt;
  font-weight: 700;
  text-decoration-line: none;
  color: white;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: auto;
  z-index: 2;
`;
const ContainerSix = styled.div`
  background-color: transparent;
  transform: translate(0px, -110px);
`;
const ResponsiveContainer = styled.div`
  @media (min-width: 1190px) {
    flex: 1;
    /* flex-wrap: wrap; */
    display: grid;
    grid-template-columns: auto auto auto auto;
    padding-left: 77pt;
    padding-right: 77pt;
  }
  @media (min-width: 908px) and (max-width: 1190px) {
    flex: 1;
    /* flex-wrap: wrap; */
    display: grid;
    grid-template-columns: auto auto auto;
    padding-left: 77pt;
    padding-right: 77pt;
  }
  @media (min-width: 626px) and (max-width: 908px) {
    flex: 1;
    /* flex-wrap: wrap; */
    display: grid;
    grid-template-columns: auto auto;
    padding-left: 77pt;
    padding-right: 77pt;
  }
  @media (max-width: 625px) {
    flex: 1;
    /* flex-wrap: wrap; */
    display: grid;
    grid-template-columns: auto;
    padding-left: 77pt;
    padding-right: 77pt;
  }
`;
const ContainerSeven = styled.div`
  text-align: center;
`;
function MainMoodBoard() {
  const [data, setData] = React.useState(undefined);
  // const [height, setHeight] = React.useState(Dimensions.get("window").height);
  // const [width, setWidth] = React.useState(Dimensions.get("window").width);
  // const onChange = () => {
  //   setHeight(Dimensions.get("window").height);
  //   setWidth(Dimensions.get("window").width);
  //   // console.log(height+" : "+width)
  // };
  useEffect(() => {
    // Dimensions.addEventListener("change", onChange);
    fetch("/Mainitem")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })
      .then(
        (incomingData) => setData(incomingData),
        () => {
          // console.log(data)
          console.log("data read : ", data.listCategory[0].ct_img_url);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   if (width > 814) {
  if (data != undefined) {
    return (
      <Font family="Noto Sans KR">
        <ContainerOne>
          <ContainerTwo>
            <ContainerThree>
              <SpanOne>무드보드</SpanOne>
              <a href={"/searchpage?mode=moodboard"}>
                <ContainerFour>
                  <SpanTwo>모두 둘러보기</SpanTwo>
                </ContainerFour>
              </a>
            </ContainerThree>
            <br></br>
            <ContainerFive>
              <SpanThree>새로운 아이디어와 컨셉을 찾아보세요.</SpanThree>
            </ContainerFive>
            <br></br>
            <ContainerSix>
              <SpanThree>
                어떤 자재가 어떤 컨셉으로 활용되는지 알아볼 수 있습니다.
              </SpanThree>
            </ContainerSix>
          </ContainerTwo>
          <ResponsiveContainer>
            {data.listMoodboard.map((listMoodboard) => {
              return <MoodboardCard listMoodboard={listMoodboard} />;
            })}
          </ResponsiveContainer>
        </ContainerOne>
      </Font>
    );
  } else {
    return (
      <Font family="Noto Sans KR">
        <div className="MainContent">
          <ContainerSeven>
            <span>로딩중 ...</span>
          </ContainerSeven>
        </div>
      </Font>
    );
  }
}

export default MainMoodBoard;
