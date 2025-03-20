import FullScreenLoader from '@/components/FullScreenLoader';
import { isLogin } from '@/lib/util';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    

    const mutation = useMutation({
      mutationFn: isLogin,
      onError: (error) =>{
        router.replace('/landing')
      },
      onSuccess: (isAuth) =>{
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
