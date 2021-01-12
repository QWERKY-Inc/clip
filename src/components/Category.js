import Navbar from './Navbar';
import Content from './Content';
import NavBarFiller from './NavBarFiller';
import {TouchableOpacity,Text,View,Modal,TouchableHighlight} from 'react-native';

function Category() {

    return (
      <div className="Category">
       
          <Navbar />
          <NavBarFiller/>
          <Text> 
            Category
          </Text> 
          <Content/>
            
          
        
      </div>
    );
  }
  
  export default Category;