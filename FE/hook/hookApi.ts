import FullScreenLoader from "@/components/FullScreenLoader"
import { myApi } from "@/config/myApi"
import { setAuth } from "@/lib/features/auth/authSlice"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useEffect } from "react"

export const useGetProfile = ()=>{
  const {data: profile, isLoading, error, isSuccess} = useQuery({
    queryFn: ()=>myApi.get('user/profile'),queryKey: ['profile']
  })
  const router= useRouter()

  useEffect(() => {
      if (error && (error as any).response.data.statusCode === 401) {
          router.replace('/landing');
      }
  }, [error]);



  return {profile, isLoading}
}