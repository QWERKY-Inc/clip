import React,{useEffect} from 'react';
import Navbar from './Navbar';

import NavBarFiller from './NavBarFiller';
import Font from 'react-font'
function MainMaterialCategory() {

    const[data,setData]=React.useState(undefined)
    const [height,setHeight]=React.useState(window.innerHeight)
  	const [width,setWidth]=React.useState(window.innerWidth)
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
                    <div className="MainContent"
                        style={{
                            display:'block',
                            height:'auto',
                            textAlign:'left',
                        }}
                    >
                    
                        <span
                            style={{
                                fontSize: '25px',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'black',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                margin:11,
                                marginLeft:'100px',
                                padding:'auto',
                                zIndex:2,
                            }}
                        > 
                        자재 카테고리
                        </span> 
                        <div
                            style={{
                                flex: 1, 
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto auto',
                                padding: '10px'
                            }}
                        >   

                            {data.listCategory.map((listCategory)=>

                                <a
                                    style={{
                                        borderRadius:10,
                                        height:'50pt',
                                        width:"350px",
                                        backgroundColor:'white',
                                        boxShadow:'0px 0px 2px',
                                        display:'flex',
                                        fontSize: '25pt',
                                        fontWeight:'700',
                                        textDecorationLine:'none',
                                        color:'black',
                                        textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginLeft:'auto',
                                        marginRight:'auto',
                                        marginTop:'25pt',
                                        padding:'auto',
                                        zIndex:2,
                                        backgroundColor:'white',
                                            
                                        
                                    }}
                                    href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                                >
                                    <div
                                        style={{
                                            transform:'translate(-36px,0px)'
                                        }}
                                    >
                                        <img
                                            style={{
                                            display:'block',
                                            height:'50pt',
                                            width:'60pt',
                                            borderTopLeftRadius:10,
                                            borderBottomLeftRadius:10,
                                            zIndex:1,
                                            pointerEvents:'none',
                                            }}
                                            src={listCategory.ct_img_url}

                                        >
                                        </img>
                                    </div>
                                    <a
                                        style={{
                                        transform:"translate(-15px,0px)",
                                        backgroundColor:'transparent'
                                        }}
                                    >
                                        <div
                                            style ={{
                                                height:'50pt',
                                                width:'200px',
                                                fontSize: '15pt',
                                                fontWeight:'700',
                                                textDecorationLine:'none',
                                                color:'black',
                                                textAlign:'center',
                                                flexDirection:'row',
                                                pointerEvents:'none',
                                                borderTopRightRadius:10,
                                                borderBottomRightRadius:10,
                                                backgroundColor:'transparent',
                                                pointerEvents:'none',
                                                
                                            }}
                                        >
                                            <div
                                                style ={{
                                                    height:'40pt',
                                                    width:'99px',
                                                    fontSize: '15pt',
                                                    fontWeight:'700',
                                                    textDecorationLine:'none',
                                                    color:'black',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    flexDirection:'row',
                                                    marginLeft:'5pt',
                                                    pointerEvents:'none',
                                                    backgroundColor:'transparent',
                                                    pointerEvents:'none',
                                                    lineHeight:'50pt',
                                                    textAlign:'left',
                                                }}
                                            >
                                                <span
                                                    style ={{
                                                        height:'50pt',
                                                        width:'99px',
                                                        fontSize: '15pt',
                                                        fontWeight:'700',
                                                        textDecorationLine:'none',
                                                        color:'black',
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        flexDirection:'row',
                                                        marginTop:'45pt',
                                                        pointerEvents:'none',
                                                        backgroundColor:'transparent',
                                                        pointerEvents:'none',
                                                        whiteSpace:'nowrap'
                                                    }}
                                                >
                                                    {listCategory.ct_text}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
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
                    <div className="MainContent"
                        style={{
                            display:'block',
                            height:'auto',
                            textAlign:'left',
                        }}
                    >
                    
                        <span
                            style={{
                                fontSize: '25px',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'black',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                margin:11,
                                marginLeft:'100px',
                                padding:'auto',
                                zIndex:2,
                            }}
                        > 
                        자재 카테고리
                        </span> 
                        <div
                            style={{
                                flex: 1, 
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto',
                                padding: '10px'
                            }}
                        >
                                
                            
                            {data.listCategory.map((listCategory)=>

                        
                                <a
                                    style={{
                                        borderRadius:10,
                                        height:'50pt',
                                        width:"350px",
                                        backgroundColor:'white',
                                        boxShadow:'0px 0px 2px',
                                        display:'flex',
                                        fontSize: '25pt',
                                        fontWeight:'700',
                                        textDecorationLine:'none',
                                        color:'black',
                                        textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginLeft:'auto',
                                        marginRight:'auto',
                                        marginTop:'25pt',
                                        padding:'auto',
                                        zIndex:2,
                                        backgroundColor:'white',
                                    }}
                                    href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                                >
                                    <div
                                        style={{
                                            transform:'translate(-36px,0px)'
                                        }}
                                    >
                                        <img
                                            style={{
                                                display:'block',
                                                height:'50pt',
                                                width:'60pt',
                                                borderTopLeftRadius:10,
                                                borderBottomLeftRadius:10,
                                                zIndex:1,
                                                pointerEvents:'none',
                                            }}
                                            src={listCategory.ct_img_url}
                                        >
                                        </img>
                                    </div>
                                    <a
                                        style={{
                                            transform:"translate(-15px,0px)",
                                            backgroundColor:'transparent'
                                        }}
                                    >
                                        <div
                                            style ={{
                                                height:'50pt',
                                                width:'200px',
                                                fontSize: '15pt',
                                                fontWeight:'700',
                                                textDecorationLine:'none',
                                                color:'black',
                                                textAlign:'center',
                                                flexDirection:'row',
                                                pointerEvents:'none',
                                                borderTopRightRadius:10,
                                                borderBottomRightRadius:10,
                                                backgroundColor:'transparent',
                                                pointerEvents:'none',
                                                
                                            }}
                                        >
                                            <div
                                                style ={{
                                                    height:'40pt',
                                                    width:'99px',
                                                    fontSize: '15pt',
                                                    fontWeight:'700',
                                                    textDecorationLine:'none',
                                                    color:'black',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    flexDirection:'row',
                                                    marginLeft:'5pt',
                                                    pointerEvents:'none',
                                                    backgroundColor:'transparent',
                                                    pointerEvents:'none',
                                                    lineHeight:'50pt',
                                                    textAlign:'left',
                                                }}
                                            >
                                                <span
                                                    style ={{
                                                        height:'50pt',
                                                        width:'99px',
                                                        fontSize: '15pt',
                                                        fontWeight:'700',
                                                        textDecorationLine:'none',
                                                        color:'black',
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        flexDirection:'row',
                                                        marginTop:'45pt',
                                                        pointerEvents:'none',
                                                        backgroundColor:'transparent',
                                                        pointerEvents:'none',
                                                        whiteSpace:'nowrap'
                                                    }}
                                                >
                                                    {listCategory.ct_text}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
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
                    <div className="MainContent"
                        style={{
                            display:'block',
                            height:'auto',
                            textAlign:'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '25px',
                                fontWeight:'700',
                                textDecorationLine:'none',
                                color:'black',
                                textAlign:'left',
                                alignItems:'center',
                                justifyContent:'center',
                                flexDirection:'row',
                                marginLeft:'auto',
                                marginRight:'auto',
                                padding:'auto',
                                zIndex:2,
                            }}
                        > 
                        자재 카테고리
                        </span> 
                    
                        <div
                            style={{
                                flex: 1, 
                                flexwrap:'wrap',
                                display: 'grid',
                                gridTemplateColumns: 'auto',
                                padding: '10px'
                            }}
                        >
                            
                        
                            {data.listCategory.map((listCategory)=>

                    
                                <a
                                    style={{
                                        borderRadius:10,
                                        height:'50pt',
                                        width:"350px",
                                        backgroundColor:'white',
                                        boxShadow:'0px 0px 2px',
                                        display:'flex',
                                        fontSize: '25pt',
                                        fontWeight:'700',
                                        textDecorationLine:'none',
                                        color:'black',
                                        textAlign:'left',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        flexDirection:'row',
                                        marginLeft:'auto',
                                        marginRight:'auto',
                                        marginTop:'25pt',
                                        padding:'auto',
                                        zIndex:2,
                                        backgroundColor:'white',
                                    }}
                                    href={`/searchPage?search_target=CATEGORY_DEPTH1&search_value=${listCategory.ct_id}`}
                                >
                                    <div
                                        style={{
                                            transform:'translate(-36px,0px)'
                                        }}
                                    >
                                        <img
                                            style={{
                                                display:'block',
                                                height:'50pt',
                                                width:'60pt',
                                                borderTopLeftRadius:10,
                                                borderBottomLeftRadius:10,
                                                zIndex:1,
                                                pointerEvents:'none',
                                            }}
                                            src={listCategory.ct_img_url}

                                        >
                                        </img>
                                    </div>
                                    <a
                                        style={{
                                            transform:"translate(-15px,0px)",
                                            backgroundColor:'transparent'
                                        }}
                                    >
                                        <div
                                            style ={{
                                                height:'50pt',
                                                width:'200px',
                                                fontSize: '15pt',
                                                fontWeight:'700',
                                                textDecorationLine:'none',
                                                color:'black',
                                                textAlign:'center',
                                                flexDirection:'row',
                                                pointerEvents:'none',
                                                borderTopRightRadius:10,
                                                borderBottomRightRadius:10,
                                                backgroundColor:'transparent',
                                                pointerEvents:'none',
                                            }}
                                        >
                                            <div
                                                style ={{
                                                    height:'40pt',
                                                    width:'99px',
                                                    fontSize: '15pt',
                                                    fontWeight:'700',
                                                    textDecorationLine:'none',
                                                    color:'black',
                                                    alignItems:'center',
                                                    justifyContent:'center',
                                                    flexDirection:'row',
                                                    marginLeft:'5pt',
                                                    pointerEvents:'none',
                                                    backgroundColor:'transparent',
                                                    pointerEvents:'none',
                                                    lineHeight:'50pt',
                                                    textAlign:'left',
                                                }}
                                            >
                                                <span
                                                    style ={{
                                                        height:'50pt',
                                                        width:'99px',
                                                        fontSize: '15pt',
                                                        fontWeight:'700',
                                                        textDecorationLine:'none',
                                                        color:'black',
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        flexDirection:'row',
                                                        marginTop:'45pt',
                                                        pointerEvents:'none',
                                                        backgroundColor:'transparent',
                                                        pointerEvents:'none',
                                                        whiteSpace:'nowrap'
                                                    }}
                                                >
                                                    {listCategory.ct_text}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
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
}
  
  export default MainMaterialCategory;