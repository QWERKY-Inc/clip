import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,TouchableHighlight} from 'react-native';

function Category(props) {

  const[data,setData]=React.useState({})
    useEffect(() => {
      
      fetch('/data')
      .then(res=>res.json())
      .then(data=>setData(data),()=>{
        console.log('data read : ' , data);
      })
      console.log(props.location.search)
    },[])
    return (
      <div className="Category">
       
          <Navbar />
          <NavBarFiller/>
          <Text> 
            Category Data
          </Text> 
          <br></br>
          <Text>
            {data.lastname} {data.firstname}
          </Text>
          <Content/>
            
          
        
      </div>
    );
  }
  
  export default Category;