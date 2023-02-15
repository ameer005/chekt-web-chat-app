import React from "react";

const NotFound = ({ message }) => {
  return (
    <div className="flex justify-center font-medium text-gray-400">
      <div>{message}</div>
    </div>
  );
};

export default NotFound;
