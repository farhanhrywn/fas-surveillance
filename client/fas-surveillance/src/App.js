import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './views/MainPage';
import Login from './views/Login';
import { Provider } from 'react-redux'
import store from './store';
import LandingPage from './views/LandingPage';
import AddItem from './views/AddItemPage';
import EditItem from './views/EditItemPage';
import EditHandover from './views/EditHandoverPage';

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
          <Route exact path='/add/item'>
            <AddItem />
          </Route>
          <Route exact path='/edit/item/:id'>
            <EditItem />
          </Route>
          <Route exact path='/edit/handover/:id'>
            <EditHandover />
          </Route>
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
