import FullScreenLoader from '@/components/FullScreenLoader';
import { setAuth } from '@/lib/features/auth/authSlice';
import { isLogin } from '@/lib/util';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    

    const mutation = useMutation({
      mutationFn: isLogin,
      onError: (error) =>{
        dispatch(setAuth(false))
        router.replace('/landing')
      },
      onSuccess: (isAuth) =>{
        dispatch(setAuth(isAuth))
        if(!isAuth){
          router.replace('/landing')
        }
      }
    })



    useEffect(() => {
       mutation.mutate()
    }, []);
    
    if(mutation.isPending){
      return <FullScreenLoader visible={true} />
    }

    return <>{children}</>;
};

export default ProtectedRoute;
