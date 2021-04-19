import React from "react";
import styled from "styled-components";

const LinkOne = styled.a`
  flex-direction: column;
  border-radius: 10;
  height: 260pt;
  width: 200pt;
  background-color: rgb(33, 33, 33);
  font-size: 25pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 25pt;
  margin-right: 25pt;
  margin-top: 25pt;
  padding: auto;
  z-index: 2;
`;
const ImgOne = styled.img`
  display: block;
  height: 200pt;
  width: 200pt;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 1;
  pointer-events: none;
  transform: translate(0px, 0px);
`;
const ContainerOne = styled.div`
  height: 60pt;
  width: 200pt;
  font-size: 15pt;
  font-weight: 700;
  text-decoration-line: none;
  color: black;
  text-align: center;
  flex-direction: row;
  pointer-events: none;
  background-color: rgb(33, 33, 33);
  pointer-events: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const ContainerTwo = styled.div`
  height: 60pt;
  width: 190pt;
  font-size: 15pt;
  font-weight: 700;
  text-decoration-line: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: black;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 5pt;
  pointer-events: none;
  background-color: rgb(33, 33, 33);
  pointer-events: none;
  line-height: 65px;
`;
const SpanOne = styled.span`
  height: 65pt;
  width: 250px;
  font-size: 15pt;
  font-weight: 700;
  text-decoration-line: none;
  color: white;
  text-align: left;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 45pt;
  pointer-events: none;
  background-color: transparent;
  pointer-events: none;
`;

export function MoodboardCard(props) {
  return (
    <div>
      <LinkOne href={"/moodboarddetail?mb_no=" + props.listMoodboard.mb_no}>
        <ImgOne src={props.listMoodboard.mb_img_url}></ImgOne>
        <ContainerOne>
          <ContainerTwo>
            <SpanOne>{props.listMoodboard.mb_name}</SpanOne>
          </ContainerTwo>
        </ContainerOne>
      </LinkOne>
    </div>
  );
}
