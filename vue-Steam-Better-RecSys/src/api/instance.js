import axios from 'axios'

// const apiURL = 'https://api.steamwizzard.com/'
const apiURL = 'http://localhost:3000/'

const instance = axios.create({
    baseURL: apiURL
})

export default instance
