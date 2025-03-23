import { DEFAULT_AVT } from '@/common/constant';
import FullScreenLoader from '@/components/FullScreenLoader';
import { useLogout } from '@/hook/hookAction';
import { useGetProfile } from '@/hook/hookApi';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile() {
    const options = [
        {
            name: 'Create New Recipe',
            icon: require('./../../assets/images/i1.png'),
            path: '/(tabs)',
        },
        {
            name: 'My Recipes',
            icon: require('./../../assets/images/i3.png'),
            path: '/(tabs)/Cookbook',
        },
        {
            name: 'Browse More Recipes',
            icon: require('./../../assets/images/i2.png'),
            path: '/(tabs)/Explore',
        },
        {
            name: 'Logout',
            icon: require('./../../assets/images/i2.png'),
            
        },
    ];
    const { profile } = useGetProfile();
    const router =useRouter()
    const logout= useLogout()

    const handleOptionClick = (option: any) =>{
      if(option.name ==='Logout'){
        logout.mutate()
        return
      }
      router.push(option.path)
    }
    return (
        <View className=" flex-1 bg-light p-[25px] ">
            <Text className=" font-outfit-bold text-[30px]">Profile</Text>

            <View className=" items-center">
                <Image
                    className=" size-[80px] rounded-full "
                    source={{ uri: profile?.avatar?.url || DEFAULT_AVT }}
                />
                <Text className=" font-outfit-bold text-[25px] mt-[20px] ">
                    {profile?.name}
                </Text>
                <Text className=" font-outfit text-[17px] text-gray-500 ">
                    {profile?.email}
                </Text>
            </View>

            <FlatList
                className=" mt-[25px]"
                data={options}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleOptionClick(item)}
                        className=" p-[20px]  flex-row items-center gap-[7px] "
                    >
                        {item.name === 'Logout' ? (
                            <View className=' bg-red-500  rounded-lg size-[40px] items-center justify-center '><Ionicons name="power" size={35} color="white" /></View>
                        ) : (
                            <Image className="size-[40px]" source={item.icon} />
                        )}
                        <Text className=" font-outfit text-[20px] first-line:">
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <FullScreenLoader visible={logout.isPending} />
        </View>
    );
}
