import { myAPiConfig } from './myApiConfig';

export const getRecipeOptions = async (prompt: string) => {
	const response = await myAPiConfig.post<RecipeOption[]>(`recipe/option`, {
		prompt,
	});
	return response.data;
};

export const findRecipe = async (queryRecipe: QueryRecipe) => {
	const searchParams = new URLSearchParams(queryRecipe as any);
	const query = searchParams.toString();
	const reponse = await myAPiConfig.get<{
		recipes: IRecipe[];
		count: number;
		page: number;
	}>(`recipe?${query}`);
	return reponse.data;
};

export const addFavorite = async (recipeId: string) => {
	const response = await myAPiConfig.post('user/recipe/favorite', {
		recipeId,
	});
	return response.data;
};


export const deleteFavorite = async (recipeId: string) => {
	const response = await myAPiConfig.delete(
		`user/recipe/favorite/${recipeId}`,
	);
	return response.data;
};