import React from "react";

const TextError = (props) => {
  return (
    <div className="text-[#DA1E28] text-[12px] tracking-wide">
      {props.children}
    </div>
  );
};

export default TextError;
