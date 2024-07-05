import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/users/`;

// REGISTER
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// LOGIN
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

// LOGOUT
const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data;
};

//GET LOGIN STATUS
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginStatus");
  return response.data;
};

// GET USERS DATA
const getUser = async () => {
  const response = await axios.get(API_URL + "getUser");
  return response.data;
};

// UPDATE USER
const updateUser = async (userData) => {
  const response = await axios.patch(API_URL + "updateUser", userData);
  return response.data;
};

// SEND VERIFICATION EMAIL
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + "sendVerificationEmail");
  return response.data.message;
};

// VERIFY USER
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(
    `${API_URL}verifyUser/${verificationToken}`
  );

  return response.data.message;
};

// CHANGE PASSWORD
const changePassword = async (userData) => {
  const response = await axios.patch(`${API_URL}changePassword`, userData);

  return response.data;
};

// FORGOT PASSWORD
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgotPassword", userData);
  return response.data.message;
};

// RESET PASSWORD
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(
    `${API_URL}resetPassword/${resetToken}`,
    userData
  );
  return response.data.message;
};

// GET USERS
const getUsers = async () => {
  const response = await axios.get(API_URL + "getUsers");
  return response.data;
};

// DELETE USERS
const deleteUser = async (userId) => {
  const response = await axios.delete(API_URL + userId);
  return response.data;
};

// UPGRADE USER
const upgradeUser = async (userData) => {
  const response = await axios.post(API_URL + "updateRole", userData);
  return response.data;
};

// SEND LOGIN CODE
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `sendLoginCode/${email}`);
  return response.data;
};

// LOGIN WITH CODE
const loginWithCode = async (loginCode, email) => {
  const response = await axios.post(API_URL + `loginWithCode/${email}`, {
    loginCode,
  });
  return response.data;
};

const loginWithGoogle = async (userToken) => {
  const response = await axios.post(API_URL + "google/callback", userToken);

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode,
  loginWithGoogle,
};

export default authService;
