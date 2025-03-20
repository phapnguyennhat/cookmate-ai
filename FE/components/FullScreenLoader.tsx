import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const FullScreenLoader = ({visible}: {visible: boolean}) => {
  
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
                <ActivityIndicator color={'#299446'} size={'large'} />
            </View>
        </Modal>
    );
};

export default FullScreenLoader;
