import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext, userTokenContext } from '../utils/context/UserContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'


const Publish = () => {
    const [imgPostFile, setImgPostFile] = useState()
    const { currentUser } = useContext(userContext)
    const { userToken } = useContext(userTokenContext)

    const mySwal = withReactContent(Swal)
    const navigate = useNavigate()


    const handlePostImg = (e) => {
        e.preventDefault()
        setImgPostFile(e.target.files[0])
    }

    const handlePostSubmit = (e) => {
        e.preventDefault()
        const today = Date.now()

        //const FormData = require('form-data')

        /**const formData = new FormData()
        formData.append("title", e.target.title.value)
        formData.append("body", e.target.body.value)
        formData.append("image", imgPostFile, 'piment-espelette.png')
        formData.append("date", today)
        formData.append("userId", currentUser)*/

        const form = {
                title: e.target.title.value,
                body: e.target.body.value,
                image: imgPostFile,
                date: today,
                userId: currentUser
            }
        axios.post(`http://localhost:8000/api/posts`, form, {
            headers: {
                Authorization: userToken,
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(res => res.json())
            .then(() => {
                mySwal.fire({
                    title: 'Votre post a bien été publié !'
                })
                navigate('/home')
            })
            .catch(error => { console.log(error) })
    }

    useEffect(() => {
        if(!currentUser) {
            navigate("/login")
        }
    }, [currentUser,navigate])

    


    return (
        <div className="publishContainer">
            <h2>Publier un post</h2>
            <form method="post" className='form__publish' onSubmit={(e) => handlePostSubmit(e)} encType="multipart/form-data">
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
                    <input type="file" name="imagePost" id="imagePost" accept='image/png, image/jpeg, image/jpg' onChange={handlePostImg} />
                </label>
                <input className="form__publish--button" type="submit" value="Publier" />
            </form>
        </div>
    )
}

export default Publish