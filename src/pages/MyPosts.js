import axios from "axios"
import { set } from "mongoose"
import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { userContext, userTokenContext } from "../utils/context/UserContext"

const MyPosts = () => {
    const { currentUser, setCurrentUser } = useContext(userContext)
    const {userToken, setUserToken} = useContext(userTokenContext)
    axios.defaults.headers.common['Authorization'] = userToken

    const [myData, setMyData] = useState([])

    const navigate = useNavigate()

    const getMyData = () => {
        if(!currentUser) {
            setCurrentUser(localStorage.userConnected)
            setUserToken(localStorage.userToken)
        }
        axios.get('http://localhost:8000/api/posts/myposts')
            .then(res => {
                setMyData(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        if(!localStorage.userConnected) {
            navigate("/login")
        }
        getMyData()
    }, [currentUser])

    return (
        <div className='myPostsContainer'>
            <main className='myPostsContent'>
                <h1>Ici, retrouvez tous vos posts</h1>
                <div className='myPostsSection'>
                    {
                        !myData.length ?
                            <div className='noPosts'>
                                <p>Vous n'avez encore rien publié</p>
                                <p>Dirigez vous vers la page 
                                <Link to='/publish'> Publier un nouveau post </Link>, on vous attend !</p>
                            </div>
                            :
                            myData.map((post) =>
                                <Card key={"card_key" + post._id} post={post} />
                            )
                    } 
                </div>
            </main>
        </div>
    )

}

export default MyPosts