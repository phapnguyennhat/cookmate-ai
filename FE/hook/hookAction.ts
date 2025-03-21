import { login, loginGoogle, logout } from "@/lib/action"
import { setAuth } from "@/lib/features/auth/authSlice"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"

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