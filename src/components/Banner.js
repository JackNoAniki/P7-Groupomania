import '../styles/Banner.css'
import logo from '../assets/logo-groupomania-orange.png'

function Banner() {
    return (
        <div className="gpmn-banner">
            <img src={logo} alt='logo-groupomania' className='gpmn-logo' />
        </div>
        
    )
}

export default Banner