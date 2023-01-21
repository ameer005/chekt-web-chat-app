import React from "react";

const Avatar = ({ size = "h-10 w-10" }) => {
  return <div className={`${size} rounded-full bg-blue-200`}></div>;
};

export default Avatar;
