import React, { useEffect } from "react";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { FaUserCheck, FaUserMinus } from "react-icons/fa6";
import InfoBox from "../pages/UserList/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_SUSPENDED_USERS,
  CALC_VERIFIED_USERS,
} from "../redux/features/auth/authSlice";

const UserStats = () => {
  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALC_VERIFIED_USERS());
    dispatch(CALC_SUSPENDED_USERS());
  }, [dispatch, users]);

  return (
    <div className="flex flex-wrap max-sm:flex-col justify-between w-full max-lg:px-4 gap-2">
      <InfoBox
        title="Total Users"
        count={users?.length}
        Icon={FaUsers}
        bgColor="bg-blue-500"
      />
      <InfoBox
        title="Verified Users"
        count={verifiedUsers}
        Icon={FaUserCheck}
        bgColor="bg-green-500"
      />
      <InfoBox
        title="UnVerified Users"
        count={users?.length - verifiedUsers}
        Icon={FaUserMinus}
        bgColor="bg-purple-500"
      />
      <InfoBox
        title="Suspended Users"
        count={suspendedUsers}
        Icon={FaUserTimes}
        bgColor="bg-red-500"
      />
    </div>
  );
};

export default UserStats;
