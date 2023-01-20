import Header from "@/components/layout/Header";
import SearchBar from "@/components/ui/search/SearchBar";
import SlideModal from "@/components/modals/SlideModal";
import useStore from "@/store/useStore";

const Home = () => {
  const setModalState = useStore((state) => state.setModalState);
  return (
    <div className="h-screen overflow-hidden flex gap-1 px-8 py-6">
      {/* left box */}
      <div className="w-full flex flex-col max-w-[27rem] relative">
        <Header />

        {/* main box */}
        <div className="flex-1 flex flex-col px-2">
          <div className="mb-3">
            <SearchBar />
          </div>

          {/* chat list */}
          <div className="flex-1 bg-colorWhite rounded-md"></div>
        </div>

        <SlideModal />
      </div>

      {/* right box */}
      <div className="flex-1 bg-colorWhite rounded-r-md"></div>
    </div>
  );
};

export default Home;
