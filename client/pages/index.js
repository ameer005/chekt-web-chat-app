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

      <div className="h-screen overflow-hidden flex gap-1 px-8 py-6">
        {/* left box */}
        <div className="w-full max-w-[27rem] relative">
          <Header />
          {/* main box */}
          <div className="px-2 h-full">
            <div className="mb-3">
              <SearchBar />
            </div>

            {/* chat list */}
            <div className="h-full bg-colorWhite rounded-md px-5 py-5 bg-red-400 ">
              <div className="h-full bg-blue-300 my-10 ">yo</div>
            </div>
          </div>

          <SlideModal />
        </div>

        {/* right box */}
        <div className="flex-1 bg-colorWhite rounded-r-md"></div>
      </div>
    </>
  );
};

export default withProtected(Home);
