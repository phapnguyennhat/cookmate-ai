import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout (){
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({focused, color})=><Image className={`size-8 ${focused? 'opacity-100': 'opacity-40'}`} source={require('./../../assets/images/i1.png')}  />
          
      }} />
      <Tabs.Screen name="Explore"
        options={{
        tabBarIcon: ({focused, color})=><Image className={`size-8 ${focused? 'opacity-100': 'opacity-40'}`} source={require('./../../assets/images/i2.png')}  />

        }}
       />
      <Tabs.Screen name="Cookbook" options={{
        tabBarIcon: ({focused, color})=><Image className={`size-8 ${focused? 'opacity-100': 'opacity-40'}`} source={require('./../../assets/images/i3.png')}  />

      }} />
      <Tabs.Screen name="Profile" options={{
        tabBarIcon: ({focused, color})=><Image className={`size-8 ${focused? 'opacity-100': 'opacity-40'}`} source={require('./../../assets/images/i4.png')}  />

      }} />
    </Tabs>
  )
} 