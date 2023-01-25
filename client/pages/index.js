import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Head from "next/head";
import SearchBar from "@/components/ui/search/SearchBar";
import SlideModal from "@/components/modals/SlideModal";
import useStore from "@/store/useStore";
import { useRouter } from "next/router";
import { withProtected } from "@/hooks/routes";

const Home = () => {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setModalState = useStore((state) => state.setModalState);

  // useEffect(() => {
  //   if (!user) router.push("/auth/login");
  // }, []);
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
