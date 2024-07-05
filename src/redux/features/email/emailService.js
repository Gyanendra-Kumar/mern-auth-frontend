import axios from "axios";
import { API_URL } from "../auth/authService";

// SEND AUTOMATED EMAIL

const sendAutomatedEmails = async (emailData) => {
  const response = await axios.post(API_URL + "sendAutomatedEmails", emailData);
  return response.data;
};

const emailService = {
  sendAutomatedEmails,
};

export default emailService;
