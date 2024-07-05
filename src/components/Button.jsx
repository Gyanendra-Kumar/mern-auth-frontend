import React from "react";

const Button = (props) => {
  const { className, name, type, ...rest } = props;
  return (
    <button
      className={`btn text-center w-full disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 ${className}`}
      type={type}
      {...rest}
    >
      {name}
    </button>
  );
};

export default Button;
