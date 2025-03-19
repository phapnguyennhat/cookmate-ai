import { Link, Redirect } from "expo-router";

import { Text, View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Redirect href={'/Landing'}/> */}
      <Link href={'/Landing'}>To Landing</Link>
    </View>
  );
}