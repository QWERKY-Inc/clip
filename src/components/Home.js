import Navbar from './Navbar';
import Content from './Content';
import IntroImage from './IntroImage'
import NavBarFiller from './NavBarFiller'
function Home() {
    return (
      <div className="Home">
          <Navbar />
          <NavBarFiller/>
          <IntroImage/>
          <Content />
      </div>
    );
  }
  
  export default Home;