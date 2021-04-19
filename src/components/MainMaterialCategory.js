import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NavBarFiller from "./NavBarFiller";
import { CategoryCard } from "./CategoryCard";
import Font from "react-font";
import styled from "styled-components";
// import "./MainMaterialCategory.css";
const MainContent = styled.div`
  display: block;
  height: auto;
  text-align: left;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 11;
  margin-left: 100px;
  padding: auto;
  z-index: 2;
`;
const ResponsiveContainer = styled.div`
  @media (min-width: 1000px) {
    flex: 1;
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
  }
  @media (min-width: 803px) and (max-width: 999px) {
    flex: 1;
    display: grid;
    grid-template-columns: auto auto;
    padding: 10px;
  }
  @media (max-width: 802px) {
    flex: 1;
    display: grid;
    grid-template-columns: auto;
    padding: 10px;
  }
`;
function MainMaterialCategory() {
  const [data, setData] = useState(undefined);
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = (e) => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    fetch("/Mainitem")
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      })
      .then(
        (incomingData) => setData(incomingData),
        () => {
          console.log(data);
          console.log("data read : ", data.listCategory[0].ct_img_url);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // if (width > 1000) {
  if (data != undefined) {
    return (
      <Font family="Noto Sans KR">
        <MainContent>
          <Title className="Title">자재 카테고리</Title>
          <ResponsiveContainer>
            {data.listCategory.map((listCategory) => (
              <CategoryCard listCategory={listCategory} />
              // <a
              //   className="CategoryBox"
              //   href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
              // >
              //   <div
              //     style={{
              //       transform: "translate(-36px,0px)",
              //     }}
              //   >
              //     <img
              //       className="CategoryImage"
              //       src={listCategory.ct_img_url}
              //     ></img>
              //   </div>
              //   <div
              //     style={{
              //       transform: "translate(-15px,0px)",
              //       backgroundColor: "transparent",
              //     }}
              //   >
              //     <div className="CategoryTextDivOne">
              //       <div className="CategoryTextDivTwo">
              //         <span className="CategoryText">
              //           {listCategory.ct_text}
              //         </span>
              //       </div>
              //     </div>
              //   </div>
              // </a>
            ))}
          </ResponsiveContainer>
        </MainContent>
      </Font>
    );
  } else {
    return (
      <Font family="Noto Sans KR">
        <MainContent>
          {/* <Navbar />
                        <NavBarFiller/> */}
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "100vw",
              textAlign: "center",
            }}
          >
            <span>로딩중 ...</span>
            {/* <Content/> */}
          </div>
        </MainContent>
      </Font>
    );
  }
}

export default MainMaterialCategory;
