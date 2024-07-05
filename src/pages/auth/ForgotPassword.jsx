import React, { memo } from "react";
import AuthImg from "../../assets/authImg.png";
import Card from "../../components/Card";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/FormComponents/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import AuthHeader from "./AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, RESET } from "../../redux/features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const initialValues = {
    email: "",
  };

  //   validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  //   handle submit
  const handleSubmit = async (values) => {
    const userData = {
      email: values.email,
    };

    await dispatch(forgotPassword(userData));
    navigate("/");
  };

  return (
    <section className="container min-h-[85vh] flex items-center justify-center py-4">
      {isLoading && <Loader />}
      <Card className="bg-white">
        <div className="flex flex-col gap-2">
          <AuthHeader
            headerName="Forgot Password"
            image={AuthImg}
            imageAlt="forgot password image"
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
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    formik={formik}
                  />

                  <Button
                    name="Get Reset Email"
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

export default memo(ForgotPassword);
