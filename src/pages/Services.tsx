import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import AntalyaMap from "@/components/AntalyaMap";
import { Check, MapPin } from "lucide-react";

const ServicesPage = () => {
  const services = [
    {
      title: "Cam Balkon",
      description: "Balkonunuzu dört mevsim kullanılabilir bir alana çeviriyoruz. Farklı sistemler ve özel çözümlerle ihtiyacınıza en uygun cam balkon sistemini sunuyoruz.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon"
    },
    {
      title: "Isıcamlı PVC Pencere",
      description: "Yüksek ısı ve ses yalıtımı sağlayan, estetik ve dayanıklı ısıcamlı PVC pencere sistemleri ile evinizde konfor ve tasarruf sunuyoruz.",
      image: "https://images.unsplash.com/photo-1600573472556-e636c2acda88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdpbmRvd3N8ZW58MHx8MHx8fDA%3D",
      link: "/services#pvc-pencere"
    },
    {
      title: "Ofis Cam Bölmesi",
      description: "Modern ofis alanları için şık ve fonksiyonel cam bölme sistemleri. Aydınlık, ferah ve profesyonel çalışma alanları için ideal çözümler.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmaWNlJTIwZ2xhc3N8ZW58MHx8MHx8fDA%3D",
      link: "/services#ofis-cam-bolme"
    },
    {
      title: "Cam Balkon Perdesi",
      description: "Cam balkonlarınız için özel tasarlanmış, kullanımı kolay ve estetik perde sistemleri. Güneş kontrolü ve mahremiyet için ideal çözümler.",
      image: "https://images.unsplash.com/photo-1617806501736-233297eb1aa0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VydGFpbnN8ZW58MHx8MHx8fDA%3D",
      link: "/services#cam-balkon-perde"
    },
    {
      title: "Sineklik",
      description: "Yaz aylarında böcek ve sineklerden korunmanızı sağlayan, pencere ve kapılarınıza uygun çeşitli sineklik modelleri. Pileli, menteşeli ve sürgülü seçenekler.",
      image: "https://images.unsplash.com/photo-1592305245698-894655947413?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2luZG93JTIwc2NyZWVufGVufDB8fDB8fHww",
      link: "/services#sineklik"
    },
    {
      title: "Panjur Sistemleri",
      description: "Güneş kontrolü, ısı yalıtımı ve güvenlik için modern panjur sistemleri. Manuel veya motorlu seçeneklerle konfor ve kontrol sizin elinizde.",
      image: "https://images.unsplash.com/photo-1616788045717-56116e22e1df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2h1dHRlcnN8ZW58MHx8MHx8fDA%3D",
      link: "/services#panjur"
    },
    {
      title: "Alüminyum Doğrama",
      description: "Dayanıklı ve estetik alüminyum doğrama sistemleri ile kapı, pencere ve cephe uygulamaları. Yüksek kalite ve uzun ömürlü çözümler.",
      image: "https://images.unsplash.com/photo-1638775686635-81b008239d5b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFsdW1pbnVtJTIwZG9vcnxlbnwwfHwwfHx8MA%3D%3D",
      link: "/services#aluminyum-dograma"
    },
    {
      title: "Kış Bahçesi",
      description: "Evinize ekstra yaşam alanı katan, dört mevsim kullanılabilen şık ve konforlu kış bahçesi sistemleri. Özel tasarım ve profesyonel uygulama.",
      image: "https://images.unsplash.com/photo-1584280795027-75b0facfc969?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ludGVyJTIwZ2FyZGVufGVufDB8fDB8fHww",
      link: "/services#kis-bahcesi"
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Details - Cam Balkon */}
      <section id="cam-balkon" className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Cam Balkon</h2>
              <p className="text-gray-600 mb-6">
                Balkonlarınızı dört mevsim kullanılabilir bir alana çeviren cam balkon sistemleri, hem fonksiyonel hem de estetik çözümler sunar. Katlanır, sürme veya sabit cam balkon sistemleri arasından ihtiyacınıza en uygun olanı seçebilirsiniz.
              </p>
              <p className="text-gray-600 mb-6">
                8mm temperli cam kullanarak üretilen sistemlerimiz, güvenli ve dayanıklıdır. Alüminyum profiller farklı renk seçenekleriyle evinizin stiline uyum sağlar.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Katlanır Cam Balkon</h4>
                    <p className="text-sm text-gray-500">Tam açılım sağlayan sistemler</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Sürme Cam Balkon</h4>
                    <p className="text-sm text-gray-500">Alan tasarrufu sağlayan sistemler</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Isıcamlı Sistemler</h4>
                    <p className="text-sm text-gray-500">Yüksek ısı yalıtımı sağlayan sistemler</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Özel Tasarımlar</h4>
                    <p className="text-sm text-gray-500">İhtiyaca göre özel çözümler</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1616096233461-373515df79aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Cam Balkon Sistemi"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details - PVC Pencere */}
      <section id="pvc-pencere" className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="PVC Pencere Sistemi"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title">Isıcamlı PVC Pencere</h2>
              <p className="text-gray-600 mb-6">
                Modern PVC pencere sistemleri, üstün ısı ve ses yalıtımı özellikleri ile enerji tasarrufu sağlar ve yaşam konforunuzu artırır. Çift cam veya üç cam seçenekleriyle farklı iklim koşullarına uygun çözümler sunuyoruz.
              </p>
              <p className="text-gray-600 mb-6">
                UV ışınlarına dayanıklı, solmayan ve çürümeyen PVC profiller, uzun yıllar boyunca ilk günkü görünümünü korur. Farklı renk ve desen seçenekleri ile evinizin tarzına uyum sağlar.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Yüksek Isı Yalıtımı</h4>
                    <p className="text-sm text-gray-500">Enerji tasarrufu sağlar</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Ses Yalıtımı</h4>
                    <p className="text-sm text-gray-500">Dış gürültüyü minimize eder</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Dayanıklılık</h4>
                    <p className="text-sm text-gray-500">Uzun ömürlü ve bakım gerektirmez</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Farklı Açılım Seçenekleri</h4>
                    <p className="text-sm text-gray-500">Vasistas, çift açılım, sürme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Continue with other services in similar pattern... */}
    </Layout>
  );
};

export default ServicesPage;
