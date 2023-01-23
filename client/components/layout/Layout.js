import Toast from "../ui/Toast/Toast";
import useStore from "@/store/useStore";

const Layout = ({ children }) => {
  const showToastModal = useStore((state) => state.showToastModal);

  return (
    <>
      <div className=" font-exo font-normal text-sm text-colorBlack leading-4">
        <main>{children}</main>
      </div>
      {showToastModal && <Toast />}
    </>
  );
};

export default Layout;
