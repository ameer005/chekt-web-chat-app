import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useFetchInfiniteMessage } from "@/hooks/queries/useMessage";
import { useFetchChats } from "@/hooks/queries/useChat";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import MessagesList from "@/components/lists/messages/MessagesList";
import useStore from "@/store/useStore";
import LoadingCircle from "../LoadingSpinners/LoadingCircle";
import LoadingCircleBig from "../LoadingSpinners/LoadingCircleBig";
import MessageForm from "./MessageForm";
import MessageHeader from "./MessageHeader";

const MessageBox = () => {
  const socket = useStore((state) => state.socket);
  const activeChat = useStore((state) => state.activeChat);
  const [imagePreview, setImagePreview] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const scrollRef = useRef(null);

  const {
    data: messagesData,
    isLoading: messagesIsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFetchInfiniteMessage(activeChat.chatId);
  const { refetch: refetchChats } = useFetchChats();
  const lastItemRef = useInfiniteScroll({
    isLoading: messagesIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // TODO fixed this shit
  useEffect(() => {
    if (messagesData) {
      setMessages([]);
      messagesData?.pages.forEach((page) => {
        setMessages((prev) => [...prev, ...page?.data.messages]);
      });
    }
  }, [messagesData]);

  // TODO testing if it'll work on leaving component
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();

    return () => {
      scrollRef?.current?.scrollIntoView();
    };
  }, []);

  useEffect(() => {
    if (messagesData?.pages.length <= 2) {
      scrollRef?.current?.scrollIntoView();
    }
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
      newMessage?.sender === activeChat.userId &&
      newMessage?._id !== messages[messages.length - 1]._id
    ) {
      setMessages((prev) => [newMessage, ...prev]);
    }

    scrollRef?.current?.scrollIntoView();
  }, [newMessage]);

  if (messagesIsLoading) {
    return (
      <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center">
        <LoadingCircleBig />
      </div>
    );
  }

  return (
    <div className="bg-colorBg absolute top-0 left-0 flex h-full w-full flex-col">
      <MessageHeader />

      {/* messages list box */}
      <div className=" bg-colorWhite scrollbar flex flex-1 flex-col gap-4 overflow-y-scroll px-6 pt-5">
        {/* <MessagesList /> */}
        <div ref={lastItemRef}></div>
        <div className="mt-4">
          {(messagesIsLoading || isFetchingNextPage) && <LoadingCircleBig />}
        </div>
        <MessagesList data={messages} />
        <div ref={scrollRef}></div>

        {/* Image preview TODO will make a separate component in future */}
        {imagePreview && (
          <div className={`mb-4 flex`}>
            <div className="flex-1"></div>
            <div className=" text-colorWhite r relative min-w-[4rem] max-w-[60%] self-end bg-black p-4 font-medium leading-5">
              <div className="relative h-[15rem] w-[10rem]">
                <Image
                  alt={"image"}
                  src={imagePreview}
                  fill
                  sizes="h-full w-full object-contain"
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
      <MessageForm scrollRef={scrollRef} setImagePreview={setImagePreview} />
    </div>
  );
};

export default MessageBox;
