import Banner from './Banner'
import logo from '../assets/logo-groupomania-orange.png'

import '../styles/App.css';

function App() {
  return (
    <div>
      <Banner>
          <img src={logo} alt='logo-groupomania' className='gpmn-logo' />

      </Banner>
    </div>
  );
}

export default App;
