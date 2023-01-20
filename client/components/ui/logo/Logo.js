import Image from "next/image";
import logo from "../../../public/images/logo.png";
const Logo = ({ size = "w-14", text = "text-2xl" }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${size}`}>
        <Image alt="logo" src={logo} />
      </div>
      <div className={`font-bold ${text}`}>Chekt</div>
    </div>
  );
};

export default Logo;
