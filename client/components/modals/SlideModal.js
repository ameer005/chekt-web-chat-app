import useStore from "@/store/useStore";
import { BsArrowLeftShort } from "react-icons/bs";
import Friends from "../specific/freinds/Friends";
import UserProfile from "../specific/userProfile/UserProfile";

const SlideModal = () => {
  const setModalState = useStore((state) => state.setModalState);
  const openSlideModal = useStore((state) => state.openSlideModal);
  const slideHeading = useStore((state) => state.slideHeading);
  return (
    <div
      className={`bg-colorBg absolute top-0 left-0 h-full w-full  rounded-md transition-all duration-300 ${
        openSlideModal ? "-translate-x-0" : "-translate-x-[120%]"
      }`}
    >
      {/* header button */}
      <header className="bg-colorWhite  mb-3 rounded-md px-3 py-3">
        <button
          onClick={() => setModalState({ openSlideModal: false })}
          className="flex items-center gap-3"
        >
          <BsArrowLeftShort className="h-8 w-8" />
          <div className="text-lg font-semibold">{slideHeading}</div>
        </button>
      </header>

      {/* content */}
      <div className="h-full rounded-md">
        {slideHeading == "Friends" && <Friends />}
        {slideHeading == "Profile" && <UserProfile />}
      </div>
    </div>
  );
};

export default SlideModal;
