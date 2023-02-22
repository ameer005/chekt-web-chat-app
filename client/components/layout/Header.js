import { useRouter } from "next/router";
import { useState } from "react";
import Avatar from "../ui/avatar/Avatar";
import { FaUserPlus } from "react-icons/fa";
import useStore from "@/store/useStore";
import Menu from "../ui/menu/Menu";

const Header = () => {
  const setModalState = useStore((state) => state.setModalState);
  const setOptions = useStore((state) => state.setOptions);
  const requests = useStore((state) => state.requests);
  const removeUser = useStore((state) => state.removeUser);
  const router = useRouter();
  const user = useStore((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-colorWhite mb-3 flex  items-center justify-between rounded-l-md py-2 px-4">
      <div
        className="cursor-pointer"
        onClick={() => {
          setModalState({ openSlideModal: true });
          setOptions({ slideHeading: "Profile" });
        }}
      >
        <Avatar img={user?.picture} />
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative"
          onClick={() => {
            setModalState({ openSlideModal: true });
            setOptions({ slideHeading: "Friends" });
          }}
        >
          <FaUserPlus className="text-colorGray hover:text-colorBlack ut-animation h-5 w-5" />
          {requests?.length !== 0 && (
            <div className="text-colorWhite bg-accentColor absolute right-0 top-0 h-4 w-4 -translate-y-[20%] translate-x-[30%] rounded-full text-center text-[8px] font-semibold">
              {requests?.length}
            </div>
          )}
        </button>

        <Menu show={showMenu} setShow={setShowMenu}>
          <button
            onClick={() => {
              removeUser();
              setOptions({ activeChat: null });
              router.push("/auth/login");
            }}
            className="hover:bg-colorBg ut-animation w-full px-6 py-2 text-start font-medium"
          >
            Logout
          </button>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
