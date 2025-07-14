import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/components/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" index element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
