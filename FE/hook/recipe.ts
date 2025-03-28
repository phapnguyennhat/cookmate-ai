import { myAPiConfig } from '@/api/myApiConfig';
import { addFavorite, deleteFavorite, findRecipe } from '@/api/recipe';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Toast } from 'toastify-react-native';

export const useCreateRecipe = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (recipeOption: RecipeOption) => {
			return myAPiConfig.post<IRecipe>('recipe', recipeOption);
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

export const useFindRecipe = (queryRecipe: QueryRecipe) => {
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryFn: () => findRecipe(queryRecipe),
		queryKey: ['recipe', JSON.stringify(queryRecipe)],
	});
	const router = useRouter();

	useEffect(() => {
		if (isError) {
			if ((error as any).response.data.statusCode == 401) {
				router.replace('/landing');
			} else {
				Toast.error('Network error');
			}
		}
	}, [isError]);
	return {
		recipes: data?.recipes,
		count: data?.count,
		page: data?.page,
		isLoading,
		refetch,
	};
};

export const useFindRecipeById = (id: string) => {
	const {
		data: recipe,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryFn: async () => {
			const response = await myAPiConfig.get<IRecipe>(`recipe/${id}`);
			return response.data;
		},
		queryKey: ['recipeDetail', id],
	});
	const router = useRouter();
	useEffect(() => {
		if (isError) {
			if ((error as any).response.data.statusCode === 401) {
				router.replace('/landing');
			} else {
				Toast.error(
					(error as any).response.data.message || 'Server Error',
				);
			}
		}
	}, [isError]);
	return { recipe, isLoading };
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
