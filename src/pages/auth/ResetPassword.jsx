import React from "react";
import AuthImg from "../../assets/authImg.png";
import Card from "../../components/Card";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/FormComponents/Input";
import Password from "../../components/FormComponents/Password";
import PasswordWithStrength from "../../components/FormComponents/PasswordWithStrength";
import Button from "../../components/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./auth.css";
import AuthHeader from "./AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";

const ResetPassword = () => {
  const { resetToken } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  //   validation Schema
  const validationSchema = Yup.object({
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
      password: values.password,
    };
    await dispatch(resetPassword({ userData, resetToken }));
    navigate("/login");
  };

  return (
    <section className="container min-h-[85vh] flex items-center justify-center py-4">
      {isLoading && <Loader />}

      <Card className="bg-white">
        <div className="flex flex-col gap-2">
          <AuthHeader
            headerName="Reset Password"
            image={AuthImg}
            imageAlt="reset password image"
          />

          <div className="w-[20rem] xl:w-[25rem]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-4">
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
                    formik={formik}
                  />
                  <Button
                    name="Reset Password"
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    className="bg-btnPrimary text-white"
                  />
                </Form>
              )}
            </Formik>
          </div>

          <div className="forgotPassword">
            <Link to="/" className="forgotLinks">
              - Home
            </Link>
            <Link to="/login" className="forgotLinks">
              - Login
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ResetPassword;
