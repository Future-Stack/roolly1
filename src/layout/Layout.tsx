import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="text-red-500">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
