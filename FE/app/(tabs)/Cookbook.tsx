import RecipeCard from '@/components/RecipeCard';
import { useFindRecipe } from '@/hook/hookApi';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Cookbook() {
    const [collection, setCollection] = useState('my-recipe');
    const [currentPage, setCurrentPage] = useState(1)
    const [showMyRecipes, setShowMyRecipes] = useState<IRecipe[]>([])
    const [showSavedRecipes, setShowSavedRecipes] = useState<IRecipe[]>([])

    
    
    const { recipes, page,count,refetch, isLoading } = useFindRecipe({
        createAt: 'desc',
        collection: collection as any,
        page:currentPage
    });

        useEffect(() => {
            if (!recipes) {
                return
            }
            if (collection === 'my-recipe') {
                setShowMyRecipes([...showMyRecipes, ...recipes])
            } else if (collection === 'my-favorite') {
                setShowSavedRecipes([...showSavedRecipes, ...recipes])
            }

        }, [page, collection, recipes])
    
    
    
    return (
		<View className="p-[20px] bg-light flex-1">
			<Text className=" font-outfit-bold text-[35px] "> Cook book</Text>

			<View className=" flex-row items-center  gap-[10px] p-[4px] ">
				<TouchableOpacity
					onPress={() => setCollection('my-recipe')}
					className={` flex-row items-center  gap-[5px] p-[4px] ${
						collection === 'my-recipe'
							? 'opacity-100'
							: 'opacity-40'
					}  `}
				>
					<Ionicons name="sparkles-sharp" size={24} color="black" />
					<Text className=" font-outfit text-[20px]">My Recipes</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setCollection('my-favorite')}
					className={` flex-row items-center  gap-[5px] p-[4px] ${
						collection === 'my-favorite'
							? 'opacity-100'
							: 'opacity-40'
					}  `}
				>
					<Ionicons name="bookmark" size={24} color="black" />
					<Text className=" font-outfit text-[20px]">Saved</Text>
				</TouchableOpacity>
			</View>

			{collection === 'my-recipe' ? (
				<FlatList
					data={showMyRecipes}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					refreshing={isLoading}
					onRefresh={() => refetch()}
					renderItem={({ item, index }) => (
						<View key={item.id} className=" flex-1">
							<RecipeCard recipe={item} />
						</View>
					)}
				/>
			) : (
				<FlatList
					data={showSavedRecipes}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					refreshing={isLoading}
					onRefresh={() => refetch()}
					renderItem={({ item, index }) => (
						<View key={item.id} className=" flex-1">
							<RecipeCard recipe={item} />
						</View>
					)}
				/>
			)}

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
			{recipes?.length === 0 && (
				<Text className=" text-center text-xl font-semibold text-gray-600">
					End of list
				</Text>
			)}
		</View>
	);
}
