import axios from 'axios';

const apiURL = 'https://api.steamwizzard.com/';

const instance = axios.create({
    baseURL: apiURL,
});

export default instance;
