import React,{useEffect,useState} from 'react';
import Navbar from './Navbar';
import NavBarFiller from './NavBarFiller';
import Font from 'react-font'
import './MainMaterialCategory.css'
function MainMaterialCategory() {

    const[data,setData]=useState(undefined)
    const [height,setHeight]=useState(window.innerHeight)
  	const [width,setWidth]=useState(window.innerWidth)
      const handleResize = (e)=>{
		setHeight(window.innerHeight)
		setWidth(window.innerWidth)
	}
      useEffect(() => {
        window.addEventListener("resize",handleResize)
        fetch('/Mainitem')
            .then(res=>res.json())
            .catch(err=>{
                console.log(err)
            })
            .then(incomingData=>setData(incomingData),()=>{
            
            console.log(data)
            console.log('data read : ' , data.listCategory[0].ct_img_url);
            })
            .catch(err=>{
                console.log(err)
            })
      },[])
    
    if(width>1000){

        if(data!=undefined){
            return (
                <Font family='Noto Sans KR'>
                    <div className="MainContent">
                        <span className="Title"> 
                        자재 카테고리
                        </span> 
                        <div className="Grid3">   
                            {data.listCategory.map((listCategory)=>
                                <a 
                                    className="CategoryBox"
                                    href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                                >
                                    <div
                                        style={{
                                            transform:'translate(-36px,0px)'
                                        }}
                                    >
                                        <img
                                            className="CategoryImage"
                                            src={listCategory.ct_img_url}
                                        >
                                        </img>
                                    </div>
                                    <div
                                        style={{
                                        transform:"translate(-15px,0px)",
                                        backgroundColor:'transparent'
                                        }}
                                    >
                                        <div className="CategoryTextDivOne">
                                            <div className="CategoryTextDivTwo">
                                                <span className="CategoryText">
                                                    {listCategory.ct_text}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>                
                    </div>
                </Font>
            );
        }
        else{
            return (
                <Font family='Noto Sans KR'>
                    <div className="MainContent">
                    
                        <Navbar />
                        <NavBarFiller/>
                        <span>
                        로딩중 ...
                        </span>
                        {/* <Content/> */}
                        
                        
                    
                    </div>
                </Font>
            );
        }
    
    }
    else if(width>803 && width<=1000){
        if(data!=undefined){
            return (
                <Font family='Noto Sans KR'>
                    <div className="MainContent">
                        <span className="Title"> 
                        자재 카테고리
                        </span> 
                        <div className="Grid2">   
                            {data.listCategory.map((listCategory)=>
                                <a 
                                    className="CategoryBox"
                                    href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                                >
                                    <div
                                        style={{
                                            transform:'translate(-36px,0px)'
                                        }}
                                    >
                                        <img
                                            className="CategoryImage"
                                            src={listCategory.ct_img_url}
                                        >
                                        </img>
                                    </div>
                                    <div
                                        style={{
                                        transform:"translate(-15px,0px)",
                                        backgroundColor:'transparent'
                                        }}
                                    >
                                        <div className="CategoryTextDivOne">
                                            <div className="CategoryTextDivTwo">
                                                <span className="CategoryText">
                                                    {listCategory.ct_text}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>                
                    </div>
                </Font>    
            );
        }
        else{
            return (
                <Font family='Noto Sans KR'>
                    <div className="MainContent">
                        <Navbar />
                        <NavBarFiller/>
                        <span>
                        로딩중 ...
                        </span>                
                    </div>
                </Font>
            );
        }
    }
    else{
        if(data!=undefined){
            return (
                <Font family='Noto Sans KR'>
                    <div className="MainContent">
                        <span className="Title"> 
                        자재 카테고리
                        </span> 
                        <div className="Grid1">   
                            {data.listCategory.map((listCategory)=>
                                <a 
                                    className="CategoryBox"
                                    href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                                >
                                    <div
                                        style={{
                                            transform:'translate(-36px,0px)'
                                        }}
                                    >
                                        <img
                                            className="CategoryImage"
                                            src={listCategory.ct_img_url}
                                        >
                                        </img>
                                    </div>
                                    <div
                                        style={{
                                        transform:"translate(-15px,0px)",
                                        backgroundColor:'transparent'
                                        }}
                                    >
                                        <div className="CategoryTextDivOne">
                                            <div className="CategoryTextDivTwo">
                                                <span className="CategoryText">
                                                    {listCategory.ct_text}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>                
                    </div>
                </Font>);
        }
        else{
            return (
                <Font family='Noto Sans KR'>
                    <div className="MainContent">
                        <Navbar />
                        <NavBarFiller/>
                        <span>
                        로딩중 ...
                        </span>
                    </div>
                </Font>
            );
        }
    }
}
  
  export default MainMaterialCategory;