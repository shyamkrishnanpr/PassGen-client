import axios from "axios";

const instance = axios.create({
    baseURL:'http://127.0.0.1:3010/api'
})


instance.interceptors.request.use(
    (config) => {
      
     const userToken = localStorage.getItem('UserToken');
      console.log("token in axios",userToken)
      if (userToken) {
        config.headers.Authorization = JSON.parse(userToken).token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default instance