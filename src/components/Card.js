import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa'
import { userContext, userTokenContext } from '../utils/context/UserContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Card = ({ post }) => {
    const { currentUser } = useContext(userContext)
    const { userToken } = useContext(userTokenContext)
    axios.defaults.headers.common['Authorization'] = userToken

    const navigate = useNavigate()
    const navToMofidyPost = () => {
        let modifyPost = "/modifypost/" + post._id
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

    const like = post.usersLiked
    const [userLike, setUserLike] = useState(like.includes(currentUser))
    const [liked, setLiked] = useState(0)

    const handleLike = () => {

        setUserLike(!userLike)
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

            axios.post(`http://localhost:8000/api/posts/${post._id}/like`, likeData)
            .then((res) => {
            console.log(res)
            (userLike ? setLiked(0) : setLiked(1))
            })
            .catch(error => console.log(error))
    }

    const handleDelete = () => {
        mySwal.fire({
            title: "Voulez-vous vraiment supprimer votre post ?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Supprimer",
            denyButtonText: "Ne pas supprimer",
        })
            .then((result) => {
                result.isConfirmed ?
                    axios.delete(`http://localhost:8000/api/posts/` + post._id)
                        .then(() => {
                            mySwal.fire("Publication supprimée")
                            navigate("/home")
                        })
                        .catch(error => {
                            console.log(error)
                        })
                :
                    mySwal.fire("Publication non supprimée")
            })
    }

    useEffect(() => {

    }, [])

    return (
        <div className='card'>
            <article className='card__article'>
                <section className='card__article__text'>
                    <h2>{post.title}</h2>
                    <p>{post.text}</p>
                </section>
                <img src={post.imageUrl} alt='' />
            </article>
            <aside className='card__aside'>
                <div className='card__aside--likes'>
                    <span onClick={handleLike}><FaRegThumbsUp />{" " + liked}</span>
                </div>
                <p>Posté le {dateFormater(post.date)} </p>
                {post.userId === currentUser ?
                <div className='userIdButtons'>
                    <button className='modifyButton' onClick={navToMofidyPost}>Modifier</button>
                    <button className='deleteButton' onClick={handleDelete} >Supprimer</button>
                </div>
                :
                ""}
            </aside>
        </div>
    )
}

export default Card;


