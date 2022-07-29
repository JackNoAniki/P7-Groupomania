import '../styles/Home.css'
import { NavLink, useNavigate, Link } from 'react-router-dom'
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

    const { currentUser, sertCurrentUser } = useContext(userContext)
    const { userToken, setUserToken } = useContext(userTokenContext)
    const { isAdmin, setIsAdmin } = useContext(userAdminContext)

    axios.defaults.headers.common['Authorization'] = userToken

    const [data, setData] = useState([])
    const navigate = useNavigate()

    const getData = () => {
        if(!currentUser) {
            sertCurrentUser(localStorage.userConnected)
            setUserToken(localStorage.userToken)
            setIsAdmin(localStorage.isAdmin)
            console.log("1", typeof(isAdmin), isAdmin)
        }

        axios.get(`http://localhost:8000/api/posts`)
            .then(res => {
                setData(res.data)
                console.log("data is :", res.data)
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
                {data.map((post) =>
                    <Link
                        key={"link_key" + post._id}
                        to={"/post/" + post._id}
                    >
                        <Card
                            key={"card_key" + post._id}
                            post={post}
                        />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Home