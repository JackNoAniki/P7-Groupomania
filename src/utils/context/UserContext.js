import { createContext, useState } from "react"

export const userContext = createContext({})

export const DataProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("")

    return (
        <userContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </userContext.Provider>
    )
}

export const userTokenContext = createContext({})

export const TokenProvider = ({ children }) => {
    const [userToken, setUserToken] = useState("")
    return (
        <userTokenContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </userTokenContext.Provider>
    )
}

export const userAdminContext = createContext(Boolean)

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(Boolean)
    return (
        <userAdminContext.Provider value={{ isAdmin, setIsAdmin}}>
            {children}
        </userAdminContext.Provider>
    )
}

