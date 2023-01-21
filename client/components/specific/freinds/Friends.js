import { useState } from "react";
import SearchBar from "@/components/ui/search/SearchBar";
import FriendsList from "@/components/lists/friends/FriendsList";

const Friends = () => {
  const [active, setActive] = useState("Requests");

  return (
    <div className="h-full">
      <div className="mb-3">
        <SearchBar />
      </div>

      {/* chat list */}
      <div className=" h-full bg-colorWhite rounded-md py-4">
        {/* switch buttons */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center font-semibold gap-4">
            <button
              onClick={() => setActive("Requests")}
              className={`${
                active === "Requests" ? "text-accentColor" : "text-colorGray"
              }`}
            >
              Requests
            </button>
            <button
              onClick={() => setActive("Add")}
              className={`${
                active === "Add" ? "text-accentColor" : "text-colorGray"
              }`}
            >
              Add Friends
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="h-full overflow-y-scroll px-6 scrollbar">
          {active === "Add" && <FriendsList />}
        </div>
      </div>
    </div>
  );
};

export default Friends;
