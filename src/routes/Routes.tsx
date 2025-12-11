import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import DetailsPage from "@/components/DetailsPage/DetailsPage";
import Login from "@/components/vendorAuth/Login";
import Register from "@/components/vendorAuth/Register";
import UploadPhoto from "@/components/vendorAuth/UploadPhoto";
import Verification from "@/components/vendorAuth/Verofication";
import VendorLayout from "@/components/vendorDashboard/VendorLayout/VendorLayout";
import Overview from "@/pages/vendorDashboard/Overview/Overview";
import PropertyManagement from "@/pages/vendorDashboard/PropertyManagement/PropertyManagement";
import CommunicationWithBroker from "@/pages/vendorDashboard/Messages/CommunicationWithBroker";
import AnalyticsReporting from "@/pages/vendorDashboard/AnalyticsReporting/AnalyticsReporting";
import Settings from "@/pages/vendorDashboard/Settings/Settings";
import PropertyInformationForm from "@/components/vendorDashboard/Property/PropertyInformationForm";
import RiskProfileManagementForm from "@/components/vendorDashboard/Property/RiskProfileManagementForm";
import BrokerLayout from "@/components/brokerDashboard/BrokerLayout/BrokerLayout";
import BrokerDashboardOverview from "@/pages/brokerDashboard/Overview/Overview";
import BrokerLeadManagement from "@/pages/brokerDashboard/BrokerLeadManagement/BrokerLeadManagement";
import BrokerSchedule from "@/pages/brokerDashboard/BrokerSchedule/BrokerSchedule";


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

  {
    path:'/vendor-dashboard',
    element:<VendorLayout/>,
    children:[
      {
        index:true,
        element:<Overview/>
      },
      {
        path:'overview',
        element:<Overview/>
      },
      // {
      //   path:'leads',
      //   element:<LeadManagement/>
      // },
      {
        path:'properties',
        element:<PropertyManagement/>
      },
      {
        path:'properties/:id',
        element:<PropertyInformationForm/>
      },
      {
        path:'properties/:id/risk',
        element:<RiskProfileManagementForm/>
      },
      {
        path:'messages',
        element:<CommunicationWithBroker/>
      },
      {
        path:'reports',
        element:<AnalyticsReporting/>
      },
      {
        path:'settings',
        element:<Settings/>
      }
    ]
  },
  {
    path:'/broker-dashboard',
    element:<BrokerLayout/>,
    children:[
      {
        index:true,
        element:<BrokerDashboardOverview/>
      },
      {
        path:'leads',
        element:<BrokerLeadManagement/>
      },
      {
        path:'schedule',
        element:<BrokerSchedule/>
      }
    ]
  }
]);
export default routes;
