import RecipeCard from '@/components/RecipeCard';
import { useFindRecipe } from '@/hook/hookApi';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

export default function Explore() {
    const { recipes, isLoading, refetch } = useFindRecipe({ createAt: 'desc' });

    return (
        <View className="p-[20px] bg-light flex-1">
            <Text className=" font-outfit-bold text-[30px]">Explore</Text>

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
