import Avatar from "../ui/avatar/Avatar";
import { FaUserPlus } from "react-icons/fa";
import useStore from "@/store/useStore";

const Header = () => {
  const setModalState = useStore((state) => state.setModalState);
  const setOptions = useStore((state) => state.setOptions);
  const requests = useStore((state) => state.requests);
  const user = useStore((state) => state.user);
  return (
    <header className="flex justify-between items-center  bg-colorWhite rounded-l-md py-2 px-4 mb-3">
      <div
        className="cursor-pointer"
        onClick={() => {
          setModalState({ openSlideModal: true });
          setOptions({ slideHeading: "Profile" });
        }}
      >
        <Avatar img={user.picture} />
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setModalState({ openSlideModal: true });
            setOptions({ slideHeading: "Friends" });
          }}
        >
          <FaUserPlus className="h-5 w-5 text-colorGray hover:text-colorBlack ut-animation" />
        </button>
        {requests.length !== 0 && (
          <div className="text-center h-4 w-4 text-[8px] font-semibold text-colorWhite bg-accentColor rounded-full absolute right-0 top-0 -translate-y-[20%] translate-x-[30%]">
            {requests.length}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
