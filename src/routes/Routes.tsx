import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import DetailsPage from "@/components/DetailsPage/DetailsPage";
import Login from "@/components/vendorAuth/Login";
import Register from "@/components/vendorAuth/Register";
import UploadPhoto from "@/components/vendorAuth/UploadPhoto";
import Verification from "@/components/vendorAuth/Verofication";


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
        path: "details/:id",  
        element: <DetailsPage />,
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/upload_photo',
        element:<UploadPhoto/>
      },
      {
        path:'/verification',
        element:<Verification/>
      },
    ],
  },
]);
export default routes;
