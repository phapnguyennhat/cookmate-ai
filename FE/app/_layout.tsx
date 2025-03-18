import { Stack } from 'expo-router';
import './global.css';
import { useFonts } from 'expo-font';
import { getToken } from '@/lib/util';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function RootLayout() {
    const [loaded, error] = useFonts({
        outfit: require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    });

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: process.env.GOOGLE_CLIENT_WEB_ID, 
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            iosClientId: process.env.GOOGLE_CLIENT_IOS_ID,
            profileImageSize: 150
        });

    },[])

    return (
        <Stack>
            <Stack.Screen
                name="auth/login"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Landing"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
