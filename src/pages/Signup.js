import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/colors'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'

const SignupContainer = styled.div`
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

const SignupButtonContainer = styled.div`
    margin: auto;
`

const SignupButton = styled.input`
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

const LoginButton = styled(NavLink)`
    text-decoration: none;
    color: ${colors.primary};
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`

const Signup = () => {
    
    const [mailUsed, setMailUsed] = useState(false)
    const [accountCreated, setAccountCreated] = useState(false)

    const mySwal = withReactContent(Swal)

    const navigate = useNavigate()

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
                    text: 'Cliquez sur OK pour vous connecter',
                    htmlColor: `${colors.primary}`,
                    confirmButtonColor: `${colors.primary}`,
                }).then(() => navigate("/login"))
            })
            .catch((error) => {
                console.log(error)
                setMailUsed(true)
            })
    }

    return (
    <SignupContainer>
        <Title>INSCRIPTION</Title>
        <div className='fromContainer'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='email'>Adresse email: </label>
                <input type='email' className='inputContainer' id='loginEmail' name='email' size='30' required />
                <br /><br />
                <label htmlFor='password'>Mot de passe: </label>
                <input type='password' className='inputContainer' id='loginPassword' name='password' size='30' required />
                <SignupButtonContainer>
                    <SignupButton type="submit" value="S'inscrire"></SignupButton>
                </SignupButtonContainer>
            </form>
            { mailUsed ? <p className='login-error'>Cet e-mail est dèjà utilisé</p> : "" }
            { accountCreated ? <p>Votre compte a bien été crée ! Rendez-vous sur la page login pour vous connecter</p> : "" }
            <br />
            <p>Vous avez déjà un compte ? <LoginButton to="/login">Connectez-vous !</LoginButton></p>
        </div>
    </SignupContainer>
    )   
}

export default Signup