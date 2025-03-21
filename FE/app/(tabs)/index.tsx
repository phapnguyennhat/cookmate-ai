import FullScreenLoader from '@/components/FullScreenLoader';
import { useLogout } from '@/hook/hookAction';
import { useGetProfile } from '@/hook/hookApi';
import { Link } from 'expo-router';

import { Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
    const logout = useLogout();

    const {profile, isLoading} = useGetProfile()
    
    return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <Redirect href={'/Landing'}/> */}
                <Link href={'/landing'}>To Landing</Link>

                <TouchableOpacity onPress={()=>logout.mutate()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <FullScreenLoader visible={logout.isPending|| isLoading} />
            </View>
    );
}
