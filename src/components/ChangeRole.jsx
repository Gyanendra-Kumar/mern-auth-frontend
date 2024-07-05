import { Form, Formik } from "formik";
import React from "react";
import Select from "./FormComponents/Select";
import * as Yup from "yup";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, upgradeUser } from "../redux/features/auth/authSlice";
import {
  EMAIL_RESET,
  sendAutomatedEmails,
} from "../redux/features/email/emailSlice";

const options = [
  { key: "--Select--", value: "" },
  { key: "Admin", value: "admin" },
  { key: "Subscriber", value: "subscriber" },
  { key: "Author", value: "author" },
  { key: "Suspended", value: "suspended" },
];

const ChangeRole = ({ id, email }) => {
  const dispatch = useDispatch();

  const initialValues = {
    userRole: "",
  };
  const validationSchema = Yup.object({
    userRole: Yup.string().required("Please select a role."),
  });

  const handleSubmit = async (values) => {
    const newRole = values.userRole;

    const userData = { role: newRole, id };

    const result = await dispatch(upgradeUser(userData));

    if (result.meta.requestStatus === "fulfilled") {
      const emailData = {
        subject: "Account Role Changed Successfully - Auth:Z",
        send_to: email,
        reply_to: "no-reply@outlook.com",
        template: "changeRole",
        url: "/login",
      };
      await dispatch(sendAutomatedEmails(emailData));
    } else {
      const emailData = {
        subject: "Account Role Changed Failed - Auth:Z",
        send_to: email,
        reply_to: "no-reply@outlook.com",
        template: "changeRoleFailed",
        url: "/login",
      };
      await dispatch(sendAutomatedEmails(emailData));
    }

    await dispatch(getUsers());
    await dispatch(EMAIL_RESET());
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form
            className="flex items-center h-full gap-2"
            onSubmit={handleSubmit}
          >
            <Select options={options} name="userRole" />
            <button
              type="submit"
              className="border p-[10px] rounded-md bg-btnPrimary text-white"
            >
              <FaCheck />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeRole;
