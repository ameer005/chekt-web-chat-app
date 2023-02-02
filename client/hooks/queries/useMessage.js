import useStore from "@/store/useStore";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useAxios from "../useAxios";

// export const usefetchMessages = (chatId) => {
//   const api = useAxios();

//   const queryfnc = ({ queryKey }) => {
//     return api.get(`/messages/${queryKey[1]}`);
//   };

//   return useQuery(["messages", chatId], queryfnc);
// };

export const useFetchInfiniteMessage = (chatId) => {
  const api = useAxios();
  const queryFnc = ({ queryKey, pageParam = 1 }) => {
    return api.get(`/messages/${queryKey[1]}?page=${pageParam}`, {
      params: {
        limit: 7,
      },
    });
  };

  return useInfiniteQuery(["messages", chatId], queryFnc, {
    getNextPageParam: (lastpage, pages) => {
      if (lastpage.data.page < lastpage.data.totalPages) {
        return lastpage.data.page + 1;
      }
      return false;
    },
  });
};

export const useFetchMessages = (chatId) => {
  const api = useAxios();
  const queryFnc = ({ queryKey }) => {
    return api.get(`/messages/${queryKey[1]}`);
  };

  return useQuery(["messages", chatId], queryFnc);
};

export const useSendMessage = () => {
  const socket = useStore((state) => state.socket);
  const api = useAxios();
  const queryClient = useQueryClient();
  const queryfnc = (payload) => {
    const { chatId, data } = payload;
    return api.post(`/messages/${chatId}`, data);
  };

  return useMutation(queryfnc, {
    onSuccess: (data) => {
      const response = data.data;
      queryClient.invalidateQueries("chats");
      queryClient.invalidateQueries("messages");
      socket.emit("send-message", response.message);
    },
  });
};
