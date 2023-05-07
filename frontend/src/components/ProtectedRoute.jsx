import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const authToken = localStorage.getItem("authToken");

  const element = authToken ? props.element : <Navigate to="/login" replace />;

  return <Route {...props} element={element} />;
};

export default ProtectedRoute;
