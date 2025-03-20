import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { LoginForm } from './schema';
import {  delay, saveToken } from './util';
import { myApi } from '@/config/myApi';

export const login = async (loginData: LoginForm) => {
    const response = await myApi.post<IResponseLogin>('auth/login', loginData);
    saveTokenLogin(response.data);
};


export const loginGoogle = async (idToken :string) => {
   const response = await myApi.post<IResponseLogin>('google-auth', {idToken})
   saveTokenLogin(response.data)
};

const saveTokenLogin = async({accessTokenCookie, refreshTokenCookie}: IResponseLogin) =>{
    await saveToken(
        accessTokenCookie.token,
        parseInt(accessTokenCookie.accessTime),
        'accessToken',
    );
    await saveToken(
        refreshTokenCookie.token,
        parseInt(refreshTokenCookie.accessTime),
        'refreshToken',
    );
   
}