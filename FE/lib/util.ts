import CookieManager from "@react-native-cookies/cookies";
import { refreshCookie } from "./action";

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const isLogin =  async ()=>{
  const cookies = await CookieManager.get(process.env.EXPO_PUBLIC_BACKEND_URL!)
  const accessToken = cookies.Authentication?.value
  const refreshToken = cookies.Refresh?.value

  if(!accessToken && refreshToken){
    await refreshCookie()
  }
  return !!refreshToken
}


export const getRefreshToken = async ()=>{
  const cookies = await CookieManager.get(process.env.EXPO_PUBLIC_BACKEND_URL!)
  const refreshToken = cookies.Refresh?.value
  console.log({refreshToken})
}


