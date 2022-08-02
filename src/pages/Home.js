import '../styles/Home.css'
import { NavLink, useNavigate } from 'react-router-dom'
import colors from '../utils/colors'
import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import { userContext, userTokenContext, userAdminContext } from '../utils/context/UserContext'
import Card from '../components/Card'
import axios from 'axios'



const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: ${colors.tertiary};
    font-weight: bold;
    &:hover {
        color: ${colors.primary}
    }
`



const Home = () => {

    const { currentUser, setCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const { isAdmin, setIsAdmin } = useContext(userAdminContext)

    axios.defaults.headers.common['Authorization'] = userToken

    const [data, setData] = useState([])
    const navigate = useNavigate()

    const getData = () => {
        if(!currentUser) {
            setCurrentUser(localStorage.userConnected)
            setUserToken(localStorage.userToken)
            setIsAdmin(localStorage.isAdmin)
        }

        /**fetch(`http://localhost:8000/api/posts`, {
            method: 'GET',
            headers: {
                //'Content-Type': 'application/json',
                //'Accept': 'appliation/json',
                'Authorization': `Bearer ${userToken}`
            }  
        })*/
        axios.get('http://localhost:8000/api/posts')
            .then(res => {
                setData(res.data)
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        if(!localStorage.userConnected) {
            navigate("/login")
        }
        getData()
    })

    return (
        <div className="homeContainer">
            <nav className="navContainer">
                <StyledLink to="#">Tous les posts</StyledLink>
                <StyledLink to="#">Mes posts</StyledLink>
                <StyledLink to="/publish">Publier</StyledLink>
                <StyledLink to="#">Déconnexion</StyledLink>
            </nav>
            { isAdmin === true ? <h1>Administrateur connecté</h1> : <h1>Utilisateur connecté</h1> }
            <div className="homeContainer__posts">
                {data?.map((post) =>
                    <Card
                        key={"card_key" + post._id}
                        post={post}
                    />
                )}
            </div>
        </div>
    )
}

export default Home