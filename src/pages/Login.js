import { useNavigate, NavLink} from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { userAdminContext, userContext, userTokenContext } from '../utils/context/UserContext'
import colors from '../utils/colors'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    max-width: 600px;
    margin: auto;
    margin-top: 10px;
    background: ${colors.secondary};
    color: ${colors.tertiary};
    border: 3px solid ${colors.primary};
    border-radius: 30px;
`

const Title = styled.h1`
    text-align: center;
    margin-top: 20px;
`

const ConnectButtonContainer = styled.div`
    margin: auto;
`

const LoginButton = styled.input`
    margin-top: 10px;
    height: 35px;
    background: ${colors.tertiary};
    border: ${colors.tertiary};
    border-radius: 30px;
    color: #FFFF;
    font-size: 15px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`

const SignupButton = styled(NavLink)`
    text-decoration: none;
    color: ${colors.primary};
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`


const Login = () => {

    const { setCurrentUser } = useContext(userContext)
    const { setUserToken } = useContext(userTokenContext)
    const { setIsAdmin } = useContext(userAdminContext)
    const navigate = useNavigate()

    const [credError, setCredError] = useState(false)

    const mySwal = withReactContent(Swal)


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
                setCurrentUser(`${res.data.userId}`)
                setUserToken('Bearer '.concat(`${res.data.token}`))
                setIsAdmin(`${res.data.isAdmin}`)

                localStorage.setItem("userConnected", `${res.data.userId}`)
                localStorage.setItem("userToken", 'Bearer '.concat(`${res.data.token}`))
                localStorage.setItem("isAdmin", `${res.data.isAdmin}`)
                navigate("/home")
            })
            .catch(() => {
                mySwal.fire({
                    title: <strong>Erreur lors de la conexion au compte</strong>,
                    html: `L'adresse e-mail ou le mot de passe est incorrect`,
                    confirmButtonColor: `${colors.primary}`,
                })
                setCredError(true)
            })
    }

    useEffect(() => {

    }, [])
    
    return (
    <LoginContainer>
        <Title className='pageTitle'>CONNEXION</Title>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='email'>Adresse email: </label>
            <input type='email' className='inputContainer' id='loginEmail' name='email' size='30' required />
            <br /><br />
            <label htmlFor='password'>Mot de passe: </label>
            <input type='password' className='inputContainer' id='loginPassword' name='password' size='30' required/>
            <ConnectButtonContainer>
                <LoginButton type="submit" value="Se connecter" />
            </ConnectButtonContainer>
        </form>
        <br />
        <br />
        { credError ? <p className="login-error">Mauvais email ou mot de passe</p> : "" }
        <p>Vous n'avez pas de compte ? <SignupButton to="/">S'inscrire ici</SignupButton></p>
    </LoginContainer>
    )
}

export default Login
