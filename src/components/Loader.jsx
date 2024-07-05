import React from "react";
import loaderImg from "../assets/loader.gif";
import ReactDom from "react-dom";

const Loader = () => {
  return ReactDom.createPortal(
    <>
      <div className="bg-gray-900 opacity-65 fixed top-0 left-0 w-full h-full z-40" />
      <div className="fixed top-1/2 left-1/2 z-50">
        <img src={loaderImg} alt="loading..." />
      </div>
    </>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[30vh]">
      <img src={loaderImg} alt="Loading..." />
    </div>
  );
};

export default Loader;
