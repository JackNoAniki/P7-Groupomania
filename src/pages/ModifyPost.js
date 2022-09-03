import {useState, useContext, useEffect} from 'react'
import { userTokenContext } from '../utils/context/UserContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const ModifyPost = () => {
    const { userToken } = useContext(userTokenContext)
    axios.defaults.headers.common['Authorization'] = userToken
    
    const mySwal = withReactContent(Swal)
    let navigate = useNavigate()
    const URLparams = useParams()

    const [post, setPost] = useState({})
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [imgPreview, setImgPreview] = useState()
    const [imgPostFile, setImgPostFile] = useState()

    const postToEdit = () => {
        axios.get(`http://localhost:8000/api/posts/${URLparams.id}`)
            .then(res => {
                setPost(res.data) 
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handlePostImg = (e) => {
        e.preventDefault()
        setImgPostFile(e.target.files[0])
        const imgUrl = URL.createObjectURL(e.target.files[0])
        setImgPreview(imgUrl)
    }

    const handleModifySubmit = (e) => {
        e.preventDefault()
        const today = Date.now()

        const form = new FormData()
        form.append("title",  title ? title : post.title)
        form.append("text", text ? text :  text.text)
        form.append("imagePost", imgPostFile)
        form.append("date", today)

        axios.put(`http://localhost:8000/api/posts/${URLparams.id}`, form) 
            .then(() => {
                mySwal.fire({
                    title: 'Votre post a bien été modifié !'
                })
                navigate('/home')
            })
            .catch(error => { console.log(error) })
    }

    useEffect(() => {
        postToEdit()
    }, [])

    return (
        <div className="modifyContainer">
            <h2>Modifier un post</h2>
            <form method="post" className="form_modify" onSubmit={(e) => handleModifySubmit(e)} encType="multipart/form-data">
                <label htmlFor="title">
                    Nouveau Titre de la publication
                    <input type="text" name="title" defaultValue={post.title}  onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label htmlFor="body">
                    Nouvelle publication
                    <textarea name="text" defaultValue={post.text} onChange={(e) => setText(e.target.value)} rows={5} required  />
                </label>
                <label htmlFor="image">
                    Ajouer une image
                    <input type="file" 
                            name="imagePost" 
                            id="imagePost" 
                            accept="image/png, image/jpeg, image/jpg"
                            defaultValue={post.imageUrl}
                            onChange={handlePostImg} />
                </label>
                <input className="form__publish--button" type="submit" value="Publier" />
            </form>
            {imgPreview ? <img src={imgPreview} alt='' /> : <img src={post.imageUrl} alt='' />}
            <button className="cancel" onClick={() => navigate("/home")} >Annuler</button>
        </div>
    )
}


export default ModifyPost