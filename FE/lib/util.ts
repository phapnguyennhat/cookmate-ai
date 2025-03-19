import * as SecureStore from 'expo-secure-store';


export async function fetcher<T> (input: string, init?: RequestInit) {
  try {
    console.log(process.env.BACKEND_URL, 'backend')
    const response = await fetch(`${process.env.BACKEND_URL}/${input}`, init)
    const data = await response.json()
    console.log({data})

  
    return data as T | IError
  
  } catch (error) {
    console.log({error})
    return {
      statusCode: 500,
      message: 'Server Error'
    } as IError
  }
}

export const isErrorResponse = (res: any): res is IError => {
  return (res as IError).statusCode !== undefined;
};

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

const removeToken = async (typeToken: 'accessToken'| 'refreshToken') =>{
  await SecureStore.deleteItemAsync(typeToken)
}



