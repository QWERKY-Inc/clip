import React, { useEffect } from "react";
import "./mypage.css";
import Navbar from "./Navbar";
import Content from "./Content";
import NavBarFiller from "./NavBarFiller";
import ClipBoard from "./ClipBoard";
// import ClipBoardUpdate from './ClipBoardUpdate';
import clipOff from "../assets/clipOff.png";
import boxIcon from "../assets/icnBox.png";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Image,
  TouchableHighlight,
  Linking,
  TextInput,
  Dimensions,
} from "react-native";
import Font from "react-font";
const queryString = require("query-string");

function Card(props) {
  const [hover, setHover] = React.useState(false);
  const [materialNumber, setMaterialNumber] = React.useState(null);
  const [clipBoardOne, setClipBoardOne] = React.useState(false);
  //   const toggleClipBoardOne=()=>{
  //     setClipBoardOne(!clipBoardOne)
  //   }
  useEffect(() => {}, []);
  return (
    //       <div>
    //           {/* <div
    //         style={{
    //             display: clipBoardOne ? 'block':'none',
    //             zIndex:104,
    //             backgroundColor:'red'
    //         }}
    //     >
    //         <ClipBoardUpdate toggleClipBoard={toggleClipBoardOne} material_num={materialNumber} refresh={clipBoardOne}/>
    //     </div> */}

    //     <div
    //     style={{
    //         backgroundColor:'transparent',
    //         height:'240px',
    //         width:'170px',
    //         marginLeft:'7px',
    //         marginRight:'7px',
    //         marginTop:'20px',
    //         marginBottom:'20px',
    //         borderRadius:10,
    //         boxShadow:'0px 0px 3px black',
    //         position:'relative'
    //     }}
    //     onMouseEnter={()=>{
    //         console.log(props.material)
    //         setHover(true)
    //     }
    //     }
    //     onMouseLeave={()=>{
    //         setHover(false)
    //     }}
    //     >

    //     <div
    //         style={{
    //             backgroundColor:'white',
    //             width:'55px',
    //             height:'12px',
    //             position:'absolute',
    //             zIndex:100,
    //             top:'6px',
    //             left:'6px',
    //             borderRadius:'6px',
    //             display:hover==true ? 'block':'none'
    //         }}
    //         onPress={()=>{
    //             console.log('pressed clip ')
    //         }}
    //     >
    //         <Text
    //             style={{
    //                 transform:'translate(2px,-2px)',
    //                 position:'absolute',
    //                 top:'1px',
    //                 left:'2px',
    //                 fontWeight:50,
    //                 fontSize:'12px',
    //                 color:props.material.mt_budget<1 ? 'rgb(219,219,219)':'black'
    //             }}
    //         >₩</Text>
    //         <Text
    //             style={{
    //                 transform:'translate(2px,-2px)',
    //                 position:'absolute',
    //                 top:'1px',
    //                 left:'12px',
    //                 fontWeight:50,
    //                 fontSize:'12px',
    //                 color:props.material.mt_budget<2 ? 'rgb(219,219,219)':'black'
    //             }}
    //         >₩</Text>
    //         <Text
    //             style={{
    //                 transform:'translate(2px,-2px)',
    //                 position:'absolute',
    //                 top:'1px',
    //                 left:'22px',
    //                 fontWeight:50,
    //                 fontSize:'12px',
    //                 color:props.material.mt_budget<3 ? 'rgb(219,219,219)':'black'
    //             }}
    //         >₩</Text>
    //         <Text
    //             style={{
    //                 transform:'translate(2px,-2px)',
    //                 position:'absolute',
    //                 top:'1px',
    //                 left:'32px',
    //                 fontWeight:50,
    //                 fontSize:'12px',
    //                 color:props.material.mt_budget<4 ? 'rgb(219,219,219)':'black'
    //             }}
    //         >₩</Text>
    //         <Text
    //             style={{
    //                 transform:'translate(2px,-2px)',
    //                 position:'absolute',
    //                 top:'1px',
    //                 left:'42px',
    //                 fontWeight:50,
    //                 fontSize:'12px',
    //                 color:props.material.mt_budget<5 ? 'rgb(219,219,219)':'black'
    //             }}
    //         >₩</Text>
    //     </div>
    //     <TouchableOpacity
    //         style={{
    //             backgroundColor:'transparent',
    //             width:'20px',
    //             height:'20px',
    //             position:'absolute',
    //             zIndex:100,
    //             top:'6px',
    //             right:'6px',
    //             display:hover==true ? 'block':'none'
    //         }}
    //         onPress={()=>{
    //             setMaterialNumber(props.material.mt_no)
    //             props.toggleClipBoardOne()
    //         }}
    //     >
    //         <Image
    //             style={{
    //             display:'block',
    //             height:'20px',
    //             width:'20px',
    //             borderTopLeftRadius:10,
    //             borderTopRightRadius:10,
    //             zIndex:1,
    //             pointerEvents:'none',
    //             }}
    //             source={clipOff}

    //             >

    //         </Image>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //         onPress={()=>{
    //             console.log(props.material.mt_no)
    //             Linking.openURL('/partDetail?mt_no='+props.material.mt_no)
    //         }}
    //     >
    //     <Image
    //         style={{
    //         display:'block',
    //         height:'170px',
    //         width:'170px',
    //         borderTopLeftRadius:10,
    //         borderTopRightRadius:10,
    //         zIndex:1,
    //         pointerEvents:'none',
    //         filter:hover==true ? 'brightness(90%)':'brightness(100%)'
    //         }}
    //         source={{
    //             uri:
    //                 props.material.mt_feature_img_url
    //         }}

    //     >
    //     </Image>
    //     <View
    //         style ={{
    //         height:'70px',
    //         width:'170px',
    //         fontSize: '12pt',
    //         fontWeight:'500',
    //         textDecorationLine:'none',
    //         color:'white',
    //         textAlign:'center',
    //         flexDirection:'column',
    //         pointerEvents:'none',
    //         backgroundColor:'white',
    //         pointerEvents:'none',
    //         borderBottomLeftRadius:10,
    //         borderBottomRightRadius:10,
    //         padding:'10px'
    //         }}
    //     >
    //         <TouchableOpacity
    //             style={{
    //                 zIndex:100,
    //                 backgroundColor:'transparent',
    //                 position:'absolute',
    //                 top:'7px',
    //                 right:'7px',
    //                 height:'30px',
    //                 width:'30px',
    //                 display:props.material.mt_isdelivery=="Y"?"block":"none"
    //             }}
    //             onPress={()=>{
    //                 console.log(props.material.mt_isdelivery)
    //             }}
    //         >
    //             <View
    //             style={{
    //                 backgroundColor:'transparent',
    //                 display:'flex',
    //                 height:'30px',
    //                 width:'30px',
    //             }}
    //             >

    //                 <img
    //                     src={boxIcon}
    //                     style={{
    //                         width:'30px',
    //                         height:'30px',
    //                         right:'15px'
    //                     }}
    //                 >
    //                 </img>

    //             </View>
    //         </TouchableOpacity>
    //         <Text
    //         style ={{
    //             fontSize: '8pt',
    //             fontWeight:'700',
    //             textDecorationLine:'none',
    //             color:'black',
    //             textAlign:'left',
    //             pointerEvents:'none',
    //             backgroundColor:'transparent',
    //             pointerEvents:'none',

    //         }}
    //     >
    //         {props.material.vd_name}
    //     </Text>
    //         <Text
    //             style ={{
    //                 height:'100px',
    //                 width:'120px',
    //                 fontSize: '8pt',
    //                 fontWeight:'500',
    //                 textDecorationLine:'none',
    //                 color:'black',
    //                 textAlign:'left',
    //                 alignItems:'center',
    //                 justifyContent:'center',
    //                 flexDirection:'row',
    //                 pointerEvents:'none',
    //                 backgroundColor:'transparent',
    //                 pointerEvents:'none',

    //             }}
    //         >
    //         {props.material.mt_subname}

    //         </Text>
    //         <Text
    //         style ={{
    //             height:'100px',
    //             width:'120px',
    //             fontSize: '8pt',
    //             fontWeight:'500',
    //             textDecorationLine:'none',
    //             color:'rgb(85,85,85)',
    //             textAlign:'left',
    //             alignItems:'center',
    //             justifyContent:'center',
    //             flexDirection:'row',
    //             // marginLeft:'1px',
    //             // marginTop:'1px',
    //             pointerEvents:'none',
    //             backgroundColor:'transparent',
    //             pointerEvents:'none',
    //             whiteSpace:'nowrap',
    //             textOverflow: 'ellipsis',
    //             overflow:'hidden'
    //         }}
    //     >
    //     {props.material.mt_name}

    // </Text>

    // </View>
    // </TouchableOpacity>
    // </div>
    // </div>

    <TouchableOpacity
      style={{
        backgroundColor: "transparent",
        height: "240px",
        width: "170px",
        // marginLeft:'auto',
        // marginRight:'auto',
        marginTop: "20px",
        borderRadius: 10,
        // boxShadow: "0px 0px 3px black",
        backgroundColor: hover == true ? "rgba(0,0,0,0.1)" : "transparent",
      }}
      onPress={() => {
        console.log("pressed material " + props.material.mt_no);
        Linking.openURL(`/partDetail?mt_no=${props.material.mt_no}`);
      }}
      onMouseEnter={() => {
        // console.log('entered ' + index)
        if (localStorage.login != undefined) {
          var mem_no = JSON.parse(localStorage.login).message.split("_");
          console.log(mem_no);
        }
        setHover(true);
        console.log(props.material);
      }}
      onMouseLeave={() => {
        setHover(false);
        // console.log('exited '+index)
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "55px",
          height: "12px",
          position: "absolute",
          zIndex: 100,
          top: "6px",
          left: "6px",
          borderRadius: "6px",
          display: hover == true ? "block" : "none",
        }}
        onPress={() => {
          console.log("pressed clip " + props.material.mt_no);
        }}
      >
        <Text
          style={{
            transform: "translate(2px,-2px)",
            position: "absolute",
            top: "1px",
            left: "2px",
            fontWeight: 50,
            fontSize: "12px",
            color: props.material.mt_budget < 1 ? "rgb(219,219,219)" : "black",
          }}
        >
          ₩
        </Text>
        <Text
          style={{
            transform: "translate(2px,-2px)",
            position: "absolute",
            top: "1px",
            left: "12px",
            fontWeight: 50,
            fontSize: "12px",
            color: props.material.mt_budget < 2 ? "rgb(219,219,219)" : "black",
          }}
        >
          ₩
        </Text>
        <Text
          style={{
            transform: "translate(2px,-2px)",
            position: "absolute",
            top: "1px",
            left: "22px",
            fontWeight: 50,
            fontSize: "12px",
            color: props.material.mt_budget < 3 ? "rgb(219,219,219)" : "black",
          }}
        >
          ₩
        </Text>
        <Text
          style={{
            transform: "translate(2px,-2px)",
            position: "absolute",
            top: "1px",
            left: "32px",
            fontWeight: 50,
            fontSize: "12px",
            color: props.material.mt_budget < 4 ? "rgb(219,219,219)" : "black",
          }}
        >
          ₩
        </Text>
        <Text
          style={{
            transform: "translate(2px,-2px)",
            position: "absolute",
            top: "1px",
            left: "42px",
            fontWeight: 50,
            fontSize: "12px",
            color: props.material.mt_budget < 5 ? "rgb(219,219,219)" : "black",
          }}
        >
          ₩
        </Text>
      </div>

      <TouchableOpacity
        style={{
          backgroundColor: "transparent",
          width: "20px",
          height: "20px",
          position: "absolute",
          zIndex: 100,
          top: "6px",
          right: "6px",
          display: hover == true ? "block" : "none",
        }}
        onPress={() => {
          console.log("pressed clip " + props.material.mt_no);
          setMaterialNumber(props.material.mt_no);
          props.toggleClipBoard();
        }}
      >
        <Image
          style={{
            display: "block",
            height: "20px",
            width: "20px",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            zIndex: 1,
            pointerEvents: "none",
            // display:result.is_clipped==false ? 'block':'none'
            // transform:[{
            //     translateX:'0px',
            //     translateY:'0px'
            // }]
          }}
          source={clipOff}
        ></Image>
        {/* <Image
                                    style={{
                                    display:'block',
                                    height:'20px',
                                    width:'20px',
                                    borderTopLeftRadius:10,
                                    borderTopRightRadius:10,
                                    zIndex:1,
                                    pointerEvents:'none',
                                    display:result.is_clipped==true ? 'block':'none'
                
                                    }}
                                    source={clipOn}

                                    >
                                    
                                </Image> */}
      </TouchableOpacity>

      <Image
        style={{
          display: "block",
          height: "170px",
          width: "170px",
          //   borderTopLeftRadius: 10,
          //   borderTopRightRadius: 10,
          borderRadius: "10px",
          zIndex: 1,
          pointerEvents: "none",
          filter: hover == true ? "brightness(90%)" : "brightness(100%)",
          // transform:[{
          //     translateX:'0px',
          //     translateY:'0px'
          // }]
        }}
        source={{
          uri: props.material.mt_feature_img_url,
        }}
      ></Image>

      <View
        style={{
          height: "70px",
          width: "170px",
          fontSize: "12pt",
          fontWeight: "500",
          textDecorationLine: "none",
          color: "white",
          textAlign: "center",
          flexDirection: "column",
          // pointerEvents:'none',
          backgroundColor: "white",
          // pointerEvents:'none',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          padding: "10px",
        }}
      >
        <TouchableOpacity
          style={{
            zIndex: 100,
            backgroundColor: "transparent",
            position: "absolute",
            top: "7px",
            right: "7px",
            height: "30px",
            width: "30px",
            display: props.material.mt_isdelivery == "Y" ? "block" : "none",
          }}
          onPress={() => {
            console.log(props.material.mt_isdelivery);
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              display: "flex",
              height: "30px",
              width: "30px",
              // position:'absolute',
              // top:'7px',
              // right:'15px'
            }}
          >
            <img
              src={boxIcon}
              style={{
                //display: categoryOpened? 'none': 'block',
                width: "30px",
                height: "30px",
                right: "15px",
              }}
            ></img>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "transparent",
            width: props.material.mt_isdelivery == "Y" ? "123px" : "100%",
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              // height:'65pt',
              // width:'250px',
              fontSize: "8pt",
              fontWeight: "700",
              textDecorationLine: "none",
              color: "black",
              textAlign: "left",
              //alignItems:'center',
              //justifyContent:'center',
              //flexDirection:'row',
              //marginTop:'45pt',
              pointerEvents: "none",
              backgroundColor: "transparent",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {props.material.vd_name}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            height: "20px",
            width: props.material.mt_isdelivery == "Y" ? "123px" : "100%",
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              // height:'100px',
              width: "120px",
              fontSize: "8pt",
              fontWeight: "500",
              textDecorationLine: "none",
              color: "black",
              textAlign: "left",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              // marginLeft:'1px',
              // marginTop:'1px',
              pointerEvents: "none",
              backgroundColor: "transparent",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {props.material.mt_subname}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "transparent",
            height: "20px",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              height: "100px",
              width: "120px",
              fontSize: "8pt",
              fontWeight: "500",
              textDecorationLine: "none",
              color: "rgb(85,85,85)",
              textAlign: "left",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              // marginLeft:'1px',
              // marginTop:'1px',
              pointerEvents: "none",
              backgroundColor: "transparent",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {props.material.mt_name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Card;
