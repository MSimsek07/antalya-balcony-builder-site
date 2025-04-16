import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram 
} from "lucide-react";
import { db } from "@/firebaseConfig"; // Import Firestore instance
import { doc, getDoc } from "firebase/firestore";

// Define the structure for company information (should match admin settings)
interface CompanyInfo {
  address: string;
  telephone: string;
  email: string;
  workingHours: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const companyInfoRef = doc(db, "settings", "companyInfo");
      try {
        const docSnap = await getDoc(companyInfoRef);
        if (docSnap.exists()) {
          setCompanyInfo(docSnap.data() as CompanyInfo);
        } else {
          console.log("No company info document found in Firestore for Footer.");
          // Set default values or handle as needed if data isn't critical initially
          setCompanyInfo({ 
            address: "Adres bilgisi bulunamadı", 
            telephone: "Telefon bilgisi bulunamadı", 
            email: "Email bilgisi bulunamadı", 
            workingHours: "Çalışma saati bilgisi bulunamadı"
           });
        }
      } catch (error) {
        console.error("Error fetching company info for Footer:", error);
        // Handle error state if necessary
         setCompanyInfo({ 
            address: "Adres yüklenemedi", 
            telephone: "Telefon yüklenemedi", 
            email: "Email yüklenemedi", 
            workingHours: "Çalışma saati yüklenemedi"
           });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
              <a href="https://www.facebook.com/p/Antalya-zen-yap%C4%B1-cam-balkon-100075705893989/?_rdr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-theme-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-theme-teal transition-colors"> {/* Consider removing or adding a real link */}
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/devran_babababa/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-theme-teal transition-colors">
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
                <Link to="/projects" className="text-gray-300 hover:text-theme-teal transition-colors">
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
            
          </div>

          {/* Contact Info - Now Dynamic */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            {loading ? (
              <div className="space-y-3">
                <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="h-5 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                <div className="h-5 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                <div className="h-5 bg-gray-700 rounded w-3/5 animate-pulse"></div>
              </div>
            ) : companyInfo ? (
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-theme-teal shrink-0 mt-0.5" />
                  {/* Address - Assuming address is just text. If it's a link, adjust accordingly */}
                  <span className="text-gray-300">
                    {companyInfo.address}
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-theme-teal" />
                  <a href={`tel:${companyInfo.telephone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-theme-teal transition-colors">
                    {companyInfo.telephone}
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-theme-teal" />
                  <a href={`mailto:${companyInfo.email}`} className="text-gray-300 hover:text-theme-teal transition-colors">
                    {companyInfo.email}
                  </a>
                </li>
                <li className="flex items-start">
                  <Clock className="mr-2 h-5 w-5 text-theme-teal shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {companyInfo.workingHours}
                  </span>
                </li>
              </ul>
            ) : (
              <p className="text-gray-400">İletişim bilgileri yüklenemedi.</p>
            )}
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
