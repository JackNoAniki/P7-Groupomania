import '../styles/login.css'
import { useHistory } from 'react-router-dom'

function Login() {

    const NavigateToSignup = () => {
        const signup = '/signup'
        const history = useHistory()
        history.push(signup)
    }

    return (
    <div className='loginContainer'>
        <h1 className='pageTitle'>CONNEXION</h1>
        <form>
            <label for='email'>Adresse email: </label>
            <input type='email' className='inputContainer' id='loginEmail' name='email' size='50' />
            <br /><br />
            <label for='password'>Mot de passe: </label>
            <input type='password' className='inputContainer' id='loginPassword' name='password' size='50' />
        </form>
        <br />
        <br />
        <p>Vous n'avez pas de compte ? <span onClick={NavigateToSignup}>Inscrivez-vous !</span></p>
    </div>
    )
}

export default Login
