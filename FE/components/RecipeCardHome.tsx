import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface IProps {
    recipe: IRecipe;
}
export default function RecipeCardHome({ recipe }: IProps) {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: '/recipe/recipeDetail',
                    params: { id: recipe.id },
                })
            }
            className="m-[5px]"
        >
            <Image
                className="w-[220px] h-[140px] rounded-[15px]"
                source={{ uri: recipe.recipeImageUrl }}
            />

            <LinearGradient
                colors={[
                    'transparent',
                    'rgba(0,0,0,0.8)',
                    'rgba(0,0,0,0.8)',
                    'rgba(0,0,0,0.8)',
                    'rgba(0,0,0,0.8)',
                ]}
                className=" absolute bottom-0 p-[10px]  w-full  "
                style={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                }}
            >
                <Text className=" text-light font-outfit text-base">
                    {recipe.recipeName}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}
