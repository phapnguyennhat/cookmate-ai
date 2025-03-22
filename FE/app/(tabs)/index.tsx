import CategoryList from '@/components/CategoryList';
import CreateRecipe from '@/components/CreateRecipe';
import FullScreenLoader from '@/components/FullScreenLoader';
import IntroHeader from '@/components/IntroHeader';
import { useLogout } from '@/hook/hookAction';
import { useGetProfile } from '@/hook/hookApi';
import { Link } from 'expo-router';

import { ScrollView, View } from 'react-native';

export default function Home() {
    const logout = useLogout();

  
    
    return (
            <ScrollView
               className='flex-1 bg-white p-[20px]'
            >
                {/* Intro */}
                <IntroHeader/>
                {/* Recipe Generator UI */}
                <CreateRecipe/>
                {/* Category */}
                <CategoryList/>

                <FullScreenLoader visible={logout.isPending} />
            </ScrollView>
    );
}
