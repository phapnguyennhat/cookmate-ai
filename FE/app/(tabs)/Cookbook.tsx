import RecipeCard from '@/components/RecipeCard';
import { useFindRecipe } from '@/hook/hookApi';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

export default function Cookbook() {
    const { recipes, refetch, isLoading } = useFindRecipe({
        createAt: 'desc',
        collection: 'my-recipe',
    });
    return (
        <View className="p-[20px] bg-light flex-1">
            <Text className=" font-outfit-bold text-[35px] "> Cook book</Text>

            <FlatList
                data={recipes}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={() => refetch()}
                renderItem={({ item, index }) => (
                    <View className=" flex-1">
                        <RecipeCard recipe={item} />
                    </View>
                )}
            />
        </View>
    );
}
