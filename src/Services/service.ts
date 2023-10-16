import axios from "../Axios/axios"


export const signUpApi = (userData:{userName:string;email:string;password:string})=>{
    console.log(userData)
    return axios.post('/signUp',userData)
}

export const loginApi = (userData:{email:string;password:string})=>{
    console.log(userData)
    return axios.post('/login',userData)
}