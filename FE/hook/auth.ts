import { login, loginGoogle, logout } from '@/api/auth';
import { setAuth } from '@/lib/features/auth/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

export const useLogin = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: login,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
			queryClient.invalidateQueries({ queryKey: ['recipe'] });
			queryClient.invalidateQueries({ queryKey: ['recipeDetail'] });
		},
	});
	return mutation;
};

export const useLoginGoogle = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: loginGoogle,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
			queryClient.invalidateQueries({ queryKey: ['recipe'] });
			queryClient.invalidateQueries({ queryKey: ['recipeDetail'] });
		},
	});

	return mutation;
};

export const useLogout = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const mutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			dispatch(setAuth(false));
			router.replace('/landing');
		},
	});
	return mutation;
};


