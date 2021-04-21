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
  left: 0px;
  background-color: white;
  display: block;
  padding-top: 50px;
  padding-left: 65px;
  padding-right: 65px;
`;
const ContainerDivTwo = styled.div`
  text-align: left;
  padding-left: 25px;
  padding-right: 25px;
  background-color: transparent;
`;
const XIconDiv = styled.div`
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
  // margin:11;
  margin-top: 5px;
  padding: auto;
  pointer-events: none;
`;
const FillerDiv = styled.span`
  height: 20px;
  width: 100vw;
  background-color: transparent;
`;
const GridDivOne = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: calc(100vw-15px);
  height: 50vh;
  overflow-y: scroll;
`;
const GridElementDivOne = styled.div`
  margin-top: 3px;
`;
const GridElementDivTwo = styled.div`
  text-align: left;
  height: 30px;
  padding-left: 27px;
  padding-right: 27px;
  padding-top: 7px;
  background-color: transparent;
`;
const GridElementSpanOne = styled.span`
  font-size: 12pt;
  font-weight: 500;
  text-decoration-line: none;
  color: black;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 45pt;
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
`;
const GridElementLinkOne = styled.a`
  text-decoration: none;
`;
function BrandsDropDown(props) {
  // var bestProducts
  const [brandListData, setBrandListData] = React.useState([]);
  const [brandData, setBrandData] = React.useState({});
  const [detailView, setDetailView] = React.useState(false);
  const [brandId, setBrandId] = React.useState(null);
  const [height, setHeight] = React.useState(Dimensions.get("window").height);
  const [width, setWidth] = React.useState(Dimensions.get("window").width);
  //   const brands=()=>{
  //     fetch('/brandslist')
  //     .then(res=>res.json())
  //     .then((incomingData)=>{
  //       setBrandListData(incomingData)
  //     })
  //     .catch(err=>{
  //         console.log(err)
  //     })

  //   }
  const brands = () => {
    fetch("/brandslist")
      .then((res) => res.json())
      .then((incomingData) => {
        setBrandListData(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const oneBrand=(ct_id)=>{
  //       fetch('/onebrand?'+
  //         queryString.stringify({
  //               ct_id:ct_id
  //             })
  //         )
  //       .then(res=>res.json())
  //       .then((incomingData)=>{
  //         console.log(incomingData)
  //         setBrandData(incomingData)
  //         })
  //       .catch(err=>{
  //           console.log(err)
  //       })
  //   }
  const onChange = () => {
    setHeight(Dimensions.get("window").height);
    setWidth(Dimensions.get("window").width);
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    // const parsed = queryString.parse(props.location.search);
    // console.log(parsed.ct_id==undefined)
    // if(parsed.ct_id==undefined){
    brands();
    //   setDetailView(false)
    // }
    // else{
    //   oneBrand(parsed.ct_id)
    //   setBrandId(parsed.ct_id)
    //   setDetailView(true)
    // }
  }, []);
  useEffect(() => {
    console.log(typeof brandListData);
    console.log(brandListData);
  }, [brandListData]);
  useEffect(() => {
    if (brandData.bestproducts_brand) {
      console.log(brandData);
    }
  }, [brandData]);

  return (
    <Font family="Noto Sans KR">
      <ContainerDivOne>
        <ContainerDivTwo>
          <XIconDiv>
            <div
              onClick={() => {
                props.toggleBrandsDropDown();
              }}
            >
              <XImg src={xIcon} />
            </div>
          </XIconDiv>

          <TitleSpan>브랜드</TitleSpan>
        </ContainerDivTwo>
        <FillerDiv />

        <GridDivOne>
          {brandListData.map((brand) => (
            <GridElementDivOne>
              <GridElementLinkOne
                // onPress={() => Linking.openURL(`/brands?ct_id=${brand.ct_id}`)}
                href={`/brands?ct_id=${brand.ct_id}`}
              >
                <GridElementDivTwo>
                  <GridElementSpanOne>{brand.ct_text}</GridElementSpanOne>
                </GridElementDivTwo>
              </GridElementLinkOne>
            </GridElementDivOne>
          ))}
        </GridDivOne>
      </ContainerDivOne>
    </Font>
  );
}

export default BrandsDropDown;
