import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { JSX } from "react";
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import Collaborators from "./pages/Collaborators";

const MainLayout = () => (
  <>
    <Outlet />
  </>
);

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/workshops", element: <Workshops /> },
      { path: "/collaborators", element: <Collaborators /> },
      { path: "*", element: <Navigate to="/" /> }, // Redireciona para Home caso a rota não exista
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
