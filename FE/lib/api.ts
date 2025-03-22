import { myApi } from "@/config/myApi"
import axios from "axios"

export const getProfile = async ()=>{
  const response = await myApi.get<IUser>('user/profile')
  return response.data
}

export const getRecipeOptions = async (prompt: string)=>{
  const response = await myApi.post<RecipeOption[]>(`recipe/option`, {prompt})
  return response.data
}


