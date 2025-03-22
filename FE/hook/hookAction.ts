import { myApi } from "@/config/myApi"
import { login, loginGoogle, logout } from "@/lib/action"
import { setAuth } from "@/lib/features/auth/authSlice"
import { CreateRecipeForm } from "@/lib/schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"
import { Toast } from "toastify-react-native"

export const useLogin = () =>{
  const mutation = useMutation({
    mutationFn: login,
  })
  return mutation
}

export const useLoginGoogle = () =>{
  const mutation = useMutation({
    mutationFn: loginGoogle,
  })

  return mutation
}

export const useLogout = () =>{
  const router = useRouter()
  const dispatch = useDispatch()
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: ()=> {
      dispatch(setAuth(false))
      router.replace('/landing')
    }
    
  })
  return mutation
}

export const useCreateRecipe = () =>{
  const router = useRouter()
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (recipeOption:RecipeOption)=>{
      return myApi.post<IRecipe>('recipe', recipeOption)
    },
    
    onError:(error: any)=>{
      if(error.response.data.codeStatus === 401){
        router.replace('/landing')
      }else{
        Toast.error(error.response.data.message ||'Failed to create recipe')
      }
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['recipe']})
    }
    
  })
  return mutation
}