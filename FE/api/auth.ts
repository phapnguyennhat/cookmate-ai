import { LoginForm } from '@/lib/schema';
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




