import React from 'react';
import './css/App.css';
import Login from './pages/Login';
import { BrowserRouter as Router , Route} from 'react-router-dom'
import Home from './pages/Home'
import { createBrowserHistory } from 'history'
import { PrivateRoute } from './auth/PrivateRoute';
import Store from './store/Store';
const history = createBrowserHistory();
function App() {

  return (
    <Store>
      <div className="App" >
        <Router history={history}>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/" component={Home}/>
        </Router>
      </div>
    </Store>
  );
}

export default App;
