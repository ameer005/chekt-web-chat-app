import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios";
import useStore from "@/store/useStore";

export const useFetchChats = () => {
  const api = useAxios();
  const setDataState = useStore((state) => state.setDataState);

  const queryFnc = () => {
    return api.get("/chats", {
      params: {
        sort: "-updatedAt",
      },
    });
  };

  return useQuery(["chats"], queryFnc, {
    onSuccess: (data) => {
      const response = data.data;
      setDataState({ chats: response.chats });
    },
  });
};
