import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>

      <Outlet />
    </div>
  )
};