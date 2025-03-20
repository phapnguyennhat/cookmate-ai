import { login, loginGoogle, logout } from "@/lib/action"
import { useMutation } from "@tanstack/react-query"

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
  const mutation = useMutation({
    mutationFn: logout
  })
  return mutation
}