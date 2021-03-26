import Navbar from './Navbar';
import Content from './Content';
import IntroImage from './IntroImage'
import IntroImagePure from './IntroImagePure'
import NavBarFiller from './NavBarFiller'
import MainMaterialCategory from './MainMaterialCategory'
import MainMoodBoard from './MainMoodBoard'
import Footer from './Footer'
function Home() {
    return (
      <div className="Home">
          <Navbar />
          <NavBarFiller/>
          <IntroImage/>
          {/* <IntroImagePure/> */}
          <MainMaterialCategory/>
          <MainMoodBoard/>
          <Footer/>
      </div>
    );
  }
  
  export default Home;