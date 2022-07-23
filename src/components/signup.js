import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Signup.css'


function Signup () {
    
    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const NavigateToLogin = () => {
        const login = "/"
        history.push(login)
    }

    function fetchSignupOrLogin() {
        const user = {
            email: userName,
            password: password 
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }

            fetch(`http://localhost:8000/api/auth/signup`, requestOptions)
                .then((response) => response.json())
                .catch((error => console.log(error)))
    }

    return (
    <div className='loginContainer'>
        <h1 className='pageTitle'>INSCRIPTION</h1>
        <div className='fromContainer'>
            <form>
                <label htmlFor='email'>Adresse email: </label>
                <input type='email' className='inputContainer' id='loginEmail' name='email' size='50' onChange={(e) => setuserName(e.target.value)} />
                <br /><br />
                <label htmlFor='password'>Mot de passe: </label>
                <input type='password' className='inputContainer' id='loginPassword' name='password' size='50' onChange={(e) => setPassword(e.target.value)} />
            </form>
            <button onClick={() => {fetchSignupOrLogin(); NavigateToLogin();}}>S'inscrire</button>
        </div>
    </div>
    )   
}

export default Signup