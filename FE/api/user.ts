import { myAPiConfig } from "./myApiConfig"

export const getProfile = async ()=>{
  const response = await myAPiConfig.get<IUser>('user/profile')
  return response.data
}
