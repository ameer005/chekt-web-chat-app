import useStore from "@/store/useStore";
import {
  useInfiniteQuery,
  useMutation,
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

export const useFetchInfiniteMessage = (params) => {
  const { chatId } = useStore((state) => state.activeChat);
  const api = useAxios();
  const queryFnc = ({ queryKey, pageParam = 1 }) => {
    return api.get(`/messages/${queryKey[1]}?page=${pageParam}`);
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

export const useSendMessage = () => {
  const api = useAxios();
  const queryClient = useQueryClient();
  const queryfnc = (payload) => {
    const { chatId, data } = payload;
    return api.post(`/messages/${chatId}`, data);
  };

  return useMutation(queryfnc, {
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
      queryClient.invalidateQueries("chats");
    },
  });
};
