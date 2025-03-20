import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginForm, loginSchema } from '@/lib/schema';
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { useLogin, useLoginGoogle } from '@/hook/hookAction';
import { Toast } from 'toastify-react-native';
import FullScreenLoader from '@/components/FullScreenLoader';
import { useRouter } from 'expo-router';
import AuthRoute from '@/routes/AuthRoute';

export default function Login() {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const login = useLogin();
    const loginGoogle = useLoginGoogle();
    const router = useRouter();

    const handleLogin = async (data: LoginForm) => {
        login.mutate(data, {
            onError: (error: any) => {
                if (error.status === 401) {
                    setError('password', {
                        message: error.response.data.message,
                    });
                } else {
                    Toast.error(error.response.data.message);
                }
            },
            onSuccess: () => {
                router.replace('/');
            },
        });
    };

    const handleLoginGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                const { idToken } = response.data;

                if (!idToken) {
                    throw new Error();
                }
                loginGoogle.mutate(idToken, {
                    onError: (error: any) => {
                        Toast.error(error.response.data.message);
                    },
                    onSuccess: () => {
                        router.replace('/');
                    },
                });
            }
        } catch (error) {
            Toast.error('Sign in with Google failed');
        }
    };
    return (
        <AuthRoute>
            <View className=" gap-y-3 flex-1 items-center justify-center">
                <Text className=" font-outfit-bold text-lg ">
                    Login To Cookmate AI
                </Text>

                <View className=" w-[80%] py-2 rounded-lg border border-gray-300 ">
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

                <View className=" w-[80%] py-2 rounded-lg border border-gray-300">
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

                <TouchableOpacity
                    disabled={login.isPending}
                    onPress={handleSubmit(handleLogin)}
                    className={` py-3 rounded-lg ${
                        login.isPending ? 'bg-gray-700' : 'bg-black'
                    } w-[80%]`}
                >
                    <Text className=" text-white text-center">Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLoginGoogle}
                    className=" flex-row justify-between py-3 rounded-lg w-[80%] px-3  bg-blue-50 border border-blue-300"
                >
                    <Text> Login With Google</Text>
                    <Image
                        className=" size-[20px]"
                        source={{
                            uri: 'https://icon2.cleanpng.com/20240216/fty/transparent-google-logo-flat-google-logo-with-blue-green-red-1710875585155.webp',
                        }}
                    />
                </TouchableOpacity>
                <FullScreenLoader visible={login.isPending || loginGoogle.isPending} />
            </View>
        </AuthRoute>
    );
}
