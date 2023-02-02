import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import useCloseDropdown from "@/hooks/useCloseDropdown";
import { useFetchUser } from "@/hooks/queries/useUser";
import { useFetchMessages, useSendMessage } from "@/hooks/queries/useMessage";
import { useFetchChats } from "@/hooks/queries/useChat";

import { IoIosSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import Avatar from "../avatar/Avatar";
import MessagesList from "@/components/lists/messages/MessagesList";
import useStore from "@/store/useStore";
import LoadingCircle from "../LoadingSpinners/LoadingCircle";
import LoadingCircleBig from "../LoadingSpinners/LoadingCircleBig";

const MessageBox = () => {
  const activeChat = useStore((state) => state.activeChat);
  const activeUsers = useStore((state) => state.activeUsers);
  const socket = useStore((state) => state.socket);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  let emojiRef = useRef(null);
  const scrollRef = useRef(null);

  const { data: messagesData, isLoading: messagesIsLoading } = useFetchMessages(
    activeChat.chatId
  );
  const {
    mutate: sendMessage,
    isLoading: sendMessageLoading,
    isSuccess: sendMessageSuccess,
  } = useSendMessage();
  const { refetch: refetchChats } = useFetchChats();
  const {
    data: userData,
    isSuccess: userDataSuccess,
    isLoading: userDataLoading,
  } = useFetchUser(activeChat.userId);
  const selectedUser = userData?.data?.user;

  useCloseDropdown({
    isOpen: showEmojiPicker,
    setIsOpen: setShowEmojiPicker,
    ref: emojiRef,
  });

  useEffect(() => {
    if (sendMessageSuccess) {
      setImagePreview(null);
    }

    if (file) {
      submitForm();
    }
  }, [sendMessageSuccess, file]);

  useEffect(() => {
    setMessages(messagesData?.data?.messages);
  }, [messagesData]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData, messages]);

  useEffect(() => {
    socket.on("get-message", (data) => {
      setNewMessage(data);
      refetchChats();
    });
  }, []);

  useEffect(() => {
    if (
      messages[messages.length - 1] &&
      newMessage?.sender === selectedUser._id &&
      newMessage?._id !== messages[messages.length - 1]._id
    ) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [newMessage]);

  const submitForm = (e) => {
    e?.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("reciever", selectedUser._id);
      sendMessage({
        chatId: activeChat.chatId,
        data: formData,
      });
      setImagePreview(URL.createObjectURL(file));
      setFile(null);
    } else {
      if (!value) return;

      sendMessage({
        chatId: activeChat.chatId,
        data: {
          text: value,
          reciever: selectedUser._id,
        },
      });

      setValue("");
    }
  };

  if (messagesIsLoading || userDataLoading) {
    return (
      <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
        <LoadingCircleBig />
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 flex h-full w-full flex-col">
      <header className="bg-colorWhite mb-3 rounded-md py-2 px-4">
        <div className="flex items-center gap-3">
          <Avatar img={selectedUser?.picture} />

          <div>
            <h1 className="font-semibold">{selectedUser?.name}</h1>
            <div className="text-xs text-gray-400">
              {activeUsers?.find((user) => user._id == selectedUser?._id) &&
                "Online"}
            </div>
          </div>
        </div>
      </header>

      {/* messages list box */}
      <div className=" bg-colorWhite scrollbar flex flex-1 flex-col gap-4 overflow-y-scroll px-6 pt-5">
        {/* <MessagesList /> */}
        <MessagesList data={messages} />
        <div ref={scrollRef}></div>

        {/* Image preview TODO will make separate component in future */}
        {imagePreview && (
          <div className={`mb-4 flex`}>
            <div className="flex-1"></div>
            <div className=" text-colorWhite r relative min-w-[4rem] max-w-[60%] self-end p-4 font-medium leading-5">
              <div className="relative h-[15rem] w-[10rem]">
                <Image
                  alt={"image"}
                  src={imagePreview}
                  fill
                  className="h-full w-full"
                />
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  <LoadingCircle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      <form
        onSubmit={submitForm}
        className="bg-colorWhite relative flex items-end gap-3 px-6 py-5"
      >
        <label className="bg-colorBg flex flex-1 items-center gap-3 rounded-full px-6">
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
            className="h-[3.5rem] flex-1 resize-none bg-transparent py-4 text-sm font-medium outline-none"
            type="text"
          />
          <label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              type="file"
              accept="image/jpeg,image/png"
            />
            <GrAttachment className="h-5 w-5 cursor-pointer" />
          </label>
        </label>

        <button className="bg-colorPrimary ut-animation rounded-full p-3 hover:brightness-110">
          <IoIosSend className="text-colorWhite h-7 w-7" />
        </button>

        <div ref={emojiRef}>
          {showEmojiPicker && (
            <div className="absolute -top-[100%] left-7 -translate-y-[80%]">
              <EmojiPicker
                onEmojiClick={(data) => setValue((prev) => prev + data.emoji)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageBox;
