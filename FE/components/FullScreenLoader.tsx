import React from 'react';
import { View, ActivityIndicator, Modal, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const FullScreenLoader = ({
    visible,
    text = 'Loading...',
}: {
    visible: boolean;
    text?: string;
}) => {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View className=' p-[20px] rounded-[15px] bg-primary items-center' >
                    <ActivityIndicator color={'#fff'} size={'large'} />
                    <Text className=" mt-[10px] text-light text-base font-outfit">
                        {text}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default FullScreenLoader;
