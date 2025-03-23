import { View, Text, FlatList } from 'react-native';

interface IProps {
    steps?: string[];
}
export default function RecipeSteps({ steps }: IProps) {
    return (
        <View className=" mt-[15px] ">
            <Text className=" font-outfit-bold text-[20px]">Steps</Text>

            <FlatList
                scrollEnabled={false}
                data={steps}
                renderItem={({ item, index }) => (
                    <View className=" flex-row gap-[7px] items-center mt-[10px] p-[10px] border-[0.3px]  rounded-[15px] ">
                        <Text className="p-[10px] w-[40px] bg-secondary font-outfit text-center rounded-[7px] text-lg ">
                            {index + 1}
                        </Text>
                        <Text className=" flex-1 font-outfit text-lg">
                            {item}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}
