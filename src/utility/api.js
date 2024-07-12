import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hotel-booking-backend-vvsl.onrender.com/',
  headers: {
    'Content-Type':'application/json',
  }
});
export const authapi = axios.create({
    baseURL: 'https://hotel-booking-backend-vvsl.onrender.com/',
    headers: {
      'Content-Type':'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
});

export const upload_api = axios.create({
  baseURL: 'https://hotel-booking-backend-vvsl.onrender.com/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${localStorage.getItem('token')}`
  }
});

export default api;
