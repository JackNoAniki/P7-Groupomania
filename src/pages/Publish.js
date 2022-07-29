import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext, userTokenContext } from '../utils/context/UserContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Publish = () => {
    const [userId, setUserId] = useState()
    const [imgPostFile, setPostImgFile] = useState()
    const [imgPostInput, setPostImgInput] = useState()
    const { currentUser } = useContext(userContext)
    const { userToken } = useContext(userTokenContext)

    const mySwal = withReactContent(Swal)
    const navigate = useNavigate()
    
    axios.defaults.headers.common['Authorization'] = userToken

    const handlePostImg = (e) => {
        e.preventDefault()
        setPostImgInput(e.target.value)
        setPostImgFile(e.target.files[0])
    }

    const handlePostSubmit = (e) => {
        e.preventDefault()
        const today = Date.now()
        const formData = new FormData()
        formData.append("title", e.target.title.value)
        formData.append("body", e.target.body.value)
        formData.append("imagePost", imgPostFile)
        formData.append("date", today)
        formData.append("userId", userId)

        axios.post(`http://localhost:8000/api/posts`, formData)
            .then(() => {
                mySwal.fire({
                    title: 'Votre post a bien été publié !'
                })
                navigate('/home')
            })
            .catch(error => { console.log(error) })
    }

    useEffect(() => {
        if(!localStorage.getItem("userConnected")) {
            navigate("/login")
        }
        if (currentUser) {
            setUserId(localStorage.getItem("userConnected"))
        }
    }, [currentUser, navigate])

    


    return (
        <div className="publishContainer">
            <h2>Publier un post</h2>
            <form className='form__publish' onSubmit={(e) => handlePostSubmit(e)} encType="multipart/form-data">
                <label htmlFor='title'>
                    Titre de la publication
                    <input type="text" name="title" placeholder="Votre post" required />
                </label>
                <label htmlFor='body'>
                    Dites quelque chose ...
                    <textarea name="body" placeholder='Votre publication' rows={5} required></textarea>
                </label>
                <label htmlFor='image'>
                    Ajouter une image
                    <input type="file" name="imagePost" id="imagePost" accept='image/png, image/jpeg, image/jpg' value={imgPostInput} onChange={handlePostImg} />
                </label>
                <input className="form__publish--button" type="submit" value="Publier" />
            </form>
        </div>
    )
}

export default Publish