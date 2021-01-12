import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,TouchableHighlight} from 'react-native';

function Brands() {
    return (
      <div className="Brands">
        <Navbar />
        <NavBarFiller/>
        <Text> 
          Brands
        </Text> 
        <Content/>  
      </div>
    );
  }
  export default Brands;