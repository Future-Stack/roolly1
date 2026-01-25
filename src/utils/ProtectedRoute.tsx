import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import type { ReactNode } from "react";

const ProtectedRoute = ({children}:{children:ReactNode}) => {
    const token = useAppSelector(useCurrentToken)
    if(!token){
        return <Navigate to='/login' replace={true}/>
    }
  return children;
}

export default ProtectedRoute