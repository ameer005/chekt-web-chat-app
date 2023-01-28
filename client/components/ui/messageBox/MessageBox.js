import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import useCloseDropdown from "@/hooks/useCloseDropdown";

import { IoIosSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import Avatar from "../avatar/Avatar";

const MessageBox = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [value, setValue] = useState("");
  let emojiRef = useRef(null);

  useCloseDropdown({
    isOpen: showEmojiPicker,
    setIsOpen: setShowEmojiPicker,
    ref: emojiRef,
  });

  const onEmojiClick = (data) => {
    setValue((prev) => prev + data.emoji);
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col absolute top-0 left-0 w-full h-full">
      <header className="bg-colorWhite py-2 px-4 mb-3 rounded-md">
        <div className="flex items-center gap-3">
          <Avatar
            img={"https://api.dicebear.com/5.x/avataaars/svg?seed=ameer005"}
          />

          <h1 className="font-semibold">Ameer Khan</h1>
        </div>
      </header>

      <div className=" flex-1 bg-colorWhite"></div>
      <form
        onSubmit={submitForm}
        className="flex items-end gap-3 bg-colorWhite px-6 py-5 relative"
      >
        <label className="flex-1 flex gap-3 items-center bg-colorBg rounded-full px-6">
          <button>
            <BsEmojiSmile
              onClick={(e) => {
                e.stopPropagation();
                setShowEmojiPicker((prev) => !prev);
              }}
              className="h-6 w-6 cursor-pointer"
            />
          </button>
          <textarea
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="flex-1 h-[3.5rem] font-medium py-4 resize-none outline-none bg-transparent text-sm"
            type="text"
          />
        </label>

        <button className="p-3 rounded-full bg-colorPrimary hover:brightness-110 ut-animation">
          <IoIosSend className="h-7 w-7 text-colorWhite" />
        </button>

        <div ref={emojiRef}>
          {showEmojiPicker && (
            <div className="absolute -top-[100%] -translate-y-[80%] left-7">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageBox;
