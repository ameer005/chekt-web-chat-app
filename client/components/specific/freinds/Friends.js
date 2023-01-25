import { useState, useEffect } from "react";
import { useFetchInfiniteUsers } from "@/hooks/queries/useUser";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

import SearchBar from "@/components/ui/search/SearchBar";
import UsersList from "@/components/lists/users/UsersList";

const Friends = () => {
  const [active, setActive] = useState("Requests");
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const {
    data: searchData,
    hasNextPage: searchHasNextPage,
    isLoading: searchIsLoading,
    isFetchingNextPage: searchIsFetchingNextPage,
    fetchNextPage: searchFetchNextPage,
  } = useFetchInfiniteUsers({ ...filterValue });

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
      <div className=" h-full bg-colorWhite rounded-md py-4">
        {/* switch buttons */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center font-semibold gap-4">
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
        <div className="h-full overflow-y-scroll px-6 scrollbar">
          {active === "Add" && <> {renderInfiniteSearchPages()} </>}

          {active === "Requests" && <div>Yo friends</div>}
        </div>
      </div>
    </div>
  );
};

export default Friends;
