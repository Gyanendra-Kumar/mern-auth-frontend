import React, { memo, useEffect, useState } from "react";
import AuthImg from "../../assets/authImg.png";
import { FcGoogle } from "react-icons/fc";
import Card from "../../components/Card";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/FormComponents/Input";
import Password from "../../components/FormComponents/Password";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import AuthHeader from "./AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginWithGoogle,
  RESET,
  sendLoginCode,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [loginEmail, setLoginEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess, message, isError, twoFactor } =
    useSelector((state) => state.auth);

  //   validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(10, "Password must be at least 10 characters long"),
  });

  //   handle submit
  const handleSubmit = async (values) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    setLoginEmail(values.email);

    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/profile");
    }

    if (isError && twoFactor) {
      dispatch(sendLoginCode(loginEmail));
      navigate(`/loginWithCode/${loginEmail}`);
    }

    dispatch(RESET());
  }, [
    isLoggedIn,
    isSuccess,
    dispatch,
    navigate,
    isError,
    twoFactor,
    loginEmail,
  ]);

  const googleLogin = async (credentialResponse) => {
    await dispatch(
      loginWithGoogle({ userToken: credentialResponse.credential })
    );
  };

  return (
    <section className="container min-h-[85vh] flex items-center justify-center py-4">
      {isLoading && <Loader />}

      <Card className="bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 items-center">
            <AuthHeader
              headerName="Login"
              image={AuthImg}
              imageAlt="login image"
            />
            {/* <div className="loginWithGoogle gradientColor">
              <FcGoogle size={26} />
              <span>Sign in with Google</span>
            </div> */}
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                toast.error("Login Failed.");
              }}
            />
            <p className="text-gray-400">-- OR --</p>
          </div>

          <div className="w-[20rem] xl:w-[25rem]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-4">
                  <Input
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    formik={formik}
                  />
                  <Password
                    label="Enter password"
                    name="password"
                    placeholder="Enter password"
                    formik={formik}
                  />
                  <Button
                    name="Login"
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    className="bg-btnPrimary text-white"
                  />
                </Form>
              )}
            </Formik>
          </div>
          <Link
            to="/forgotPassword"
            className="text-xs flex justify-start underline text-gray-500 hover:text-gray-900"
          >
            Forgot Password
          </Link>

          <div className="accountCheck">
            <p>Don't have an account?</p>
            <Link to="/register" className="underline text-gray-900">
              Register
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default memo(Login);
