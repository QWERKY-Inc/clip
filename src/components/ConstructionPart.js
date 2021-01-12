import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,TouchableHighlight} from 'react-native';

function ConstructionPart() {
    return (
      <div className="ConstructionPart">
        <Navbar />
        <NavBarFiller/>
        <Text> 
          ConstructionPart
        </Text> 
        <Content/>  
      </div>
    );
  }
  export default ConstructionPart;