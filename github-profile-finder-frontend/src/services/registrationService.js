import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const registerUser = async (userData) => {
    try{
        const reponse = await axios.post(`${BASE_URL}/register`, userData);
        return reponse.data;
    }catch(error){
        console.error('Error while registering user: ',error);
        throw error;
    }
};