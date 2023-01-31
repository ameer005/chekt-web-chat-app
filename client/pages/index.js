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

      <div className="h-screen flex gap-2 px-8 py-6">
        {/* left box */}
        <div className="w-full overflow-hidden max-w-[27rem] relative">
          <div className="absolute top-0 left-0 w-full h-full flex flex-col ">
            <div>
              <Header />
              <div className="mb-3">
                <SearchBar />
              </div>
            </div>

            <div className="flex-1 bg-colorWhite rounded-md py-4 overflow-y-scroll scrollbar">
              <ChatsList data={chatsData?.data.chats} />
            </div>
          </div>

          <SlideModal />
        </div>

        {/* messages box */}
        <div className="flex-1 relative overflow-hidden">
          {activeChat ? (
            <MessageBox />
          ) : (
            <div className="h-full bg-colorWhite"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default withProtected(Home);
