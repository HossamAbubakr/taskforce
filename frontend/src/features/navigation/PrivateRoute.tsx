import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

function PrivateRoute() {
  const { isAuthed } = useAuth();

  if (!isAuthed) {
    return <Navigate replace to="/signin" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
