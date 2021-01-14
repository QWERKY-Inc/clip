import React from 'react';
import IntroImg from '../assets/introImage.png';
import './content.css';



const IntroImage=() => {

	const introImage=(
		<div className="introImage">
			<div id="introImageDiv"
			// style={{
			// 	backgroundColor:'orange',
			// }}
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
			height:300
		}}
	>
		{/* {filler} */}
		{introImage}

    </div>
  )
}

export default IntroImage;