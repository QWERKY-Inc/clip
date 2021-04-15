import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Content from "./Content";
import NavBarFiller from "./NavBarFiller";
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
// import Carousel from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
import ClipBoard from "./ClipBoard";
import Card from "./Card";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import downloadIcon from "../assets/download.png";
import clipOff from "../assets/clipOff.png";
import boxIcon from "../assets/icnBox.png";
import Font from "react-font";
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css'

const queryString = require("query-string");

function Brands(props) {
  // var bestProducts
  const [brandListData, setBrandListData] = React.useState([]);
  const [brandData, setBrandData] = React.useState({});
  const [detailView, setDetailView] = React.useState(false);
  const [brandId, setBrandId] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [clipBoard, setClipBoard] = React.useState(false);
  const [materialNumber, setMaterialNumber] = React.useState(undefined);
  const [height, setHeight] = React.useState(Dimensions.get("window").height);
  const [width, setWidth] = React.useState(Dimensions.get("window").width);
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
  const oneBrand = (jsonObj) => {
    console.log(jsonObj);
    fetch(
      "/onebrand?" +
        queryString.stringify({
          // ct_id:ct_id
          ...jsonObj,
        })
    )
      .then((res) => res.json())
      .then((incomingData) => {
        console.log(incomingData);
        setBrandData(incomingData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = () => {
    setHeight(Dimensions.get("window").height);
    setWidth(Dimensions.get("window").width);
    // console.log(height+" : "+width)
  };
  const toggleClipBoard = () => {
    setClipBoard(!clipBoard);
  };
  useEffect(() => {
    // fetch('/data')
    // .then(res=>res.json())
    // .then(data=>setData(data),()=>{
    //   console.log('data read : ' , data);
    // })
    Dimensions.addEventListener("change", onChange);
    const parsed = queryString.parse(props.location.search);
    if (localStorage.login != undefined) {
      var mem_no = undefined;
      mem_no = JSON.parse(localStorage.login).message.split("_")[0];
      parsed.mem_no = mem_no;
    } else {
      parsed.mem_no = "";
    }
    console.log(parsed.ct_id == undefined);
    if (parsed.ct_id == undefined) {
      brands();
      setDetailView(false);
    } else {
      oneBrand(parsed);
      setBrandId(parsed.ct_id);
      setDetailView(true);
    }
  }, []);

  useEffect(() => {
    console.log(typeof brandListData);
    console.log(brandListData);
  }, [brandListData]);
  useEffect(() => {
    if (brandData.bestproducts_brand) {
      // console.log('true')
      console.log(brandData);
      // bestProducts=brandData.bestproducts_brand.map((material)=>{

      //   <View
      //       style={{
      //         backgroundColor:'red',
      //         height:'200px',
      //         width:'200px'

      //       }}
      //   >
      //   <Image
      //       style={{
      //       display:'block',
      //       height:'200pt',
      //       width:'200pt',
      //       borderTopLeftRadius:10,
      //       borderTopRightRadius:10,
      //       zIndex:1,
      //       pointerEvents:'none',
      //       transform:[{
      //           translateX:'0px',
      //           translateY:'0px'
      //       }]
      //       }}
      //       source={{
      //           uri:
      //               material.mt_feature_img_url
      //       }}

      //   >
      //   </Image>
      //       <View
      //           style ={{
      //               height:'60pt',
      //               width:'200pt',
      //               fontSize: '15pt',
      //               fontWeight:'700',
      //               textDecorationLine:'none',
      //               color:'black',
      //               textAlign:'center',
      //               flexDirection:'row',
      //               pointerEvents:'none',
      //               backgroundColor:'rgb(33,33,33)',
      //               pointerEvents:'none',
      //               borderBottomLeftRadius:10,
      //               borderBottomRightRadius:10,

      //           }}
      //       >
      //           <View
      //               style ={{
      //                   height:'60pt',
      //                   width:'190pt',
      //                   fontSize: '15pt',
      //                   fontWeight:'700',
      //                   textDecorationLine:'none',
      //                   borderBottomLeftRadius:10,
      //                   borderBottomRightRadius:10,
      //                   color:'black',
      //                   textAlign:'center',
      //                   alignItems:'center',
      //                   justifyContent:'center',
      //                   flexDirection:'row',
      //                   marginLeft:'5pt',
      //                   pointerEvents:'none',
      //                   backgroundColor:"rgb(33,33,33)",
      //                   pointerEvents:'none',

      //               }}
      //           >
      //               <Text
      //                   style ={{
      //                       height:'65pt',
      //                       width:'250px',
      //                       fontSize: '15pt',
      //                       fontWeight:'700',
      //                       textDecorationLine:'none',
      //                       color:'white',
      //                       textAlign:'left',
      //                       alignItems:'center',
      //                       justifyContent:'center',
      //                       flexDirection:'row',
      //                       marginTop:'45pt',
      //                       pointerEvents:'none',
      //                       backgroundColor:'transparent',
      //                       pointerEvents:'none',

      //                   }}
      //               >
      //                   {material.mt_subname}
      //               </Text>
      //           </View>
      //       </View>
      //     </View>

      //     })
    }
  }, [brandData]);
  if (brandListData != []) {
    if (brandId != null) {
      if (brandData.bestproducts_brand) {
        if (brandData.brd_files != null) {
          // console.log(brandData.bestproducts_brand)
          return (
            <Font family="Noto Sans KR">
              <div>
                <div
                  style={{
                    display: clipBoard ? "block" : "none",
                  }}
                >
                  <ClipBoard
                    toggleClipBoard={toggleClipBoard}
                    material_num={materialNumber}
                    refresh={clipBoard}
                  />
                </div>
                <div>
                  <Navbar />
                  <NavBarFiller />
                  <div
                    style={{
                      backgroundColor: "transparent",
                      alignItems: "center",
                      padding: "auto",
                    }}
                  >
                    {/* <div
                style={{
                  backgroundColor:'red'
                }}
                > */}
                    <div
                      style={{
                        paddingTop: "100px",
                        paddingLeft: "150px",
                        paddingRight: "150px",
                      }}
                    >
                      <img
                        style={{
                          display: "block",
                          height: "300px",
                          width: "auto",
                          // borderTopLeftRadius:10,
                          // borderTopRightRadius:10,
                          borderRadius: "10px",
                          pointerEvents: "none",
                          marginLeft: "auto",
                          marginRight: "auto",
                          // transform:[{
                          //     translateX:'0px',
                          //     translateY:'0px'
                          // }]
                        }}
                        // source={{
                        //     uri:
                        //         brandData.brd_feature_img_url
                        // }}
                        src={brandData.brd_feature_img_url}
                      ></img>
                    </div>
                  </div>

                  {/* <Image
                        style={{
                        display:'block',
                        height:'200pt',
                        width:'200pt',
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        pointerEvents:'none',
                        transform:[{
                            translateX:'0px',
                            translateY:'0px'
                        }]
                        }}
                        source={{
                            uri:
                                brandData.brd_logo_img_url
                        }}
  
                    >
                    </Image> */}
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      paddingTop: "50px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                      }}
                    >
                      <div
                        style={{
                          // width:"450px",
                          // alignItems:'center',
                          // justifyContent:'center',
                          textAlign: "left",
                          flex: 2,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "20px",
                              fontWeight: "500",
                              textDecorationLine: "none",
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
                              color: "gray",
                              // textAlign:'center',
                              // alignItems:'center',
                              // justifyContent:'center',
                              flexDirection: "row",
                              // margin:11,
                              marginTop: "25px",
                              padding: "auto",
                              pointerEvents: "none",
                              lineHeight: "40px",
                              marginRight: "165px",
                            }}
                          >
                            {brandData.brd_intro}
                          </span>
                          <a
                            // onPress={() =>
                            //   // Linking.openURL(`/category?cat_num=${brandData.brd_no}`)
                            //   Linking.openURL(`/searchpage?search_target=BRAND&search_value=${brandData.brd_no}`)
                            //   // console.log('show material list ')
                            // }
                            href={
                              "/searchpage?search_target=BRAND&search_value=" +
                              brandData.brd_no
                            }
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                right: "165px",
                                marginTop: "25px",
                                marginLeft: "25px",
                                backgroundColor: "white",
                                width: "100px",
                                // flex:1,
                                height: "40px",
                                borderRadius: "10px",
                                borderColor: "black",
                                borderStyle: "solid",
                                borderWidth: "2px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                transform: "translate(0px,-12px)",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "transparent",
                                  // transform:[{
                                  //   translateX:'0px',
                                  //   translateY:'50px',
                                  // }]
                                  transform: "translate(0px,6px)",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "18px",
                                  }}
                                >
                                  자재 보기
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <br></br>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "30px",
                              fontWeight: "700",
                              textDecorationLine: "none",
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
                              color: "black",
                              // textAlign:'center',
                              // alignItems:'center',
                              // justifyContent:'center',
                              //flexDirection:'row',
                              // margin:11,
                              marginTop: "12px",
                              padding: "auto",
                              pointerEvents: "none",
                            }}
                          >
                            {brandData.brd_name_eng}
                          </span>
                          <span
                            style={{
                              fontSize: "30px",
                              fontWeight: "700",
                              textDecorationLine: "none",
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
                              color: "black",
                              // textAlign:'center',
                              // alignItems:'center',
                              // justifyContent:'center',
                              flexDirection: "row",
                              // margin:11,
                              marginTop: "6px",
                              padding: "auto",
                              pointerEvents: "none",
                            }}
                          >
                            {brandData.brd_name_kor}
                          </span>
                          <br></br>
                          <span
                            style={{
                              fontSize: "21px",
                              lineHeight: "40px",
                            }}
                          >
                            {brandData.brd_description}
                          </span>
                        </div>
                      </div>
                    </div>
                    <br></br>
                  </div>

                  <div
                    style={{
                      paddingLeft: "150px",
                      paddingRight: "150px",
                    }}
                  >
                    <Carousel
                      style={{
                        borderRadius: 10,
                      }}
                      showArrows={true}
                      showStatus={false}
                      showIndicators={true}
                      showThumbs={false}
                      infiniteLoop={true}
                      autoPlay={true}
                      interval={4500}
                      transitionTime={500}
                      emulateTouch={true}
                      stopOnHover={false}
                      //swipeScrollTolerance={1}
                      useKeyboardArrows={true}
                      //centerSlidePercentage={10}
                    >
                      {brandData.pictures_brand.map((atom) => (
                        <div
                          style={{
                            backgroundColor: "gainsboro",
                          }}
                        >
                          <img
                            src={atom.pic_url}
                            style={{
                              height: "300px",
                              width: "auto",
                              // borderRadius:10
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      paddingTop: "50px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        textDecorationLine: "none",
                        color: "black",
                        textAlign: "left",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: "100px",
                        pointerEvents: "none",
                        backgroundColor: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      인기상품
                    </span>
                  </div>
                  <div
                    style={{
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div
                      style={{
                        overflowX: "scroll",
                      }}
                    >
                      <div
                        style={{
                          // columnCount:3,
                          // flexwrap:'wrap',
                          // justifyContent:'space-between',
                          // flexDirection:'row',
                          // display: 'grid',
                          // gridTemplateColumns: 'auto auto auto auto auto',
                          // marginLeft:'150px',
                          // marginRight:'150px',
                          // backgroundColor:'transparent',

                          // flexwrap:'wrap',
                          // justifyContent:'space-between',
                          // display: 'grid',
                          // gridTemplateColumns: 'auto auto auto auto auto',
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {brandData.bestproducts_brand.map((material, index) => (
                          <Card
                            material={material}
                            toggleClipBoard={toggleClipBoard}
                          />
                          // <div
                          //   style={{
                          //     backgroundColor: "transparent",
                          //     height: "240px",
                          //     width: "170px",
                          //     marginLeft: "7px",
                          //     marginRight: "7px",
                          //     marginTop: "20px",
                          //     marginBottom: "20px",
                          //     borderRadius: 10,
                          //     boxShadow: "0px 0px 3px black",
                          //   }}
                          //   onMouseEnter={() => {
                          //     console.log("entered " + index);
                          //     var mem_no = JSON.parse(
                          //       localStorage.login
                          //     ).message.split("_");
                          //     console.log(mem_no);
                          //     setHover(index);
                          //     console.log(brandData);
                          //   }}
                          //   onMouseLeave={() => {
                          //     setHover(null);
                          //     console.log("exited " + index);
                          //   }}
                          // >
                          //   <div
                          //     style={{
                          //       position: "relative",
                          //     }}
                          //   >
                          //     <div
                          //       style={{
                          //         backgroundColor: "white",
                          //         width: "55px",
                          //         height: "12px",
                          //         position: "absolute",
                          //         zIndex: 100,
                          //         top: "6px",
                          //         left: "6px",
                          //         borderRadius: "6px",
                          //         display: hover == index ? "block" : "none",
                          //       }}
                          //       onPress={() => {
                          //         console.log("pressed clip ");
                          //       }}
                          //     >
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "2px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 1
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "12px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 2
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "22px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 3
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "32px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 4
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "42px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 5
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //     </div>
                          //   </div>
                          //   <div
                          //     style={{
                          //       position: "relative",
                          //       // backgroundColor:'red'
                          //     }}
                          //   >
                          //     <div
                          //       style={{
                          //         backgroundColor: "transparent",
                          //         width: "20px",
                          //         height: "20px",
                          //         position: "absolute",
                          //         zIndex: 100,
                          //         top: "6px",
                          //         right: "6px",
                          //         display: hover == index ? "block" : "none",
                          //       }}
                          //       // onPress={()=>{
                          //       //     console.log('pressed clip ' + brandData.bestproducts_brand[index].mt_no)
                          //       //     setMaterialNumber(brandData.bestproducts_brand[index].mt_no)
                          //       //     toggleClipBoard()
                          //       // }}
                          //       onClick={() => {
                          //         console.log(
                          //           "pressed clip " +
                          //             brandData.bestproducts_brand[index].mt_no
                          //         );
                          //         setMaterialNumber(
                          //           brandData.bestproducts_brand[index].mt_no
                          //         );
                          //         toggleClipBoard();
                          //       }}
                          //     >
                          //       <img
                          //         style={{
                          //           display: "block",
                          //           height: "20px",
                          //           width: "20px",
                          //           borderTopLeftRadius: 10,
                          //           borderTopRightRadius: 10,
                          //           zIndex: 1,
                          //           pointerEvents: "none",
                          //           // transform:[{
                          //           //     translateX:'0px',
                          //           //     translateY:'0px'
                          //           // }]
                          //         }}
                          //         //source={clipOff}
                          //         src={clipOff}
                          //       ></img>
                          //     </div>
                          //   </div>
                          //   <a
                          //     //   onPress={()=>{

                          //     //     Linking.openURL('/partDetail?mt_no='+brandData.bestproducts_brand[index].mt_no)
                          //     // }}
                          //     href={
                          //       "/partDetail?mt_no=" +
                          //       brandData.bestproducts_brand[index].mt_no
                          //     }
                          //     style={{
                          //       textDecoration: "none",
                          //     }}
                          //   >
                          //     <img
                          //       style={{
                          //         display: "block",
                          //         height: "170px",
                          //         width: "170px",
                          //         borderTopLeftRadius: 10,
                          //         borderTopRightRadius: 10,
                          //         zIndex: 1,
                          //         pointerEvents: "none",
                          //         filter:
                          //           hover == index
                          //             ? "brightness(90%)"
                          //             : "brightness(100%)",
                          //         // transform:[{
                          //         //     translateX:'0px',
                          //         //     translateY:'0px'
                          //         // }]
                          //       }}
                          //       // source={{
                          //       //     uri:
                          //       //         material.mt_feature_img_url
                          //       // }}
                          //       src={material.mt_feature_img_url}
                          //     ></img>
                          //     <div
                          //       style={{
                          //         height: "50px",
                          //         width: "150px",
                          //         fontSize: "12pt",
                          //         fontWeight: "500",
                          //         textDecoration: "none",
                          //         color: "white",
                          //         textAlign: "center",
                          //         flexDirection: "column",
                          //         pointerEvents: "none",
                          //         backgroundColor: "transparent",
                          //         pointerEvents: "none",
                          //         borderBottomLeftRadius: 10,
                          //         borderBottomRightRadius: 10,
                          //         padding: "10px",
                          //         position: "relative",
                          //       }}
                          //     >
                          //       <div
                          //         style={{
                          //           zIndex: 100,
                          //           backgroundColor: "transparent",
                          //           position: "absolute",
                          //           top: "7px",
                          //           right: "7px",
                          //           height: "30px",
                          //           width: "30px",
                          //           display:
                          //             material.mt_isdelivery == "Y"
                          //               ? "block"
                          //               : "none",
                          //         }}
                          //         // onPress={()=>{
                          //         //     console.log(material)
                          //         // }}
                          //         onClick={() => {
                          //           console.log(material);
                          //         }}
                          //       >
                          //         <div
                          //           style={{
                          //             backgroundColor: "transparent",
                          //             display: "flex",
                          //             height: "30px",
                          //             width: "30px",
                          //             // position:'absolute',
                          //             // top:'7px',
                          //             // right:'15px'
                          //           }}
                          //         >
                          //           <img
                          //             src={boxIcon}
                          //             style={{
                          //               //display: categoryOpened? 'none': 'block',
                          //               width: "30px",
                          //               height: "30px",
                          //               right: "15px",
                          //             }}
                          //           ></img>
                          //         </div>
                          //       </div>
                          //       <div
                          //         style={{
                          //           backgroundColor: "transparent",
                          //           textDecoration: "none",
                          //           textAlign: "left",
                          //         }}
                          //       >
                          //         <span
                          //           style={{
                          //             // height:'65pt',
                          //             // width:'250px',
                          //             fontSize: "8pt",
                          //             fontWeight: "700",
                          //             textDecoration: "none",
                          //             textDecorationLine: "none",
                          //             color: "black",
                          //             textAlign: "left",
                          //             //alignItems:'center',
                          //             //justifyContent:'center',
                          //             //flexDirection:'row',
                          //             //marginTop:'45pt',
                          //             pointerEvents: "none",
                          //             backgroundColor: "transparent",
                          //             // pointerEvents:'none',
                          //           }}
                          //         >
                          //           {material.vd_name}
                          //         </span>
                          //         <span
                          //           style={{
                          //             height: "100px",
                          //             width: "120px",
                          //             fontSize: "8pt",
                          //             fontWeight: "500",
                          //             textDecoration: "none",
                          //             color: "black",
                          //             textAlign: "left",
                          //             alignItems: "center",
                          //             justifyContent: "center",
                          //             flexDirection: "row",
                          //             // marginLeft:'1px',
                          //             // marginTop:'1px',
                          //             pointerEvents: "none",
                          //             backgroundColor: "transparent",
                          //             pointerEvents: "none",
                          //           }}
                          //         >
                          //           {material.mt_subname}
                          //         </span>
                          //         <span
                          //           style={{
                          //             height: "100px",
                          //             width: "120px",
                          //             fontSize: "8pt",
                          //             fontWeight: "500",
                          //             textDecoration: "none",
                          //             color: "rgb(85,85,85)",
                          //             textAlign: "left",
                          //             alignItems: "center",
                          //             justifyContent: "center",
                          //             flexDirection: "row",
                          //             // marginLeft:'1px',
                          //             // marginTop:'1px',
                          //             pointerEvents: "none",
                          //             backgroundColor: "transparent",
                          //             pointerEvents: "none",
                          //             whiteSpace: "nowrap",
                          //             textOverflow: "ellipsis",
                          //             overflow: "hidden",
                          //           }}
                          //         >
                          //           {material.mt_name}
                          //         </span>
                          //       </div>
                          //     </div>
                          //   </a>
                          // </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      paddingTop: "50px",
                    }}
                  >
                    <br></br>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      paddingTop: "50px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        textDecorationLine: "none",
                        color: "black",
                        textAlign: "left",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: "100px",
                        pointerEvents: "none",
                        backgroundColor: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      다운로드 가능한 파일
                    </span>
                    <div
                      style={{
                        gridTemplateColumns: "auto auto auto",
                      }}
                    >
                      {brandData.brd_files.map((file) => (
                        <div
                          style={{
                            backgroundColor: "transparent",
                            paddingTop: "15px",
                            paddingBottom: "15px",
                          }}
                        >
                          <a
                            style={{
                              fontSize: "8pt",
                              fontWeight: "500",
                              textDecorationLine: "none",
                              color: "black",
                              textAlign: "left",
                              // alignItems:'center',
                              // justifyContent:'center',
                              // flexDirection:'row',
                              marginTop: "100px",
                              backgroundColor: "transparent",
                            }}
                            href={file.fl_url}
                          >
                            <div
                              style={{
                                backgroundColor: "transparent",
                                alignItems: "center",
                                justifyContent: "center",
                                // flexDirection:'row',
                                float: "left",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "transparent",
                                  display: "inline-block",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  // flexDirection:'row'
                                  padding: "5px",
                                }}
                              >
                                {/* <img
                          src={downloadIcon}
                          style={{
                            height:"15px"
                          }}
                        >
                      </img> */}
                                <img
                                  style={{
                                    display: "inline-block",
                                    height: "12px",
                                    width: "12px",
                                    marginTop: "20px",
                                    // borderTopLeftRadius:10,
                                    // borderTopRightRadius:10,
                                    // borderRadius:'10px',
                                    // pointerEvents:'none',
                                    // marginLeft:'auto',
                                    // marginRight:'auto'
                                  }}
                                  // source={{
                                  //   uri:downloadIcon
                                  // }}
                                  src={downloadIcon}
                                ></img>
                              </div>
                              <div
                                style={{
                                  backgroundColor: "transparent",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  display: "inline-block",
                                  padding: "5px",
                                }}
                              >
                                <span
                                  style={{
                                    display: "inline-block",
                                    fontSize: "9pt",
                                    fontWeight: "500",
                                    textDecorationLine: "none",
                                    color: "black",
                                    textAlign: "left",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    // marginTop:'100px',
                                    pointerEvents: "none",
                                    backgroundColor: "transparent",
                                    pointerEvents: "none",
                                    transform: [
                                      {
                                        translateX: "0px",
                                        translateY: "-100px",
                                      },
                                    ],
                                  }}
                                >
                                  {file.fl_displayname}
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: "100px",
                    width: "100vw",
                    backgroundColor: "transparent",
                  }}
                ></div>
              </div>
            </Font>
          );
        } else {
          // console.log(brandData.bestproducts_brand)
          return (
            <Font family="Noto Sans KR">
              <div>
                <div
                  style={{
                    display: clipBoard ? "block" : "none",
                  }}
                >
                  <ClipBoard
                    toggleClipBoard={toggleClipBoard}
                    material_num={materialNumber}
                    refresh={clipBoard}
                  />
                </div>
                <div>
                  <Navbar />
                  <NavBarFiller />
                  <div
                    style={{
                      backgroundColor: "transparent",
                      alignItems: "center",
                      padding: "auto",
                    }}
                  >
                    {/* <div
                style={{
                  backgroundColor:'red'
                }}
                > */}
                    <div
                      style={{
                        paddingTop: "100px",
                        paddingLeft: "150px",
                        paddingRight: "150px",
                      }}
                    >
                      <img
                        style={{
                          display: "block",
                          height: "300px",
                          width: "auto",
                          // borderTopLeftRadius:10,
                          // borderTopRightRadius:10,
                          borderRadius: "10px",
                          pointerEvents: "none",
                          marginLeft: "auto",
                          marginRight: "auto",
                          // transform:[{
                          //     translateX:'0px',
                          //     translateY:'0px'
                          // }]
                        }}
                        // source={{
                        //     uri:
                        //         brandData.brd_feature_img_url
                        // }}
                        src={brandData.brd_feature_img_url}
                      ></img>
                    </div>
                  </div>
                  {/* <Image
                        style={{
                        display:'block',
                        height:'200pt',
                        width:'200pt',
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        pointerEvents:'none',
                        transform:[{
                            translateX:'0px',
                            translateY:'0px'
                        }]
                        }}
                        source={{
                            uri:
                                brandData.brd_logo_img_url
                        }}
  
                    >
                    </Image> */}
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      paddingTop: "50px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                      }}
                    >
                      <div
                        style={{
                          // width:"450px",
                          // alignItems:'center',
                          // justifyContent:'center',
                          textAlign: "left",
                          flex: 2,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "20px",
                              fontWeight: "500",
                              textDecorationLine: "none",
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
                              color: "gray",
                              // textAlign:'center',
                              // alignItems:'center',
                              // justifyContent:'center',
                              flexDirection: "row",
                              // margin:11,
                              marginTop: "25px",
                              padding: "auto",
                              pointerEvents: "none",
                              lineHeight: "40px",
                              marginRight: "165px",
                            }}
                          >
                            {brandData.brd_intro}
                          </span>
                          <a
                            // onPress={() =>
                            //   // Linking.openURL(`/category?cat_num=${brandData.brd_no}`)
                            //   Linking.openURL(`/searchpage?search_target=BRAND&search_value=${brandData.brd_no}`)
                            //   // console.log('show material list ')
                            // }
                            href={
                              "/searchpage?search_target=BRAND&search_value=" +
                              brandData.brd_no
                            }
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                right: "165px",
                                marginTop: "25px",
                                marginLeft: "25px",
                                backgroundColor: "white",
                                width: "100px",
                                // flex:1,
                                height: "40px",
                                borderRadius: "10px",
                                borderColor: "black",
                                borderStyle: "solid",
                                borderWidth: "2px",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                transform: "translate(0px,-12px)",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "transparent",
                                  // transform:[{
                                  //   translateX:'0px',
                                  //   translateY:'50px',
                                  // }]
                                  transform: "translate(0px,6px)",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "18px",
                                  }}
                                >
                                  자재 보기
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                        <br></br>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "30px",
                              fontWeight: "700",
                              textDecorationLine: "none",
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
                              color: "black",
                              // textAlign:'center',
                              // alignItems:'center',
                              // justifyContent:'center',
                              //flexDirection:'row',
                              // margin:11,
                              marginTop: "12px",
                              padding: "auto",
                              pointerEvents: "none",
                            }}
                          >
                            {brandData.brd_name_eng}
                          </span>
                          <span
                            style={{
                              fontSize: "30px",
                              fontWeight: "700",
                              textDecorationLine: "none",
                              // color:'white',
                              // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                              // textShadowOffset: {width: 0, height: 0},
                              // textShadowRadius: 2,
                              color: "black",
                              // textAlign:'center',
                              // alignItems:'center',
                              // justifyContent:'center',
                              flexDirection: "row",
                              // margin:11,
                              marginTop: "6px",
                              padding: "auto",
                              pointerEvents: "none",
                            }}
                          >
                            {brandData.brd_name_kor}
                          </span>
                          <br></br>
                          <span
                            style={{
                              fontSize: "21px",
                              lineHeight: "40px",
                            }}
                          >
                            {brandData.brd_description}
                          </span>
                        </div>
                      </div>
                    </div>
                    <br></br>
                  </div>

                  <div
                    style={{
                      paddingLeft: "150px",
                      paddingRight: "150px",
                    }}
                  >
                    <Carousel
                      style={{
                        borderRadius: 10,
                      }}
                      showArrows={true}
                      showStatus={false}
                      showIndicators={true}
                      showThumbs={false}
                      infiniteLoop={true}
                      autoPlay={true}
                      interval={4500}
                      transitionTime={500}
                      emulateTouch={true}
                      stopOnHover={false}
                      //swipeScrollTolerance={1}
                      useKeyboardArrows={true}
                      //centerSlidePercentage={10}
                    >
                      {brandData.pictures_brand.map((atom) => (
                        <div
                          style={{
                            backgroundColor: "gainsboro",
                          }}
                        >
                          <img
                            src={atom.pic_url}
                            style={{
                              height: "300px",
                              width: "auto",
                              // borderRadius:10
                            }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      paddingTop: "50px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        textDecorationLine: "none",
                        color: "black",
                        textAlign: "left",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: "100px",
                        pointerEvents: "none",
                        backgroundColor: "transparent",
                        pointerEvents: "none",
                      }}
                    >
                      인기상품
                    </span>
                  </div>
                  <div
                    style={{
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      backgroundColor: "transparent",
                    }}
                  >
                    <div
                      style={{
                        overflowX: "scroll",
                      }}
                    >
                      <div
                        style={{
                          // columnCount:3,
                          // flexwrap:'wrap',
                          // justifyContent:'space-between',
                          // flexDirection:'row',
                          // display: 'grid',
                          // gridTemplateColumns: 'auto auto auto auto auto',
                          // marginLeft:'150px',
                          // marginRight:'150px',
                          // backgroundColor:'transparent',

                          // flexwrap:'wrap',
                          // justifyContent:'space-between',
                          // display: 'grid',
                          // gridTemplateColumns: 'auto auto auto auto auto',
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {brandData.bestproducts_brand.map((material, index) => (
                          <Card
                            material={material}
                            toggleClipBoard={toggleClipBoard}
                          />
                          // <div
                          //   style={{
                          //     backgroundColor: "transparent",
                          //     height: "240px",
                          //     width: "170px",
                          //     marginLeft: "7px",
                          //     marginRight: "7px",
                          //     marginTop: "20px",
                          //     marginBottom: "20px",
                          //     borderRadius: 10,
                          //     boxShadow: "0px 0px 3px black",
                          //   }}
                          //   onMouseEnter={() => {
                          //     console.log("entered " + index);
                          //     var mem_no = JSON.parse(
                          //       localStorage.login
                          //     ).message.split("_");
                          //     console.log(mem_no);
                          //     setHover(index);
                          //     console.log(brandData);
                          //   }}
                          //   onMouseLeave={() => {
                          //     setHover(null);
                          //     console.log("exited " + index);
                          //   }}
                          // >
                          //   <div
                          //     style={{
                          //       position: "relative",
                          //     }}
                          //   >
                          //     <div
                          //       style={{
                          //         backgroundColor: "white",
                          //         width: "55px",
                          //         height: "12px",
                          //         position: "absolute",
                          //         zIndex: 100,
                          //         top: "6px",
                          //         left: "6px",
                          //         borderRadius: "6px",
                          //         display: hover == index ? "block" : "none",
                          //       }}
                          //       onPress={() => {
                          //         console.log("pressed clip ");
                          //       }}
                          //     >
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "2px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 1
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "12px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 2
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "22px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 3
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "32px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 4
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //       <span
                          //         style={{
                          //           transform: "translate(2px,-2px)",
                          //           position: "absolute",
                          //           top: "1px",
                          //           left: "42px",
                          //           fontWeight: 50,
                          //           fontSize: "12px",
                          //           color:
                          //             brandData.bestproducts_brand[index]
                          //               .mt_budget < 5
                          //               ? "rgb(219,219,219)"
                          //               : "black",
                          //         }}
                          //       >
                          //         ₩
                          //       </span>
                          //     </div>
                          //   </div>
                          //   <div
                          //     style={{
                          //       position: "relative",
                          //       // backgroundColor:'red'
                          //     }}
                          //   >
                          //     <div
                          //       style={{
                          //         backgroundColor: "transparent",
                          //         width: "20px",
                          //         height: "20px",
                          //         position: "absolute",
                          //         zIndex: 100,
                          //         top: "6px",
                          //         right: "6px",
                          //         display: hover == index ? "block" : "none",
                          //       }}
                          //       // onPress={()=>{
                          //       //     console.log('pressed clip ' + brandData.bestproducts_brand[index].mt_no)
                          //       //     setMaterialNumber(brandData.bestproducts_brand[index].mt_no)
                          //       //     toggleClipBoard()
                          //       // }}
                          //       onClick={() => {
                          //         console.log(
                          //           "pressed clip " +
                          //             brandData.bestproducts_brand[index].mt_no
                          //         );
                          //         setMaterialNumber(
                          //           brandData.bestproducts_brand[index].mt_no
                          //         );
                          //         toggleClipBoard();
                          //       }}
                          //     >
                          //       <img
                          //         style={{
                          //           display: "block",
                          //           height: "20px",
                          //           width: "20px",
                          //           borderTopLeftRadius: 10,
                          //           borderTopRightRadius: 10,
                          //           zIndex: 1,
                          //           pointerEvents: "none",
                          //           // transform:[{
                          //           //     translateX:'0px',
                          //           //     translateY:'0px'
                          //           // }]
                          //         }}
                          //         //source={clipOff}
                          //         src={clipOff}
                          //       ></img>
                          //     </div>
                          //   </div>
                          //   <a
                          //     //   onPress={()=>{

                          //     //     Linking.openURL('/partDetail?mt_no='+brandData.bestproducts_brand[index].mt_no)
                          //     // }}
                          //     href={
                          //       "/partDetail?mt_no=" +
                          //       brandData.bestproducts_brand[index].mt_no
                          //     }
                          //     style={{
                          //       textDecoration: "none",
                          //     }}
                          //   >
                          //     <img
                          //       style={{
                          //         display: "block",
                          //         height: "170px",
                          //         width: "170px",
                          //         borderTopLeftRadius: 10,
                          //         borderTopRightRadius: 10,
                          //         zIndex: 1,
                          //         pointerEvents: "none",
                          //         filter:
                          //           hover == index
                          //             ? "brightness(90%)"
                          //             : "brightness(100%)",
                          //         // transform:[{
                          //         //     translateX:'0px',
                          //         //     translateY:'0px'
                          //         // }]
                          //       }}
                          //       // source={{
                          //       //     uri:
                          //       //         material.mt_feature_img_url
                          //       // }}
                          //       src={material.mt_feature_img_url}
                          //     ></img>
                          //     <div
                          //       style={{
                          //         height: "50px",
                          //         width: "150px",
                          //         fontSize: "12pt",
                          //         fontWeight: "500",
                          //         textDecoration: "none",
                          //         color: "white",
                          //         textAlign: "center",
                          //         flexDirection: "column",
                          //         pointerEvents: "none",
                          //         backgroundColor: "transparent",
                          //         pointerEvents: "none",
                          //         borderBottomLeftRadius: 10,
                          //         borderBottomRightRadius: 10,
                          //         padding: "10px",
                          //         position: "relative",
                          //       }}
                          //     >
                          //       <div
                          //         style={{
                          //           zIndex: 100,
                          //           backgroundColor: "transparent",
                          //           position: "absolute",
                          //           top: "7px",
                          //           right: "7px",
                          //           height: "30px",
                          //           width: "30px",
                          //           display:
                          //             material.mt_isdelivery == "Y"
                          //               ? "block"
                          //               : "none",
                          //         }}
                          //         // onPress={()=>{
                          //         //     console.log(material)
                          //         // }}
                          //         onClick={() => {
                          //           console.log(material);
                          //         }}
                          //       >
                          //         <div
                          //           style={{
                          //             backgroundColor: "transparent",
                          //             display: "flex",
                          //             height: "30px",
                          //             width: "30px",
                          //             // position:'absolute',
                          //             // top:'7px',
                          //             // right:'15px'
                          //           }}
                          //         >
                          //           <img
                          //             src={boxIcon}
                          //             style={{
                          //               //display: categoryOpened? 'none': 'block',
                          //               width: "30px",
                          //               height: "30px",
                          //               right: "15px",
                          //             }}
                          //           ></img>
                          //         </div>
                          //       </div>
                          //       <div
                          //         style={{
                          //           backgroundColor: "transparent",
                          //           textDecoration: "none",
                          //           textAlign: "left",
                          //         }}
                          //       >
                          //         <span
                          //           style={{
                          //             // height:'65pt',
                          //             // width:'250px',
                          //             fontSize: "8pt",
                          //             fontWeight: "700",
                          //             textDecoration: "none",
                          //             textDecorationLine: "none",
                          //             color: "black",
                          //             textAlign: "left",
                          //             //alignItems:'center',
                          //             //justifyContent:'center',
                          //             //flexDirection:'row',
                          //             //marginTop:'45pt',
                          //             pointerEvents: "none",
                          //             backgroundColor: "transparent",
                          //             // pointerEvents:'none',
                          //           }}
                          //         >
                          //           {material.vd_name}
                          //         </span>
                          //         <span
                          //           style={{
                          //             height: "100px",
                          //             width: "120px",
                          //             fontSize: "8pt",
                          //             fontWeight: "500",
                          //             textDecoration: "none",
                          //             color: "black",
                          //             textAlign: "left",
                          //             alignItems: "center",
                          //             justifyContent: "center",
                          //             flexDirection: "row",
                          //             // marginLeft:'1px',
                          //             // marginTop:'1px',
                          //             pointerEvents: "none",
                          //             backgroundColor: "transparent",
                          //             pointerEvents: "none",
                          //           }}
                          //         >
                          //           {material.mt_subname}
                          //         </span>
                          //         <span
                          //           style={{
                          //             height: "100px",
                          //             width: "120px",
                          //             fontSize: "8pt",
                          //             fontWeight: "500",
                          //             textDecoration: "none",
                          //             color: "rgb(85,85,85)",
                          //             textAlign: "left",
                          //             alignItems: "center",
                          //             justifyContent: "center",
                          //             flexDirection: "row",
                          //             // marginLeft:'1px',
                          //             // marginTop:'1px',
                          //             pointerEvents: "none",
                          //             backgroundColor: "transparent",
                          //             pointerEvents: "none",
                          //             whiteSpace: "nowrap",
                          //             textOverflow: "ellipsis",
                          //             overflow: "hidden",
                          //           }}
                          //         >
                          //           {material.mt_name}
                          //         </span>
                          //       </div>
                          //     </div>
                          //   </a>
                          // </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "150px",
                      paddingRight: "150px",
                      paddingTop: "50px",
                    }}
                  >
                    <br></br>
                  </div>
                </div>

                <div
                  style={{
                    height: "100px",
                    width: "100vw",
                    backgroundColor: "transparent",
                  }}
                ></div>
              </div>
            </Font>
          );
        }
      } else {
        console.log(brandData);
        return (
          <div>
            <Navbar />
            <NavBarFiller />
            <img
              style={{
                display: "block",
                height: "200pt",
                width: "200pt",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                // zIndex:1,
                pointerEvents: "none",
                transform: [
                  {
                    translateX: "0px",
                    translateY: "0px",
                  },
                ],
              }}
              // source={{
              //     uri:
              //         // data.listCategory[i].ct_img_url
              //         //listMoodboard.mb_img_url
              //         brandData.brd_feature_img_url
              // }}
              src={brandData.brd_feature_img_url}
            ></img>
            <img
              style={{
                display: "block",
                height: "200pt",
                width: "200pt",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                // zIndex:1,
                pointerEvents: "none",
                transform: [
                  {
                    translateX: "0px",
                    translateY: "0px",
                  },
                ],
              }}
              // source={{
              //     uri:
              //         // data.listCategory[i].ct_img_url
              //         //listMoodboard.mb_img_url
              //         brandData.brd_logo_img_url
              // }}
              src={brandData.brd_logo_img_url}
            ></img>
            <span>{brandData.brd_name_kor}</span>
            <span>{brandData.brd_intro}</span>
            <span>{brandData.brd_description}</span>
          </div>
        );
      }
    } else {
      return (
        <div
          style={{
            position: "fixed",
            // height:'200vh',
            width: "100vw",
            top: "100px",
            left: 0,
            backgroundColor: "white",
            // display:`${brandsDropDownDisplay}%`,
            display: "block",
            // overflowY:'scroll'
          }}
        >
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
                paddingLeft: "25px",
              }}
            >
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  textDecorationLine: "none",
                  // color:'white',
                  // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                  // textShadowOffset: {width: 0, height: 0},
                  // textShadowRadius: 2,
                  color: "black",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  // margin:11,
                  marginTop: "5px",
                  padding: "auto",
                  pointerEvents: "none",
                }}
              >
                브랜드
              </span>
            </div>
            <div
              style={{
                padding: "25px",
              }}
            >
              <div
                style={{
                  // columnCount:3,
                  flexwrap: "wrap",
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                  overflowY: "scroll",
                }}
              >
                {brandListData.map((brand) => (
                  <a
                    // onPress={() =>
                    //   Linking.openURL(`/brands?ct_id=${brand.ct_id}`)
                    // }
                    href={"/brands?ct_id=" + brand.ct_id}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "left",
                        padding: "5pt",
                      }}
                    >
                      <span
                        style={{
                          height: "65pt",
                          width: "250px",
                          fontSize: "15pt",
                          fontWeight: "700",
                          textDecorationLine: "none",
                          color: "black",
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
                        {brand.ct_text}
                      </span>
                      <br></br>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Navbar />
        <NavBarFiller />
        <div className="MainContent">
          <Navbar />
          <NavBarFiller />
          <span>로딩중 ...</span>
          {/* <Content/> */}
        </div>
      </div>
    );
  }
}
export default Brands;
