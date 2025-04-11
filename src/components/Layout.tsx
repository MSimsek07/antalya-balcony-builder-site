import Navbar from "./Navbar";
import Footer from "./Footer";
import { Phone } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 left-8 z-50">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-theme-teal to-theme-blue rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>
          <a
            href="tel:+905454043462"
            className="relative flex items-center justify-center w-14 h-14 bg-white text-theme-blue rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            title="Bizi Arayın"
          >
            <Phone className="h-6 w-6 phone-vibrate" />
            <span className="sr-only">Bizi Arayın</span>
          </a>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>
          <a
            href="https://api.whatsapp.com/send?phone=905454043462"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            title="WhatsApp ile İletişim"
          >
            <div className="relative w-7 h-7 whatsapp-bounce">
              <img 
                src="/whatsapp.png" 
                alt="WhatsApp" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="sr-only">WhatsApp ile İletişim</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Layout;
