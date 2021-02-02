import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,Image,TouchableHighlight,Linking,Dimensions} from 'react-native';
// import Carousel from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { RadioButton } from 'react-native-paper';

// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
// import 'pure-react-carousel/dist/react-carousel.es.css'

const queryString = require('query-string');

function Brands(props) {
  // var bestProducts
  const[brandListData,setBrandListData]=React.useState([])
  const[brandData,setBrandData]=React.useState({})
  const[detailView,setDetailView]=React.useState(false)
  const[brandId,setBrandId]=React.useState(null)
  const [height,setHeight]=React.useState(Dimensions.get('window').height)
  const [width,setWidth]=React.useState(Dimensions.get('window').width)
  const [checked, setChecked] = React.useState('first');

  const oneBrand=(ct_id)=>{
      fetch('/onebrand?'+
        queryString.stringify({
              ct_id:ct_id
            })
      )
      .then(res=>res.json())
      .then((incomingData)=>{
        console.log(incomingData)
        setBrandData(incomingData)
        })
      .catch(err=>{
          console.log(err)
      })
    
  }
  const onChange=()=>{
    setHeight(Dimensions.get('window').height)
    setWidth(Dimensions.get('window').width)
    // console.log(height+" : "+width)
  }
  useEffect(() => {
    Dimensions.addEventListener('change',onChange)
    const parsed = queryString.parse(props.location.search);
    console.log(parsed.ct_id==undefined)

    
  },[])
  return (
    <div>
    <Navbar />
    <NavBarFiller/>
        <div className="MainContent">
            <View>
                <View
                    style={{
                        flexDirection:'row',
                        backgroundColor:'transparent',
                        alignItems:'center',
                        paddingLeft:'65px',
                        paddingRight:'65px'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setChecked('first')}
                        style={{
                            width:'150px',
                            textAlign:'left'
                        }}
                    >
                        <Text>
                            모든 품목 보기  
                        </Text>
                    </TouchableOpacity>
                    <RadioButton
                        value="first"
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                        color="rgb(255,123,88)"
                    />
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        backgroundColor:'transparent',
                        alignItems:'center',
                        paddingLeft:'65px',
                        paddingRight:'65px'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setChecked('second')}
                        style={{
                            width:'150px',
                            textAlign:'left'
                        }}
                    >
                        <Text>
                            샘플 주문 가능한 품목
                        </Text>
                    </TouchableOpacity>
                
                <RadioButton
                    value="second"
                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('second')}
                    color="rgb(255,123,88)"
                />
                </View>
                <View

                    style={{
                        flexDirection:'row',
                        backgroundColor:'transparent',
                        alignItems:'center',
                        paddingLeft:'65px',
                        paddingRight:'65px'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setChecked('third')}
                        style={{
                            width:'150px',
                            textAlign:'left'
                        }}
                    >
                        <Text>
                            클립 당일 묵음발송 품목
                        </Text>
                    </TouchableOpacity>
                <RadioButton
                    value="third"
                    status={ checked === 'third' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('third')}
                    color="rgb(255,123,88)"
                />
                </View>
                <div
                    style={{
                        paddingTop:'15px',
                        paddingLeft:'65px',
                        paddingRight:'65px'
                    }}
                >
                    <div
                    
                    style={{
                    height:'1px',
                    width:'187px',
                    // border:'none',
                    color:'rgb(219,219,219)',
                    backgroundColor:'rgb(219,219,219)'
                    }} 
                
                    >
                    </div>
                </div>
            </View>
        </div>
    </div>
  );
}
  
  export default Brands;