import React from "react";
import { BiLogIn } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout, RESET } from "../redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "./HiddenLink";
import { UserName } from "../pages/profile";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const logoutHandler = async () => {
    dispatch(RESET());
    await dispatch(logout());
    navigate("/login");
  };
  return (
    <header className="bg-slate-800 text-white w-full py-2 px-2 xl:px-0">
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-full">
        <Link to="/" className="flex items-center h-full">
          <BiLogIn size={35} />
          <span>Auth:Z</span>
        </Link>

        <ul className="hidden md:flex items-center h-full gap-4 text-sm">
          <ShowOnLogin>
            <li className="flex items-center h-full gap-1">
              <FaUserCircle size={20} />
              <UserName />
            </li>

            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>

            <li>
              <Button
                name="Logout"
                className="border border-white"
                type="button"
                onClick={logoutHandler}
              />
            </li>
          </ShowOnLogin>

          <ShowOnLogout>
            <li className="btn bg-btnPrimary">
              <Link to="/login">Login</Link>
            </li>
          </ShowOnLogout>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
