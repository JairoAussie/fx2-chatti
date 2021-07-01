import axios from 'axios'

const chattiAPI = axios.create({
    baseURL: 'https://trolter-api-rails.herokuapp.com/'
})

chattiAPI.interceptors.request.use(req => {
    const token = sessionStorage.getItem("token")
    console.log("interceptor token: ", token)
    if (token) {
        req.headers["Authorization"] = `Bearer ${token}`
    }
    return req
})

export default chattiAPI