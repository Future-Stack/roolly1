import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

const App = () => {
  const location = useLocation();

  // Routes যেখানে Navbar/Footer দেখাবে না
  const hideHeaderFooter = ["/login", "/register","/upload_photo", "/verification"];

  const shouldHide = hideHeaderFooter.includes(location.pathname);

  return (
    <div>
      {!shouldHide && <Navbar />}
      <Outlet />
      {!shouldHide && <Footer />}
    </div>
  );
};

export default App;
