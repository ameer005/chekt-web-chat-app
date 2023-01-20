import Avatar from "../ui/avatar/Avatar";
import { FaUserPlus } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8 bg-colorWhite rounded-l-md py-2 px-4">
      <Avatar />

      <div>
        <button>
          <FaUserPlus className="h-5 w-5 text-colorGray hover:text-colorBlack ut-animation" />
        </button>
      </div>
    </header>
  );
};

export default Header;
