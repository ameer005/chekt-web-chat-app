import { useRef, useCallback } from "react";
const useInfiniteScroll = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) => {
  const intObserver = useRef();
  const lastItemRef = useCallback((item) => {
    if (isLoading) return;

    if (intObserver.current) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver(
      (item) => {
        if (item[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      [isLoading]
    );

    if (item) intObserver.current.observe(item);
  });

  return lastItemRef;
};

export default useInfiniteScroll;
