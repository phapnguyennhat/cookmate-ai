import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';

interface IProps {
    recipe: IRecipe;
}

export default function RecipeCard({ recipe }: IProps) {
    return (
        <View className=" m-[5px]">
            <Image
                className=" w-full h-[220px] rounded-[20px] "
                source={{ uri: recipe.recipeImageUrl }}
            />

            {/* <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                className=" bg-black/10 absolute bottom-0 p-[10px]   "
            >
                <View>
                    <Text className=" text-light">{recipe.recipeName}</Text>
                </View>
            </LinearGradient> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
    },
});
