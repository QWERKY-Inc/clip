import React from "react";

export function MoodboardCard(props) {
  return (
    <div>
      <a
        href={"/moodboarddetail?mb_no=" + props.listMoodboard.mb_no}
        style={{
          flexDirection: "column",
          borderRadius: 10,
          height: "260pt",
          width: "200pt",
          backgroundColor: "rgb(33,33,33)",
          fontSize: "25pt",
          fontWeight: "700",
          textDecorationLine: "none",
          color: "black",
          textAlign: "left",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: "25pt",
          marginRight: "25pt",
          marginTop: "25pt",
          padding: "auto",
          zIndex: 2,
        }}
      >
        <img
          style={{
            display: "block",
            height: "200pt",
            width: "200pt",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            zIndex: 1,
            pointerEvents: "none",
            transform: [
              {
                translateX: "0px",
                translateY: "0px",
              },
            ],
          }}
          src={props.listMoodboard.mb_img_url}
        ></img>
        <div
          style={{
            height: "60pt",
            width: "200pt",
            fontSize: "15pt",
            fontWeight: "700",
            textDecorationLine: "none",
            color: "black",
            textAlign: "center",
            flexDirection: "row",
            pointerEvents: "none",
            backgroundColor: "rgb(33,33,33)",
            pointerEvents: "none",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <div
            style={{
              height: "60pt",
              width: "190pt",
              fontSize: "15pt",
              fontWeight: "700",
              textDecorationLine: "none",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              color: "black",
              textAlign: "left",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginLeft: "5pt",
              pointerEvents: "none",
              backgroundColor: "rgb(33,33,33)",
              pointerEvents: "none",
              lineHeight: "65px",
            }}
          >
            <span
              style={{
                height: "65pt",
                width: "250px",
                fontSize: "15pt",
                fontWeight: "700",
                textDecorationLine: "none",
                color: "white",
                textAlign: "left",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: "45pt",
                pointerEvents: "none",
                backgroundColor: "transparent",
                pointerEvents: "none",
              }}
            >
              {props.listMoodboard.mb_name}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
