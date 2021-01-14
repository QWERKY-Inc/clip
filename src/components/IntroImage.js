import React from 'react';
import IntroImg from '../assets/introImage.png';
import './content.css';



const IntroImage=() => {

	const introImage=(
		<div className="introImage">
			<div id="introImageDiv"
			style={{
				backgroundColor:'transparent',
			}}
			>
				<img id="introImage" src={IntroImg} alt="Logo" title="Logo" >
				</img>

			</div>
		</div>
	)

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
		{introImage}

    </div>
  )
}

export default IntroImage;