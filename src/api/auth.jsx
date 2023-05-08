import {ENV} from '../utils'

export class Auth {
    baseApi = ENV.BASE_API

     async register(data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`
            const params = {
                method: "POST",
                headers:{
                 "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    email: data.email,
                    password: data.password

                }),
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result

            return result

        } catch (error) {
            throw error
        }
     }

     async login(data){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            }

            const response = await fetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result

            return result

        } catch (error) {
            throw error
        }
     }

     async refreshAccessTokeb(refreshTOken){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`
            const paramas ={
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: refreshTOken,
                })
            }

            const response =  await fetch(url,paramas)
            const result   = await response.json()

            if(response.status !== 200) {
                throw result
            }

            return result
        } catch (error) {
            throw error
        }
     }

     setAccessToker (token){
        localStorage.setItem(ENV.JWT.ACCESS, token)
     }

     getAccessToken(){
        return localStorage.getItem(ENV.JWT.ACCESS)
     }

     setRefreshToken(token){
        localStorage.setItem(ENV.JWT.REFRES, token)
     }

     getRefreshToken(token){
       return localStorage.getItem(ENV.JWT.REFRES)
     }

     removeTokens(){
        localStorage.removeItem(ENV.JWT.ACCESS)
        localStorage.removeItem(ENV.JWT.REFRES)
     }
}