import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";


export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  // if (user) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return (
    <div>
      {outlet}
    </div>
  );
};
