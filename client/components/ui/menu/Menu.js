import { useRef } from "react";
import { MdMoreVert } from "react-icons/md";
import useCloseDropdown from "@/hooks/useCloseDropdown";

const Menu = ({ children, show, setShow }) => {
  const menuRef = useRef(null);

  useCloseDropdown({ isOpen: show, setIsOpen: setShow, ref: menuRef });

  return (
    <div className="relative -mb-[5px]">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShow((prev) => !prev);
        }}
      >
        <MdMoreVert className="text-colorGray h-5 w-5" />
      </button>
      <div ref={menuRef} className="absolute top-[125%] right-0 z-10">
        {show && (
          <div className="bg-colorWhite  flex w-[10rem] flex-col items-start gap-3  py-2 px-1 shadow-md shadow-black/5">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
