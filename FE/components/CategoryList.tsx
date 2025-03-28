import { useGetCategoryList } from '@/hook/category';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export default function CategoryList() {
    const { categories, isLoading } = useGetCategoryList();
    const router = useRouter();

    return (
        <View className=" mt-4">
            <Text className=" font-outfit-bold text-[20px] ">Category</Text>
            <FlatList
                scrollEnabled={false}
                data={categories}
                numColumns={4}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/recipe-by-category',
                                params: { categoryName: item.name },
                            })
                        }
                        key={index}
                        className=" flex-1  items-center mt-[10px]"
                    >
                        <Image
                            className=" size-[45px]"
                            source={{ uri: item.image.url }}
                        />
                        <Text className=" font-outfit mt-[3px]">
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
