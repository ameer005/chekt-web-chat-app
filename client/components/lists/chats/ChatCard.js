import Avatar from "@/components/ui/avatar/Avatar";

const ChatCard = () => {
  return (
    <div className="items-center flex gap-3 cursor-pointer">
      <div>
        <Avatar size="h-12 w-12" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold leading-6">Ameer Khan</div>
          <div className="text-xs font-medium">09:00</div>
        </div>
        <p className="text-xs text-colorGray line-clamp-1">
          sdfadsf ds asd ffd
        </p>
      </div>
    </div>
  );
};

export default ChatCard;
