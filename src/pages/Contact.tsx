
import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
    
    // Simulate form submission
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Adınız Soyadınız*
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta Adresiniz*
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon Numaranız*
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Konu
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesajınız*
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-theme-teal hover:bg-theme-teal/90 text-white px-8 py-2 text-base"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="section-title mb-8">İletişim Bilgilerimiz</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-theme-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-theme-blue text-lg mb-1">Adres</h3>
                    <p className="text-gray-600">
                      Altınkale Mahallesi, 1. Cadde, No:25, Döşemealtı, Antalya
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-theme-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-theme-blue text-lg mb-1">Telefon</h3>
                    <p className="text-gray-600">
                      <a href="tel:+902422294567" className="hover:text-theme-teal transition-colors">
                        +90 242 229 45 67
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:+905301234567" className="hover:text-theme-teal transition-colors">
                        +90 530 123 45 67
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-theme-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-theme-blue text-lg mb-1">E-posta</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@cambalkonantalya.org" className="hover:text-theme-teal transition-colors">
                        info@cambalkonantalya.org
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a href="mailto:satis@cambalkonantalya.org" className="hover:text-theme-teal transition-colors">
                        satis@cambalkonantalya.org
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-theme-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium text-theme-blue text-lg mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-600">Pazartesi - Cuma: 08:30 - 18:30</p>
                    <p className="text-gray-600">Cumartesi: 09:00 - 17:00</p>
                    <p className="text-gray-600">Pazar: Kapalı</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 pb-16">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102244.60283405908!2d30.617451592388134!3d36.91784797196078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39aaeddadadc1%3A0x95c69f73f9e32e33!2sAntalya%2C%20D%C3%B6%C5%9Femealt%C4%B1%2FAntalya!5e0!3m2!1str!2str!4v1646305789658!5m2!1str!2str"
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
