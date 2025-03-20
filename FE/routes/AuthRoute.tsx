import FullScreenLoader from "@/components/FullScreenLoader"
import { isLogin } from "@/lib/util"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Toast } from "toastify-react-native"

const AuthRoute = ({children}: {children: React.ReactNode})=>{
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: isLogin,
    onError: (error:any) =>{
      Toast.error(error.response.data.message || 'Server Error')
    },
    onSuccess: (isAuth) =>{
      if(isAuth){
        router.replace('/')
      }
    }
  })

  useEffect(()=>{
    mutation.mutate()
  },[])

  if(mutation.isPending){
    return <FullScreenLoader visible={true} />
  }
  
  return <>{children}</>
}

export default AuthRoute