import { Outlet, useLocation } from "react-router-dom";
import Footer from "./layout/Footer";
import Broker360Header, { HeaderSpacer } from "./layout/Navbar";

const App = () => {
  const location = useLocation();

  const hideHeaderFooter = ["/login", "/register", "/upload_photo", "/verification"];
  const shouldHide = hideHeaderFooter.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHide && (
        <>
          <Broker360Header />
          <HeaderSpacer />
        </>
      )}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!shouldHide && <Footer />}
    </div>
  );
};

export default App;