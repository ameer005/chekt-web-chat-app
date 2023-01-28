import Avatar from "@/components/ui/avatar/Avatar";
import useStore from "@/store/useStore";

const ChatCard = ({ data }) => {
  const user = useStore((state) => state.user);

  const { user: chatUser } = data.members.find(
    (member) => member.user._id !== user._id
  );

  return (
    <div className="hover:bg-colorBg px-6 ml-2 pt-2">
      <div className="items-center flex gap-3 cursor-pointer ">
        <div>
          <Avatar size="h-12 w-12" img={chatUser.picture} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold leading-6">{chatUser.name}</div>
            {/* <div className="text-xs font-medium">09:00</div> */}
          </div>
          <p className="text-xs text-colorGray line-clamp-1">
            sdfadsf ds asd ffd
          </p>
        </div>
      </div>
      <div className="pl-12">
        <div className="h-[0.5px] bg-gray-200 mt-3"></div>
      </div>
    </div>
  );
};

export default ChatCard;
