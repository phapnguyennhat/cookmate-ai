import React, { useRef, useState } from 'react';
import {
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Button from './Button';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import FullScreenLoader from './FullScreenLoader';
import { Toast } from 'toastify-react-native';
import { useCreateRecipe } from '@/hook/recipe';
import { getRecipeOptions } from '@/api/recipe';

export default function CreateRecipe() {
    const [userInput, setUserInput] = useState('');
    const [recipeOptions, setRecipeOptions] = useState<RecipeOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const mutation = useCreateRecipe();

    const generateRecipeOption = async () => {
        if (!userInput) {
            Alert.alert('Please enter details');
            return;
        }
        setIsLoading(true);
        try {
            const result = await getRecipeOptions(userInput);
            setRecipeOptions(result);
            setIsLoading(false);
            actionSheetRef.current?.show();
        } catch (error: any) {
            Toast.error(error.response.data.message);
            setIsLoading(false);
        }
    };

    const generateCompleteRecipe = async (recipeOption: RecipeOption) => {
        try {
            mutation.mutate(recipeOption,{
                onSuccess: ()=>{
                    actionSheetRef.current?.hide();
                }
            })
        } catch (error) {
            console.log(error);
            Toast.error('Response too slow');
        }

    };

    return (
        <View className="bg-secondary mt-[10px] p-[15px]  rounded-[25px] items-center  ">
            <Image
                className="size-[80px]"
                source={require('./../assets/images/pan.gif')}
            />
            <Text className=" font-outfit text-[20px] text-center">
                Warm up your stove, and let's get cooking!
            </Text>
            <Text className="font-outfit text-base mt-[6px]">
                Make something for your LOVE
            </Text>

            <TextInput
                value={userInput}
                onChangeText={setUserInput}
                multiline
                numberOfLines={3}
                placeholder="What your want to create? Add ingredients etc."
                className=" text-base w-full h-[120px] bg-light rounded-[15px] p-[15px] mt-2  align-top"
            />
            <Button
                label="Generate Recipe"
                onPress={() => generateRecipeOption()}
                iconName="sparkles"
                loading={isLoading}
            />

            <FullScreenLoader visible={ mutation.isPending} />

            <ActionSheet ref={actionSheetRef}>
                <View className=" p-[25px] ">
                    <Text className=" font-outfit text-center text-[23px]">
                        Select Recipe
                    </Text>
                    <View>
                        {recipeOptions.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => generateCompleteRecipe(item)}
                                key={index}
                                className=" p-[15px] border-[0.2px] rounded-[15px] mt-[15px]"
                            >
                                <Text className=" font-outfit-bold text-base">
                                    {item.recipeName}
                                </Text>
                                <Text className=" font-outfit text-gray-500">
                                    {item.description}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ActionSheet>
        </View>
    );
}
