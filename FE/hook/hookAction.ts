import { login, loginGoogle } from "@/lib/action"
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