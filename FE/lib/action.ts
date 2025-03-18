import { LoginForm } from './schema';
import { fetcher } from './util';

export const login = async (loginData: LoginForm) => {
    return fetcher<IResponseLogin>('auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    });
};
