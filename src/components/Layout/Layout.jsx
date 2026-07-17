import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>Header</header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
