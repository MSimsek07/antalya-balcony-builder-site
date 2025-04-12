import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Check, MapPin } from "lucide-react";
import AntalyaMap from "@/components/AntalyaMap";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
  detailedDescription?: string;
  features?: { title: string; description: string }[];
}

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      title: "Cam Balkon",
      description: "Balkonlarınızı dört mevsim kullanılabilir bir yaşam alanına dönüştürün. Yüksek kaliteli cam balkon sistemleri ile konfor ve estetik bir arada.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon",
      detailedDescription: "Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. 8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.",
      features: [
        { title: "Katlanır Cam Balkon", description: "Tam açılım sağlayan sistemler" },
        { title: "Sürme Cam Balkon", description: "Alan tasarrufu sağlayan sistemler" },
        { title: "Isıcamlı Sistemler", description: "Yüksek ısı yalıtımı sağlayan sistemler" },
        { title: "Özel Tasarımlar", description: "İhtiyaca göre özel çözümler" }
      ]
    },
    {
      title: "Cam Balkon Perde",
      description: "Cam balkonlarınız için özel tasarlanmış, kullanımı kolay ve estetik perde sistemleri. Güneş kontrolü ve mahremiyet için ideal çözümler.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon",
      detailedDescription: "Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. 8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.",
      features: [
        { title: "Katlanır Cam Balkon", description: "Tam açılım sağlayan sistemler" },
        { title: "Sürme Cam Balkon", description: "Alan tasarrufu sağlayan sistemler" },
        { title: "Isıcamlı Sistemler", description: "Yüksek ısı yalıtımı sağlayan sistemler" },
        { title: "Özel Tasarımlar", description: "İhtiyaca göre özel çözümler" }
      ]
    },
    {
      title: "Isıcamlı PVC Pencere",
      description: "Yüksek ısı ve ses yalıtımı sağlayan, estetik ve dayanıklı ısıcamlı PVC pencere sistemleri ile evinizde konfor ve tasarruf sunuyoruz.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon",
      detailedDescription: "Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. 8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.",
      features: [
        { title: "Katlanır Cam Balkon", description: "Tam açılım sağlayan sistemler" },
        { title: "Sürme Cam Balkon", description: "Alan tasarrufu sağlayan sistemler" },
        { title: "Isıcamlı Sistemler", description: "Yüksek ısı yalıtımı sağlayan sistemler" },
        { title: "Özel Tasarımlar", description: "İhtiyaca göre özel çözümler" }
      ]
    },
    {
      title: "Ofis Cam Bölmesi",
      description: "Modern ofis alanları için şık ve fonksiyonel cam bölme sistemleri. Aydınlık, ferah ve profesyonel çalışma alanları için ideal çözümler.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon",
      detailedDescription: "Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. 8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.",
      features: [
        { title: "Katlanır Cam Balkon", description: "Tam açılım sağlayan sistemler" },
        { title: "Sürme Cam Balkon", description: "Alan tasarrufu sağlayan sistemler" },
        { title: "Isıcamlı Sistemler", description: "Yüksek ısı yalıtımı sağlayan sistemler" },
        { title: "Özel Tasarımlar", description: "İhtiyaca göre özel çözümler" }
      ]
    },
    {
      title: "Sineklik",
      description: "Yaz aylarında böcek ve sineklerden korunmanızı sağlayan, pencere ve kapılarınıza uygun çeşitli sineklik modelleri. Pileli, menteşeli ve sürgülü seçenekler.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon",
      detailedDescription: "Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. 8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.",
      features: [
        { title: "Katlanır Cam Balkon", description: "Tam açılım sağlayan sistemler" },
        { title: "Sürme Cam Balkon", description: "Alan tasarrufu sağlayan sistemler" },
        { title: "Isıcamlı Sistemler", description: "Yüksek ısı yalıtımı sağlayan sistemler" },
        { title: "Özel Tasarımlar", description: "İhtiyaca göre özel çözümler" }
      ]
    },
    {
      title: "Panjur Sistemleri",
      description: "Güneş kontrolü, ısı yalıtımı ve güvenlik için modern panjur sistemleri. Manuel veya motorlu seçeneklerle konfor ve kontrol sizin elinizde.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon",
      detailedDescription: "Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. 8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.",
      features: [
        { title: "Katlanır Cam Balkon", description: "Tam açılım sağlayan sistemler" },
        { title: "Sürme Cam Balkon", description: "Alan tasarrufu sağlayan sistemler" },
        { title: "Isıcamlı Sistemler", description: "Yüksek ısı yalıtımı sağlayan sistemler" },
        { title: "Özel Tasarımlar", description: "İhtiyaca göre özel çözümler" }
      ]
    },
    {
      title: "Alüminyum Doğrama",
      description: "Dayanıklı ve estetik alüminyum doğrama sistemleri ile kapı, pencere ve cephe uygulamaları. Yüksek kalite ve uzun ömürlü çözümler.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon",
      detailedDescription: "Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. 8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.",
      features: [
        { title: "Katlanır Cam Balkon", description: "Tam açılım sağlayan sistemler" },
        { title: "Sürme Cam Balkon", description: "Alan tasarrufu sağlayan sistemler" },
        { title: "Isıcamlı Sistemler", description: "Yüksek ısı yalıtımı sağlayan sistemler" },
        { title: "Özel Tasarımlar", description: "İhtiyaca göre özel çözümler" }
      ]
    },
    {
      title: "Kış Bahçesi",
      description: "Evinize ekstra yaşam alanı katan, dört mevsim kullanılabilen şık ve konforlu kış bahçesi sistemleri. Özel tasarım ve profesyonel uygulama.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon",
      detailedDescription: "Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. 8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.",
      features: [
        { title: "Katlanır Cam Balkon", description: "Tam açılım sağlayan sistemler" },
        { title: "Sürme Cam Balkon", description: "Alan tasarrufu sağlayan sistemler" },
        { title: "Isıcamlı Sistemler", description: "Yüksek ısı yalıtımı sağlayan sistemler" },
        { title: "Özel Tasarımlar", description: "İhtiyaca göre özel çözümler" }
      ]
    }
  ];

  return (
    <Layout>
      <Hero
        title="Hizmetlerimiz"
        subtitle="Kaliteli malzemeler ve profesyonel ekibimizle Antalya'nın cam balkon ve PVC ihtiyaçlarına çözüm üretiyoruz."
        image="https://images.unsplash.com/photo-1600607687644-c7f33055a191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
      />

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Hizmet Alanlarımız</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kaliteli ürünler ve profesyonel montaj hizmetleri ile yaşam alanlarınıza değer katıyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                image={service.image}
                link={service.link}
                onDetailsClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>  
      </section>

      {/* Service Details Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-3xl">
          {selectedService && (
            <>
              <DialogHeader className="border-b pb-4">
                <DialogTitle className="text-2xl font-bold text-theme-blue">{selectedService.title}</DialogTitle>
                <DialogDescription className="text-base text-gray-600 mt-2">
                  {selectedService.detailedDescription || selectedService.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {selectedService.features && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedService.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-theme-teal/10 p-2 rounded-full shrink-0">
                          <Check className="h-5 w-5 text-theme-teal" />
                        </div>
                        <div>
                          <h4 className="font-medium text-theme-blue">{feature.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t pt-6 mt-6 flex justify-end">
                  <a 
                    href="https://api.whatsapp.com/send?phone=905454043462"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5" />
                    Teklif Al
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Service Areas Map */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Hizmet Bölgelerimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Antalya'nın tüm merkez ilçeleri ve çevre ilçelerinde profesyonel hizmet veriyoruz
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            <AntalyaMap />
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Merkez", "Kemer", "Serik", "Manavgat", "Kumluca", "Elmalı", "Korkuteli"].map((district) => (
                <div key={district} className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-theme-teal shrink-0" />
                  <span className="text-gray-600">{district}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
