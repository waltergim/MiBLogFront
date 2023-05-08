import {useEffect,useState,createContext} from 'react'
import { User,Auth } from '../api'
import {hasExpiredToken} from '../utils'

const authController = new Auth()

const userControllers = new User();

export const AuthContexts = createContext()



export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null)
    const [token,     setToken] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
      
        (async ()=>{
        //comprobar si el usuario esta logueado o no   
        const accessToken = authController.getAccessToken()
        const refreshTOken = authController.getRefreshToken()


 
        if (!accessToken || !refreshTOken){
            console.log(accessToken)
            console.log(refreshTOken)
            logout()
            console.log("me ejecute aqui")
            setLoading(false)
            return
        }

        if(hasExpiredToken(accessToken)){
            if(hasExpiredToken(refreshTOken)){
                logout()
               
            }else{
               await  reLogin(refreshTOken)
            }
        }else{
            await login(accessToken)
        }
        

         setLoading(false)
         
        }) ()

    }, [])

const reLogin = async(refreshTOken) =>{
    try {
        const {accessToken} = await authController.refreshAccessTokeb(refreshTOken)
        authController.setAccessToker(accessToken)
        await login(accessToken)
    } catch (error) {
        console.error(error)
    }
}

const login = async(accessToken)=>{
        try {
            const response = await userControllers.getMe(accessToken)
            delete response.password
             setUser(response)
            setToken(accessToken)
         } catch (error) {
            console.error(error)
        }
    }

    const logout = () =>{
        setUser(null)
        setToken(null)

        authController.removeTokens()     
    }

    const data ={
        accessToken: token,
        user,
        login,
        logout
    }

    if(loading) return null


    return <AuthContexts.Provider value={data}>
        {children}
           </AuthContexts.Provider> 
}