import FullScreenLoader from '@/components/FullScreenLoader';
import { useRegister } from '@/hook/auth';
import { RegisterForm, registerSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Toast } from 'toastify-react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Register() {
	const signUp = useRegister();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const [hidePassword, setHidePassword] = useState(true)
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

	const handleRegister = async (data: RegisterForm) => {
		signUp.mutate(data, {
			onError: (error: any) => {
				Toast.error(error.response.data.message || 'Server Error');
			},
			onSuccess: () => {
				Toast.success('Create account successfully');
				router.replace('/(auth)/login')
			},
		});
	};

	return (
		<View className=" gap-y-3 flex-1 items-center justify-center">
			<Text className=" font-outfit-bold text-2xl ">
				Create a Account
			</Text>

			<View className=" w-[80%] py-3 rounded-lg border border-gray-300 ">
				<TextInput
					className="px-3 text-base"
					placeholder="Username"
					onChangeText={(text) => setValue('username', text)}
					{...register('username')}
				/>
			</View>
			{errors.username && (
				<Text className=" w-[80%] text-left text-red-500">
					{errors.username.message}
				</Text>
			)}

			<View className=" w-[80%] py-3 rounded-lg border border-gray-300">
				<TextInput
					className=" px-3 text-base "
					placeholder="Name"
					onChangeText={(text) => setValue('name', text)}
					{...register('name')}
				/>
			</View>
			{errors.name && (
				<Text className=" w-[80%] text-left text-red-500">
					{errors.name.message}
				</Text>
			)}

			<View className=" w-[80%] py-3 rounded-lg border border-gray-300 ">
				<TextInput
					className="px-3 text-base"
					placeholder="Email"
					onChangeText={(text) => setValue('email', text)}
					{...register('email')}
				/>
			</View>
			{errors.email && (
				<Text className=" w-[80%] text-left text-red-500">
					{errors.email.message}
				</Text>
			)}

			<View className=" flex-row w-[80%] px-3 py-3 rounded-lg border border-gray-300 ">
				<TextInput
					className=" flex-1 text-base"
					placeholder="Password"
					secureTextEntry={hidePassword}
					onChangeText={(text) => setValue('password', text)}
					{...register('password')}
				/>
				<TouchableOpacity onPress={()=>setHidePassword(!hidePassword)} >
					<Feather
						name={hidePassword ? 'eye-off' : 'eye'}
						size={24}
						color="black"
					/>
				</TouchableOpacity>
			</View>
			{errors.password && (
				<Text className=" w-[80%] text-left text-red-500">
					{errors.password.message}
				</Text>
			)}

			<View className=" w-[80%] flex-row p-3 rounded-lg border border-gray-300 ">
				<TextInput
					className=" flex-1 text-base"
					placeholder="Confirm Password"
					secureTextEntry ={hideConfirmPassword}
					onChangeText={(text) => setValue('confirmPassword', text)}
					{...register('confirmPassword')}
				/>
				<TouchableOpacity onPress={()=>setHideConfirmPassword(!hideConfirmPassword)} >
					<Feather
						name={hideConfirmPassword ? 'eye-off' : 'eye'}
						size={24}
						color="black"
					/>
				</TouchableOpacity>
			</View>
			{errors.confirmPassword && (
				<Text className=" w-[80%] text-left text-red-500">
					{errors.confirmPassword.message}
				</Text>
			)}

			<TouchableOpacity
				disabled={signUp.isPending}
				onPress={handleSubmit(handleRegister)}
				className={` py-3 rounded-lg ${
					signUp.isPending ? 'bg-gray-700' : 'bg-black'
				} w-[80%]`}
			>
				<Text className=" text-white text-center">Login</Text>
			</TouchableOpacity>

			<View className="  flex-row justify-center gap-1">
				<Text className=" text-lg">Already has an account?</Text>
				<TouchableOpacity
					onPress={() => router.replace('/(auth)/login')}
				>
					<Text className=" text-lg text-primary">Login</Text>
				</TouchableOpacity>
			</View>

			<FullScreenLoader visible={signUp.isPending} />
		</View>
	);
}
