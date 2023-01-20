import SearchBar from "@/components/ui/search/SearchBar";

const Friends = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <SearchBar />
      </div>

      {/* chat list */}
      <div className="flex-1 bg-colorWhite rounded-md"></div>
    </div>
  );
};

export default Friends;
