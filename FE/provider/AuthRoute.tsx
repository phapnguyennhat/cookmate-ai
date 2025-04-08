import FullScreenLoader from "@/components/FullScreenLoader"
import { RootState } from "@/lib/store"

import { useMutation } from "@tanstack/react-query"
import { usePathname, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Toast } from "toastify-react-native"

const AuthRoute = ({children}: {children: React.ReactNode})=>{
  const router =useRouter()
  const pathName = usePathname()
  const isAuth = useSelector((state: RootState)=>state.auth.value)
  useEffect(()=>{
    if(isAuth){
      router.replace('/')
    }
  },[pathName,isAuth])

  return <>{children}</>
}

export default AuthRoute