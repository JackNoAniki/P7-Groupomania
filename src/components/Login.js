import '../styles/login.css'
import { useHistory } from 'react-router-dom'

function Login() {

    const history = useHistory()
    const NavigateToSignup = () => {
        const signup = '/signup'
        history.push(signup)
    }

    const NavigateToHome = () => {
        const home = '/home'
        history.push(home)
    }

    return (
    <div className='loginContainer'>
        <h1 className='pageTitle'>CONNEXION</h1>
        <form>
            <label htmlFor='email'>Adresse email: </label>
            <input type='email' className='inputContainer' id='loginEmail' name='email' size='50' />
            <br /><br />
            <label htmlFor='password'>Mot de passe: </label>
            <input type='password' className='inputContainer' id='loginPassword' name='password' size='50' />
        </form>
        <br />
        <br />
        <button onClick={NavigateToHome}>Se connecter</button>
        <p>Vous n'avez pas de compte ? <span onClick={NavigateToSignup}>Inscrivez-vous !</span></p>
    </div>
    )
}

export default Login
