import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const auth = true;

  return auth ? children : <Navigate to="/login" />;
}
