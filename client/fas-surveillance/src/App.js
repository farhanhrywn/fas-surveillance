import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './views/MainPage';
import MainPageSpv from './views/MainPageSpv';
import Login from './views/Login';
import LoginSpv from './views/LoginSpv';
import { Provider } from 'react-redux'
import store from './store';
import LandingPage from './views/LandingPage';
import LandingPageSpv from './views/LandingPageSpv';
import AddItem from './views/AddItemPage';
import EditItem from './views/EditItemPage';
import EditHandover from './views/EditHandoverPage';
import ForgetPasswordTech from './views/ForgetPasswordTech';
import ForgetPasswordSpv from './views/ForgetPasswordSpv';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/login/spv'>
            <LoginSpv />
          </Route>
          <Route path='/landing'>
            <LandingPage />
          </Route>
          <Route path='/landing/spv'>
            <LandingPageSpv />
          </Route>
          <Route path='/home'>
            <MainPage />
          </Route>
          <Route path='/add/item'>
            <AddItem />
          </Route>
          <Route path='/edit/item/:id'>
            <EditItem />
          </Route>
          <Route path='/edit/handover/:id'>
            <EditHandover />
          </Route>
          <Route path='/home/spv'>
            <MainPageSpv />
          </Route>
          <Route path='/forget-password/tech'>
            <ForgetPasswordTech />
          </Route>
          <Route path='/forget-password/spv'>
            <ForgetPasswordSpv />
          </Route>
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
