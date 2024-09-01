import axios from 'axios';
import { backend_link } from './utils';


const api = axios.create({
  baseURL: backend_link,
  headers: {
    'Content-Type':'application/json',
  }
});
export const authapi = axios.create({
    baseURL: backend_link,
    headers: {
      'Content-Type':'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
});

export const upload_api = axios.create({
  baseURL: backend_link,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${localStorage.getItem('token')}`
  }
});

export default api;
