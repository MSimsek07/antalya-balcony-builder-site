import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { db } from "@/firebaseConfig"; // Import Firestore instance
import { doc, getDoc } from "firebase/firestore";

// Define the structure for company information (should match admin settings)
interface CompanyInfo {
  address: string;
  telephone: string;
  email: string;
  workingHours: string;
}

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [infoLoading, setInfoLoading] = useState(true);

  // Fetch company info from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const companyInfoRef = doc(db, "settings", "companyInfo");
      try {
        const docSnap = await getDoc(companyInfoRef);
        if (docSnap.exists()) {
          setCompanyInfo(docSnap.data() as CompanyInfo);
        } else {
          console.log("No company info document found in Firestore for Contact Page.");
          // Set default or empty values if data isn't found
          setCompanyInfo({ 
            address: "Adres bilgisi bulunamadı", 
            telephone: "Telefon bilgisi bulunamadı", 
            email: "Email bilgisi bulunamadı", 
            workingHours: "Çalışma saati bilgisi bulunamadı"
           });
        }
      } catch (error) {
        console.error("Error fetching company info for Contact Page:", error);
        // Set error values
         setCompanyInfo({ 
            address: "Adres yüklenemedi", 
            telephone: "Telefon yüklenemedi", 
            email: "Email yüklenemedi", 
            workingHours: "Çalışma saati yüklenemedi"
           });
      } finally {
        setInfoLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (Replace with actual API call if needed)
    console.log("Form Data Submitted:", formData);
    setTimeout(() => {
      toast({
        title: "Form gönderildi!",
        description: "En kısa sürede size geri dönüş yapacağız.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <Hero
        title="İletişim"
        subtitle="Sorularınız veya projeleriniz için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız."
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="section-title mb-8">Bize Ulaşın</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form inputs remain the same */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Adınız Soyadınız*
                    </label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta Adresiniz*
                    </label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon Numaranız*
                    </label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full" />
                  </div>
                   <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Konu
                    </label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesajınız*
                  </label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-theme-teal hover:bg-theme-teal/90 text-white px-8 py-2 text-base">
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            </div>
            
            {/* Contact Info - Now Dynamic */}
            <div className="lg:col-span-1">
              <h2 className="section-title mb-8">İletişim Bilgilerimiz</h2>
              {infoLoading ? (
                 <div className="space-y-6">
                  {[...Array(4)].map((_, i) => ( // Skeleton loader for 4 items
                    <div key={i} className="flex items-start">
                      <div className="bg-gray-200 p-3 rounded-full mr-4 h-12 w-12 flex items-center justify-center animate-pulse">
                         <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
                      </div>
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                 </div>
              ) : companyInfo ? (
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start">
                    <div className="bg-theme-teal/10 p-3 rounded-full mr-4 shrink-0">
                      <MapPin className="h-6 w-6 text-theme-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-theme-blue text-lg mb-1">Adres</h3>
                      <p className="text-gray-600">
                        {companyInfo.address}
                      </p>
                    </div>
                  </div>
                  
                  {/* Telephone */}
                  <div className="flex items-start">
                    <div className="bg-theme-teal/10 p-3 rounded-full mr-4 shrink-0">
                      <Phone className="h-6 w-6 text-theme-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-theme-blue text-lg mb-1">Telefon</h3>
                      <p className="text-gray-600">
                        <a href={`tel:${companyInfo.telephone.replace(/\s/g, '')}`} className="hover:text-theme-teal transition-colors">
                          {companyInfo.telephone}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-theme-teal/10 p-3 rounded-full mr-4 shrink-0">
                      <Mail className="h-6 w-6 text-theme-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-theme-blue text-lg mb-1">E-posta</h3>
                      <p className="text-gray-600">
                        <a href={`mailto:${companyInfo.email}`} className="hover:text-theme-teal transition-colors">
                          {companyInfo.email}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  {/* Working Hours - Corrected split and map */}
                  <div className="flex items-start">
                    <div className="bg-theme-teal/10 p-3 rounded-full mr-4 shrink-0">
                      <Clock className="h-6 w-6 text-theme-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-theme-blue text-lg mb-1">Çalışma Saatleri</h3>
                      {/* Check if workingHours exists before splitting */}
                      {companyInfo.workingHours && companyInfo.workingHours.split('  ').map((line, index) => (
                        <p key={index} className="text-gray-600">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                 <p className="text-gray-500">İletişim bilgileri yüklenemedi.</p>
              )}
            </div>
          </div>
        </div>
      </section> {/* Added closing tag */}

      {/* Map Section - Remains the same */}
      <section className="py-8 pb-16">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.66941557505!2d30.63650821193798!3d36.92216777209671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c38f7450b22087%3A0x812c96aee98ee421!2sAntalya%20cam%20balkon%20zen%20yap%C4%B1!5e0!3m2!1str!2str!4v1744400754687!5m2!1str!2str"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cam Balkon Antalya Harita"
            ></iframe>
          </div>
        </div>
      </section> {/* Added closing tag */} 
    </Layout> // Added closing tag
  );
};

export default ContactPage;
