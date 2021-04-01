import Navbar from './Navbar';
import Content from './Content';
import IntroImage from './IntroImage'
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
          <MainMaterialCategory/>
          <MainMoodBoard/>
          <Footer/>
      </div>
    );
  }
  
  export default Home;