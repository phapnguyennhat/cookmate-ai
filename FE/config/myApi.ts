import axios from 'axios';
export const myApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    timeout: 10000, // Thời gian chờ tối đa (10 giây)
    headers: {
        'Content-Type': 'application/json', // Định dạng JSON mặc định
    },
});


