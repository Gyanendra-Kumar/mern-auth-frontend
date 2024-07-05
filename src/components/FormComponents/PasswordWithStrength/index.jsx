import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { FaCheck, FaTimes } from "react-icons/fa";
import TextError from "../TextError";

const PasswordWithStrength = (props) => {
  const { label, name, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({
    hasLength: false,
    hasLetterAndNumber: false,
    hasNoSeqChars: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // checking password sequential start here
  const handlePasswordChange = (e) => {
    const password = e.target.value;

    const hasSequential = (str) => {
      // Check if str is defined and is a string
      if (typeof str !== "string") {
        return false; // Return false or handle the error as needed
      }

      for (let i = 0; i < str.length - 1; i++) {
        if (str.charCodeAt(i + 1) - str.charCodeAt(i) === 1) {
          return true; // Sequential characters found
        }
      }
      return false; // No sequential characters found
    };

    const hasLetter = /([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const hasSequentialNumber = !/(123|234|345|456|567|678|789|012)/.test(
      password
    );
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    const hasLetterAndNumber = hasLetter && hasNumber && hasSpecialChar;
    const hasNoSpace = !/\s/.test(password);
    const hasLength = password.length >= 10;

    const hasNoSeqChars =
      !hasSequential(password) && hasSequentialNumber && hasNoSpace;

    setPasswordInfo({
      hasLength,
      hasLetterAndNumber,
      hasNoSeqChars,
    });
    rest.formik.setFieldValue(name, password); // Update Formik field value
  };
  // checking password sequential end here

  const isValidPassword = () => {
    return (
      passwordInfo.hasLength &&
      passwordInfo.hasLetterAndNumber &&
      passwordInfo.hasNoSeqChars
    );
  };

  const hasError = rest.formik.errors[name] && rest.formik.touched[name];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize text-[#525252] text-sm">
        {label}
      </label>
      <div
        className={`flex gap-1 bg-gray-100 focus:outline-none rounded-tl-sm rounded-tr-sm px-4  ${
          hasError ? "border-2 border-red-500" : "border-b-2 border-gray-300"
        }`}
      >
        <div className="flex items-center w-full">
          <Field
            id={name}
            type={showPassword ? "text" : "password"}
            name={name}
            value={rest.formik.values[name]} // Add value attribute
            onChange={handlePasswordChange}
            onFocus={() => setShowPasswordStrength(true)}
            {...rest}
            className="bg-transparent w-full py-2 text-sm text-gray-600 focus:outline-none"
          />
          {hasError && <PiWarningCircleFill className="text-red-500" />}
        </div>
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
        </button>
      </div>
      <ErrorMessage name={name} component={TextError} />

      <div>
        {showPasswordStrength && (
          <ul className="flex flex-col bg-slate-100 p-4 text-md rounded-md">
            <p className="text-sm text-gray-500">Password Strength Indicator</p>
            {Object.entries(passwordInfo).map(([key, value]) => (
              <li
                key={key}
                className={
                  value
                    ? "flex gap-1 item-center text-green-600 text-[10px]"
                    : "flex item-center gap-1 text-errorRed text-[10px]"
                }
              >
                <span>
                  {value ? (
                    <FaCheck className="mt-1" />
                  ) : (
                    <GoDotFill className="mt-1" />
                  )}
                </span>
                <span>{passwordStrengthLabels[key]}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const passwordStrengthLabels = {
  hasLength: "Minimum password length must be 10 Characters",
  hasLetterAndNumber:
    "Should contain at least uppercase letter, lowercase letter, a number and special character",
  hasNoSeqChars:
    "No sequential numbers should be used e.g (01,12,23,...) and extra space",
};

export default PasswordWithStrength;
