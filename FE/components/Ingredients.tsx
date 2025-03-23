import React from 'react';
import { View, Text, FlatList } from 'react-native';

interface IProps {
    ingredients?: Ingredient[];
}

export default function Ingredients({ ingredients }: IProps) {
  const str = "abc"
  const minimizeText = (text: string) =>{
    if(text.length >15){
      return text.split('(')[0]
    }
    return text
  }
  
    return (
        <View className=" mt-[15px] ">
            <View className=" flex-row justify-between items-center">
                <Text className=" font-outfit-bold text-[20px] ">
                    Ingredient
                </Text>

                <Text className=" font-outfit text-base ">
                    {ingredients?.length} Items
                </Text>
            </View>

            <FlatList
              scrollEnabled={false}
                data={ingredients}
                renderItem={({ item, index }) => (
                    <View className=" flex-row  items-center justify-between">
                        <View className="  flex-row items-center gap-[7px] p-2">
                            <Text className=" text-[22px]  p-[5px] bg-secondary rounded-full">
                                {item.icon}
                            </Text>
                            <Text className="  font-outfit text-lg  ">
                                {minimizeText(item.ingredient)}
                            </Text>
                        </View>
                        <Text className="  font-outfit text-lg text-gray-500">
                            {minimizeText(item.quantity)}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}
