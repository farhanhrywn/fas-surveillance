import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './views/MainPage';
import Login from './views/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/home'>
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
