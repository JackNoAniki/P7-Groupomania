import Banner from './Banner'
import login from '../components/Login'
import signup from '../components/signup'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../styles/App.css';

function App() {
    return (
    <Router>
        <Banner />
        <Switch>
            <Route exact path="/" component={login} />
            <Route path="/signup" component={signup} />
        </Switch>
    </Router>
    )
}

export default App;
