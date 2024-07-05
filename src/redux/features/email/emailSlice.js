import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailService from "./emailService";
import { toast } from "react-toastify";

const initialState = {
  sendingEmail: false,
  emailSent: false,
  msg: "",
};

// SEND AUTOMATED EMAILS
export const sendAutomatedEmails = createAsyncThunk(
  "email/sendAutomatedEmails",
  async (userData, thunkAPI) => {
    try {
      return await emailService.sendAutomatedEmails(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET: (state) => {
      (state.sendingEmail = false), (state.emailSent = false), (state.msg = "");
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(sendAutomatedEmails.pending, (state) => {
        state.sendingEmail = true;
      })
      .addCase(sendAutomatedEmails.fulfilled, (state, action) => {
        state.sendingEmail = false;
        state.emailSent = true;
        state.msg = action.payload;
        toast.success(action.payload.message);
      })
      .addCase(sendAutomatedEmails.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSent = false;
        state.msg = action.payload;
        toast.error(action.payload.message);
      }),
});

export const { EMAIL_RESET } = emailSlice.actions;

export default emailSlice.reducer;
