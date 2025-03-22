import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface IProps {
    label: string;
    onPress: () => void;
    iconName: string
    loading: boolean
}
export default function Button({ label, onPress, iconName, loading }: IProps) {
    return (
        <TouchableOpacity
            disabled={loading}
            onPress={onPress}
            className=" p-[15px] flex-row gap-[10px] items-center justify-center rounded-[15px] w-full bg-primary mt-[20px]"
        >
          {loading ? <ActivityIndicator color={'#fff'} /> :  <Ionicons name={iconName as any} size={24} color="white" />}
            <Text className=" text-center  font-outfit text-light text-[17px]  ">
                {label}
            </Text>
        </TouchableOpacity>
    );
}
