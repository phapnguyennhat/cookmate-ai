import { Link, Redirect } from "expo-router";
import { useEffect } from "react";

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
      <Link href={'/landing'}>To Landing</Link>
    </View>
  );
}