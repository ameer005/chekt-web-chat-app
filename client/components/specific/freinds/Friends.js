import { useState } from "react";
import SearchBar from "@/components/ui/search/SearchBar";
import FriendsList from "@/components/lists/friends/FriendsList";

const Friends = () => {
  const [active, setActive] = useState("Requests");

  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <SearchBar />
      </div>

      {/* chat list */}
      <div className="flex-1 flex flex-col bg-colorWhite rounded-md px-4 py-2">
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
        <div className="flex-1 px-4 overflow-y-scroll">
          {active === "Add" && <FriendsList />}
        </div>
      </div>
    </div>
  );
};

export default Friends;
