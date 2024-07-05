import React, { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "./redux/features/auth/authSlice";

axios.defaults.withCredentials = true;

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/profile"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const UserList = lazy(() => import("./pages/UserList/UserList"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const LoginWithCode = lazy(() => import("./pages/auth/LoginWithCode"));
const Verify = lazy(() => import("./pages/auth/Verify"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "resetPassword/:resetToken",
        element: <ResetPassword />,
      },
      {
        path: "loginWithCode/:email",
        element: <LoginWithCode />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "/verify/:verificationToken",
        element: <Verify />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
