import Avatar from "../ui/avatar/Avatar";
import { FaUserPlus } from "react-icons/fa";
import useStore from "@/store/useStore";

const Header = () => {
  const setModalState = useStore((state) => state.setModalState);
  const setOptions = useStore((state) => state.setOptions);
  return (
    <header className="flex justify-between items-center  bg-colorWhite rounded-l-md py-2 px-4 mb-3">
      <div
        className="cursor-pointer"
        onClick={() => {
          setModalState({ openSlideModal: true });
          setOptions({ slideHeading: "Profile" });
        }}
      >
        <Avatar />
      </div>

      <div>
        <button
          onClick={() => {
            setModalState({ openSlideModal: true });
            setOptions({ slideHeading: "Friends" });
          }}
        >
          <FaUserPlus className="h-5 w-5 text-colorGray hover:text-colorBlack ut-animation" />
        </button>
      </div>
    </header>
  );
};

export default Header;
