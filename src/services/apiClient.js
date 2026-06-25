import axios from 'axios';

const apiClient = axios.create();

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
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
      console.error(`[Frontend API Error] ${error.config.method.toUpperCase()} ${error.config.url} - Status: ${error.response.status}`, error.response.data);
    } else {
      console.error('[Frontend API Network/Unknown Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
