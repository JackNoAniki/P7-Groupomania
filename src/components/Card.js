import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa'
import { userContext, userTokenContext, userAdminContext } from '../utils/context/UserContext'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import colors from '../utils/colors'

const CardContiner = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 800px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 15px;
    margin-bottom: 10px;
    margin-right: 80px;
    margin-left: 80px;
    justify-content: center;
    border: 3px solid ${colors.primary};
    border-radius: 30px;
    @media (max-width: 992px) {
        margin-left: 5px;
        margin-right: 5px;
    }
`

const StyledImgContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
`

const StyledImg = styled.img`
    height: 300px;
    min-width: 300px;
    max-width: 500px;
    object-fit: contain;
    @media (max-width: 768px) {
        max-width: 300px;
    }

`

const CardAside = styled.aside`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 800px;
`

const LikeButton = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    &:hover {
        color: ${colors.primary}
    }
`

const PostDate = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const HandleButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const ModifyButton = styled.button`
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
        background: ${colors.primary};
    }
`

const DeleteButton = styled.button`
    margin-top: 10px;
    height: 35px;
    background: ${colors.tertiary};
    border: ${colors.tertiary};
    border-radius: 30px;
    color: #FFFF;
    font-size: 15px;
    font-weight: bold;
    margin-left: 5px;
    &:hover {
        cursor: pointer;
        background: ${colors.primary};
    }
`





const Card = ({ post, refresh }) => {
    const { currentUser } = useContext(userContext)
    const { userToken } = useContext(userTokenContext)
    axios.defaults.headers.common['Authorization'] = userToken
    const { isAdmin } = useContext(userAdminContext)
    const [currentPost, setCurrentPost] = useState(post)

    const navigate = useNavigate()
    const navToMofidyPost = () => {
        let modifyPost = "/modifypost/" + currentPost._id
        navigate(modifyPost)
    }

    const mySwal = withReactContent(Swal)

    const dateFormater = (date) => {
        const newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        })
        return newDate
    }

    const likes = currentPost.usersLiked
    const [userLike, setUserLike] = useState(likes.includes(currentUser))
    const [liked, setLiked] = useState(currentPost.likes)

    const handleLike = () => {

        console.log(userLike)
        let likeData
        (userLike ? 
            likeData = {
                like: 0
            }
        :
            likeData = {
                like: 1
            }
        )

            axios.post(`http://localhost:8000/api/posts/${currentPost._id}/like`, likeData)
            .then((res) => {
            console.log(res.data.post)
            const newPost = res.data.post
            setCurrentPost(newPost)
            setUserLike(newPost.usersLiked.includes(currentUser))
            setLiked(newPost.likes)
            console.log(newPost.likes)
            })
            .catch(error => console.log(error))
    }

    const handleDelete = () => {
        mySwal.fire({
            title: "Voulez-vous vraiment supprimer votre post ?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Supprimer",
            confirmButtonColor: `${colors.primary}`,
            denyButtonText: "Annuler",
            denyButtonColor: `${colors.tertiary}`
        })
            .then((result) => {
                result.isConfirmed ?
                    axios.delete(`http://localhost:8000/api/posts/` + post._id)
                        .then(() => {
                            mySwal.fire({
                                title: "Publication supprimée",
                                confirmButtonColor: `${colors.primary}`
                            })
                            refresh()
                        })
                        .catch(error => {
                            console.log(error)
                        })
                :
                    mySwal.fire({
                        title: "Publication non supprimée",
                        confirmButtonColor: `${colors.primary}`,
                    })
            })
    }

    useEffect(() => {
    },[])

    return (
        <CardContiner>
            <article className='card__article'>
                <section className='card__article__text'>
                    <h2>{post.title}</h2>
                    <p>{post.text}</p>
                </section>
                <StyledImgContainer>
                    <StyledImg src={post.imageUrl} alt='Image du post' />
                </StyledImgContainer>
            </article>
            <CardAside>
                <div className='card__aside--likes'>
                    <LikeButton onClick={handleLike}><FaRegThumbsUp />{liked}</LikeButton>
                </div>
                <PostDate>Posté le {dateFormater(post.date)} </PostDate>
                {post.userId === currentUser  || isAdmin === 'true' ?
                <HandleButtons>
                    <ModifyButton className='modifyButton' onClick={navToMofidyPost}>Modifier</ModifyButton>
                    <DeleteButton className='deleteButton' onClick={handleDelete} >Supprimer</DeleteButton>
                </HandleButtons>
                :
                ""}
            </CardAside>
        </CardContiner>
    )
}

export default Card;


