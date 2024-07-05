import React from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "../TextError";

const RadioButton = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize text-gray-800 text-lg">
        {label}
      </label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  name={name}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default RadioButton;
