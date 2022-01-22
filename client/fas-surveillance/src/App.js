import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './views/MainPage';
import Login from './views/Login';
import { Provider } from 'react-redux'
import store from './store';
import LandingPage from './views/LandingPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/landing'>
            <LandingPage />
          </Route>
          <Route exact path='/home'>
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
