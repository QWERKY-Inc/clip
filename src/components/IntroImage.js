import React,{useEffect} from 'react';
import IntroImg from '../assets/introImage.png';
import './content.css';
import {TouchableOpacity,Text,Linking,Dimensions,View,Image} from 'react-native';
const queryString = require('query-string');

const IntroImage=() => {
	const[data,setData]=React.useState(undefined)
	const[banner,setBanner]=React.useState(undefined)
	const[bannerData,setBannerData]=React.useState(undefined)
	const [height,setHeight]=React.useState(Dimensions.get('window').height)
  	const [width,setWidth]=React.useState(Dimensions.get('window').width)
	const oneBanner=(jsonObj)=>{
		console.log(jsonObj)
		  fetch('/banner?'+
			queryString.stringify({
				  // ct_id:ct_id
				  ...jsonObj
				})
		  )
		  .then(res=>res.json())
		  .then((incomingData)=>{
			console.log(incomingData)
			setData(incomingData)
			})
		  .catch(err=>{
			  console.log(err)
		  })
		
	  }
	const onChange=()=>{
		setHeight(Dimensions.get('window').height)
		setWidth(Dimensions.get('window').width)
		// console.log(height+" : "+width)
	}
	useEffect(() => {
		Dimensions.addEventListener('change',onChange)
		const parsed = {}
		if(localStorage.login!=undefined){
			var mem_no=undefined
			mem_no=JSON.parse(localStorage.login).message.split('_')[0]
			parsed.mem_no=mem_no 
		}
		else{
			parsed.mem_no=""
		}
		// parsed.ct_id=data.listBanner[0].banner_detail
		oneBanner(parsed)
		// fetch('/Mainitem')
        //     .then(res=>res.json())
        //     .catch(err=>{
        //         console.log(err)
        //     })
        //     .then(incomingData=>setData(incomingData),()=>{
				
        //     console.log(data)
        //     console.log('data read : ' , data.listBanner[0].banner_img_url);
		// 	// var integer=Math.floor(Math.random()*data.listBanner.length)
			
		// 	// setBanner(data.listBanner[Math.floor(Math.random()*data.listBanner.length)])
		// 	})
        //     .catch(err=>{
        //         console.log(err)
        //     })
        // fetch('/Mainitem')
        //     .then(res=>res.json())
        //     .catch(err=>{
        //         console.log(err)
        //     })
        //     .then(incomingData=>setData(incomingData),()=>{
		// 		// const parsed = {}
		// 		// if(localStorage.login!=undefined){
		// 		// 	var mem_no=undefined
		// 		// 	mem_no=JSON.parse(localStorage.login).message.split('_')[0]
		// 		// 	parsed.mem_no=mem_no 
		// 		// }
		// 		// else{
		// 		// 	parsed.mem_no=""
		// 		// }
		// 		// parsed.ct_id=data.listBanner[0].banner_detail
		// 		// oneBrand(parsed)
        //     console.log(data)
        //     console.log('data read : ' , data.listBanner[0].banner_img_url);
		// 	// var integer=Math.floor(Math.random()*data.listBanner.length)
			
		// 	// setBanner(data.listBanner[Math.floor(Math.random()*data.listBanner.length)])
		// 	})
        //     .catch(err=>{
        //         console.log(err)
        //     })
	  },[])
	useEffect(()=>{
		
	},[data])
	// const introImage=(
	// 	<div className="introImage">
	// 		<div id="introImageDiv"
	// 		style={{
	// 			backgroundColor:'transparent',
	// 		}}
	// 		>
	// 			 {/* <img id="introImage" src={IntroImg} alt="Logo" title="Logo" >
	// 			</img> */}

	// 			<img id="introImage" src={data.listBanner[0].banner_img_url} alt="Logo" title="Logo" >
	// 			</img>


	// 		</div>
	// 	</div>
	// )
	if(data!=undefined){
		// console.log(data)
		return (
			<div className="introImageContainer"
				style={{
					backgroundColor:'transparent',
					// height:'300pt'
					margin:0,
					height:'auto'
				}}
			>
				{/* {filler} */}
				{/* {introImage} */}
				<div className="introImage">
			{/* <a
				href="/brands"
			> */}
			<div id="introImageDiv"
			style={{
				backgroundColor:'transparent',
				alignItems:'center',
				justifyContent:'center'
			}}
			>
				 {/* <img id="introImage" src={IntroImg} alt="Logo" title="Logo" >
				</img> */}
				<TouchableOpacity
                        style={{
                            // borderRadius:10,
                            // height:'65pt',
                            // width:"350px",
                            // backgroundColor:'white',
                            // boxShadow:'0px 0px 2px',
                            
                            //     fontSize: '25pt',
                            //     fontWeight:'700',
                            //     textDecorationLine:'none',
                            //     // color:'white',
                            //     // textShadowColor: 'rgba(0, 0, 0, 0.85)',
                            //     // textShadowOffset: {width: 0, height: 0},
                            //     // textShadowRadius: 2,
                            //     color:'black',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                            //     marginLeft:'auto',
                            //     marginRight:'auto',
                            //     marginTop:'25pt',
                            //     padding:'auto',
                            //     zIndex:2
                                // backgroundColor:'red'
                            
                        }}
						onPress={() => {
							// console.log(data[0].banner_detail)
							Linking.openURL(`/brands?ct_id=${data[0].banner_detail}`)
						}}
                    >
				<View
					style={{
						backgroundColor:'transparent',
						height:'300px',
						width:width-330+'px',
						marginBottom:'30px'
					}}
				>
					<View
						style={{
							position:'absolute',
							bottom:'15px',
							left:'15px',
							backgroundColor:'transparent',
							zIndex:100,

						}}
					>
						<Text
							style={{
								color:'white',
								fontSize:'20px',
								fontWeight:700,
								textShadow:'1px 1px black'
							}}
						>
							{data[0].detail.brd_name_eng}
						</Text>
						<Text
							style={{
								color:'white',
								fontSize:'18px',
								fontWeight:700,
								textShadow:'1px 1px black'
							}}
						>
							{data[0].detail.brd_name_kor}
						</Text>
					</View>
					<Image
                      style={{
                      display:'block',
                      height:'300px',
                      width:'auto',
                      // borderTopLeftRadius:10,
                      // borderTopRightRadius:10,
					  borderRadius:'10px',
					  zIndex:99,
                    //   pointerEvents:'none',
                    //   marginLeft:'auto',
                    //   marginRight:'auto'
                      // transform:[{
                      //     translateX:'0px',
                      //     translateY:'0px'
                      // }]
                      }}
                      source={{
                          uri:
						  	data[0].detail.brd_feature_img_url
                      }}

                  >
              </Image>
				{/* <img id="introImage" 
					src={data[0].detail.brd_feature_img_url} 
					alt="banner" 
					title="banner" 
					style={{
						height:'300px',
						width:width-330+'px'
					}}
				>
				</img> */}
					
				</View>
				{/* <img id="introImage" 
					src={data.listBanner[0].banner_img_url} 
					alt="Logo" 
					title="Logo" 
					style={{
						height:'300px',
						width:'auto'
					}}
				>
				</img> */}
				{/* <img id="introImage" 
					src={brandData.brd_feature_img_url} 
					alt="Logo" 
					title="Logo" 
					style={{
						height:'300px',
						width:'auto'
					}}
				>
				</img> */}
				</TouchableOpacity>

			</div>
			{/* </a> */}
		</div>

			</div>
		)
	}
	else{
		return(
			<div>
				<Text>
				로딩중 ...
				</Text>
			</div>
		)
	}
}

export default IntroImage;