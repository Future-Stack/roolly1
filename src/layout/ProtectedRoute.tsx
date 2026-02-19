import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { useCurrentToken, selectCurrentRole } from "@/redux/features/auth/authSlice";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);
  const userRole = useAppSelector(selectCurrentRole);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'ADMIN') {
      return <Navigate to="/admin-dashboard" replace={true} />;
    } else if (userRole === 'BROKER') {
      return <Navigate to="/broker-dashboard" replace={true} />;
    } else {
      // Default fallback for other roles (likely VENDOR)
      // Check if we are already at vendor-dashboard to avoid loop if role is valid but not in allowed list for some reason
      // But if allowedRoles IS provided and doesn't match, we must redirect.
      // Assuming 'VENDOR' is the default role for the third dashboard.
      return <Navigate to="/vendor-dashboard" replace={true} />;
    }
  }

  return children;
};

export default ProtectedRoute;