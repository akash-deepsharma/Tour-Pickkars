// import axios from "axios";

// export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // ✅ axios instance
// export const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// }); 


import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ axios instance with timeout
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// ✅ Add request interceptor for better error handling
api.interceptors.request.use( 
  (config) => {
    // Add timeout to every request
    config.timeout = config.timeout || 10000;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.config.url);
    }
    return Promise.reject(error);
  }
);