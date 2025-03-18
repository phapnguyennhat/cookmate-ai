import { Stack } from 'expo-router';
import './global.css';
import { useFonts } from 'expo-font';

export default function RootLayout() {
    const [loaded, error] = useFonts({
        outfit: require('../assets/fonts/Outfit-Regular.ttf'),
        'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    });

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
