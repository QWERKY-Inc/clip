import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,TouchableHighlight} from 'react-native';

function MainContent() {

    const[data,setData]=React.useState({})
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
    if(data.listCategory){
        return (
            <div className="MainContent">
             
                <Navbar />
                <NavBarFiller/>
                <Text> 
                  MainContent
                </Text> 
                <br></br>
                {/* <Text> */}
                  {/* {data.listCategory[0].ct_img_url} */}
                  {/* construction */}
                  <img src={data.listCategory[0].ct_img_url}/>
                {/* </Text> */}
                <Content/>
                  
                
              
            </div>
          );
    }
    else{
        return (
            <div className="MainContent">
             
                <Navbar />
                <NavBarFiller/>
                <Text> 
                  MainContent
                </Text> 
                <br></br>
                <Text>
                  loading
                </Text>
                <Content/>
                  
                
              
            </div>
          );
    }
    
  }
  
  export default MainContent;