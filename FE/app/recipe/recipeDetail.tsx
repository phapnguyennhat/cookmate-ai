import CreateRecipe from '@/components/CreateRecipe';
import Ingredients from '@/components/Ingredients';
import RecipeIntro from '@/components/RecipeIntro';
import RecipeSteps from '@/components/RecipeSteps';
import { useDeleteRecipe, useFindRecipeById } from '@/hook/recipe';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useGetProfile } from '@/hook/user';
import ConfirmDeleteRecipe from '@/components/ConfirmDeleteRecipe';
import { useQueryClient } from '@tanstack/react-query';
import { Toast } from 'toastify-react-native';
import FullScreenLoader from '@/components/FullScreenLoader';

export default function RecipeDetails() {
    const { id } = useLocalSearchParams();
    const deleteRecipe = useDeleteRecipe()
    const queryClient = useQueryClient()
    const router =useRouter()

	const { recipe, isLoading } = useFindRecipeById(id as string);
	const { profile } = useGetProfile();

	const [isModalVisible, setModalVisible] = useState(false);

	const handleDeletePress = () => {
		setModalVisible(true);
	};

	const handleConfirmDelete = () => {
        // Thêm logic xóa của bạn ở đây
        if (!recipe) {
            return
        }
        deleteRecipe.mutate(recipe.id, {
            onError: (error: any) => {
                Toast.error(error.response.data.message||'Server Error')
            },
            onSuccess: () => {
                setModalVisible(false);
                queryClient.invalidateQueries({ queryKey: ['recipeDetail', recipe.id] })
                router.replace('/Cookbook')
                Toast.success('Delete successfully!')
            }
        })

	};

	const handleCancelDelete = () => {
		setModalVisible(false);
	};

	return (
		<ScrollView className="p-[20px]   bg-light ">
			<RecipeIntro recipe={recipe} />
			<Ingredients ingredients={recipe?.ingredients} />
			<RecipeSteps steps={recipe?.steps} />
			<Text className=" mt-[15px] text-base font-outfit text-center text-gray-500">
				You are looking something else, Create A New One
			</Text>
			<CreateRecipe />
			{profile?.id === recipe?.userId && (
				<TouchableOpacity
					onPress={handleDeletePress}
					className=" py-2 mt-4 mb-2 bg-red-100 rounded-[10px] border-red-500 border-[0.3px]  flex-row justify-center items-center gap-2"
				>
					<Text className=" text-lg text-red-500">Delete</Text>
					<MaterialIcons name="delete" size={24} color="red" />
				</TouchableOpacity>
			)}
			<View className=" mb-9"></View>
			<ConfirmDeleteRecipe
				isModalVisible={isModalVisible}
				setModalVisible={setModalVisible}
				handleConfirmDelete={handleConfirmDelete}
				handleCancelDelete={handleCancelDelete}
            />
            <FullScreenLoader visible={isLoading ||deleteRecipe.isPending} />
		</ScrollView>
	);
}
