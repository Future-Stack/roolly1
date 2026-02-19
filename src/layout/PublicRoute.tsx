
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { useCurrentToken, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { type ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);
    const user = useAppSelector(selectCurrentUser) as any; 
    console.log(user)

    if (token && user) {
        if (user.role === 'ADMIN') {
            return <Navigate to="/admin-dashboard" replace={true} />;
        } else if (user.role === 'BROKER') {
            return <Navigate to="/broker-dashboard" replace={true} />;
        } else {
            return <Navigate to="/vendor-dashboard" replace={true} />;
        }
    }

    return children;
};

export default PublicRoute;
