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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import Dialog components

// Updated interface to include telephone2
interface CompanyInfo {
  address: string;
  telephone: string;
  telephone2?: string; // Optional second phone number
  email: string;
  workingHours: string;
}

// Define the structure for website settings (from websiteConfig doc)
interface WebsiteSettingsData {
  siteTitle: string;
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
  
  // State for dialog visibility
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);

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
          telephone2: "", // Default to empty
          email: "Email bilgisi yok", 
          workingHours: "Çalışma saati bilgisi yok"
         });
      }
    } catch (error) {
      console.error("Error fetching company info for Footer:", error);
      setCompanyInfo({ 
          address: "Adres yüklenemedi", 
          telephone: "Telefon yüklenemedi", 
          telephone2: "", // Default to empty
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

  // Placeholder Content (Replace with actual legal text)
  const privacyPolicyText = `
**Gizlilik Politikası**

**Son Güncelleme: 2025**

Zen Yapı Antalya olarak, web sitemizi ziyaret edenlerin gizliliğine önem veriyoruz. Bu gizlilik politikası, kişisel verilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklamaktadır.

**Topladığımız Kişisel Veriler**

Web sitemiz aracılığıyla, iletişim formları, teklif talepleri veya diğer etkileşimler sırasında adınız, e-posta adresiniz, telefon numaranız ve mesaj içeriğiniz gibi kişisel bilgilerinizi toplayabiliriz.

**Kişisel Verilerinizi Nasıl Kullanırız?**

Topladığımız kişisel verileri aşağıdaki amaçlarla kullanırız:

*   Taleplerinize yanıt vermek ve size hizmet sunmak.
*   Sizinle iletişim kurmak.
*   Web sitemizi ve hizmetlerimizi iyileştirmek.
*   Yasal yükümlülüklerimizi yerine getirmek.

**Kişisel Veri Güvenliği**

Kişisel verilerinizin güvenliğini sağlamak için uygun fiziksel, elektronik ve yönetimsel prosedürleri uygulamaktayız.

**Çerezler (Cookies)**

Web sitemiz, kullanıcı deneyimini geliştirmek amacıyla çerezler kullanabilir. Çerezler hakkında daha fazla bilgi için Çerez Politikamızı inceleyebilirsiniz (eğer ayrı bir politikanız varsa).

**Üçüncü Taraf Bağlantıları**

Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik uygulamalarından sorumlu değiliz. Ziyaret ettiğiniz her sitenin gizlilik politikasını incelemenizi öneririz.

**Değişiklikler**

Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Güncellemeler bu sayfada yayınlanacaktır.

**İletişim**

Gizlilik politikamız hakkında sorularınız varsa, lütfen iletişim sayfamızdan bize ulaşın.

`;

  const termsOfServiceText = `
**Kullanım Şartları**

**Son Güncelleme: 2025**

Zen Yapı Antalya web sitesini kullanarak bu kullanım şartlarını kabul etmiş sayılırsınız. Lütfen dikkatlice okuyunuz.

**Web Sitesinin Kullanımı**

Web sitemizi yalnızca yasal amaçlarla ve bu şartlara uygun olarak kullanabilirsiniz. Web sitemizi aşağıdaki şekillerde kullanmamayı kabul ediyorsunuz:

*   Herhangi bir yasa veya yönetmeliği ihlal eden bir şekilde.
*   Başka birinin kişisel bilgilerini toplamak veya saklamak amacıyla.
*   Web sitesinin işleyişine müdahale eden, zarar veren veya bozan herhangi bir faaliyette bulunmak.

**Fikri Mülkiyet Hakları**

Web sitesindeki tüm içerik (metin, grafikler, logolar, görseller vb.) Zen Yapı Antalya'ya aittir ve telif hakları yasaları ile korunmaktadır. İçeriğin izinsiz kullanımı yasaktır.

**Sorumluluk Reddi**

Web sitemiz "olduğu gibi" sunulmaktadır. Web sitesinin kesintisiz, hatasız veya güvenli olacağına dair herhangi bir garanti vermemekteyiz. Web sitesini kullanımınızdan doğacak riskler size aittir.

**Bağlantılar**

Web sitemiz üçüncü taraf sitelerine bağlantılar içerebilir. Bu sitelerin içeriğinden veya uygulamalarından sorumlu değiliz.

**Şartların Değişikliği**

Bu kullanım şartlarını dilediğimiz zaman değiştirme hakkını saklı tutarız. Değişiklikler web sitesinde yayınlandığında yürürlüğe girer.

**Geçerli Hukuk**

Bu şartlar Türkiye Cumhuriyeti yasalarına tabidir.

**İletişim**

Bu kullanım şartları hakkında sorularınız varsa, lütfen iletişim sayfamızdan bize ulaşın.
`;

  return (
    <footer className="bg-theme-dark-blue text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info & Socials */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Zen Yapı Antalya Logo"
                className="h-12 w-auto rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  ZEN YAPI ANTALYA
                </span>
                <div className="w-full h-[1px] bg-white my-0.5"></div>
                <span className="text-sm font-medium text-white text-center">
                  Cam Balkon
                </span>
              </div>
            </div>
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

          {/* Contact Info - Updated to include telephone2 */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            {isLoadingCompany ? (
              <div className="space-y-3">
                {/* Skeleton loaders */}
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
                  <div className="h-5 bg-gray-700 rounded w-1/2 animate-pulse"></div> {/* Added for phone 2 */} 
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
                    {companyInfo.address || "Adres belirtilmemiş"}
                  </span>
                </li>
                {/* Display first telephone number */}
                {companyInfo.telephone && (
                  <li className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-theme-teal" />
                    <a href={`tel:${companyInfo.telephone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-theme-teal transition-colors">
                      {companyInfo.telephone}
                    </a>
                  </li>
                )}
                 {/* Conditionally display second telephone number */}
                {companyInfo.telephone2 && (
                  <li className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-theme-teal" />
                    <a href={`tel:${companyInfo.telephone2.replace(/\s/g, '')}`} className="text-gray-300 hover:text-theme-teal transition-colors">
                      {companyInfo.telephone2}
                    </a>
                  </li>
                )}
                <li className="flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-theme-teal" />
                  <a href={`mailto:${companyInfo.email}`} className="text-gray-300 hover:text-theme-teal transition-colors">
                    {companyInfo.email || "E-posta belirtilmemiş"}
                  </a>
                </li>
                <li className="flex items-start">
                  <Clock className="mr-2 h-5 w-5 text-theme-teal shrink-0 mt-0.5" />
                  <span className="text-gray-300">
                    {companyInfo.workingHours || "Çalışma saatleri belirtilmemiş"}
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
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm">
            {/* Privacy Policy Dialog Trigger */}
            <Dialog open={isPrivacyPolicyOpen} onOpenChange={setIsPrivacyPolicyOpen}>
              <DialogTrigger asChild>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    setIsPrivacyPolicyOpen(true);
                  }}
                  className="text-gray-400 hover:text-theme-teal transition-colors cursor-pointer"
                >
                  Gizlilik Politikası
                </button>
              </DialogTrigger>
              {/* Adjusted DialogContent for better scrolling and appearance */}
              <DialogContent className="max-w-lg md:max-w-3xl h-[80vh] overflow-hidden p-6 flex flex-col"> {/* Fixed height, overflow-hidden, flex flex-col */}
                <DialogHeader className="flex-shrink-0 pb-4"> {/* Prevent header from shrinking */}
                  <DialogTitle className="text-xl font-bold text-theme-blue">Gizlilik Politikası</DialogTitle>
                </DialogHeader>
                 {/* Scrollable Description */}
                <DialogDescription className="text-gray-700 whitespace-pre-wrap text-sm flex-1 overflow-y-auto pr-2"> {/* flex-1 and overflow-y-auto for scrolling */}
                    {privacyPolicyText}
                </DialogDescription>
              </DialogContent>
            </Dialog>

            <span className="mx-1 text-gray-600">|</span> 

            {/* Terms of Service Dialog Trigger */}
            <Dialog open={isTermsOfServiceOpen} onOpenChange={setIsTermsOfServiceOpen}>
              <DialogTrigger asChild>
                 <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    setIsTermsOfServiceOpen(true);
                  }}
                  className="text-gray-400 hover:text-theme-teal transition-colors cursor-pointer"
                >
                  Kullanım Şartları
                </button>
              </DialogTrigger>
               {/* Adjusted DialogContent for better scrolling and appearance */}
               <DialogContent className="max-w-lg md:max-w-3xl h-[80vh] overflow-hidden p-6 flex flex-col"> {/* Fixed height, overflow-hidden, flex flex-col */}
                <DialogHeader className="flex-shrink-0 pb-4"> {/* Prevent header from shrinking */}
                  <DialogTitle className="text-xl font-bold text-theme-blue">Kullanım Şartları</DialogTitle>
                </DialogHeader>
                 {/* Scrollable Description */}
                <DialogDescription className="text-gray-700 whitespace-pre-wrap text-sm flex-1 overflow-y-auto pr-2"> {/* flex-1 and overflow-y-auto for scrolling */}
                    {termsOfServiceText}
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
