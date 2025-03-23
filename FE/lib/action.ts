import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { LoginForm } from './schema';
import { myApi } from '@/config/myApi';
import CookieManager from "@react-native-cookies/cookies";


export const login = async (loginData: LoginForm) => {
    const response = await myApi.post<IResponseLogin>('auth/login', loginData);
    return response.data
};


export const loginGoogle = async (idToken :string) => {
   const response = await myApi.post<IResponseLogin>('google-auth', {idToken})
   return response.data
};

export const refreshCookie = async () =>{
}


export const logout = async () =>{
    const response = await myApi.post('auth/logout')
    return response.data
}


export const addFavorite = async (recipeId: string  )=>{
    const response = await myApi.post('user/recipe/favorite', {recipeId})
    return response.data
}

export const deleteFavorite = async (recipeId: string) =>{
    const response = await myApi.delete(`user/recipe/favorite/${recipeId}`)
    return response.data
}