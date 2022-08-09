import '../styles/login.css'
import { useNavigate, NavLink} from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { userAdminContext, userContext, userTokenContext } from '../utils/context/UserContext'
import { FaEyeSlash, FaEye } from 'react-icons/fa'


const Login = () => {

    const { currentUser, setCurrentUser } = useContext(userContext)
    const {  userToken, setUserToken } = useContext(userTokenContext)
    const {  isAdmin, setIsAdmin } = useContext(userAdminContext)
    const navigate = useNavigate()

    const [passwordShown, setPasswordShown] = useState(false)
    const [credError, setCredError] = useState(false)

    const handleToggle = () => {
        setPasswordShown(!passwordShown)
    }

    const handleSubmit = (e) => {
        if (credError === true) {
            setCredError(!credError)
        }
        e.preventDefault();
        axios.post(`http://localhost:8000/api/auth/login`, {
            email: e.target.email.value,
            password: e.target.password.value
        })
            .then((res) => {
                setCurrentUser(res.data.userId)
                setUserToken('Bearer '.concat(res.data.token))
                setIsAdmin(res.data.isAdmin)

                localStorage.setItem("userConnected", currentUser)
                localStorage.setItem("userToken", userToken)
                localStorage.setItem("isAdmin", isAdmin)
                navigate("/home")
            })
            .catch(error => {
                console.log(error)
                setCredError(true)
            })
    }

    return (
    <div className='loginContainer'>
        <h1 className='pageTitle'>CONNEXION</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='email'>Adresse email: </label>
            <input type='email' className='inputContainer' id='loginEmail' name='email' size='50' required />
            <br /><br />
            <label htmlFor='password'>Mot de passe: </label>
            <input type={passwordShown ? 'text' : 'password'} className='inputContainer' id='loginPassword' name='password' size='50' required/>
            <span onClick={() => handleToggle()}>{passwordShown ? <FaEyeSlash /> : <FaEye />}</span>
            <input type="submit" value="Se connecter" />
        </form>
        <br />
        <br />
        { credError ? <p className="login-error">Mauvais email ou mot de passe</p> : "" }
        <p>Vous n'avez pas de compte ? <NavLink to="/">S'inscrire ici</NavLink></p>
    </div>
    )
}

export default Login
