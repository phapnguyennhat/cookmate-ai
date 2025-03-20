import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { LoginForm } from './schema';
import {  delay } from './util';
import { myApi } from '@/config/myApi';

export const login = async (loginData: LoginForm) => {
    const response = await myApi.post<IResponseLogin>('auth/login', loginData);
    return response.data
};


export const loginGoogle = async (idToken :string) => {
   const response = await myApi.post<IResponseLogin>('google-auth', {idToken})
   return response.data
};

export const refreshCookie = async () =>{
    const response = await myApi.post<IResponseLogin>('auth/refresh')
    return response.data
}


export const logout = async () =>{
    const response = await myApi.post('auth/logout')
    return response.data
}