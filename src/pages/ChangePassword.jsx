import React, { useEffect } from "react";
import Card from "../components/Card";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../components/FormComponents/Input";
import PasswordWithStrength from "../components/FormComponents/PasswordWithStrength";
import Password from "../components/FormComponents/Password";
import Button from "../components/Button";
import PageMenu from "../components/PageMenu";
import useRedirectLoggedOutUser from "../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import {
  changePassword,
  getUser,
  logout,
  RESET,
} from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { sendAutomatedEmails } from "../redux/features/email/emailSlice";

const ChangePassword = () => {
  useRedirectLoggedOutUser("/login");
  const { isLoading, user, isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  //   validation Schema
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(10, "Password must be at least 10 characters long"),
    confirmPassword: Yup.string()
      .required("Please confirm your password.")
      .oneOf([Yup.ref("newPassword"), null], "Password do not match"),
  });

  //   handle submit
  const handleSubmit = async (values) => {
    const userData = {
      oldPassword: values.currentPassword,
      password: values.newPassword,
    };

    const result = await dispatch(changePassword(userData));

    if (result.meta.requestStatus === "fulfilled") {
      const emailData = {
        subject: "Password Changed - Auth:Z",
        send_to: user?.email,
        reply_to: "no-reply@outlook.com",
        template: "changePassword",
        url: "/forgotPassword",
      };

      await dispatch(sendAutomatedEmails(emailData));
      await dispatch(logout());
      await dispatch(RESET());
      navigate("/login");
    } else {
      const emailData = {
        subject: "Password Change Failed - Auth:Z",
        send_to: user?.email,
        reply_to: "no-reply@outlook.com",
        template: "changePasswordFailed",
        url: "/forgotPassword",
      };
      await dispatch(sendAutomatedEmails(emailData));
      await dispatch(logout());
      await dispatch(RESET());
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <section className="container flex flex-col items-center gap-6 mb-32">
      {isLoading && <Loader />}
      <PageMenu />

      <h1 className="text-4xl text-gray-700">Change Password</h1>
      <Card className="bg-white w-[20rem] xl:w-[25rem]">
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="space-y-4">
                <Input
                  label="Current Password"
                  name="currentPassword"
                  placeholder="Enter Current Password"
                  formik={formik}
                />
                <PasswordWithStrength
                  label="Enter New password"
                  name="newPassword"
                  placeholder="Enter new password"
                  formik={formik}
                />
                <Password
                  label="Enter confirm password"
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                  formik={formik}
                />
                {isLoading ? (
                  <Loader />
                ) : (
                  <Button
                    name="Change Password"
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    className="bg-btnPrimary text-white"
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </section>
  );
};

export default ChangePassword;
