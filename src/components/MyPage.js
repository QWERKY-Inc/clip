import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,TouchableHighlight} from 'react-native';
import Font from 'react-font';
const queryString = require('query-string');

function MyPage(props) {

  const[data,setData]=React.useState({})
  const[catQ,setCatQ]=React.useState({cat_num: null})
    useEffect(() => {
      
      fetch('/data')
      .then(res=>res.json())
      .then(data=>setData(data),()=>{
        console.log('data read : ' , data);
      })
      const parsed = queryString.parse(props.location.search);

      console.log(parsed)
      setCatQ(parsed)
    },[])
    return (
    <Font family='Noto Sans KR'>
      <div className="MyPage">
          <Navbar />
          <NavBarFiller/>
          <div
            style={{
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: "65% 35%",
                gridGap: "16px"
            }}
          >
              <article
                style={{
                    padding: "8px",
                    display: "grid",
                    margin: "0 auto",
                    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", 
                    gridAutoRows: "minmax(264px, auto)",
                    gridGap: "16px"
                }}
              >
                  <div
                    style={{
                        width:"100%",
                        height:'100%',
                        backgroundColor:'red'
                    }}
                  >

                  </div>
                  <div
                    style={{
                        width:"100%",
                        height:'100%',
                        backgroundColor:'orange'
                    }}
                  >

                  </div>
              </article>
              <div
                style={{
                    width:'100%',
                    height:'100%',
                    backgroundColor:'yellow'
                }}
              >
                  Sidebar - Map
              </div>

          </div>
      </div>
    </Font>
    );
  }
  
  export default MyPage;