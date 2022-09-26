import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext, userTokenContext } from '../utils/context/UserContext'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import colors from '../utils/colors'

const PublishContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;

`

const PublishTitle = styled.h2`
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



const Publish = () => {
    const [imgPostFile, setImgPostFile] = useState()
    const { currentUser } = useContext(userContext)
    const { userToken } = useContext(userTokenContext)
    const [imgPreview, setImgPreview] = useState()
    axios.defaults.headers.common['Authorization'] = userToken

    const mySwal = withReactContent(Swal)
    const navigate = useNavigate()  


    const handlePostImg = (e) => {
        e.preventDefault()
        setImgPostFile(e.target.files[0])
        const imgUrl = URL.createObjectURL(e.target.files[0])
        setImgPreview(imgUrl)
    }

    const handlePostSubmit = (e) => {
        e.preventDefault()
        const today = Date.now()

        const form = new FormData();
        form.append("title", e.target.title.value)
        form.append("text", e.target.body.value)
        form.append("imagePost", imgPostFile, imgPostFile.name)
        form.append("date", today)
        form.append("userId", currentUser)

        axios.post(`http://localhost:8000/api/posts`, form) 
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
        <PublishContainer>
            <PublishTitle>Publier un post</PublishTitle>
            <StyledForm method="post" className='form__publish' onSubmit={(e) => handlePostSubmit(e)} encType="multipart/form-data">
                <PostTitle htmlFor='title'>
                    Titre de la publication
                    <input type="text" name="title" placeholder="Votre post" size='40' required />
                </PostTitle>
                <PostBody htmlFor='body'>
                    Dites quelque chose ...
                    <textarea name="body" placeholder='Votre publication' rows={10} required></textarea>
                </PostBody>
                <PostImgLabel htmlFor='file'>
                    Ajouter une image
                    <input type="file" name="imagePost" id="file" accept='image/png, image/jpeg, image/jpg' onChange={handlePostImg} />
                </PostImgLabel>
                <StyledImg src={imgPreview} alt='Vérification image pré publication' />
                <SubmitButton className="form__publish--button" type="submit" value="Publier" />
            </StyledForm>
        </PublishContainer>
    )
}

export default Publish