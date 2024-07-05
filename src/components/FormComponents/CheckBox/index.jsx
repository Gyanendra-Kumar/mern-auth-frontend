// CheckBox.js
import { Field, ErrorMessage } from "formik";
import React from "react";
import TextError from "../TextError";

const CheckBox = ({ label, name, className, ...rest }) => {
  return (
    <div className="flex items-center">
      <Field type="checkbox" id={name} name={name} {...rest} className="mr-2" />
      <label htmlFor={name} className={`${className}`}>
        {label}
      </label>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default CheckBox;
