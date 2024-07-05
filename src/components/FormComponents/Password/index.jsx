import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";

const Password = (props) => {
  const { label, name, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hasError = rest.formik.errors[name] && rest.formik.touched[name];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize text-[#525252] text-sm">
        {label}
      </label>
      <div
        className={`flex gap-1 bg-gray-100 focus:outline-none rounded-tl-sm rounded-tr-sm px-4  ${
          hasError ? "border-2 border-[#DA1E28]" : "border-b-2 border-gray-300"
        }`}
      >
        <div className="flex items-center w-full">
          <Field
            id={name}
            type={showPassword ? "text" : "password"}
            name={name}
            {...rest}
            className="bg-transparent text-sm text-gray-600 w-full py-2 focus:outline-none"
          />
          {hasError && <PiWarningCircleFill className="text-[#DA1E28]" />}
        </div>
        <button type="button" onClick={togglePasswordVisibility}>
          {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
        </button>
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Password;
