import React, { useEffect, useState } from "react";
import PageMenu from "../../components/PageMenu";
import UserStats from "../../components/UserStats";
import { IoSearch } from "react-icons/io5";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUser,
  getUsers,
} from "../../redux/features/auth/authSlice";
import { shortenText } from "../profile";
import ChangeRole from "../../components/ChangeRole";
import { MdDelete } from "react-icons/md";
import Loader, { Spinner } from "../../components/Loader";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
// import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const UserList = () => {
  useRedirectLoggedOutUser("/login");
  const [searchInput, setSearchInput] = useState("");
  const [filterUser, setFilterUser] = useState([]);

  const { users, isLoading, isSuccess, isLoggedIn, verifiedUsers } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.email.toLowerCase().includes(searchInput.toLowerCase())
      );

      setFilterUser(filteredUsers);
    }
  }, [searchInput, users]);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete this user",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  // BEGIN PAGINATION
  const itemsPerPage = 5;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filterUser.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterUser.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterUser.length;
    setItemOffset(newOffset);
  };
  // END PAGINATION

  return (
    <section className="max-w-5xl mx-auto space-y-6 mb-10">
      <PageMenu />
      <UserStats />

      {/* search */}
      <div className="flex justify-between">
        <h4>All Users</h4>
        <span className="flex items-center gap-1 border py-1 px-2 rounded-md">
          <IoSearch className="text-gray-500" />
          <input
            className="bg-transparent focus:outline-none text-gray-500 text-md"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Users..."
          />
        </span>
      </div>

      {/* Table */}
      <div>
        {isLoading && <Loader />}
        {filterUser?.length === 0 && !isLoading && (
          <p>No Users yet. Please refresh your page</p>
        )}
        {filterUser?.length > 0 && (
          <table className="w-full border-collapse border border-slate-500">
            <thead>
              <tr>
                <th className="border border-slate-600 p-2">S/N</th>
                <th className="border border-slate-600 p-2">User ID</th>
                <th className="border border-slate-600 p-2">Name</th>
                <th className="border border-slate-600 p-2">Email</th>
                <th className="border border-slate-600 p-2">Role</th>
                <th className="border border-slate-600 p-2">Status</th>
                <th className="border border-slate-600 p-2">Change Role</th>
                <th className="border border-slate-600 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((user, index) => (
                <tr
                  key={user?._id}
                  className="border-b border-slate-700 text-sm"
                >
                  <td className=" text-center p-2">{index + 1}</td>
                  <td className="text-center p-2 text-sky-500">
                    {shortenText(user?._id, 5)}
                  </td>
                  <td className="capitalize text-center p-2">{user?.name}</td>
                  <td className=" text-center p-2">{user?.email}</td>
                  <td className="capitalize text-center p-2">{user?.role}</td>
                  <td className="text-center p-2">
                    {user?.isVerified ? "Verified" : "UnVerified"}
                  </td>
                  <td className="text-center p-2">
                    <ChangeRole id={user?._id} email={user?.email} />
                  </td>
                  <td className="flex justify-center items-center p-4">
                    <MdDelete
                      size={20}
                      className="text-red-500 cursor-pointer"
                      onClick={() => confirmDelete(user?._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center">
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </section>
  );
};

export default UserList;
