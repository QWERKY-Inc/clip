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
import xIcon from "../assets/x.png";
import styled from "styled-components";
import Font from "react-font";
const queryString = require("query-string");

const ContainerDivOne = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 100px;
  left: 0;
  background-color: white;
  display: block;
  padding-top: 50px;
  padding-left: 65px;
  padding-right: 65px;
`;
const ContainerDivTwo = styled.div`
  text-align: left;
  // margin:'25pt'
  padding-left: 0px;
  padding-right: 0px;
  background-color: transparent;
`;
const ContainerDivThree = styled.div`
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
  cursor: pointer;
`;
const TitleSpan = styled.span`
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
const FillerDiv = styled.div`
  height: 20px;
  width: 100vw;
  background-color: transparent;
`;
const GridDivOne = styled.div`
  column-count: 3;
  flex-wrap: wrap;
  flex-direction: column;
  display: grid;
  grid-template-columns: auto auto auto;
  width: calc(100vw-15px);
  height: 62vh;
  overflow-y: scroll;
`;
const GridElementDivOne = styled.div`
  text-align: left;
  height: 220px;
  background-color: transparent;
`;
const GridElementLinkOne = styled.a`
  text-decoration: none;
`;
const GridElementSpanOne = styled.span`
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
  // marginTop:100
`;
const GridElementDivTwo = styled.div`
  padding-top: 7px;
`;
const GridElementSpanTwo = styled.span`
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
  // marginTop:100
`;
const LoadingDiv = styled.div`
  text-align: "center";
`;
function UseDropDown(props) {
  // var bestProducts
  var subUse = [];
  const [usageData, setUsageData] = React.useState([]);
  const [detailedUseData, setDetailedUseData] = React.useState({});
  const [height, setHeight] = React.useState(Dimensions.get("window").height);
  const [width, setWidth] = React.useState(Dimensions.get("window").width);

  const outerUse = (ct_id) => {
    fetch(
      "/Uselist?" +
        queryString.stringify({
          ct_depth: 2,
          ct_parent: 1,
        })
    )
      .then((res) => res.json())
      .then((incomingData) => {
        // console.log(incomingData)
        setUsageData(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const usageList = () => {
    fetch("/wholeuselist")
      .then((res) => res.json())
      .then((incomingData) => {
        setUsageData(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const detailedUseDataObject = function () {
    var data = [];
    // if(detailedUseData.length==0){
    console.log("fetch call for usage");
    usageData.map((oneUse, index) => {
      fetch(
        "/uselist?" +
          queryString.stringify({
            ct_depth: 3,
            // ct_parent:useData[index].ct_id
            ct_parent: oneUse.ct_id,
          })
      )
        .then((res) => res.json())
        .then((childrenData) => {
          //setDetailedUseData(...detailedUseData,childrenData)
          data.push({ ...oneUse, children: childrenData });
          //subUse[index]=childrenData
        })
        .catch((err) => {
          console.log(err);
          // return {...oneUse,children:null}
          // data.push({...oneUse,children:null})
        });
    });
    setDetailedUseData(data);

    // return data
    // }
    // else{
    //   return detailedUseData
    // }
  };

  const onChange = () => {
    setHeight(Dimensions.get("window").height);
    setWidth(Dimensions.get("window").width);
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    //outerUse()
    usageList();
  }, []);

  useEffect(() => {
    // const detailedUseDataArray = function(){
    //     var data=[]
    //     // if(detailedUseData.length==0){
    //       console.log('fetch call for Use')
    //       UseData.map((oneUse,index)=>{
    //         fetch('/Uselist?'+
    //           queryString.stringify({
    //             ct_depth:3,
    //             ct_parent:UseData[index].ct_id
    //           })
    //         )
    //         .then(res=>res.json())
    //         .then((childrenData)=>{
    //           data.push({...oneUse,children:childrenData})
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             // return {...oneUse,children:null}
    //             // data.push({...oneUse,children:null})
    //         })

    //       })
    //       return data
    //     // }
    //     // else{
    //     //   return detailedUseData
    //     // }

    // }

    // setDetailedUseData(detailedUseDataArray)
    console.log(usageData);
    //detailedusageDataObject()
  }, [usageData]);

  // useEffect(()=>{
  //   console.log(detaileduseData)
  // },[detaileduseData])
  if (usageData) {
    return (
      <Font family="Noto Sans KR">
        <ContainerDivOne>
          {/* <div
          style={{
            paddingTop: "50px",
            paddingLeft: "65px",
            paddingRight: "65px",
          }}
        > */}
          <ContainerDivTwo>
            <ContainerDivThree>
              <div
                onClick={() => {
                  // console.log(detailedUseData)
                  props.toggleUseDropDown();
                }}
              >
                <XImg src={xIcon} />
              </div>
            </ContainerDivThree>

            <TitleSpan>사공부위</TitleSpan>
          </ContainerDivTwo>
          <FillerDiv />

          <GridDivOne>
            {/* {detaileduseData.map((use)=> */}
            {usageData.map((usage, index) => (
              <GridElementDivOne>
                <GridElementLinkOne
                  href={`/searchPage?search_target=USE_DEPTH1&search_value=${usage.ct_id}`}
                >
                  <GridElementSpanOne>{usage.ct_text}</GridElementSpanOne>
                </GridElementLinkOne>

                {usageData[index].children.map((child, jndex) => (
                  <GridElementDivTwo>
                    <GridElementLinkOne
                      // onPress={() =>
                      //   Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
                      // }
                      // onPress={() =>
                      //   Linking.openURL(
                      //     `/searchPage?search_target=USE_DEPTH2&search_value=${child.ct_id}`
                      //   )
                      // }
                      href={`/searchPage?search_target=USE_DEPTH2&search_value=${child.ct_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <GridElementSpanTwo>{child.ct_text}</GridElementSpanTwo>
                    </GridElementLinkOne>
                  </GridElementDivTwo>
                ))}
              </GridElementDivOne>
            ))}
          </GridDivOne>

          {/* </div> */}
        </ContainerDivOne>
      </Font>
    );
  } else {
    return (
      <Font family="Noto Sans KR">
        <LoadingDiv>
          <span>로딩중 ...</span>
        </LoadingDiv>
      </Font>
    );
  }
}

export default UseDropDown;
