import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import useStore from "../../../store/useStore";

const Toast = ({}) => {
  const setModalState = useStore((state) => state.setModalState);
  const toastProperties = useStore((state) => state.toastProperties);

  const toastState =
    toastProperties.type === "error"
      ? "bg-red-100 text-red-400"
      : "bg-green-400 text-colorWhite";

  useEffect(() => {
    setTimeout(() => {
      setModalState({ showToastModal: false });
    }, 2300);
  }, []);

  return (
    <div
      className={`w-full max-w-[25rem] sm:max-w-[20rem]  fixed top-6 left-[50%] -translate-x-[50%] px-5 sm:px-3 py-3  rounded-md z-[1000] ${toastState} shadow-md`}
    >
      <div className="flex items-center">
        <div className=" font-medium text-sm flex-1">
          {toastProperties.message}
        </div>
        <button
          className="ml-2"
          onClick={() => setModalState({ showToastModal: false })}
        >
          <AiFillCloseCircle className="text-2xl cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
