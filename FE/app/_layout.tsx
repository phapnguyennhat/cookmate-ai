import { Stack } from 'expo-router';
import './global.css';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastManager from 'toastify-react-native';
import { StyleSheet, Text, View } from 'react-native';


GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    profileImageSize: 150,
});

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
            <QueryClientProvider client={queryClient}>
                <ToastManager
                    style={styles.toast}
                    textStyle={{
                        fontSize: 16,
                    }}
                    position="top"
                    animationIn={'slideInDown'}
                    animationOut={'slideOutUp'}
                    showProgressBar={false}
                />

                <Stack>
                    <Stack.Screen
                        name="landing"
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="(auth)/login"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name='index' options={{
                        headerShown: false
                    }} />
                </Stack>
            </QueryClientProvider>
            
    );
}

const styles = StyleSheet.create({
    toast: {
        fontSize: 16,
        width: '100%',
        top: 0,
    },
});
