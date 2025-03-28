import { myApi } from '@/config/myApi';
import {
	addFavorite,
	deleteFavorite,
	login,
	loginGoogle,
	logout,
} from '@/lib/action';
import { setAuth } from '@/lib/features/auth/authSlice';
import { CreateRecipeForm } from '@/lib/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { Toast } from 'toastify-react-native';

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

export const useCreateRecipe = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (recipeOption: RecipeOption) => {
			return myApi.post<IRecipe>('recipe', recipeOption);
		},

		onError: (error: any) => {
			if (error.response.data.codeStatus === 401) {
				router.replace('/landing');
			} else {
				Toast.error(
					error.response.data.message || 'Failed to create recipe',
				);
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['recipe'] });
			router.push({
				pathname: '/recipe/recipeDetail',
				params: { id: data.data.id },
			});
		},
	});
	return mutation;
};

export const useAddFavorite = (recipeId: string) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const mutation = useMutation({
		mutationFn: () => addFavorite(recipeId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['recipeDetail', recipeId],
			});
			queryClient.invalidateQueries({ queryKey: ['recipe'] });
		},
		onError: (error: any) => {
			if (error.response.data.codeStatus === 401) {
				router.replace('/landing');
			} else {
				Toast.error('Server Error');
			}
		},
	});
	return mutation;
};

export const useDeleteFavorite = (recipeId: string) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const mutation = useMutation({
		mutationFn: () => deleteFavorite(recipeId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['recipeDetail', recipeId],
			});
			queryClient.invalidateQueries({ queryKey: ['recipe'] });
		},
		onError: (error: any) => {
			if (error.response.data.statusCode === 401) {
				router.replace('/landing');
			} else {
				Toast.error('Server error');
			}
		},
	});

	return mutation;
};
