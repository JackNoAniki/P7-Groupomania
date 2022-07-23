import Banner from './Banner'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Publish from './Publish'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../styles/App.css';

function App() {
    return (
    <Router>
        <Banner />
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/publish" component={Publish} />
        </Switch>
    </Router>
    )
}

export default App;
