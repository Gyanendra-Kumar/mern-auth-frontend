import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AdminAuthorLink } from "./HiddenLink";

const PageMenu = () => {
  const location = useLocation();
  const [hasReloaded, setHasReloaded] = useState(false);

  const activeClasses = ({ isActive }) =>
    isActive ? "border-b border-red-500 text-red-500" : "";

  // useEffect(() => {
  //   const reloaded = localStorage.getItem("usersPageReloaded");
  //   if (location.pathname === "/users" && !reloaded) {
  //     localStorage.setItem("usersPageReloaded", "true");
  //     window.location.reload();
  //   }
  // }, [location]);

  return (
    <div className="container bg-slate-200 flex justify-evenly py-2 mt-6">
      <NavLink to="/profile" className={activeClasses}>
        Profile
      </NavLink>
      <NavLink to="/changePassword" className={activeClasses}>
        Change Password
      </NavLink>

      <AdminAuthorLink>
        <NavLink to="/users" className={activeClasses}>
          Users
        </NavLink>
      </AdminAuthorLink>
    </div>
  );
};

export default PageMenu;
