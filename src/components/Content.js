import React from 'react';
import IntroImg from '../assets/introImage.png';
import icon1 from '../assets/icon1.svg'
import icon2 from '../assets/icon2.svg'
import icon3 from '../assets/icon3.svg'
import './content.css';



const Content=() => {
	const filler=(
		<div className="headerFiller">
		</div>
	)
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
	const howItWorks=(
		<div className="howItWorksDiv">
			<p className="titleFont">다양한 자재를 검색하고, 다음날 오전까지 샘플을 받아보세요!</p>
			<div>
				<button id="howItWorksLink">사용방법</button>
			</div>
			<div>
				<div className='howToIconsDiv'>
					<img className='howToIcons'src={icon1}></img>
				</div>
			</div>
			<p className="subTitleFont">쉽고 간편하게 검색</p>
			<p className="regularFont">국내 및 해외 건축 인테리어 브랜드 및 자재를 한곳에서 쉽고 빠르게 검색해보세요.</p>
			<img className='howToIcons'src={icon2}></img>
			<p className="subTitleFont">샘플을 주문하면</p>
			<p className="regularFont">프로젝트에 필요한 샘플을 장바구니에 담고 주문하세요.</p>
			<img className='howToIcons'src={icon3}></img>
			<p className="subTitleFont">한박스로 당일발송</p>
			<p className="regularFont">주문한 샘플은 당일발송 됩니다. (영업일 기준 1-2일 배송완료)</p>

		</div>
	)
	
  const data=(
  	<div className="box">
  		<h2>temporary filler</h2>
  	</div>
  )

  return (
    <main className="content">
		{/* {filler}
		{introImage} */}
		{/* {howItWorks} */}
	    {data}
	    {data}
		{data}
    </main>
  )
}

export default Content;