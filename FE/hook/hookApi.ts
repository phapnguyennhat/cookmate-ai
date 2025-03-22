import FullScreenLoader from "@/components/FullScreenLoader"
import { myApi } from "@/config/myApi"
import { setAuth } from "@/lib/features/auth/authSlice"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Toast } from "toastify-react-native"

export const useGetProfile = ()=>{
  const {
      data: profile,
      isLoading,
      error,
      isError,
  } = useQuery({
      queryFn: async () => {
          const reponse = await myApi.get<IUser>('user/profile');
          return reponse.data
      },
      queryKey: ['profile'],
  });
  const router= useRouter()

  useEffect(() => {
    
      if(isError){
        if((error as any).response.data.statusCode ==401){
            router.replace('/landing')
        }else{
            Toast.error('Network error')
        }
      }
  }, [isError]);
  return {profile, isLoading}
}

export const useGetCategoryList = () =>{
    const {data: categories, isLoading, isError} = useQuery({
        queryFn: async () =>{
            const response = await myApi.get<ICategory[]>('category')
            return response.data
        },
        queryKey: ['category']
    })

    useEffect(()=>{
        if(isError){
            Toast.error('Network Error')
        }
    },[isError])

    return {categories, isLoading}
}

