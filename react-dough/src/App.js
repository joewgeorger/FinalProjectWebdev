//Home for all the pages. Uses Router to switch between the different pages
import User from './User'
import Emp from './Employee'
import Login from './Login'
import SU from './Sign-Up'
import Logout from './Logout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <nav className="navbar navbar-expand-md justify-content-center navbar-light bg-light mb-4">
                <a className="navbar-brand" href = 'http://localhost:3000/'>Dough</a>
            </nav>
      <Switch>
        <Route path = '/' exact component = {Login} />
        <Route path = '/user' component = {User} />
        <Route path = '/emp' component = {Emp} />
        <Route path = '/sign-up' component = {SU} />
        <Route path = '/logout' component = {Logout} />
      </Switch>
    </Router>

  );
}

export default App;
