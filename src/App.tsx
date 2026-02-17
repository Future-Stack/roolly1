import { Outlet, useLocation } from "react-router-dom";
import Footer from "./layout/Footer";
import Broker360Header, { HeaderSpacer } from "./layout/Navbar";
import { useState } from "react";
import ChatbotMain from "./components/Home/chatbot/ChatbotMain";
import chatbotImg from './assets/chatbot-img.png';

const App = () => {
  const location = useLocation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

      {/* Global Chatbot */}
      {!shouldHide && (
        <>
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 sm:w-14 sm:h-14 bg-blue-600 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 cursor-pointer z-50 focus:outline-none"
            aria-label="Open Chatbot"
          >
            <img src={chatbotImg} alt="chatbot" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          </button>

          {isChatbotOpen && (
            <ChatbotMain onClose={() => setIsChatbotOpen(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default App;