import CookieManager from "@react-native-cookies/cookies";

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getRefreshToken = async ()=>{
  const cookies = await CookieManager.get(process.env.EXPO_PUBLIC_BACKEND_URL!)
  const refreshToken = cookies.Refresh?.value
  console.log({refreshToken})
}


