import useStore from "@/store/useStore";
import { useFetchUser } from "@/hooks/queries/useUser";

import Avatar from "../avatar/Avatar";
import { BiArrowBack } from "react-icons/bi";

const MessageHeader = () => {
  const activeChat = useStore((state) => state.activeChat);
  const activeUsers = useStore((state) => state.activeUsers);
  const setOptions = useStore((state) => state.setOptions);

  const { data: userData, isLoading: userDataLoading } = useFetchUser(
    activeChat.userId
  );
  const selectedUser = userData?.data?.user;

  return (
    <header className="bg-colorWhite mb-3 rounded-md py-3 px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOptions({ activeChat: null })}
            className="hidden lg:block"
          >
            <BiArrowBack className={"h-6 w-6"} />
          </button>
          <Avatar img={selectedUser?.picture} />
        </div>

        <div>
          <h1 className="font-semibold">{selectedUser?.name}</h1>
          <div className="text-xs text-gray-400">
            {activeUsers?.find((user) => user._id == selectedUser?._id) &&
              "Online"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MessageHeader;
