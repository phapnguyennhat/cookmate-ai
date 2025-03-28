import CookieManager from '@react-native-cookies/cookies';
import axios from 'axios';
export const myAPiConfig = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    timeout: 40*1000, // Thời gian chờ tối đa (10 giây)
    headers: {
        'Content-Type': 'application/json', // Định dạng JSON mặc định
    },
});


myAPiConfig.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const cookies = await CookieManager.get(process.env.EXPO_PUBLIC_BACKEND_URL!)
    const accessToken = cookies.Authentication?.value
    const refreshToken = cookies.Refresh?.value
    if(!accessToken && refreshToken){
        await axios.post('auth/refresh',undefined, {baseURL: process.env.EXPO_PUBLIC_BACKEND_URL})
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
