import React,{useEffect} from 'react';
import './navbar.css';
import Logo from './../logo.svg';

const Navbar=() => {
  const [scrolled,setScrolled]=React.useState(false);

  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })

  let x=['navbar'];
  if(scrolled){
    x.push('scrolled');
  }
  return (
    <header className={x.join(" ")}>
      <div className="headerContainer">
        <button type="button" className="navToggle">
          <i id="menuBar"class="fas fa-bars"></i>
        </button>
        <div className="logo">
          <img src={Logo} alt="Logo" title="Logo" />
        </div>
        <div className="headerLinks">
          <div className="headerLinksAccount">
            <button className='linkButton'>             
              로그인
            </button>
          </div>
          <div className="headerLinksJoin">
            <button className='linkButton'>
              가입
            </button>
          </div>
        </div>
        <div className="headerMobileSearch">
          <div className="miniSearch">
            <form className="inputPlaceholder">
              <div className="inputPlaceholder">
                <input id='searchBar'type='text' ></input>
              </div>
              <button id='submitButton'type='submit'>
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
       

        

    </header>
  )
};

export default Navbar;