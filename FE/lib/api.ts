import { myApi } from "@/config/myApi"

export const getProfile = async ()=>{
  const response = await myApi.get<IUser>('user/profile')
  return response.data
}