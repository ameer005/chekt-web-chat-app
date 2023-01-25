import { useMutation } from "@tanstack/react-query";
import useAxios from "../useAxios";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";

// *********************************** AUTH ********************************************** //
export const useSignup = () => {
  const api = useAxios();
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);

  const signup = (userData) => {
    return api.post("/users/signup", userData);
  };

  return useMutation(signup, {
    onSuccess: () => {
      router.push("/auth/activate");
      setModalState({
        showToastModal: true,
        toastProperties: {
          status: "success",
          message: "Otp has been sent to your registered email.",
        },
      });
    },
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          type: "error",
          message: error.response.data.message,
        },
      });
    },
  });
};

export const useActivateAccount = () => {
  const api = useAxios();
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);

  const activateAccount = (userData) => {
    return api.post("/users/activate", userData);
  };

  return useMutation(activateAccount, {
    onSuccess: () => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          type: "",
          message: "Account activated successfully",
        },
      });
      router.push("/auth/login");
    },
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          type: "error",
          message: error.response.data.message,
        },
      });
    },
  });
};

export const useResendActivatonCode = () => {
  const api = useAxios();
  const setModalState = useStore((state) => state.setModalState);

  const resendActivationCode = (userData) => {
    return api.post("/users/sendActivationCode", userData);
  };

  return useMutation(resendActivationCode, {
    onSuccess: () => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: "check your registered email for activation code",
          type: "",
        },
      });
    },
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const api = useAxios();
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);
  const setModalState = useStore((state) => state.setModalState);

  const login = (userDate) => {
    return api.post("/users/login", userDate);
  };

  return useMutation(login, {
    onError: (error) => {
      if (error.response.status === 401) {
        router.push("/auth/activate");
      }
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
    onSuccess: (data) => {
      const response = data.data;
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
      setModalState({ showAuthModal: false });
      router.push("/");
    },
  });
};

export const useForgotPassword = () => {
  const router = useRouter();
  const api = useAxios();
  const setOptions = useStore((state) => state.setOptions);
  const setModalState = useStore((state) => state.setModalState);

  const forgotPassword = (userData) => {
    return api.post("/users/forgotPassword", userData);
  };

  return useMutation(forgotPassword, {
    onSuccess: () => {
      router.push("/auth/changepassword");
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: "Otp has been sent to your email",
          type: "",
        },
      });
    },
  });
};

export const useValidateForgotPassword = () => {
  const api = useAxios();
  const router = useRouter();
  const setModalState = useStore((state) => state.setModalState);

  const validateForgotPassword = (userData) => {
    return api.post("/users/validateForgotPassword", userData);
  };

  return useMutation(validateForgotPassword, {
    onSuccess: () => {
      router.push("/auth/login");
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: "password changed successfully",
          type: "",
        },
      });
    },
    onError: (error) => {
      setModalState({
        showToastModal: true,
        toastProperties: {
          message: error.response.data.message,
          type: "error",
        },
      });
    },
  });
};
