import { getProfile } from "@/lib/api";
import { getToken, removeToken } from "@/lib/util";
import { useQuery } from "@tanstack/react-query";
import { Link, Redirect } from "expo-router";
import { useEffect } from "react";
import CookieManager from '@react-native-cookies/cookies';

import { Text, View } from "react-native";

export default function Home() {

  useEffect(()=>{
    const foo = async()=>{
      const cookie = await CookieManager.get('http://localhost:8080')
      console.log({cookie})
    }
    foo()
    getProfile()
      
  },[])
  
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