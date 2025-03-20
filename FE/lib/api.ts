import { myApi } from "@/config/myApi"

export const getProfile = async ()=>{
  const response = await myApi.get<IUser>('user/profile')
  console.log(response.data)
  return response.data
}