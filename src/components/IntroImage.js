import React,{useEffect} from 'react';
import IntroImg from '../assets/introImage.png';
import './content.css';
import {TouchableOpacity,Text} from 'react-native';


const IntroImage=() => {
	const[data,setData]=React.useState(undefined)
	const[currentImg,setCurrentImg]=React.useState(undefined)
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
			setCurrentImg(data.listBanner[Math.floor(Math.random()*data.listBanner.length)])
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
			<div id="introImageDiv"
			style={{
				backgroundColor:'transparent',
			}}
			>
				 {/* <img id="introImage" src={IntroImg} alt="Logo" title="Logo" >
				</img> */}

				<img id="introImage" src={data.listBanner[0].banner_img_url} alt="Logo" title="Logo" >
				</img>


			</div>
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