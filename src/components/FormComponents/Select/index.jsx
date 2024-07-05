import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "../TextError";

const Select = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize text-gray-800 text-lg">
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className="border  border-gray-200 bg-transparent focus:outline-none rounded-md p-2"
      >
        {options.map((option) => {
          return (
            <option
              key={option.value}
              value={option.value}
              className="border-b"
            >
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Select;
