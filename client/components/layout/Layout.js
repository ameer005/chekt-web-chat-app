import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="bg-colorBg font-exo font-normal text-sm text-colorBlack leading-4">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
