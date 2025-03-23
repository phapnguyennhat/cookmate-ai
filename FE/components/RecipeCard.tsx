import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IProps {
    recipe: IRecipe;
}

export default function RecipeCard({ recipe }: IProps) {
  const router = useRouter()
    return (
        <TouchableOpacity onPress={()=>router.push({
          pathname: '/recipe/recipeDetail',
          params: {id: recipe.id}
        })}   className=" m-[5px]">
            <Image
                className=" w-full h-[220px] rounded-[20px] "
                source={{ uri: recipe.recipeImageUrl }}
            />

            <LinearGradient
                colors={['transparent','rgba(0,0,0,0.8)','rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)','rgba(0,0,0,0.8)']}
                className=" absolute bottom-0 p-[10px]  w-full  "
                style= {{
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius:20
                }}
            >
                <View>
                    <Text className=" text-light text-base">{recipe.recipeName}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}
