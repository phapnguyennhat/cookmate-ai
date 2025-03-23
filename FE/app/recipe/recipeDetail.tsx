import CreateRecipe from '@/components/CreateRecipe';
import Ingredients from '@/components/Ingredients';
import RecipeIntro from '@/components/RecipeIntro';
import RecipeSteps from '@/components/RecipeSteps';
import { useFindRecipeById } from '@/hook/hookApi';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RecipeDetails() {
    const { id } = useLocalSearchParams();
    const { recipe, isLoading } = useFindRecipeById(id as string);
    

    return (
        <ScrollView className="p-[20px]   bg-light ">
            <RecipeIntro recipe={recipe} />
            <Ingredients ingredients={recipe?.ingredients} />
            <RecipeSteps steps={recipe?.steps} />
            <Text className=" mt-[15px] text-base font-outfit text-center text-gray-500">
                You are looking something else, Create A New One
            </Text>
            <CreateRecipe />
            <View className=" mb-9"></View>
        </ScrollView>
    );
}
