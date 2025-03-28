import { myAPiConfig } from '@/api/myApiConfig';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Toast } from 'toastify-react-native';

export const useGetCategoryList = () => {
	const {
		data: categories,
		isLoading,
		isError,
	} = useQuery({
		queryFn: async () => {
			const response = await myAPiConfig.get<ICategory[]>('category');
			return response.data;
		},
		queryKey: ['category'],
	});

	useEffect(() => {
		if (isError) {
			Toast.error('Network Error');
		}
	}, [isError]);

	return { categories, isLoading };
};
