import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Head from "next/head";
import { useFetchMe, useFetchRequestsList } from "@/hooks/queries/useUser";
import { useFetchChats } from "@/hooks/queries/useChat";

import useStore from "@/store/useStore";
import SearchBar from "@/components/ui/search/SearchBar";
import SlideModal from "@/components/modals/SlideModal";
import { withProtected } from "@/hooks/routes";
import ChatsList from "@/components/lists/chats/ChatsList";
import MessageBox from "@/components/ui/messageBox/MessageBox";

const Home = () => {
  const openSlideModal = useStore((state) => state.openSlideModal);
  const user = useStore((state) => state.user);
  const setDataState = useStore((state) => state.setDataState);

  const socket = useStore((state) => state.socket);
  const activeChat = useStore((state) => state.activeChat);
  const { refetch } = useFetchMe();
  const { refetch: refetchRequestList } = useFetchRequestsList();
  const {
    data: chatsData,
    isLoading: chatsLoading,
    refetch: refetchChats,
  } = useFetchChats();

  useEffect(() => {
    refetchChats();
    if (openSlideModal) {
      refetch();
      refetchRequestList();
    }
  }, [openSlideModal]);

  useEffect(() => {
    socket.emit("add-users", user);
    socket.on("get-users", (users) => {
      setDataState({ activeUsers: users });
    });
  }, [user]);

  return (
    <>
      <Head>
        <title>Chekt Web</title>
      </Head>

      <div className="relative flex h-screen gap-2 px-8 py-6 sm:px-3 sm:py-3">
        {/* left box */}
        <div className="relative min-w-[22rem] flex-1 overflow-hidden sm:min-w-0">
          <div className="absolute top-0 left-0 flex h-full w-full flex-col ">
            <div>
              <Header />
              <div className="mb-3">
                <SearchBar />
              </div>
            </div>

            <div className="bg-colorWhite scrollbar flex-1 overflow-y-scroll rounded-md py-4">
              <ChatsList data={chatsData?.data.chats} />
            </div>
          </div>

          <SlideModal />
        </div>

        {/* messages box */}
        <div className="relative w-full max-w-[64rem] overflow-hidden lg:hidden">
          {activeChat ? (
            <MessageBox />
          ) : (
            <div className="bg-colorWhite h-full"></div>
          )}
        </div>

        {/* Smallers screens */}
        {activeChat ? (
          <div className="relative hidden w-full max-w-[64rem] overflow-hidden lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:right-0 lg:block">
            {activeChat ? (
              <MessageBox />
            ) : (
              <div className="bg-colorWhite h-full"></div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default withProtected(Home);
