import {useState, useContext, useEffect} from 'react'
import { userTokenContext } from '../utils/context/UserContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import colors from '../utils/colors'
import styled from 'styled-components'

const ModifyContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
`

const ModifyTitle = styled.h2`
    margin-left: 5px;
    display: flex;
    align-self: start;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const PostTitle = styled.label`
    display: flex;
    flex-direction: column;
    & > input {
        margin-top: 5px;
        margin-bottom: 5px;
        height: 30px;
        border: 2px solid ${colors.primary};
        border-radius: 20px;
    }
`

const PostBody = styled.label`
    display: flex;
    flex-direction: column;
    & > textarea {
        margin-top: 5px;
        height: 100px;
        border: 2px solid ${colors.primary};
        border-radius: 20px;
        resize: none;
    }
`

const PostImgLabel = styled.label`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
        color: ${colors.primary};
    }
    & > input {
        display: none;
    }
`

const StyledImg = styled.img`
    max-height: 500px;
    min-width: 300px;
    max-width: 500px;
    object-fit: contain;
    @media (max-width: 768px) {
        max-width: 300px;
    }
`

const SubmitButton = styled.input`
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

const CancelButton = styled.button`
    margin-top: 10px;
    height: 35px;
    background: ${colors.tertiary};
    border: ${colors.tertiary};
    border-radius: 30px;
    color: #FFFF;
    font-size: 15px;
    font-weight: bold;
    margin-left: 5px;
    margin-bottom: 10px;
    &:hover {
        cursor: pointer;
        background: ${colors.primary};
    }
`

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
                    title: 'Votre post a bien été modifié !',
                    confirmButtonColor: `${colors.primary}`
                })
                navigate('/home')
            })
            .catch(error => { console.log(error) })
    }

    useEffect(() => {
        postToEdit()
    }, [])

    return (
        <ModifyContainer>
            <ModifyTitle>Modifier un post</ModifyTitle>
            <StyledForm method="post" className="form_modify" onSubmit={(e) => handleModifySubmit(e)} encType="multipart/form-data">
                <PostTitle htmlFor="title">
                    Nouveau Titre de la publication
                    <input type="text" name="title" defaultValue={post.title}  onChange={(e) => setTitle(e.target.value)} required />
                </PostTitle>
                <PostBody htmlFor="body">
                    Nouvelle publication
                    <textarea name="text" defaultValue={post.text} onChange={(e) => setText(e.target.value)} rows={5} required  />
                </PostBody>
                <PostImgLabel htmlFor="image">
                    Ajouer une image
                    <input type="file" 
                            name="imagePost" 
                            id="imagePost" 
                            accept="image/png, image/jpeg, image/jpg"
                            defaultValue={post.imageUrl}
                            onChange={handlePostImg} />
                </PostImgLabel>
                {imgPreview ? <StyledImg src={imgPreview} alt='Vérification image pré publication' /> : <img src={post.imageUrl} alt='' />}
                <SubmitButton className="form__publish--button" type="submit" value="Publier" />
            </StyledForm>
            <CancelButton className="cancel" onClick={() => navigate("/home")} >Annuler</CancelButton>
        </ModifyContainer>
    )
}


export default ModifyPost