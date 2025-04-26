import { useState, useEffect, FormEvent, useRef } from "react"; // Added useRef
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import emailjs from 'emailjs-com'; // Import emailjs

// Interface for company info remains the same
interface CompanyInfo {
  address: string;
  telephone: string;
  telephone2?: string;
  email: string;
  workingHours: string;
}

const ContactPage = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null); // Ref for the form element
  const [formData, setFormData] = useState({
    // Keep state for controlled inputs if desired, but EmailJS can also read directly from form
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [infoLoading, setInfoLoading] = useState(true);

  // Get EmailJS credentials from .env
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Fetch company info (no changes needed here)
  useEffect(() => {
    const fetchData = async () => {
      setInfoLoading(true);
      const companyInfoRef = doc(db, "settings", "companyInfo");
      try {
        const docSnap = await getDoc(companyInfoRef);
        if (docSnap.exists()) {
          setCompanyInfo(docSnap.data() as CompanyInfo);
        } else {
          console.log("No company info document found in Firestore for Contact Page.");
          setCompanyInfo({
            address: "Adres bilgisi bulunamadı",
            telephone: "Telefon bilgisi bulunamadı",
            telephone2: "",
            email: "Email bilgisi bulunamadı",
            workingHours: "Çalışma saati bilgisi bulunamadı"
           });
        }
      } catch (error) {
        console.error("Error fetching company info for Contact Page:", error);
         setCompanyInfo({
            address: "Adres yüklenemedi",
            telephone: "Telefon yüklenemedi",
            telephone2: "",
            email: "Email yüklenemedi",
            workingHours: "Çalışma saati yüklenemedi"
           });
      } finally {
        setInfoLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle input changes (needed for controlled inputs)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Updated handleSubmit function using EmailJS
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if environment variables are set
    if (!serviceID || !templateID || !publicKey) {
        console.error("EmailJS environment variables are not set!");
        toast({
            title: "Yapılandırma Hatası",
            description: "E-posta gönderme hizmeti şu anda yapılandırılmamış.",
            variant: "destructive",
        });
        setIsSubmitting(false);
        return;
    }

    // Basic validation 
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        toast({
            title: "Eksik Alanlar",
            description: "Lütfen tüm zorunlu alanları (*) doldurun.",
            variant: "destructive"
        });
        setIsSubmitting(false);
        return;
    }

    // --- Sending with EmailJS --- 
    // EmailJS uses the `name` attribute of the form fields. Ensure they match your template variables.
    // It needs the actual form element, which we get from the ref.
    if (formRef.current) {
        emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
            .then((result) => {
                console.log('EmailJS Success:', result.text);
                toast({
                    title: "Mesajınız Gönderildi!",
                    description: "En kısa sürede size geri dönüş yapacağız.",
                });
                // Clear the form using state
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                // Optionally reset the form element itself if not fully controlled
                // formRef.current?.reset(); 
            }, (error) => {
                console.error('EmailJS Error:', error.text);
                toast({
                    title: "Gönderme Hatası",
                    description: `Mesajınız gönderilemedi. Lütfen tekrar deneyin. (Hata: ${error.text})`,
                    variant: "destructive",
                });
            })
            .finally(() => {
                setIsSubmitting(false); // Re-enable button regardless of outcome
            });
    } else {
         console.error("Form reference is not available");
         toast({
            title: "Form Hatası",
            description: "Form gönderilemiyor, lütfen sayfayı yenileyin.",
            variant: "destructive",
        });
         setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Hero
        title="İletişim"
        subtitle="Sorularınız veya projeleriniz için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız."
        image="https://res.cloudinary.com/drxariwwg/image/upload/v1745411181/onkjhz6klv6zkyevtftk.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="section-title mb-8">Bize Ulaşın</h2>
              {/* Add ref to the form element */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Ensure input 'name' attributes match EmailJS template variables */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Adınız Soyadınız*
                    </label>
                    {/* Use 'name' attribute matching template, e.g., 'user_name' or just 'name' */}
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta Adresiniz*
                    </label>
                    {/* Use 'name' attribute 'email' or 'user_email' */}
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon Numaranız*
                    </label>
                    {/* Use 'name' attribute 'phone' */}
                    <Input id="phone" name="phone" placeholder="Örnek: 555 555 55 55" value={formData.phone} onChange={handleChange} required className="w-full" />
                  </div>
                   <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Konu
                    </label>
                    {/* Use 'name' attribute 'subject' */}
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesajınız*
                  </label>
                  {/* Use 'name' attribute 'message' */}
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-theme-teal hover:bg-theme-teal/90 text-white px-8 py-2 text-base min-w-[120px]">
                  {isSubmitting ? 
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Gönderiliyor...</> 
                    : "Gönder"
                  }
                </Button>
              </form>
            </div>
            
            {/* Contact Info - No changes needed here */}
            <div className="lg:col-span-1">
             <h2 className="section-title mb-8">İletişim Bilgilerimiz</h2>
             {infoLoading ? (
                 <div className="space-y-6">
                  {[...Array(5)].map((_, i) => ( 
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
                  <div className="flex items-start">
                    <div className="bg-theme-teal/10 p-3 rounded-full mr-4 shrink-0">
                      <MapPin className="h-6 w-6 text-theme-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-theme-blue text-lg mb-1">Adres</h3>
                      <p className="text-gray-600">
                        {companyInfo.address || "Adres belirtilmemiş"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-theme-teal/10 p-3 rounded-full mr-4 shrink-0">
                      <Phone className="h-6 w-6 text-theme-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-theme-blue text-lg mb-1">Telefon</h3>
                      {companyInfo.telephone && (
                        <p className="text-gray-600">
                          <a href={`tel:${companyInfo.telephone.replace(/\s/g, '')}`} className="hover:text-theme-teal transition-colors">
                            {companyInfo.telephone}
                          </a>
                        </p>
                      )}
                      {companyInfo.telephone2 && (
                        <p className="text-gray-600 mt-1">
                          <a href={`tel:${companyInfo.telephone2.replace(/\s/g, '')}`} className="hover:text-theme-teal transition-colors">
                            {companyInfo.telephone2}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-theme-teal/10 p-3 rounded-full mr-4 shrink-0">
                      <Mail className="h-6 w-6 text-theme-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-theme-blue text-lg mb-1">E-posta</h3>
                      <p className="text-gray-600">
                        <a href={`mailto:${companyInfo.email}`} className="hover:text-theme-teal transition-colors">
                          {companyInfo.email || "E-posta belirtilmemiş"}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-theme-teal/10 p-3 rounded-full mr-4 shrink-0">
                      <Clock className="h-6 w-6 text-theme-teal" />
                    </div>
                    <div>
                      <h3 className="font-medium text-theme-blue text-lg mb-1">Çalışma Saatleri</h3>
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
      </section> 

      {/* Map Section - No changes needed here */}
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
      </section> 
    </Layout> 
  );
};

export default ContactPage;
