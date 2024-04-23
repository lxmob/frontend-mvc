import axios from 'axios';

axios.interceptors.request.use(function (config) {
  return config;
})

axios.interceptors.response.use(function (response) {
  if (response.status !== 200) {
    return Promise.reject(response.statusText || 'request error');
  }

  if (response.data?.error_code !== 0) {
    return Promise.reject(response.data.error_msg);
  }

  return response.data;
}, function (error) {
  return Promise.reject(error);
})

export default axios;
