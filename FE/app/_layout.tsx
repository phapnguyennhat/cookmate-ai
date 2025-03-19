import { Stack } from 'expo-router';
import './global.css';

export default function RootLayout() {
    return (
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
        </Stack>
    );
}
