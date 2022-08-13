import { useContext } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa'
import { userContext } from '../utils/context/UserContext'

const Card = ({ post }) => {
    const { currentUser } = useContext(userContext)

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
                    <span><FaRegThumbsUp /> {" " + post.likes}</span>
                </div>
                <p>Posté le {dateFormater(post.date)} </p>
                {post.userId === currentUser ?
                <div className='userIdButtons'>
                    <button className='modifyButton'>Modifier</button>
                    <button className='deleteButton'>Supprimer</button>
                </div>
                :
                ""}
            </aside>
        </div>
    )
}

export default Card;


