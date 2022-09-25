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

const NavContainer = styled.nav`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 10px;
`

const AdminTitle = styled.h1`
    margin-left: 5px;
`

const UserTitle = styled.h1`
    margin-left: 5px;
`

const HomeConteinerPosts = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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

        axios.get('http://localhost:8000/api/posts')
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleDisconnect = () => {
        localStorage.clear()
        console.log("local storage cleared !")
    }

    useEffect(() => {
        if(!localStorage.userConnected) {
            navigate("/login")
        }
        getData()
        console.log(isAdmin)
    }, [currentUser])

    return (
        <div className='homeContainer'>
            <NavContainer>
                <StyledLink to="#">Tous les posts</StyledLink>
                <StyledLink to="/myposts">Mes posts</StyledLink>
                <StyledLink to="/publish">Publier</StyledLink>
                <StyledLink to="/login" onClick={handleDisconnect}>Déconnexion</StyledLink>
            </NavContainer>
            { isAdmin === 'true' ? <AdminTitle>Administrateur connecté</AdminTitle> : <UserTitle>Utilisateur connecté</UserTitle> }
            <HomeConteinerPosts>
                {data.map((post) =>
                    <Card
                        key={"card_key" + post._id}
                        post={post}
                        refresh={getData}
                    />
                )}
            </HomeConteinerPosts>
        </div>
    )
}

export default Home