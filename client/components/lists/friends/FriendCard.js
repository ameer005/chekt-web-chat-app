import Avatar from "@/components/ui/avatar/Avatar";

const FriendCard = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar size="w-11 h-11" />
        <div>
          <div className="font-semibold">Ameer Khan</div>
          <div className="text-[11px]">@ameer005</div>
        </div>
      </div>

      {/* buttons group */}
      <div>
        <button className="py-2 w-[4rem] px-2 text-colorWhite bg-colorPrimary hover:brightness-110 ut-animation rounded-full">
          Add
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
