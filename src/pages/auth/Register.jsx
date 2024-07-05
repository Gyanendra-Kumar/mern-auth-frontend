import React, { useEffect } from "react";
import AuthImg from "../../assets/authImg.png";
import Card from "../../components/Card";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/FormComponents/Input";
import Password from "../../components/FormComponents/Password";
import PasswordWithStrength from "../../components/FormComponents/PasswordWithStrength";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import AuthHeader from "./AuthHeader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  RESET,
  sendVerificationEmail,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  //   validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(10, "Password must be at least 10 characters long"),
    confirmPassword: Yup.string()
      .required("Please confirm your password.")
      .oneOf([Yup.ref("password"), null], "Password do not match"),
  });

  //   handle submit
  const handleSubmit = async (values) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    await dispatch(register(userData));
    await dispatch(sendVerificationEmail());
  };

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate("/profile");
    }

    if (isError) {
      toast.error(message);
    }

    // dispatch(RESET());
  }, [isLoggedIn, isSuccess, dispatch, navigate]);

  return (
    <section className="container min-h-[85vh] flex items-center justify-center py-4">
      {isLoading && <Loader />}

      <Card className="bg-white">
        <div className="flex flex-col gap-2">
          <AuthHeader
            headerName="Register"
            image={AuthImg}
            imageAlt="register image"
          />

          <div className="w-[20rem] xl:w-[25rem]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-4">
                  <Input
                    label="Name"
                    name="name"
                    placeholder="Enter name"
                    formik={formik}
                  />
                  <Input
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    formik={formik}
                  />
                  <PasswordWithStrength
                    label="Enter password"
                    name="password"
                    placeholder="Enter password"
                    formik={formik}
                  />
                  <Password
                    label="Enter confirm password"
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    onPaste={(e) => {
                      e.preventDefault();
                      toast(
                        "Cannot paste the password. Please type your password again"
                      );
                      return false;
                    }}
                    formik={formik}
                  />
                  <Button
                    name="Register"
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    className="bg-btnPrimary text-white"
                  />
                </Form>
              )}
            </Formik>
          </div>

          <div className="accountCheck">
            <p>Already have an account?</p>
            <Link to="/login" className="underline text-gray-900">
              Login
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Register;
