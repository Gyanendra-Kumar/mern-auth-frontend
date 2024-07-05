import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HomeImg from "../assets/login.svg";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "../redux/features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoginStatus());

    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <section className="container md:min-h-[85vh] max-sm:py-20 flex items-center justify-center">
      <div className="flex gap-8 flex-col md:flex-row items-center px-4">
        {/* left side */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl text-gray-600 font-semibold">
            Ultimate MERN Stack Authentication and Authorization System
          </h1>

          <div className="space-y-4 text-gray-500">
            <p>
              Learn and master Authentication and Authorization system using
              MERN Stack.
            </p>
            <p>
              Implement User Login, Registration, Password Reset, Social Login,
              User Permissions, Email Notifications etc.
            </p>
          </div>

          <div className="space-x-4 flex">
            <Link to="/register" className="auth-class bg-orange-600 w-full">
              Register
            </Link>
            <Link to="/login" className="auth-class bg-sky-600 w-full">
              Login
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex flex-1 ">
          <img src={HomeImg} />
        </div>
      </div>
    </section>
  );
};

export default Home;
