import React from 'react';
import IntroImg from '../assets/introImage.png';
import icon1 from '../assets/icon1.svg'
import icon2 from '../assets/icon2.svg'
import icon3 from '../assets/icon3.svg'
import './content.css';



const IntroImage=() => {

	const introImage=(
		<div className="introImage">
			<div id="introImageDiv">
				<img id="introImage" src={IntroImg} alt="Logo" title="Logo" >
				</img>
				{/* <div id="introduction">
					<p className="titleFont introText">온라인 자재 라이브러리</p>
					<p className="regularFont introText">쉽고 빠르게 자재를 찾아보고</p>
					<p className="regularFont introText">샘플을 받아볼 수 있는 방법!</p>
					<p className="regularFont introText">디자인 전문가라면 언제나 무료!</p>
				</div> */}
			</div>
		</div>
	)

  return (
    <div className="content">
		{/* {filler} */}
		{introImage}

    </div>
  )
}

export default IntroImage;