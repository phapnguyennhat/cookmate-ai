import { Marquee } from '@animatereactnative/marquee';
import { useRouter } from 'expo-router';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Landing() {
    const imageList = [
        require('../assets/images/1.jpg'),
        require('../assets/images/c1.jpg'),
        require('../assets/images/2.jpg'),
        require('../assets/images/c2.jpg'),
        require('../assets/images/3.jpg'),
        require('../assets/images/c3.jpg'),
        require('../assets/images/4.jpg'),
        require('../assets/images/6.jpg'),
        require('../assets/images/4.jpg'),
    ];
    const router = useRouter()
    return (
        <GestureHandlerRootView className=" flex-1">
            <View className=" ">
                <Marquee
                    style={{ transform: [{ rotate: '-4deg' }] }}
                    spacing={10}
                    speed={0.7}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {imageList.map((item, index) => (
                            <Image
                                key={index}
                                source={item}
                                className="rounded-[25px] object-cover size-[160px] mx-1.5"
                            />
                        ))}
                    </ScrollView>
                </Marquee>

                <Marquee
                    style={{ transform: [{ rotate: '-4deg' }], marginTop: 15 }}
                    spacing={10}
                    speed={0.4}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {imageList.map((item, index) => (
                            <Image
                                key={index}
                                source={item}
                                className="rounded-[25px] object-cover size-[160px] mx-1.5"
                            />
                        ))}
                    </ScrollView>
                </Marquee>

                <Marquee
                    style={{ transform: [{ rotate: '-4deg' }], marginTop: 15 }}
                    spacing={10}
                    speed={0.5}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {imageList.map((item, index) => (
                            <Image
                                key={index}
                                source={item}
                                className="rounded-[25px] object-cover size-[160px] mx-1.5"
                            />
                        ))}
                    </ScrollView>
                </Marquee>
            </View>

            <View className="  bg-light h-full p-[20px] ">
                <Text className=" font-outfit-bold text-[25px] text-center">
                    Cookemate AI 🍚🧑‍🍳 | Find, Create & Enjoy Delicious Recipes
                </Text>
                <Text className=" mt-[7px] text-center font-outfit text-[17px] text-gray-500   ">
                    Generate delicious recipes in second with the power of AI!
                    😋🤌
                </Text>

                <TouchableOpacity onPress={()=>router.push('/auth/login')} className=" p-[15px] rounded-[15px] bg-primary mt-[20px]">
                    <Text className=" text-center  font-outfit text-light text-[17px]  ">
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
}