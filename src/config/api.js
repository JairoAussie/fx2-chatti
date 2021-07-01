import axios from 'axios'

const chattiAPI = axios.create({
    baseURL: 'http://localhost:3000'
})

export default chattiAPI