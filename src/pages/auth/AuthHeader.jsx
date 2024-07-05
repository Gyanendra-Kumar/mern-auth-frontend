import React from "react";
import "./auth.css";

const AuthHeader = (props) => {
  const { headerName, image, imageAlt } = props;
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="authImgWH">
        <img src={image} alt={imageAlt} className="authImg" />
      </div>
      <h1 className="authHeader">{headerName}</h1>
    </div>
  );
};

export default AuthHeader;
