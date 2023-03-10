import React from "react";
import Image from "next/image";

const Avatar = ({ size = "h-10 w-10", img }) => {
  return (
    <div
      className={`${size} bg-colorPrimary relative overflow-hidden rounded-full`}
    >
      <Image
        priority={true}
        alt="user"
        src={img}
        fill
        sizes="h-full w-full"
        className="h-full w-full"
      />
      {/* <img src={img} alt="avatar" className="h-full w-full" /> */}
    </div>
  );
};

export default Avatar;
