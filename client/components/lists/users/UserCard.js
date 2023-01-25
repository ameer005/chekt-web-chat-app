import Avatar from "@/components/ui/avatar/Avatar";
import useStore from "@/store/useStore";
import {
  useSendRequest,
  useHandleRequest,
  useRemoveFriend,
} from "@/hooks/queries/useUser";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";

const FriendCard = ({ data }) => {
  const user = useStore((state) => state.user);
  const { mutate: sendRequest, isLoading: sendRequestLoading } =
    useSendRequest();
  const { mutate: handleRequest, isLoading: handleRequestLoading } =
    useHandleRequest();
  const { mutate: removeFriend, isLoading: removeFriendLoading } =
    useRemoveFriend();

  const friendshipStatus = user.friends.find(
    (u) => u.user.toString() == data._id.toString()
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar size="w-11 h-11" />
        <div>
          <div className="font-semibold">{data.name}</div>
          <div className="text-[11px]">{data.username}</div>
        </div>
      </div>

      {/* buttons group */}
      <div className="font-semibold text-xs">
        {!friendshipStatus && (
          <button
            onClick={() => sendRequest(data?._id)}
            className="py-2 w-[4rem] px-2 text-colorWhite bg-colorPrimary hover:brightness-110 ut-animation rounded-lg"
          >
            {sendRequestLoading ? <LoadingCircle /> : "Add"}
          </button>
        )}
        {friendshipStatus?.status == 2 &&
          (handleRequestLoading ? (
            <LoadingCircle />
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleRequest({ userId: data._id, data: { accept: true } })
                }
                className="py-2 w-[5rem] px-2 text-colorWhite bg-colorPrimary hover:brightness-110 ut-animation rounded-lg"
              >
                {handleRequestLoading ? <LoadingCircle /> : "Accept"}
              </button>
              <button
                onClick={() =>
                  handleRequest({ userId: data._id, data: { accept: false } })
                }
                className="py-2 w-[5rem] px-2 bg-gray-100 hover:brightness-95 ut-animation rounded-lg"
              >
                {handleRequestLoading ? <LoadingCircle /> : "Decline"}
              </button>
            </div>
          ))}
        {friendshipStatus?.status == 1 && (
          <button
            onClick={() =>
              handleRequest({ userId: data._id, data: { accept: false } })
            }
            className="py-2 w-[5rem] px-2 bg-gray-100 hover:brightness-95 ut-animation rounded-lg"
          >
            {handleRequestLoading ? <LoadingCircle /> : "Cancel"}
          </button>
        )}
        {friendshipStatus?.status == 3 && (
          <button
            onClick={() => removeFriend(data._id)}
            className="py-2 w-[5rem] px-2 bg-gray-100 hover:brightness-95 ut-animation rounded-lg"
          >
            {removeFriendLoading ? <LoadingCircle /> : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
