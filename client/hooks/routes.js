import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const withPublic = (Component) => {
  return function WithPublic(props) {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const user = useStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      setUserLoggedIn(user ? true : false);
    }, []);

    if (isUserLoggedIn) {
      router.replace("/");
      return null;
    }

    return <Component {...props} />;
  };
};

export const withProtected = (Component) => {
  return function WithPublic(props) {
    const [isUserLoggedIn, setUserLoggedIn] = useState(null);
    const user = useStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      setUserLoggedIn(user ? true : false);
    }, []);

    if (isUserLoggedIn === false) {
      router.replace("/auth/login");
      return null;
    }

    if (isUserLoggedIn === true) {
      return <Component {...props} />;
    }
  };
};
