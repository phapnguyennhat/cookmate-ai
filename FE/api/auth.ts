
import { LoginForm, RegisterForm } from '@/schema/auth';
import { myAPiConfig } from './myApiConfig';

export const login = async (loginData: LoginForm) => {
	const response = await myAPiConfig.post<IResponseLogin>(
		'auth/login',
		loginData,
	);
	return response.data;
};

export const loginGoogle = async (idToken: string) => {
	const response = await myAPiConfig.post<IResponseLogin>('google-auth', {
		idToken,
	});
	return response.data;
};

export const logout = async () => {
	const response = await myAPiConfig.post('auth/logout');
	return response.data;
};


export const register = async (data: RegisterForm) => {
    const response = await myAPiConfig.post('auth/register', data)
    return response.data
}




