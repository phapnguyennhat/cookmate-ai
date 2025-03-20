import * as SecureStore from 'expo-secure-store';




export const saveToken = async (token: string, expiresIn: number, typeToken: 'accessToken'| 'refreshToken') =>{
  const expiryTime = Date.now() + expiresIn * 1000;
  const tokenData = JSON.stringify({ token, expiryTime });
  await SecureStore.setItemAsync(typeToken, tokenData);
}

export const getToken = async (typeToken: 'accessToken'| 'refreshToken') =>{
  const tokenData = await SecureStore.getItemAsync(typeToken);
  if(!tokenData){
    return null
  }
  const {token, expiryTime } = JSON.parse(tokenData)
  if (Date.now() > expiryTime) {
    await SecureStore.deleteItemAsync('authToken'); // Xóa token nếu hết hạn
    return null;
  }
  return token
}

export const removeToken = async (typeToken: 'accessToken'| 'refreshToken') =>{
  await SecureStore.deleteItemAsync(typeToken)
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
