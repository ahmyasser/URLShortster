import Home from './UI/Home/Home';
import Redirect from './UI/Redirect';
import Stats from './UI/Stats';
import './App.css'
import {BrowserRouter,Route,Switch} from 'react-router-dom';



function App() {


  return ( 
  <BrowserRouter>

      <Switch>
        <Route exact path="/" >
        <Home />
        </Route>
        <Route exact path="/:shorturl">
          <Redirect />
        </Route>
        <Route exact path="/:shorturl/stats">
          <Stats />
      </Route>
      
    </Switch>
  </BrowserRouter>
   );
}

export default App;



