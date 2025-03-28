import { myAPiConfig } from '@/api/myApiConfig';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Toast } from 'toastify-react-native';

export const useGetProfile = () => {
	const {
		data: profile,
		isLoading,
		error,
		isError,
	} = useQuery({
		queryFn: async () => {
			const reponse = await myAPiConfig.get<IUser>('user/profile');
			return reponse.data;
		},
		queryKey: ['profile'],
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
	return { profile, isLoading };
};
