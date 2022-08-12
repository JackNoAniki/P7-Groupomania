import Banner from './Banner'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Publish from '../pages/Publish'
import MyPosts from '../pages/MyPosts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { AdminProvider, DataProvider, TokenProvider } from '../utils/context/UserContext'
import '../styles/App.css';

function App() {

    const [currentUser, setCurrentUser] = useState("")
    const [userToken, setUserToken] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <DataProvider value={{ currentUser, setCurrentUser }}>
            <TokenProvider value={{ userToken, setUserToken }}>
                <AdminProvider value={{isAdmin, setIsAdmin}}>
                <Banner />
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/publish" element={<Publish />} />
                            <Route path="/myposts" element={<MyPosts />} />
                        </Routes>
                    </BrowserRouter>
                </AdminProvider>
            </TokenProvider>
        </DataProvider>
    )
}

export default App;
