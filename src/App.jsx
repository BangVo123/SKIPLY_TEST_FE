import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />} errorElement={<>Error</>}>
        <Route index element={<Navigate to="auth/login" />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<>Not found</>} />
      </Route>
    </Routes>
  );
};

export default App;
