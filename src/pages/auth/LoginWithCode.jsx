import React, { memo, useEffect, useState } from "react";
import Card from "../../components/Card";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../components/FormComponents/Input";
import Button from "../../components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./auth.css";
import AuthHeader from "./AuthHeader";
import LockImg from "../../assets/lock.png";
import { useDispatch, useSelector } from "react-redux";
import { loginWithCode, RESET } from "../../redux/features/auth/authSlice";

const LoginWithCode = () => {
  const initialValues = {
    accessCode: "",
  };

  const [showVerifyMsg, setShowVerifyMsg] = useState(false);
  const [resend, setResend] = useState(false);

  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  //   validation Schema
  const validationSchema = Yup.object({
    accessCode: Yup.string().required("Access Code is required"),
  });

  //   handle submit
  const handleSubmit = async (values, { setErrors }) => {
    setShowVerifyMsg(true);
    setResend(true);

    if (values.accessCode.length !== 6 || values.accessCode.length > 6) {
      setErrors({ accessCode: "Access Code must be exactly 6 characters" });
    }

    const loginCode = values.accessCode;

    await dispatch(loginWithCode({ loginCode, email }));
    await dispatch(RESET());
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/profile");
    }
  }, [isSuccess, isLoggedIn, navigate]);

  return (
    <section className="container min-h-[85vh] flex items-center justify-center py-4">
      <Card className="bg-white">
        <div className="flex flex-col gap-2">
          <AuthHeader
            headerName="Login with Code"
            image={LockImg}
            imageAlt="login with password image"
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
                    label="Access Code"
                    name="accessCode"
                    placeholder="Access Code"
                    formik={formik}
                  />

                  <Button
                    name="Login"
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    className="bg-btnPrimary text-white"
                  />
                  {showVerifyMsg && (
                    <p className="text-center text-xs mt-[-5px]">
                      Check your email for login access code
                    </p>
                  )}
                </Form>
              )}
            </Formik>
          </div>

          <div className="forgotPassword">
            <Link to="/" className="forgotLinks">
              - Home
            </Link>
            {resend && (
              <button className="text-btnPrimary text-sm">Resend Code</button>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
};

export default memo(LoginWithCode);
