import fetch from "node-fetch";
import React, { useEffect } from "react";
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
import styled from "styled-components";
import xIcon from "../assets/x.png";
import Font from "react-font";
const queryString = require("query-string");

const ContainerOne = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 100px;
  left: 0px;
  background-color: white;
  display: block;
  padding-top: 50px;
  padding-left: 65px;
  padding-right: 65px;
  text-align: left;
`;

const XContainer = styled.div`
  height: 25px;
  width: 25px;
  background-color: transparent;
  position: absolute;
  top: 62px;
  right: 75px;
`;

const XImg = styled.img`
  height: 25px;
  width: 25px;
`;

const SpanOne = styled.span`
  font-size: 40px;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 5px;
  pointer-events: none;
`;
const FillerOne = styled.div`
  height: 20px;
  width: 100vw;
  background-color: transparent;
`;
const GridOne = styled.div`
  column-count: 3;
  flex-wrap: wrap;
  flex-direction: column;
  display: grid;
  grid-template-columns: auto auto auto;
  // padding:'100px';
  width: 80vw;
  height: 62vh;
  overflow-y: scroll;
`;
const GridDivOne = styled.div`
  text-align: left;
  height: 240px;
  background-color: transparent;
`;
const GridSpanOne = styled.div`
  font-size: 15pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  // marginTop:'45pt';
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
`;
const GridDivTwo = styled.div`
  flex-direction: column;
`;
const GridDivThree = styled.div`
  padding-top: 7px;
`;
const GridLinkOne = styled.a`
  text-decoration: none;
`;
const GridSpanTwo = styled.span`
  font-size: 12pt;
  font-weight: 500;
  text-decoration-line: none;
  color: black;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  // marginTop:'45pt';
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
  line-height: 12pt;
`;
const LoadingDiv = styled.div`
  text-align: center;
`;
function CategoryDropDown(props) {
  var subCategory = [];
  const [categoryData, setCategoryData] = React.useState([]);
  const [detailedCategoryData, setDetailedCategoryData] = React.useState({});
  const [height, setHeight] = React.useState(Dimensions.get("window").height);
  const [width, setWidth] = React.useState(Dimensions.get("window").width);

  const outerCategory = (ct_id) => {
    fetch(
      "/categorylist?" +
        queryString.stringify({
          ct_depth: 2,
          ct_parent: 1,
        })
    )
      .then((res) => res.json())
      .then((incomingData) => {
        setCategoryData(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const categoryList = () => {
    fetch("/wholecategorylist")
      .then((res) => res.json())
      .then((incomingData) => {
        setCategoryData(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const detailedCategoryDataObject = function () {
    var data = [];
    console.log("fetch call for category");
    categoryData.map((oneCategory, index) => {
      fetch(
        "/categorylist?" +
          queryString.stringify({
            ct_depth: 3,
            ct_parent: oneCategory.ct_id,
          })
      )
        .then((res) => res.json())
        .then((childrenData) => {
          data.push({ ...oneCategory, children: childrenData });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setDetailedCategoryData(data);
  };

  const onChange = () => {
    setHeight(Dimensions.get("window").height);
    setWidth(Dimensions.get("window").width);
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    categoryList();
  }, []);

  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);

  if (categoryData) {
    return (
      <Font family="Noto Sans KR">
        <ContainerOne>
          {/* <div
            style={{
              paddingTop: "50px",
              paddingLeft: "65px",
              paddingRight: "65px",
            }}
          > */}
          {/* <div
            style={{
              textAlign: "left",
              // margin:'25pt'
              paddingLeft: "0px",
              paddingRight: "0px",
              backgroundColor: "transparent",
            }}
          > */}
          <XContainer>
            <div
              onClick={() => {
                // console.log(detailedCategoryData)
                props.toggleCategoryDropDown();
              }}
            >
              <XImg src={xIcon} />
            </div>
          </XContainer>

          <SpanOne>자재카테고리</SpanOne>
          {/* </div> */}
          <FillerOne />
          {/* <div
            style={
              {
                //padding:'25px',
              }
            }
          > */}
          <GridOne>
            {/* {detailedCategoryData.map((category)=> */}
            {categoryData.map((category, index) => (
              <GridDivOne>
                <GridLinkOne
                  href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${category.ct_id}`}
                >
                  <GridSpanOne>{category.ct_text}</GridSpanOne>
                </GridLinkOne>
                <GridDivTwo>
                  {categoryData[index].children.map((child, jndex) => (
                    <GridDivThree>
                      <GridLinkOne
                        // onPress={() =>
                        //   Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
                        // }
                        // onPress={() =>
                        //   Linking.openURL(
                        //     `/searchPage?search_target=CATEGORY_DEPTH2&search_value=${child.ct_id}`
                        //   )
                        // }
                        href={`/searchPage?search_target=CATEGORY_DEPTH2&search_value=${child.ct_id}`}
                      >
                        <GridSpanTwo>{child.ct_text}</GridSpanTwo>
                      </GridLinkOne>
                    </GridDivThree>
                  ))}
                </GridDivTwo>
              </GridDivOne>
            ))}
          </GridOne>
          {/* </div> */}
          {/* </div> */}
        </ContainerOne>
      </Font>
    );
  } else {
    return (
      <LoadingDiv>
        <span>로딩중 ...</span>
      </LoadingDiv>
    );
  }
}

export default CategoryDropDown;
