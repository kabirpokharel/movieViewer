import axios from 'axios';
import { baseURL } from '../constants/baseURL';

const axiosInstance = axios.create({ baseURL });
export default axiosInstance;
