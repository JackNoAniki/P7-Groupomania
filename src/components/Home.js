import '../styles/Home.css'
import { Link } from 'react-router-dom'
import colors from '../utils/colors'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${colors.tertiary};
    font-weight: bold;
    &:hover {
        color: ${colors.primary}
    }
`



function Home() {
    return (
        <div className="homeContainer">
            <nav className="navContainer">
                <StyledLink to="#">Tous les posts</StyledLink>
                <StyledLink to="#">Mes posts</StyledLink>
                <StyledLink to="/publish">Publier</StyledLink>
                <StyledLink to="#">Déconnexion</StyledLink>
            </nav>
        </div>

    )
}

export default Home