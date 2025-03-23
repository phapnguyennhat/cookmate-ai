import RecipeCard from '@/components/RecipeCard';
import { useFindRecipe } from '@/hook/hookApi';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

export default function RecipeCategory() {
    const { categoryName } = useLocalSearchParams();
    const { recipes, isLoading, refetch } = useFindRecipe({
        categoryName: categoryName as string,
    });
    return (
        <View className=" p-[20px] pt-[55px] bg-light flex-1">
            <Text className=" font-outfit-bold text-[25px]">
                Browse {categoryName} Recipes
            </Text>
            <FlatList
                data={recipes}
                numColumns={2}
                
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={()=>refetch()}
                renderItem={({ item, index }) => <View className=' flex-1'><RecipeCard recipe={item} /></View>}
            />
        </View>
    );
}
