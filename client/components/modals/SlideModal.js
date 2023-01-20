import useStore from "@/store/useStore";
import { BsArrowLeftShort } from "react-icons/bs";
import Friends from "../specific/freinds/Friends";

const SlideModal = () => {
  const setModalState = useStore((state) => state.setModalState);
  const openSlideModal = useStore((state) => state.openSlideModal);
  const slideHeading = useStore((state) => state.slideHeading);
  return (
    <div
      className={`absolute flex flex-col bg-colorBg w-full h-full transition-all duration-300 rounded-md ${
        openSlideModal ? "-translate-x-0" : "-translate-x-[120%]"
      }`}
    >
      <header className="px-3  py-3 bg-colorWhite mb-3 rounded-md">
        <button
          onClick={() => setModalState({ openSlideModal: false })}
          className="flex gap-3 items-center"
        >
          <BsArrowLeftShort className="h-8 w-8" />
          <div className="font-semibold text-lg">{slideHeading}</div>
        </button>
      </header>

      {/* content */}
      <div className="flex-1 rounded-md">
        {slideHeading == "Friends" && <Friends />}
      </div>
    </div>
  );
};

export default SlideModal;
