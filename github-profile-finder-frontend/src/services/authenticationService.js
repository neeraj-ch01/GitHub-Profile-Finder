import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const authenticateUser = async(credentials)=>{
    try{
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        return response.data;
    }catch(error){
        console.error('Error during login: ', error);
        throw error;
    }
}