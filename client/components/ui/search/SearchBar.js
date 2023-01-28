import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ value, setValue }) => {
  return (
    <label className="w-full relative">
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="Search"
        className="bg-colorWhite font-medium outline-none w-full py-[10px] px-12 rounded-md"
        type="text"
      />
      <IoSearchOutline className="w-5 h-5 absolute top-[50%] -translate-y-[50%] left-4" />
    </label>
  );
};

export default SearchBar;
