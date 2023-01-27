import React from "react";
import Image from "next/image";

const Avatar = ({ size = "h-10 w-10", img }) => {
  return (
    <div
      className={`${size} rounded-full bg-colorPrimary relative overflow-hidden`}
    >
      <Image src={img} fill className="h-full w-full" />
      {/* <img src={img} alt="avatar" className="h-full w-full" /> */}
    </div>
  );
};

export default Avatar;
