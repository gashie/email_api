const axios = require("axios")

  axios.interceptors.response.use(null, error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
  
    if (!expectedError) {
    // console.log(error.data);
      
    }
  
    return Promise.reject(error);
  });
  

    exports.get = axios.get,
    exports.post =  axios.post,
    exports.put = axios.put,
    exports.delete = axios.delete
    exports.all = axios.all

