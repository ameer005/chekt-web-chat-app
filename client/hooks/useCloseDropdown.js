import { useEffect } from "react";

const useCloseDropdown = ({ ref, isOpen, setIsOpen, customParam }) => {
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (customParam) {
          setIsOpen(customParam);
        } else {
          setIsOpen(false);
        }
      }
    }
    window.addEventListener("mousedown", handleClick);
    // clean up
    return () => window.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return null;
};

export default useCloseDropdown;
