import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram,
  Loader2 
} from "lucide-react";
import { db, COLLECTIONS } from "@/firebaseConfig"; // Import Firestore instance and collections
import { doc, getDoc } from "firebase/firestore";

// Define the structure for company information (from companyInfo doc)
interface CompanyInfo {
  address: string;
  telephone: string;
  email: string;
  workingHours: string;
}

// Define the structure for website settings (from websiteConfig doc)
interface WebsiteSettingsData {
  siteTitle: string; // Though not used here, defining for consistency
  siteDescription: string;
  faceAccount: string;
  instagramAccount: string;
  xAccount: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettingsData | null>(null);
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [isLoadingWebsite, setIsLoadingWebsite] = useState(true);

  // Fetch Company Info
  const fetchCompanyInfo = useCallback(async () => {
    setIsLoadingCompany(true);
    const companyInfoRef = doc(db, COLLECTIONS.SETTINGS, "companyInfo");
    try {
      const docSnap = await getDoc(companyInfoRef);
      if (docSnap.exists()) {
        setCompanyInfo(docSnap.data() as CompanyInfo);
      } else {
        console.warn("No company info document found in Firestore for Footer.");
        setCompanyInfo({ 
          address: "Adres bilgisi yok", 
          telephone: "Telefon bilgisi yok", 
          email: "Email bilgisi yok", 
          workingHours: "Çalışma saati bilgisi yok"
         });
      }
    } catch (error) {
      console.error("Error fetching company info for Footer:", error);
      setCompanyInfo({ 
          address: "Adres yüklenemedi", 
          telephone: "Telefon yüklenemedi", 
          email: "Email yüklenemedi", 
          workingHours: "Çalışma saati yüklenemedi"
         });
    } finally {
      setIsLoadingCompany(false);
    }
  }, []);

  // Fetch Website Settings (for description and social links)
  const fetchWebsiteSettings = useCallback(async () => {
    setIsLoadingWebsite(true);
    const websiteSettingsRef = doc(db, COLLECTIONS.SETTINGS, "websiteConfig");
    try {
      const docSnap = await getDoc(websiteSettingsRef);
      if (docSnap.exists()) {
        setWebsiteSettings(docSnap.data() as WebsiteSettingsData);
      } else {
        console.warn("No website settings document found in Firestore for Footer.");
        setWebsiteSettings({
          siteTitle: "", // Default empty
          siteDescription: "Açıklama bilgisi bulunamadı.",
          faceAccount: "",
          instagramAccount: "",
          xAccount: "",
        });
      }
    } catch (error) {
      console.error("Error fetching website settings for Footer:", error);
       setWebsiteSettings({
          siteTitle: "", // Default empty
          siteDescription: "Açıklama yüklenemedi.",
          faceAccount: "",
          instagramAccount: "",
          xAccount: "",
        });
    } finally {
      setIsLoadingWebsite(false);
    }
  }, []);

  // Fetch both data sets on component mount
  useEffect(() => {
    fetchCompanyInfo();
    fetchWebsiteSettings();
  }, [fetchCompanyInfo, fetchWebsiteSettings]);

  // Helper to check if a URL is valid (basic check)
  const isValidUrl = (url: string | undefined): boolean => {
    return !!url && (url.startsWith('http://') || url.startsWith('https://'));
  }

  return (
    <footer className="bg-theme-dark-blue text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info & Socials */}
          <div>
            <h3 className="text-xl font-bold mb-4">ZEN YAPI ANTALYA</h3>
            {isLoadingWebsite ? (
              <div className="space-y-2">
                 <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                 <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
                 <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-gray-300 mb-4">
                {websiteSettings?.siteDescription || "Açıklama bulunamadı."}
              </p>
            )}

            <div className="flex space-x-3 mt-4">
              {isLoadingWebsite ? (
                 <div className="flex space-x-3">
                   <div className="h-5 w-5 bg-gray-700 rounded-full animate-pulse"></div>
                   <div className="h-5 w-5 bg-gray-700 rounded-full animate-pulse"></div>
                   <div className="h-5 w-5 bg-gray-700 rounded-full animate-pulse"></div>
                 </div>
              ) : (
                <>
                  {isValidUrl(websiteSettings?.faceAccount) && (
                    <a 
                      href={websiteSettings.faceAccount} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-theme-teal transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                  )}
                  {isValidUrl(websiteSettings?.instagramAccount) && (
                    <a 
                      href={websiteSettings.instagramAccount} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-theme-teal transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {isValidUrl(websiteSettings?.xAccount) && (
                     <a 
                      href={websiteSettings.xAccount} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-300 hover:text-theme-teal transition-colors"
                      aria-label="X (Twitter)"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Links - Unchanged */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
               <li><Link to="/" className="text-gray-300 hover:text-theme-teal transition-colors">Ana Sayfa</Link></li>
               <li><Link to="/about" className="text-gray-300 hover:text-theme-teal transition-colors">Hakkımızda</Link></li>
               <li><Link to="/services" className="text-gray-300 hover:text-theme-teal transition-colors">Hizmetlerimiz</Link></li>
               <li><Link to="/projects" className="text-gray-300 hover:text-theme-teal transition-colors">Projeler</Link></li>
               <li><Link to="/faq" className="text-gray-300 hover:text-theme-teal transition-colors">Sıkça Sorulanlar</Link></li>
               <li><Link to="/contact" className="text-gray-300 hover:text-theme-teal transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Hizmetlerimiz Placeholder - Unchanged */}
          <div>
            {/* Optional: Add dynamic service links here if needed */}
          </div>

          {/* Contact Info - Now Dynamic (Based on companyInfo) */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            {isLoadingCompany ? (
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 bg-gray-700 rounded shrink-0 animate-pulse mt-0.5"></div>
                  <div className="h-5 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
                 <div className="flex items-center space-x-2">
                   <div className="h-5 w-5 bg-gray-700 rounded shrink-0 animate-pulse"></div>
                   <div className="h-5 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                 </div>
                 <div className="flex items-center space-x-2">
                   <div className="h-5 w-5 bg-gray-700 rounded shrink-0 animate-pulse"></div>
                   <div className="h-5 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                 </div>
                 <div className="flex items-start space-x-2">
                   <div className="h-5 w-5 bg-gray-700 rounded shrink-0 animate-pulse mt-0.5"></div>
                   <div className="h-5 bg-gray-700 rounded w-3/5 animate-pulse"></div>
                 </div>
              </div>
            ) : companyInfo ? (
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-theme-teal shrink-0 mt-0.5" />
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

      {/* Bottom Footer - Unchanged */}
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
