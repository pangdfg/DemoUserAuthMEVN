import axios from "axios"

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.SERVER_API_URI,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const axiosPrivateInstance = axios.create({
  baseURL: import.meta.env.SERVER_API_URI,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})