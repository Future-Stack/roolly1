import { useState } from "react";
import { Outlet } from "react-router-dom";
import BrokerNav from "./BrokerNav";
import BrokerSidebar from "./BrokerSidebar";

const BrokerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F8FAFC] overflow-hidden">

      {/* Top Nav + Hamburger */}
      <div className="flex-none z-20 shadow-sm relative">
        <BrokerNav onMenuClick={() => setIsOpen(true)} />
      </div>

      <div className="flex flex-1 overflow-hidden relative">

        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-col px-4 lg:px-8 py-4 border-r border-gray-100 flex-none h-full">
          <BrokerSidebar/>
        </div>

        {/* Mobile Sidebar - Slide in */}
        <div
          className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 md:hidden flex flex-col overflow-y-auto bg-white shadow-xl
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
        <div className="flex-1 w-full pl-4 md:pl-6 pr-4 md:pr-6 py-4 overflow-y-auto custom-scrollbar bg-transparent">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default BrokerLayout;
