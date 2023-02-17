import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import useCloseDropdown from "@/hooks/useCloseDropdown";
import { useSendMessage } from "@/hooks/queries/useMessage";
import useStore from "@/store/useStore";

import { IoIosSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";

const MessageForm = ({ setImagePreview }) => {
  const activeChat = useStore((state) => state.activeChat);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  let emojiRef = useRef(null);

  const { mutate: sendMessage, isSuccess: sendMessageSuccess } =
    useSendMessage();

  useCloseDropdown({
    isOpen: showEmojiPicker,
    setIsOpen: setShowEmojiPicker,
    ref: emojiRef,
  });

  // instant sending message without clicking on send button
  // in case of images
  useEffect(() => {
    if (sendMessageSuccess) {
      setImagePreview(null);
    }

    if (file) {
      submitForm();
    }
  }, [sendMessageSuccess, file]);

  const submitForm = (e) => {
    e?.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("reciever", activeChat.userId);
      sendMessage({
        chatId: activeChat.chatId,
        data: formData,
      });
      setImagePreview(URL.createObjectURL(file));
      setFile(null);
    } else {
      if (!value) return;

      sendMessage({
        chatId: activeChat.chatId,
        data: {
          text: value,
          reciever: activeChat.userId,
        },
      });

      setValue("");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="bg-colorWhite relative flex items-end gap-3 px-6 py-5"
    >
      <label className="bg-colorBg flex flex-1 items-center gap-3 rounded-full px-6 sm:px-2">
        <button type="button">
          <BsEmojiSmile
            onClick={(e) => {
              e.stopPropagation();
              setShowEmojiPicker((prev) => !prev);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        </button>
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitForm();
            }
          }}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="h-[3.5rem] flex-1 resize-none bg-transparent py-4 text-sm font-medium outline-none"
          type="text"
        />
        <label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            type="file"
            accept="image/jpeg,image/png"
          />
          <GrAttachment className="h-5 w-5 cursor-pointer" />
        </label>
      </label>

      <button
        type="submit"
        className="bg-colorPrimary ut-animation rounded-full p-3 hover:brightness-110"
      >
        <IoIosSend className="text-colorWhite h-7 w-7" />
      </button>

      <div ref={emojiRef}>
        {showEmojiPicker && (
          <div className="absolute -top-[100%] left-7 -translate-y-[80%]">
            <EmojiPicker
              onEmojiClick={(data) => setValue((prev) => prev + data.emoji)}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default MessageForm;
