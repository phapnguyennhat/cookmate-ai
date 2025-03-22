import { myApi } from "@/config/myApi"
import axios from "axios"

export const getProfile = async ()=>{
  const response = await myApi.get<IUser>('user/profile')
  return response.data
}

export const getRecipeOptions = async (prompt: string)=>{
  const response = await myApi.post(`openai/recipe-option`, {prompt})
  return response.data
}

export const completeRecipe = async (recipeOption: RecipeOption)=>{
  const response = await myApi.post(`openai/complete-recipe`,recipeOption)
  return response.data
}

export const generateAiImage = async (prompt: string) => {
    const response = await myApi.post('guruai', {prompt})
    return response.data
};