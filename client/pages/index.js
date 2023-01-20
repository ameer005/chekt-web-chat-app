import Header from "@/components/layout/Header";
const Home = () => {
  return (
    <div className="h-screen flex gap-1 px-8 py-6">
      {/* right box */}
      <div className="w-full max-w-[29.5rem]">
        <Header />
      </div>

      {/* left box */}
      <div className="flex-1 bg-colorWhite"></div>
    </div>
  );
};

export default Home;
