import React from "react";
import styled from "styled-components";

const CategoryBox = styled.a`
  border-radius: 10px;
  height: 50pt;
  width: 350px;
  box-shadow: 0px 0px 2px;
  display: flex;
  font-size: 25pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25pt;
  padding: auto;
  z-index: 2;
  background-color: white;
`;
const CategoryImageDiv = styled.div`
  transform: translate(-36px, 0px);
`;
const CategoryImage = styled.img`
  display: block;
  height: 50pt;
  width: 60pt;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  z-index: 1;
  pointer-events: none;
`;
const CategoryTextDivOne = styled.div`
  height: 50pt;
  width: 200px;
  font-size: 15pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: center;
  flex-direction: row;
  pointer-events: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: transparent;
  pointer-events: none;
  transform: translate(-15px, 0px);
`;
const CategoryTextDivTwo = styled.div`
  height: 40pt;
  width: 99px;
  font-size: 15pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 5pt;
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
  line-height: 50pt;
  text-align: left;
`;
const CategoryText = styled.span`
  height: 50pt;
  width: 99px;
  font-size: 15pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 45pt;
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
  white-space: nowrap;
`;

export function CategoryCard(props) {
  return (
    <CategoryBox
      href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${props.listCategory.ct_id}`}
    >
      <CategoryImageDiv>
        <CategoryImage src={props.listCategory.ct_img_url} />
      </CategoryImageDiv>
      <CategoryTextDivOne>
        <CategoryTextDivTwo>
          <CategoryText>{props.listCategory.ct_text}</CategoryText>
        </CategoryTextDivTwo>
      </CategoryTextDivOne>
    </CategoryBox>
  );
}
