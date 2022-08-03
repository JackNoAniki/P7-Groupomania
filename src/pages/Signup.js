import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import axios from 'axios'
import '../styles/Signup.css'


function Signup () {
    
    const [passwordShown, setPasswordShown] = useState(false)
    const [mailUsed, setMailUsed] = useState(false)
    const [accountCreated, setAccountCreated] = useState(false)

    const handleToggle = () =>  {
        setPasswordShown(!passwordShown)
    }

    const mySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
        if(mailUsed === true) {
            setMailUsed(!mailUsed)
        }
        e.preventDefault();
        axios.post(`http://localhost:8000/api/auth/signup`, {   
            email: e.target.email.value,
            password: e.target.password.value
        })
            .then(() => {
                setAccountCreated(true)
                mySwal.fire({
                    title: <strong>Votre compte a bien été crée !</strong>,
                    html: <a href='/login'>Connectez-vous</a>
                })
            })
            .catch((error) => {
                console.log(error)
                setMailUsed(true)
            })
    }

    return (
    <div className='loginContainer'>
        <h1 className='pageTitle'>INSCRIPTION</h1>
        <div className='fromContainer'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='email'>Adresse email: </label>
                <input type='email' className='inputContainer' id='loginEmail' name='email' size='50' required />
                <br /><br />
                <label htmlFor='password'>Mot de passe: </label>
                <input type={passwordShown ? 'text' : 'password'} className='inputContainer' id='loginPassword' name='password' size='50' required />
                <span onClick={() => handleToggle()}>{passwordShown ? <FaEyeSlash /> : <FaEye />}</span>
                <input type="submit" value="S'inscrire"></input>
            </form>
            { mailUsed ? <p className='login-error'>Cet e-mail est dèjà utilisé</p> : "" }
            { accountCreated ? <p>Votre compte a bien été crée ! Rendez-vous sur la page login pour vous connecter</p> : "" }
            <br />
            <p>Vous avez déjà un compte ?</p>
            <NavLink to="/login">Connectez-vous !</NavLink>
        </div>
    </div>
    )   
}

export default Signup