import { Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IProps {
    recipe?: IRecipe;
}
export default function RecipeIntro({ recipe }: IProps) {
    return (
        <View>
            <Image
                className=" w-full h-[240px] rounded-[20px]"
                source={{ uri: recipe?.recipeImageUrl }}
            />
            <View className=" justify-between flex-row items-center">
                <Text className=" font-outfit text-[25px] mt-[7px]">
                    {recipe?.recipeName}
                </Text>
                <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Text className=" font-outfit-bold text-[20px] mt-[7px]  ">
                Description
            </Text>
            <Text className=" font-outfit  text-[17px] text-gray-500 mt-[3px]">
                {recipe?.description}
            </Text>

            <View className=" mt-[15px] flex-row  justify-between gap-[5px] ">
                <View className=" flex-row items-center gap-[7px] p-[10px] rounded-[15px] bg-secondary">
                    <Ionicons name="leaf" size={18} color={'#299446'} />
                    <View>
                        <Text className=" font-outfit text-lg text-primary">
                            {recipe?.calories} Cal
                        </Text>
                        <Text>Calories</Text>
                    </View>
                </View>

                <View className=" flex-row items-center gap-[7px] p-[10px] rounded-[15px] bg-secondary">
                    <Ionicons name="timer" size={18} color={'#299446'} />
                    <View>
                        <Text className=" font-outfit text-lg text-primary">
                            {recipe?.cookTime} Minute
                        </Text>
                        <Text>Time</Text>
                    </View>
                </View>

                <View className=" flex-row items-center gap-[7px] p-[10px] rounded-[15px] bg-secondary">
                    <Ionicons name="people" size={18} color={'#299446'} />
                    <View>
                        <Text className=" font-outfit text-lg text-primary">
                            {recipe?.serveTo} Serve
                        </Text>
                        <Text>Serve</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
