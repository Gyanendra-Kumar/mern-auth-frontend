import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET, sendVerificationEmail } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Notification = () => {
  const dispatch = useDispatch();

  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail());
    // await dispatch(RESET());
  };

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-amber-500 py-2 px-4 mt-6 flex">
        <p className="font-semibold text-red-500">Message: &nbsp;</p>
        <p className="text-red-500">
          To verify your account, check your email for verification link.
        </p>
        <div onClick={sendVerEmail} className="cursor-pointer">
          Resend Link
        </div>
      </div>
    </section>
  );
};

export default Notification;
