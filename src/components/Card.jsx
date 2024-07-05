import React from "react";

const Card = ({ children, className }) => {
  return (
    <section className={`${className} rounded-md p-4 shadow-md`}>
      {children}
    </section>
  );
};

export default Card;
