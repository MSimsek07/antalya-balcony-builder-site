import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe } from "lucide-react"; // Added Globe icon
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // Import cn for conditional classes

type Language = 'tr' | 'en';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('tr');
  const location = useLocation();

  const languages = {
    tr: { name: 'TR', flag: '/turkey.png', fullName: 'Türkçe' }, // Short name for trigger
    en: { name: 'EN', flag: '/england.png', fullName: 'English' } // Short name for trigger
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    // Actual language change logic would go here (e.g., i18n.changeLanguage(lang))
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    { name: "Projeler", path: "/projects" },
    { name: "S.S.S", path: "/faq" },
    { name: "İletişim", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="Zen Yapı Antalya Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-auto rounded-full"
            />
            <div className="flex flex-col">
              <span
                className={`text-base sm:text-lg md:text-xl font-bold leading-tight ${
                  scrolled || isOpen ? "text-theme-blue" : "text-white"
                }`}
              >
                ZEN YAPI ANTALYA
              </span>
              <div className={`w-full h-[1px] ${
                scrolled || isOpen ? "bg-theme-blue" : "bg-white"
              } my-0.5`}></div>
              <span
                className={`text-xs sm:text-sm font-medium text-center ${
                  scrolled || isOpen ? "text-theme-blue" : "text-white"
                }`}
              >
                Cam Balkon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? scrolled || isOpen
                      ? "text-theme-teal"
                      : "text-white underline underline-offset-4"
                    : scrolled || isOpen
                    ? "text-gray-700 hover:text-theme-teal"
                    : "text-white hover:text-gray-200"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Desktop Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm" // Adjusted size
                  className={cn( // Use cn for conditional classes
                    "flex items-center gap-2 px-3 py-1 rounded-md", // Added padding and rounded
                    scrolled || isOpen
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/20"
                  )}
                >
                  <img
                    src={languages[currentLang].flag}
                    alt={languages[currentLang].name}
                    className="h-5 w-5 rounded-full" // Make flag rounded
                  />
                  <span className="text-sm font-medium"> {/* Added font style */}
                    {languages[currentLang].name}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40"> {/* Adjusted width */}
                {Object.entries(languages).map(([code, lang]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => handleLanguageChange(code as Language)}
                    className={cn( // Use cn for conditional classes
                      "flex items-center gap-3 cursor-pointer p-2", // Added padding and cursor
                      currentLang === code ? 'bg-accent text-accent-foreground' : '' // Use accent text color too
                    )}
                  >
                    <img src={lang.flag} alt={lang.fullName} className="h-5 w-5 rounded-full" />
                    <span>{lang.fullName}</span> {/* Use full name in dropdown */}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             {/* Mobile Language Switcher - Placed before menu toggle */}
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1.5 mr-2 px-2 py-1 rounded-md", // Slightly tighter spacing
                    scrolled || isOpen
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/20"
                  )}
                >
                  <img
                    src={languages[currentLang].flag}
                    alt={languages[currentLang].name}
                    className="h-5 w-5 rounded-full"
                  />
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {Object.entries(languages).map(([code, lang]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => {
                       handleLanguageChange(code as Language);
                       closeMenu(); // Close main menu if open
                    }}
                     className={cn(
                      "flex items-center gap-3 cursor-pointer p-2",
                      currentLang === code ? 'bg-accent text-accent-foreground' : ''
                    )}
                  >
                    <img src={lang.flag} alt={lang.fullName} className="h-5 w-5 rounded-full" />
                    <span>{lang.fullName}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={scrolled || isOpen ? "text-gray-700" : "text-white"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full pb-4">
            <nav className="flex flex-col space-y-2 px-4 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-theme-teal text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-theme-teal"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile language switcher removed from here as it's now in the top bar */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;