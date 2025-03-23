import RecipeCard from '@/components/RecipeCard';
import { useFindRecipe } from '@/hook/hookApi';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Cookbook() {
    const [collection, setCollection] = useState('my-recipe');
    const { recipes, refetch, isLoading } = useFindRecipe({
        createAt: 'desc',
        collection: collection as any,
    });
    return (
        <View className="p-[20px] bg-light flex-1">
            <Text className=" font-outfit-bold text-[35px] "> Cook book</Text>

            <View className=" flex-row items-center  gap-[10px] p-[4px] ">
                <TouchableOpacity
                    onPress={()=>setCollection('my-recipe')}
                    className={` flex-row items-center  gap-[5px] p-[4px] ${
                        collection === 'my-recipe' ? 'opacity-100' : 'opacity-40'
                    }  `}
                >
                    <Ionicons name="sparkles-sharp" size={24} color="black" />
                    <Text className=" font-outfit text-[20px]">My Recipes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>setCollection('my-favorite')}
                    className={` flex-row items-center  gap-[5px] p-[4px] ${
                        collection === 'my-favorite' ? 'opacity-100' : 'opacity-40'
                    }  `}
                >
                    <Ionicons name="bookmark" size={24} color="black" />
                    <Text className=" font-outfit text-[20px]">Saved</Text>
                </TouchableOpacity>
            </View>

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
