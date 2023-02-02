import Avatar from "@/components/ui/avatar/Avatar";
import useStore from "@/store/useStore";

const ChatCard = ({ data }) => {
  const user = useStore((state) => state.user);
  const setOptions = useStore((state) => state.setOptions);

  const { user: chatUser } = data.members.find(
    (member) => member.user._id !== user?._id
  );

  return (
    <div
      onClick={() =>
        setOptions({ activeChat: { chatId: data._id, userId: chatUser._id } })
      }
      className="hover:bg-colorBg ml-2 px-6 pt-2"
    >
      <div className="flex cursor-pointer items-center gap-3 ">
        <div>
          <Avatar size="h-12 w-12" img={chatUser.picture} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold leading-6">{chatUser.name}</div>
            {/* <div className="text-xs font-medium">09:00</div> */}
          </div>
          <p className="text-colorGray line-clamp-1 text-xs">
            {data.latestMessage || "..."}
          </p>
        </div>
      </div>
      <div className="pl-12">
        <div className="mt-3 h-[0.5px] bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ChatCard;
