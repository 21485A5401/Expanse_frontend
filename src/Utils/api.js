import axios from 'axios';

const Token = localStorage.getItem('token');

// const api = 'http://localhost:4000/';
const api = 'https://expanses-backend.onrender.com/';

const createAxiosInstance = (token) =>{
    return axios.create({
        baseURL: `${api}/`,
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'x-token':token
        },
    });
};

const instance = createAxiosInstance(Token);

export default instance;
