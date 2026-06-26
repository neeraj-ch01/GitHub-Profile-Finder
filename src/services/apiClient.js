import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const getClientId = () => {
  let clientId = localStorage.getItem('github_finder_client_id');
  if (!clientId) {
    clientId = uuidv4();
    localStorage.setItem('github_finder_client_id', clientId);
  }
  return clientId;
};

const apiClient = axios.create();

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    config.headers['X-Client-ID'] = getClientId();
    console.log(`[Frontend API Request] ${config.method.toUpperCase()} ${config.url}`, config.params || '', config.data || '');
    return config;
  },
  (error) => {
    console.error('[Frontend API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[Frontend API Response] ${response.config.method.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 429) {
        alert('You have exceeded the API request limit. Please try again later.');
      }
      console.error(`[Frontend API Error] ${error.config.method.toUpperCase()} ${error.config.url} - Status: ${error.response.status}`, error.response.data);
    } else {
      console.error('[Frontend API Network/Unknown Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
