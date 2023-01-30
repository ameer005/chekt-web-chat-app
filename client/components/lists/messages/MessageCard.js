import useStore from "@/store/useStore";
import moment from "moment";

const MessageCard = ({ data, nextData }) => {
  const user = useStore((state) => state.user);

  const renderTimeStamp = (currentData) => {
    let timestamp;
    let decreaseM = true;
    if (nextData && nextData.sender === currentData.sender) {
      const temp1 = moment(currentData?.createdAt).format("h:mm a");
      const temp2 = moment(nextData?.createdAt).format("h:mm a");

      if (temp1 !== temp2) {
        timestamp = moment(currentData?.createdAt).format("h:mm a");
        decreaseM = false;
      }
    } else {
      timestamp = moment(currentData?.createdAt).format("h:mm a");
      decreaseM = false;
    }

    return [timestamp, decreaseM];
  };

  if (data?.sender === user._id.toString()) {
    let [timestamp, decreaseM] = renderTimeStamp(data);
    return (
      <div className={`flex ${!decreaseM && "mb-4"}`}>
        <div className="flex-1"></div>
        <div className="self-end font-medium  max-w-[60%] bg-colorSecondary text-colorWhite p-4 leading-5 rounded-l-3xl rounded-b-3xl relative">
          <p>{data?.text}</p>
          <div className="absolute bottom-0 translate-y-[130%] text-gray-400 text-xs right-2">
            {timestamp}
          </div>
        </div>
      </div>
    );
  } else {
    let [timestamp, decreaseM] = renderTimeStamp(data);
    return (
      <div className={`flex ${!decreaseM && "mb-4"}`}>
        <div className="font-medium max-w-[60%] bg-colorBg p-4 leading-5 rounded-r-3xl rounded-b-3xl relative">
          <p>{data?.text}</p>
          <div className="absolute bottom-0 translate-y-[130%] text-gray-400 text-xs left-2">
            {timestamp}
          </div>
        </div>
        <div className="flex-1"> </div>
      </div>
    );
  }
};

export default MessageCard;
