import React,{useEffect} from 'react';
import IntroImg from '../assets/introImage.png';
import './content.css';
import {TouchableOpacity,Text,Linking} from 'react-native';


const IntroImage=() => {
	const[data,setData]=React.useState(undefined)
	const[banner,setBanner]=React.useState(undefined)
	useEffect(() => {
        // Dimensions.addEventListener('change',onChange)
        fetch('/Mainitem')
            .then(res=>res.json())
            .catch(err=>{
                console.log(err)
            })
            .then(incomingData=>setData(incomingData),()=>{
            
            console.log(data)
            console.log('data read : ' , data.listBanner[0].banner_img_url);
			// var integer=Math.floor(Math.random()*data.listBanner.length)
			
			// setBanner(data.listBanner[Math.floor(Math.random()*data.listBanner.length)])
			})
            .catch(err=>{
                console.log(err)
            })
      },[])
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
						onPress={() => 
							Linking.openURL(`/brands?ct_id=${data.listBanner[0].banner_detail}`)
							}
                    >
				<img id="introImage" 
					src={data.listBanner[0].banner_img_url} 
					alt="Logo" 
					title="Logo" 
					style={{
						height:'500pt',
						width:'auto'
					}}
				>
				</img>
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