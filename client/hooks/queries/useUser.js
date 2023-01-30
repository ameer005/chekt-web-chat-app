import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useStore from "@/store/useStore";
import useAxios from "../useAxios";

export const useFetchInfiniteUsers = (params) => {
  const api = useAxios();
  const fetchInfiniteUsers = ({ queryKey, pageParam = 1 }) => {
    if (queryKey[1]) {
      return api.get(`/users?page=${pageParam}`, {
        params: queryKey[1],
      });
    } else {
      return api.get(`/users?page=${pageParam}`);
    }
  };

  return useInfiniteQuery(["users", params], fetchInfiniteUsers, {
    getNextPageParam: (lastpage, pages) => {
      if (lastpage.data.page < lastpage.data.totalPages) {
        return lastpage.data.page + 1;
      }
      return false;
    },
  });
};

export const useFetchUser = (userId) => {
  const api = useAxios();

  const fetchUser = ({ queryKey }) => {
    return api.get(`/users/${queryKey[1]}`);
  };

  return useQuery(["users", userId], fetchUser);
};

export const useFetchMe = () => {
  const api = useAxios();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const fetchMe = () => {
    return api.get("/users/me");
  };

  return useQuery(["users", user?._id], fetchMe, {
    onSuccess: (data) => {
      const response = data.data;
      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);
    },
  });
};

// ********************************* Freindship flow ************************************* //
export const useSendRequest = () => {
  const api = useAxios();
  const queryClient = useQueryClient();

  const sendRequest = (userId) => {
    return api.patch(`/users/send-request/${userId}`);
  };

  return useMutation(sendRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useHandleRequest = () => {
  const api = useAxios();
  const queryClient = useQueryClient();

  const handleRequest = (payload) => {
    const { data, userId } = payload;

    return api.patch(`/users/handle-request/${userId}`, data);
  };

  return useMutation(handleRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      queryClient.invalidateQueries("chats");
    },
  });
};

export const useRemoveFriend = () => {
  const api = useAxios();
  const queryClient = useQueryClient();

  const removeFriend = (payload) => {
    const { userId, data } = payload;
    return api.patch(`/users/remove-friend/${userId}`, data);
  };

  return useMutation(removeFriend, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useFetchRequestsList = () => {
  const api = useAxios();
  const setRequest = useStore((state) => state.setRequest);
  const fetchRequestsList = () => {
    return api.get("/users/get-my-requests");
  };

  return useQuery(["users"], fetchRequestsList, {
    onSuccess: (data) => {
      const response = data.data;
      setRequest(response.users);
    },
  });
};
