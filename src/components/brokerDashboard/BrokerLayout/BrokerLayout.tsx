import { useState } from "react";
import { Outlet } from "react-router-dom";
import BrokerNav from "./BrokerNav";
import BrokerSidebar from "./BrokerSidebar";

const BrokerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">

      {/* Top Nav + Hamburger */}
      <BrokerNav onMenuClick={() => setIsOpen(true)} />

      <div className="flex flex-1 relative">

        {/* Desktop Sidebar */}
        <div className="hidden md:block px-8">
          <BrokerSidebar/>
        </div>

        {/* Mobile Sidebar - Slide in */}
        <div
          className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <BrokerSidebar onClose={() => setIsOpen(false)} />
        </div>

        {/* Background Overlay */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}

        {/* Main Content */}
        <div className="w-full pl-5 md:pl-0  pr-5 my-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default BrokerLayout;
