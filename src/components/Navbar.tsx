import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = 'tr' | 'en';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const location = useLocation();

  const languages = {
    tr: { name: 'Turkish', flag: '/turkey.png' },
    en: { name: 'English', flag: '/england.png' }
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    // Here you would typically handle language change in your app
    // For example, using i18n or a context
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Hakkımızda", path: "/about" },
    { name: "Hizmetlerimiz", path: "/services" },
    { name: "Projeler", path: "/gallery" },
    { name: "S.S.S", path: "/faq" },
    { name: "İletişim", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-theme-blue/95 shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="z-50">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Cam Balkon Antalya Logo" 
              className="h-12 w-auto rounded-md"
            />
            <span className="text-white font-bold text-xl md:text-2xl">
              CAM BALKON ANTALYA
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium text-white hover:text-theme-teal transition-colors ${
                  location.pathname === link.path ? "text-theme-teal" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <a 
              href="https://api.whatsapp.com/send?phone=905454043462" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5" />
              WhatsApp
            </a>
            <div className="border-l border-white/20 h-6 mx-2"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto text-white hover:text-theme-teal inline-flex items-center gap-2">
                  <img src={languages[currentLang].flag} alt={languages[currentLang].name} className="h-5 w-5" />
                  <span>{languages[currentLang].name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                {Object.entries(languages).map(([code, lang]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => handleLanguageChange(code as Language)}
                    className={`flex items-center gap-2 ${
                      currentLang === code ? 'bg-accent' : ''
                    }`}
                  >
                    <img src={lang.flag} alt={lang.name} className="h-5 w-5" />
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="lg:hidden flex items-center">
          <button
            className="text-white p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-theme-blue/95 z-40 transition-transform duration-300 transform lg:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-white hover:text-theme-teal py-2 text-lg ${
                    location.pathname === link.path ? "text-theme-teal" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-8">
              <a 
                href="https://api.whatsapp.com/send?phone=905454043462" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-md bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5" />
                WhatsApp ile İletişim
              </a>
            </div>
            <div className="mt-6 flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-theme-teal inline-flex items-center gap-2">
                    <img src={languages[currentLang].flag} alt={languages[currentLang].name} className="h-5 w-5" />
                    <span>{languages[currentLang].name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-36">
                  {Object.entries(languages).map(([code, lang]) => (
                    <DropdownMenuItem
                      key={code}
                      onClick={() => {
                        handleLanguageChange(code as Language);
                        closeMenu();
                      }}
                      className={`flex items-center gap-2 ${
                        currentLang === code ? 'bg-accent' : ''
                      }`}
                    >
                      <img src={lang.flag} alt={lang.name} className="h-5 w-5" />
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
