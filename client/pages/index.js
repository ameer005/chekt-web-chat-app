import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Head from "next/head";
import SearchBar from "@/components/ui/search/SearchBar";
import SlideModal from "@/components/modals/SlideModal";
import useStore from "@/store/useStore";
import { useFetchMe, useFetchRequestsList } from "@/hooks/queries/useUser";
import { withProtected } from "@/hooks/routes";
import ChatsList from "@/components/lists/chats/ChatsList";

const Home = () => {
  const openSlideModal = useStore((state) => state.openSlideModal);
  const { refetch } = useFetchMe();
  const { refetch: refetchRequestList } = useFetchRequestsList();

  useEffect(() => {
    if (openSlideModal) {
      refetch();
      refetchRequestList();
    }
  }, [openSlideModal]);

  return (
    <>
      <Head>
        <title>Chekt Web</title>
      </Head>

      <div className="h-screen flex gap-1 px-8 py-6">
        {/* left box */}
        <div className="w-full overflow-hidden max-w-[27rem] relative">
          <div className="absolute top-0 left-0 w-full h-full flex flex-col ">
            <div>
              <Header />
              <div className="mb-3">
                <SearchBar />
              </div>
            </div>

            {/* chat list */}
            <div className="flex-1 bg-colorWhite rounded-md px-6 py-6 overflow-y-scroll scrollbar">
              <ChatsList />
            </div>
          </div>

          <SlideModal />
        </div>

        {/* messages box */}
        <div className="flex-1 bg-colorWhite rounded-r-md"></div>
      </div>
    </>
  );
};

export default withProtected(Home);
