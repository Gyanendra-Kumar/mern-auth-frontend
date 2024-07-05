import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError";
import { PiWarningCircleFill } from "react-icons/pi";

const Input = (props) => {
  const { label, name, className, inputClass, ...rest } = props;

  const hasError = rest.formik.errors[name] && rest.formik.touched[name];

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name} className="capitalize text-[#525252] text-sm">
        {label}
      </label>
      {hasError ? (
        <div className="error-input">
          <Field
            id={name}
            name={name}
            {...rest}
            className={`bg-transparent focus:outline-none w-full px-2 text-sm`}
          />
          <PiWarningCircleFill className="text-red-500" />
        </div>
      ) : (
        <Field
          id={name}
          name={name}
          {...rest}
          className={`input ${inputClass}`}
        />
      )}

      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Input;
