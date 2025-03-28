import { myAPiConfig } from './myApiConfig';

export const getCategories = async () => {
	const response = await myAPiConfig.get<ICategory[]>('category');
	return response.data;
};
