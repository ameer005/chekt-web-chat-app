import Image from "next/image";
import useStore from "@/store/useStore";
import moment from "moment";
import { saveAs } from "file-saver";

import { MdFileDownload } from "react-icons/md";

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

  const downloadImage = () => {
    const imageName = data.file.split("/").at(-1);
    saveAs(data.file, imageName);
  };

  if (data?.sender === user?._id.toString()) {
    let [timestamp, decreaseM] = renderTimeStamp(data);
    return (
      <div className={`flex ${!decreaseM && "mb-4"}`}>
        <div className="flex-1"></div>
        <div
          className={`${
            data.file
              ? "bg-black"
              : "bg-colorSecondary rounded-l-3xl rounded-b-3xl"
          }  text-colorWhite relative min-w-[4rem] max-w-[60%] self-end  p-4 font-medium leading-5`}
        >
          {data.file ? (
            <div className="relative h-[15rem] w-[10rem]">
              <Image
                alt={"image"}
                src={data.file}
                fill
                className="h-full w-full object-contain"
              />

              <button
                onClick={downloadImage}
                className="absolute -top-2 -right-2"
              >
                <MdFileDownload className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <p>{data?.text}</p>
          )}

          <div className="absolute bottom-0 right-2 translate-y-[130%] text-xs text-gray-400">
            {timestamp}
          </div>
        </div>
      </div>
    );
  } else {
    let [timestamp, decreaseM] = renderTimeStamp(data);
    return (
      <div className={`flex ${!decreaseM && "mb-4"}`}>
        <div
          className={`${
            data.file ? "bg-black" : "bg-colorBg  rounded-r-3xl rounded-b-3xl "
          } relative min-w-[4rem] max-w-[60%] p-4 font-medium leading-5`}
        >
          {data.file ? (
            <div className="relative h-[15rem] w-[10rem]">
              <Image
                alt={"image"}
                src={data.file}
                fill
                className="h-full w-full object-contain"
              />

              <button
                onClick={downloadImage}
                className="absolute -top-2 -right-2"
              >
                <MdFileDownload className="text-colorWhite h-5 w-5" />
              </button>
            </div>
          ) : (
            <p>{data?.text}</p>
          )}
          <div className="absolute bottom-0 left-2 translate-y-[130%] text-xs text-gray-400">
            {timestamp}
          </div>
        </div>
        <div className="flex-1"> </div>
      </div>
    );
  }
};

export default MessageCard;
