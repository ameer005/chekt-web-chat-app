import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import useCloseDropdown from "@/hooks/useCloseDropdown";
import { useFetchUser } from "@/hooks/queries/useUser";
import {
  useFetchInfiniteMessage,
  useSendMessage,
} from "@/hooks/queries/useMessage";

import { IoIosSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import Avatar from "../avatar/Avatar";
import MessagesList from "@/components/lists/messages/MessagesList";
import useStore from "@/store/useStore";

const MessageBox = () => {
  const activeChat = useStore((state) => state.activeChat);
  const {
    data: messagesData,
    hasNextPage: messagesHasNextPage,
    isLoading: messagesIsLoading,
    isFetchingNextPage: messagesIsFetchingNextPage,
    fetchNextPage: messagesFetchNextPage,
  } = useFetchInfiniteMessage(activeChat.chatId);
  const { mutate: sendMessage } = useSendMessage();
  const { data: userData, isSuccess: userDataSuccess } = useFetchUser(
    activeChat.userId
  );
  const selectedUser = userData?.data?.user;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [value, setValue] = useState("");
  let emojiRef = useRef(null);
  const scrollRef = useRef(null);

  useCloseDropdown({
    isOpen: showEmojiPicker,
    setIsOpen: setShowEmojiPicker,
    ref: emojiRef,
  });

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  const renderInfiniteMessagePages = () => {
    return messagesData?.pages.map((page, index) => {
      return <MessagesList key={index} data={page?.data.messages} />;
    });
  };

  const onEmojiClick = (data) => {
    setValue((prev) => prev + data.emoji);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!value) return;

    sendMessage({
      chatId: activeChat.chatId,
      data: {
        text: value,
      },
    });

    console.log(value);
    setValue("");
  };

  // TODO temp fix
  if (!userDataSuccess) return;

  return (
    <div className="flex flex-col absolute top-0 left-0 w-full h-full">
      <header className="bg-colorWhite py-2 px-4 mb-3 rounded-md">
        <div className="flex items-center gap-3">
          <Avatar img={selectedUser?.picture} />

          <h1 className="font-semibold">{selectedUser?.name}</h1>
        </div>
      </header>

      {/* messages list box */}
      <div className=" flex-1 flex flex-col gap-4 bg-colorWhite px-6 pt-5 overflow-y-scroll scrollbar">
        {/* <MessagesList /> */}
        {renderInfiniteMessagePages()}
        <div ref={scrollRef}></div>
      </div>

      {/* footer */}
      <form
        onSubmit={submitForm}
        className="flex items-end gap-3 bg-colorWhite px-6 py-5 relative"
      >
        <label className="flex-1 flex gap-3 items-center bg-colorBg rounded-full px-6">
          <button>
            <BsEmojiSmile
              onClick={(e) => {
                e.stopPropagation();
                setShowEmojiPicker((prev) => !prev);
              }}
              className="h-6 w-6 cursor-pointer"
            />
          </button>
          <textarea
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="flex-1 h-[3.5rem] font-medium py-4 resize-none outline-none bg-transparent text-sm"
            type="text"
          />
        </label>

        <button className="p-3 rounded-full bg-colorPrimary hover:brightness-110 ut-animation">
          <IoIosSend className="h-7 w-7 text-colorWhite" />
        </button>

        <div ref={emojiRef}>
          {showEmojiPicker && (
            <div className="absolute -top-[100%] -translate-y-[80%] left-7">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageBox;
