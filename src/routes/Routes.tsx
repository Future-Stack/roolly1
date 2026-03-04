import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import Login from "@/components/vendorAuth/Login";
import Register from "@/components/vendorAuth/Register";
import VendorLayout from "@/components/vendorDashboard/VendorLayout/VendorLayout";
import Overview from "@/pages/vendorDashboard/Overview/Overview";
import CommunicationWithBroker from "@/pages/vendorDashboard/Messages/CommunicationWithBroker";
import AnalyticsReporting from "@/pages/vendorDashboard/AnalyticsReporting/AnalyticsReporting";
import Settings from "@/pages/vendorDashboard/Settings/Settings";
import PropertyInformationForm from "@/components/brokerDashboard/BrokerProperty/PropertyInformationForm";
// import RiskProfileManagementForm from "@/components/vendorDashboard/Property/RiskProfileManagementForm";
import BrokerLayout from "@/components/brokerDashboard/BrokerLayout/BrokerLayout";
import BrokerDashboardOverview from "@/pages/brokerDashboard/Overview/Overview";
import BrokerLeadManagement from "@/pages/brokerDashboard/BrokerLeadManagement/BrokerLeadManagement";
import BrokerSchedule from "@/pages/brokerDashboard/BrokerSchedule/BrokerSchedule";
import PropertyEdit from "@/components/vendorDashboard/Property/PropertyEdit";
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
import VendorManagement from "@/pages/AdminDashboard/Vendor/VendorManagement";
import HomePropertyDetails from "@/components/DetailsPage/DetailsPage";
import AllProperty from "@/pages/AllProperty/AllProperty";
import ProtectedRoute from "@/layout/ProtectedRoute";
// import ForgotPassword from "@/auth/ForgotPassword/ForgotPassword";
import ForgotPasswordReq from "@/auth/ForgotPasswordReq/ForgotPasswordReq";
import ForgotPasswordConfirm from "@/auth/ForgotPasswordConfirm/ForgotPasswordConfirm";
import VerifyEmail from "@/auth/VerifyEmail/VerifyEmail";
import UpdateVendorProperty from "@/pages/brokerDashboard/UpdateVendorProperty/UpdateVendorProperty";
import CreateNewLead from "@/pages/brokerDashboard/CreateNewLead/CreateNewLead";
import UpdateLead from "@/pages/brokerDashboard/UpdateLead/UpdateLead";
import LeadManagement from "@/pages/vendorDashboard/LeadManagement/LeadManagement";
import PropertyDetails from "@/pages/Users/PropertyDetails/PropertyDetails";
import PrivacyPolicy from "@/components/Home/PrivecyPolicy";
import Terms from "@/components/Home/Terms";
import RiskProfileInformation from "@/components/brokerDashboard/BrokerProperty/RiskProfileInformation";



import PublicRoute from "@/layout/PublicRoute";
import VendorProperty from "@/pages/vendorDashboard/PropertyManagement/VendorProperty";
import VendorPropertyDetails from "@/pages/vendorDashboard/PropertyDetails/VendorPropertyDetails";
import PropertyManagement from "@/pages/brokerDashboard/BrokerProperty/PropertyManagement";
import AddProperty from "@/pages/brokerDashboard/AddProperty/AddProperty";


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
        path: '/login',
        element: <PublicRoute><Login /></PublicRoute>
      },
      // {
      //   path: '/login',
      //   element: <Login />
      // },
      {
        path: '/register',
        element: <PublicRoute><Register /></PublicRoute>
      },
      // {
      //   path: '/register',
      //   element: <Register />
      // },
      {
        path: '/all-properties',
        element: <AllProperty />
      },
      {
        path: '/property-details/:id',
        element: <PropertyDetails />
      },
      {
        path: '/forgot-password-req',
        element: <PublicRoute><ForgotPasswordReq /></PublicRoute>
      },
      {
        path: '/forgot-password-confirm',
        element: <PublicRoute><ForgotPasswordConfirm /></PublicRoute>
      },
      {
        path: '/verify-email',
        element: <PublicRoute><VerifyEmail /></PublicRoute>
      },
      // {
      //   path: '/forgot-password-req',
      //   element: <ForgotPasswordReq />
      // },
      // {
      //   path: '/forgot-password-confirm',
      //   element: <ForgotPasswordConfirm />
      // },
      // {
      //   path: '/verify-email',
      //   element: <VerifyEmail />
      // },

      {
        path: '/privecy-policy',
        element: <PrivacyPolicy />
      },
      {
        path: '/terms',
        element: <Terms />
      },
    ],
  },

  {
    path: '/vendor-dashboard',
    element: <ProtectedRoute allowedRoles={['VENDOR']}><VendorLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Overview />
      },
      {
        path: 'leads',
        element: <LeadManagement />
      },
      {
        path: 'property',
        element: <VendorProperty />
      },
      {
        path: 'property/:id',
        element: <PropertyEdit />
      },
      {
        path: 'property/:id/view',
        element: <VendorPropertyDetails />
      },
      
      {
        path: 'messages',
        element: <CommunicationWithBroker />
      },
      {
        path: 'reports',
        element: <AnalyticsReporting />
      },
      {
        path: 'settings',
        element: <Settings />
      },
     
      // {
      //   path:'add-property',
      //   element:<AddProperty/>
      // }
    ]
  },
  {
    path: '/broker-dashboard',
    element: <ProtectedRoute allowedRoles={['BROKER']}><BrokerLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <BrokerDashboardOverview />
      },
      {
        path: 'leads',
        element: <BrokerLeadManagement />
      },
      {
        path: 'create-lead',
        element: <CreateNewLead />
      },
      {
        path: 'update-lead/:id',
        element: <UpdateLead />
      },
      {
        path: 'schedule',
        element: <BrokerSchedule />
      },
      {
        path: 'properties',
        element: <PropertyManagement />
      },
      {
        path: 'add-property',
        element: <AddProperty />
      },
      {
        path: 'properties/:id',
        element: <PropertyInformationForm />
      },
      {
        path: 'properties/:id/risk',
        element: <RiskProfileInformation />
      },
      {
        path: 'edit-property/:id',
        element: <UpdateVendorProperty />
      },
      {
        path: 'messages',
        element: <BrokerMessage />
      },
      {
        path: 'reports',
        element: <BrokerAnalytics />
      },
      {
        path: 'settings',
        element: <BrokerSettings />
      }
    ]
  },
  {
    path: '/admin-dashboard',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><AdminLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <AdminOverview />
      },
      {
        path: 'overview',
        element: <AdminOverview />
      },
      {
        path: 'leads',
        element: <AdminLeads />
      },
      {
        path: 'property',
        element: <AdminProperty />
      },
      {
        path: 'messages',
        element: <AdminMessage />
      },
      {
        path: 'reports',
        element: <AdminAnalytics />
      },
      {
        path: 'broker',
        element: <Broker />
      },
      {
        path: 'vendor',
        element: <VendorManagement />
      },
      {
        path: 'settings',
        element: <AdminSettings />
      }
    ]
  }
]);
export default routes;
