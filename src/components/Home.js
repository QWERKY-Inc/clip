import Navbar from './Navbar';
import Content from './Content';
import IntroImage from './IntroImage'
import NavBarFiller from './NavBarFiller'
import MainContent from './MainContent'
function Home() {
    return (
      <div className="Home">
          <Navbar />
          <NavBarFiller/>
          <IntroImage/>
          <MainContent />
      </div>
    );
  }
  
  export default Home;