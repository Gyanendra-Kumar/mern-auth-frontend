import React from "react";

const InfoBox = ({ bgColor, title, count, Icon }) => {
  return (
    <section
      className={`flex items-center gap-4 ${bgColor} py-2 px-6 rounded-md`}
    >
      <span>
        <Icon size={25} color="white" />
      </span>
      <span className="text-white">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </section>
  );
};

export default InfoBox;
