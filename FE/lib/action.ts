import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';
import { LoginForm } from './schema';
import { fetcher, isErrorResponse, saveToken } from './util';

export const login = async (loginData: LoginForm) => {
    const response = await fetcher<IResponseLogin>('auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });
    if (isErrorResponse(response)) {
        return response;
    } else {
       saveTokenLogin(response)
    }
};


export const loginGoogle = async () => {
    try {
        await GoogleSignin.hasPlayServices()
        const response = await GoogleSignin.signIn()
        if(isSuccessResponse(response)){
            const {idToken} = response.data
        }
    } catch (error) {
        
    }
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
    console.log('save token');
}