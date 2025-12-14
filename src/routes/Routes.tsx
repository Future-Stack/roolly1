import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import Login from "@/components/vendorAuth/Login";
import Register from "@/components/vendorAuth/Register";
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
import BrokerProperty from "@/pages/brokerDashboard/BrokerProperty/BrokerProperty";
import PropertyEdit from "@/components/brokerDashboard/BrokerPropery/PropertyEdit";
import PropertyDetails from "@/pages/brokerDashboard/PropertyDetails/PropertyDetails";
import BrokerMessage from "@/pages/brokerDashboard/BrokerMessage/BrokerMessage";
import BrokerAnalytics from "@/pages/brokerDashboard/BrokerAnalytics/BrokerAnalytics";
import BrokerSettings from "@/pages/brokerDashboard/BrokerSettings/BrokerSettings";
import AdminLayout from "@/components/AdminDashboard/AdminLayout/AdminLayout";
import AdminOverview from "@/pages/AdminDashboard/Overview/Overview";
import AdminLeads from "@/pages/AdminDashboard/AdminLeads/AdminLeads";
import AdminProperty from "@/pages/AdminDashboard/AdminProperty/AdminProperty";
import AdminMessage from "@/pages/AdminDashboard/AdminMessage/AdminMessage";
import AdminAnalytics from "@/pages/AdminDashboard/AdminAnalytics/AdminAnalytics";
import Broker from "@/pages/AdminDashboard/Broker/Broker";
import AdminSettings from "@/pages/AdminDashboard/AdminSettings/AdminSettings";
import HomePropertyDetails from "@/components/DetailsPage/DetailsPage";
import AllProperty from "@/pages/AllProperty/AllProperty";


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
        element: <HomePropertyDetails />,
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
        path:'/all-properties',
        element:<AllProperty/>
      }
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
      },
      {
        path:'property',
        element:<BrokerProperty/>
      },
      {
        path:'property/:id',
        element:<PropertyEdit/>
      },
      {
        path:'property/:id/view',
        element:<PropertyDetails/>
      },
      {
        path:'messages',
        element:<BrokerMessage/>
      },
      {
        path:'reports',
        element:<BrokerAnalytics/>
      },
      {
        path:'settings',
        element:<BrokerSettings/>
      }
    ]
  },
  {
    path:'/admin-dashboard',
    element:<AdminLayout/>,
    children:[
      {
        index:true,
        element:<AdminOverview/>
      },
      {
        path:'overview',
        element:<AdminOverview/>
      },
      {
        path:'leads',
        element:<AdminLeads/>
      },
      {
        path:'property',
        element:<AdminProperty/>
      },
      {
        path:'messages',
        element:<AdminMessage/>
      },
      {
        path:'reports',
        element:<AdminAnalytics/>
      },
      {
        path:'broker',
        element:<Broker/>
      },
      {
        path:'settings',
        element:<AdminSettings/>
      }
    ]
  }
]);
export default routes;
