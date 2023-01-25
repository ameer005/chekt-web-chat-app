import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Head from "next/head";
import SearchBar from "@/components/ui/search/SearchBar";
import SlideModal from "@/components/modals/SlideModal";
import useStore from "@/store/useStore";
import { useFetchMe } from "@/hooks/queries/useUser";
import { withProtected } from "@/hooks/routes";

const Home = () => {
  const openSlideModal = useStore((state) => state.openSlideModal);
  const { refetch } = useFetchMe();

  useEffect(() => {
    if (openSlideModal) {
      console.log("yo");
      refetch();
    }
  }, [openSlideModal]);

  return (
    <>
      <Head>
        <title>Chekt Web</title>
      </Head>

      <div className="h-screen flex gap-1 px-8 py-6">
        {/* left box */}
        <div className="overflow-hidden w-full max-w-[27rem] relative">
          <Header />
          {/* main box */}
          <div className="px-2 h-full">
            <div className="mb-3">
              <SearchBar />
            </div>

            {/* chat list */}
            <div className="h-full bg-colorWhite rounded-md">
              sdfdf sdfd sdf dsfsdf dfsdfd
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
