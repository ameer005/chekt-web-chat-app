import MessageCard from "./MessageCard";

const MessagesList = ({ data }) => {
  const renderMessage = () => {
    return data?.map((message, index) => {
      return (
        <MessageCard
          key={message?._id}
          data={message}
          nextData={data[index + 1]}
        />
      );
    });
  };
  return <>{renderMessage()}</>;
};

export default MessagesList;
