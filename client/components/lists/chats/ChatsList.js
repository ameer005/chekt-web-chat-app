import ChatCard from "./ChatCard";

const ChatsList = ({ data }) => {
  const renderChats = () => {
    return data?.map((chat) => {
      return <ChatCard key={chat._id} data={chat} />;
    });
  };
  return <div className="flex flex-col">{renderChats()}</div>;
};

export default ChatsList;
