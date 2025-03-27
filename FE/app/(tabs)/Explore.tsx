import RecipeCard from '@/components/RecipeCard';
import { useFindRecipe } from '@/hook/hookApi';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Explore() {
	const [currentPage, setCurrentPage] = useState(1);
	const { recipes, page, isLoading, refetch } = useFindRecipe({
		createAt: 'desc',
		page: currentPage,
	});
	const [showRecipes, setShowRecipes] = useState<IRecipe[]>([]);

	useEffect(() => {
		if (recipes) {
			setShowRecipes([...showRecipes, ...recipes]);
		}
	}, [page]);

	return (
		<View className="p-[20px] bg-light flex-1">
			<Text className=" font-outfit-bold text-[30px]">Explore</Text>

			<FlatList
				data={showRecipes}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				refreshing={isLoading}
				onRefresh={() => refetch()}
				renderItem={({ item, index }) => (
					<View key={item.id}  className=" flex-1">
						<RecipeCard recipe={item} />
					</View>
				)}
			/>

			{recipes?.length !== 0 && (
				<TouchableOpacity
					onPress={() => setCurrentPage(currentPage + 1)}
					className=" mt-3 mx-auto bg-gray-100 px-4 py-2"
				>
					<Text className=" text-primary text-xl font-medium ">
						{isLoading ? 'Loading...' : 'Load more'}
					</Text>
				</TouchableOpacity>
            )}
                        {recipes?.length===0 && <Text className=' text-center text-xl font-semibold text-gray-600' >End of list</Text>}
            
		</View>
	);
}
