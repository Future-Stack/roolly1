import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import DetailsPage from "@/components/DetailsPage/DetailsPage";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
       {
        path: "details/:id",  // property id path param
        element: <DetailsPage />,
      },
    ],
  },
]);
export default routes;
