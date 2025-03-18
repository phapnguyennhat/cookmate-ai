import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';


import { z } from 'zod';
import { LoginForm, loginSchema } from '@/lib/schema';
import { login } from '@/lib/action';





export default function Login() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });


   

    const handleLogin = async (data: LoginForm) => {
      const response =await login(data)
      console.log(response)
    };

    return (
        <View className=" gap-y-3 flex-1 items-center justify-center">
            <Text className="font-outfit-bold text-lg ">
                Login To Cookmate AI
            </Text>

            <View className=" w-[80%] rounded-lg border border-gray-300 ">
                <TextInput
                    className="px-3"
                    placeholder="Email or Username"
                    onChangeText={(text) => setValue('account', text)}
                    {...register('account')}
                />
            </View>
                {errors.account && (
                    <Text className=" w-[80%] text-left text-red-500">
                        {errors.account.message}
                    </Text>
                )}

            <View className=" w-[80%] rounded-lg border border-gray-300">
                <TextInput
                    className=" px-3"
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(text) => setValue('password', text)}
                    {...register('password')}
                />
            </View>
                {errors.password && (
                    <Text className=" w-[80%] text-left text-red-500">
                        {errors.password.message}
                    </Text>
                )}

            <TouchableOpacity onPress={handleSubmit(handleLogin)} className=" py-3 rounded-lg bg-black w-[80%]">
                <Text className=" text-white text-center">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity className=' flex-row justify-between py-3 rounded-lg w-[80%] px-3  bg-blue-50 border border-blue-300' >
             <Text> Login With Google</Text>
             <Image className=' size-[20px]'  source={{uri: 'https://icon2.cleanpng.com/20240216/fty/transparent-google-logo-flat-google-logo-with-blue-green-red-1710875585155.webp'}}/>
            </TouchableOpacity>
        </View>
    );
}
