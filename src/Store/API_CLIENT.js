import axios from 'axios';

// Create an instance of axios
const axiosClient = axios.create({
  baseURL: 'https://fleet.mltcorporate.com/api/', // Replace with your base API URL
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization':`Bearer LHc9vmSgeXAiX3GWwXXD9ehJnmWcEaOILD2GT5qt9INQzj9JWM8GOLLH0ozf`
  // },
});

// Optional: Set up request and response interceptors for logging, error handling, etc.
axiosClient.interceptors.request.use(
  
);

axiosClient.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle error response
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // No response was received
      console.error(error.request);
    } else {
      // Something else caused the error
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  }
);


export default axiosClient;
