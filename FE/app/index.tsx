import FullScreenLoader from '@/components/FullScreenLoader';
import { useLogout } from '@/hook/hookAction';
import ProtectedRoute from '@/routes/ProtectedRoute';
import { Link, useRouter } from 'expo-router';

import { Text, TouchableOpacity, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function Home() {
    const router = useRouter();
    const logout = useLogout();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                router.replace('/landing');
            },
            onError: (error: any) => {
                router.replace('/landing')
            },
        });
    };

  

    return (
        <ProtectedRoute>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <Redirect href={'/Landing'}/> */}
                <Link href={'/landing'}>To Landing</Link>

                <TouchableOpacity onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <FullScreenLoader visible={logout.isPending} />
            </View>
        </ProtectedRoute>
    );
}
