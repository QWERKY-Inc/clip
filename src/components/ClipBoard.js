import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import Pagination from './Pagination';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
import xIcon from '../assets/x.png';

function ClipBoard(props){
    const[clipBoardData,setClipBoardData]=React.useState(undefined)

    // if(clipBoardData){
        return (
          <div
          style={{
          position:'fixed',
          height:'100vh',
          width:'100vw',
          top:0,
          left:0,
          backgroundColor:'rgba(0,0,0,0.5)',
          display:'block',
          zIndex:101
          }}
      >
        <div
        style={{
          paddingTop:'100px',
          paddingLeft:'65px',
          paddingRight:'65px'
        }}
        >
          <div
            style={{
              textAlign:'left',
              // margin:'25pt'
              paddingLeft:'0px',
              paddingRight:'0px',
              backgroundColor:'transparent'
            }}
          >
          <div
              style={{
                height:'25px',
                width:'25px',
                backgroundColor:'transparent',
                position: 'absolute',
                top:'110px',
                left:'75px'
              }}
            >
              <TouchableOpacity
                onPress={()=>{
                  // console.log(detailedCategoryData)
                  props.toggleClipBoard()
                }}
              >
              <img
                src={xIcon}
                style={{
                  height:'25px',
                  width:'25px',
                }}
              >
              </img>
              </TouchableOpacity>
            </div>
            
            
           
          </div>

  
          <div
          style={{
            borderRadius:'10px',
            backgroundColor:'white',
            width:'80vw',
            height:'62vh',
            paddingTop:'15px',
            // columnCount:3,
            // flexwrap:'wrap',
            // flexDirection:'column',
            // display: 'grid',
            // gridTemplateColumns: 'auto auto',
            // // padding:'100px',
            overflowY: 'scroll',
          }}
          >

              <Text>클립하기</Text>
                {/* <Text>{props.material_num}</Text> */}
          </div>
        </div>
    </div>
        );
    //   }
    //     else{
    //         return(
    //             <div>
    //                 <Text>
    //                 로딩중 ...
    //                 </Text>
    //             </div>
    //         )
    //     }
}
export default ClipBoard