import apiClient from './apiClient';

const BASE_URL = process.env.REACT_APP_API_BASE_URL 
  ? `${process.env.REACT_APP_API_BASE_URL}/api/users` 
  : 'http://localhost:8080/api/users';

export const authenticateUser = async(credentials)=>{
    try{
        const response = await apiClient.post(`${BASE_URL}/login`, credentials);
        return response.data;
    }catch(error){
        console.error('Error during login: ', error);
        throw error;
    }
}