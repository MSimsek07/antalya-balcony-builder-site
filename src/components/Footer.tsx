
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-theme-dark-blue text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ZEN YAPI ANTALYA</h3>
            <p className="text-gray-300 mb-4">
              Antalya'nın önde gelen cam balkon ve cam sistemleri firması olarak, kaliteli ürünler ve profesyonel hizmet sunuyoruz.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="https://www.facebook.com/p/Antalya-zen-yap%C4%B1-cam-balkon-100075705893989/?_rdr" target="_blank" className="text-gray-300 hover:text-theme-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-theme-teal transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/devran_babababa/" target="blank" className="text-gray-300 hover:text-theme-teal transition-colors">
                <Instagram size={20} />
              </a>              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Projeler
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Sıkça Sorulanlar
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-theme-teal transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Cam Balkon
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Isıcamlı PVC Pencere
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Ofis Cam Bölmesi
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Cam Balkon Perdesi
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Sineklik
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Panjur Sistemleri
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-theme-teal shrink-0 mt-0.5" />
                <span className="text-gray-300">
                <a href="https://maps.app.goo.gl/BwTFk8xeAfuZu2Q8A" target="_blank" className="text-gray-300 hover:text-theme-teal transition-colors">
                  Yeni mahalle 2609 sk no 26 daire 3 ışkın apartmanı, 07000 Kepez/Antalya
                </a>
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-theme-teal" />
                <a href="tel:+902422294567" className="text-gray-300 hover:text-theme-teal transition-colors">
                +90 545 404 34 62
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-theme-teal" />
                <a href="mailto:info@cambalkonantalya.org" className="text-gray-300 hover:text-theme-teal transition-colors">
                  info@cambalkonantalya.org
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="mr-2 h-5 w-5 text-theme-teal shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Pazartesi - Cumartesi: 08:30 - 18:30
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Zen Yapı Antalya. Tüm hakları saklıdır.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 text-sm hover:text-theme-teal transition-colors">
              Gizlilik Politikası
            </a>
            <span className="mx-2 text-gray-600">|</span>
            <a href="#" className="text-gray-400 text-sm hover:text-theme-teal transition-colors">
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
