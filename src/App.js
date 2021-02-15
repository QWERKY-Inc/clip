import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar';
import Content from './components/Content';
import Category from './components/Category';
import ConstructionPart from './components/ConstructionPart';
import Brands from './components/Brands'
import PrivacyPolicy from './components/PrivacyPolicy'
import Terms from './components/Terms'
import SearchPage from './components/SearchPage'
import PartDetail from './components/PartDetail'
// import {UserProvider,useUser} from './components/user-context'
import {BrowserRouter as BrowserRouter,Router,Switch,Route,Link} from 'react-router-dom'

// const globalState={
//   phoneNum:undefined,
//   idNum:undefined,
//   password:undefined
// }
// const globalStateContext = React.createContext(globalState)


function App() {
  return (
    // <UserProvider>
      <div className="App">
        <BrowserRouter>
          {/* <Navbar />
          <Content /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/clip" component={Home} />
            <Route exact path="/category" component={Category}/>
            <Route exact path="/constructionPart" component={ConstructionPart}/>
            <Route exact path="/brands" component={Brands}/>
            <Route exact path="/privacypolicy" component={PrivacyPolicy}/>
            <Route exact path="/terms" component={Terms}/>
            <Route exact path="/searchpage" component={SearchPage}/>
            <Route exact path="/partdetail" component={PartDetail}/>
            
          </Switch>
        </BrowserRouter>
      </div>
    // </UserProvider>
  );
}

export default App;
