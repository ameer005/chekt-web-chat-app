import { useState, useEffect } from "react";
import { useFetchInfiniteUsers } from "@/hooks/queries/useUser";
import useStore from "@/store/useStore";

import SearchBar from "@/components/ui/search/SearchBar";
import UsersList from "@/components/lists/users/UsersList";
import NotFound from "@/components/ui/notFound/NotFound";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";

const Friends = () => {
  const [active, setActive] = useState("Requests");
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const requests = useStore((state) => state.requests);
  const { data: searchData, isLoading: searchIsLoading } =
    useFetchInfiniteUsers({ ...filterValue });

  const renderInfiniteSearchPages = () => {
    return searchData?.pages.map((page, index) => {
      return <UsersList key={index} data={page?.data.users} />;
    });
  };

  // TODO fix this
  useEffect(() => {
    if (!searchValue) {
      setActive("Add");
    } else {
      setActive("Requests");
    }
  }, [filterValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue) {
        setFilterValue({
          name: searchValue,
        });
      } else if (!searchValue.length) {
        setFilterValue(null);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue]);

  return (
    <div className="h-full">
      <div className="mb-3">
        <SearchBar value={searchValue} setValue={setSearchValue} />
      </div>

      {/* chat list */}
      <div className=" bg-colorWhite h-full rounded-md py-4">
        {/* switch buttons */}
        <div className="mb-5 flex justify-center">
          <div className="flex items-center gap-4 font-semibold">
            <button
              onClick={() => {
                setActive("Requests");
                setSearchValue("");
              }}
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
        <div className="scrollbar h-full overflow-y-scroll px-6">
          {active === "Add" && (
            <>
              {searchIsLoading ? (
                <div className="flex justify-center">
                  <LoadingCircle />
                </div>
              ) : (
                renderInfiniteSearchPages()
              )}
            </>
          )}

          {active === "Requests" && (
            <div>
              {requests.length == 0 ? (
                <NotFound message={"No requests"} />
              ) : (
                <UsersList data={requests} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
