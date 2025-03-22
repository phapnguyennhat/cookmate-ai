import { DEFAULT_AVT } from '@/common/constant';
import { useGetProfile } from '@/hook/hookApi';
import React, { useState } from 'react';
import { Image, Switch, Text, View } from 'react-native';

export default function IntroHeader() {
    const { profile, isLoading } = useGetProfile();
    const [isEnabled, setIsEnabled] = useState(false)
    return (
        <View className=' flex-row items-center justify-between' >
            <View className=" flex-row items-center gap-2">
                <Image
                    className=" size-[45px] rounded-full"
                    source={{ uri: profile?.avatar?.url || DEFAULT_AVT }}
                />
                <Text className=" font-outfit-bold text-xl  ">
                    Hello, {profile?.name}
                </Text>
            </View>

            <View className=' flex-row items-center gap-1' >
                <Text>
                    {isEnabled? 'Veg': 'Non-Veg'}
                </Text>
                <Switch
                    value={isEnabled}
                    onValueChange={() => setIsEnabled(!isEnabled)}
                />
            </View>
        </View>
    );
}
