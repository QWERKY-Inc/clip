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
          <div
            style={{
              paddingTop: "50px",
              paddingLeft: "65px",
              paddingRight: "65px",
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
            >
              <div
                style={{
                  height: "25px",
                  width: "25px",
                  backgroundColor: "transparent",
                  position: "absolute",
                  top: "62px",
                  right: "75px",
                }}
              >
                <div
                  onClick={() => {
                    // console.log(detailedCategoryData)
                    props.toggleCategoryDropDown();
                  }}
                >
                  <img
                    src={xIcon}
                    style={{
                      height: "25px",
                      width: "25px",
                    }}
                  ></img>
                </div>
              </div>

              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  textDecorationLine: "none",
                  color: "black",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  // margin:11,
                  marginTop: "5px",
                  //padding:'auto',
                  pointerEvents: "none",
                }}
              >
                자재카테고리
              </span>
            </div>
            <div
              style={{
                height: "20px",
                width: "100vw",
                backgroundColor: "transparent",
              }}
            ></div>
            <div
              style={
                {
                  //padding:'25px',
                }
              }
            >
              <div
                style={{
                  columnCount: 3,
                  flexwrap: "wrap",
                  flexDirection: "column",
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                  // padding:'100px',
                  width: "80vw",
                  height: "62vh",
                  overflowY: "scroll",
                }}
              >
                {/* {detailedCategoryData.map((category)=> */}
                {categoryData.map((category, index) => (
                  <div>
                    <div
                      style={{
                        textAlign: "left",
                        height: "240px",
                        //paddingLeft:'27px',
                        //paddingRight:'27px',
                        backgroundColor: "transparent",
                      }}
                    >
                      <a
                        // onPress={() =>
                        //   Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
                        // }
                        // onClick={() =>
                        //   Linking.openURL(
                        //     `/searchPage?search_target=CATEGORY_DEPTH1&search_value=${category.ct_id}`
                        //   )
                        // }
                        style={{
                          textDecoration: "none",
                        }}
                        href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${category.ct_id}`}
                      >
                        <span
                          style={{
                            fontSize: "15pt",
                            fontWeight: "700",
                            textDecorationLine: "none",
                            color: "black",
                            textAlign: "left",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            // marginTop:'45pt',
                            pointerEvents: "none",
                            backgroundColor: "transparent",
                            pointerEvents: "none",

                            // marginTop:100
                          }}
                        >
                          {category.ct_text}
                        </span>
                      </a>
                      <div
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        {categoryData[index].children.map((child, jndex) => (
                          <div
                            style={{
                              paddingTop: "7px",
                            }}
                          >
                            <a
                              // onPress={() =>
                              //   Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
                              // }
                              // onPress={() =>
                              //   Linking.openURL(
                              //     `/searchPage?search_target=CATEGORY_DEPTH2&search_value=${child.ct_id}`
                              //   )
                              // }
                              href={`/searchPage?search_target=CATEGORY_DEPTH2&search_value=${child.ct_id}`}
                              style={{
                                textDecoration: "none",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "12pt",
                                  fontWeight: "500",
                                  textDecorationLine: "none",
                                  color: "black",
                                  textAlign: "left",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "row",
                                  // marginTop:'45pt',
                                  pointerEvents: "none",
                                  backgroundColor: "transparent",
                                  pointerEvents: "none",
                                  lineHeight: "12pt",
                                  // marginTop:100
                                }}
                              >
                                {child.ct_text}
                              </span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContainerOne>
      </Font>
    );
  } else {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <span>로딩중 ...</span>
      </div>
    );
  }
}

export default CategoryDropDown;
