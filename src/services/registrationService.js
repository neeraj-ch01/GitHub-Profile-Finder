import apiClient from './apiClient';

const BASE_URL = process.env.REACT_APP_API_BASE_URL 
  ? `${process.env.REACT_APP_API_BASE_URL}/api/users` 
  : 'http://localhost:8080/api/users';

export const registerUser = async (userData) => {
    try{
        const reponse = await apiClient.post(`${BASE_URL}/register`, userData);
        return reponse.data;
    }catch(error){
        console.error('Error while registering user: ',error);
        throw error;
    }
};