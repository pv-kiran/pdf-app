import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const user = useSelector((state) => {
    return state?.auth?.user;
  });
  return user ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
