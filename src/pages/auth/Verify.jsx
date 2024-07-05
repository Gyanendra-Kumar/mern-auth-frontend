import React from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../../redux/features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";

const Verify = () => {
  const dispatch = useDispatch();
  const { verificationToken } = useParams();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    // await dispatch(RESET());
    navigate("/profile");
  };

  return (
    <section className="container">
      {isLoading && <Loader />}
      <div className="centerAll flex-col gap-4">
        <h2 className="font-semibold text-4xl text-gray-600">
          Account Verification
        </h2>
        <p className="text-gray-500 tracking-wide">
          To verify the account, click the below button...
        </p>
        <Button
          name="Verify"
          type="button"
          className="w-1/5 bg-btnPrimary text-white"
          onClick={verifyAccount}
        />
      </div>
    </section>
  );
};

export default Verify;
