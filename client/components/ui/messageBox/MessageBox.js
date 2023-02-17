import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useFetchUser } from "@/hooks/queries/useUser";
import { useFetchMessages } from "@/hooks/queries/useMessage";
import { useFetchChats } from "@/hooks/queries/useChat";

import MessagesList from "@/components/lists/messages/MessagesList";
import useStore from "@/store/useStore";
import LoadingCircle from "../LoadingSpinners/LoadingCircle";
import LoadingCircleBig from "../LoadingSpinners/LoadingCircleBig";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";

const MessageBox = () => {
  const activeChat = useStore((state) => state.activeChat);
  const socket = useStore((state) => state.socket);
  const [imagePreview, setImagePreview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const scrollRef = useRef(null);
  const { data: messagesData, isLoading: messagesIsLoading } = useFetchMessages(
    activeChat.chatId
  );
  const { refetch: refetchChats } = useFetchChats();
  const { data: userData, isLoading: userDataLoading } = useFetchUser(
    activeChat.userId
  );
  const selectedUser = userData?.data?.user;

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData, messages]);

  useEffect(() => {
    setMessages(messagesData?.data?.messages);
  }, [messagesData]);

  // listening to real incomming time message
  useEffect(() => {
    socket.on("get-message", (data) => {
      setNewMessage(data);
      refetchChats();
    });
  }, []);

  // pushint new incomming messages to message array to display them
  useEffect(() => {
    if (
      messages[messages.length - 1] &&
      newMessage?.sender === selectedUser._id &&
      newMessage?._id !== messages[messages.length - 1]._id
    ) {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [newMessage]);

  if (messagesIsLoading || userDataLoading) {
    return (
      <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
        <LoadingCircleBig />
      </div>
    );
  }

  return (
    <div className="bg-colorBg absolute top-0 left-0 flex h-full w-full flex-col">
      <MessageHeader selectedUser={selectedUser} />

      {/* messages list box */}
      <div className=" bg-colorWhite scrollbar flex flex-1 flex-col gap-4 overflow-y-scroll px-6 pt-5">
        {/* <MessagesList /> */}
        <MessagesList data={messages} />
        <div ref={scrollRef}></div>

        {/* Image preview TODO will make a separate component in future */}
        {imagePreview && (
          <div className={`mb-4 flex`}>
            <div className="flex-1"></div>
            <div className=" text-colorWhite r relative min-w-[4rem] max-w-[60%] self-end p-4 font-medium leading-5">
              <div className="relative h-[15rem] w-[10rem]">
                <Image
                  alt={"image"}
                  src={imagePreview}
                  fill
                  className="h-full w-full object-contain"
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
      <MessageForm
        selectedUser={selectedUser}
        setImagePreview={setImagePreview}
      />
    </div>
  );
};

export default MessageBox;
