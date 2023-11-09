import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const user = useSelector((state) => {
    return state?.auth?.user;
  });
  return !user ? <Outlet /> : <Navigate to="/upload" />;
}

export default PublicRoutes;
