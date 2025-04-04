
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import StatsCounter from "@/components/StatsCounter";
import Accordion from "@/components/Accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Users, Award, Tool } from "lucide-react";

const HomePage = () => {
  const services = [
    {
      title: "Cam Balkon",
      description: "Balkonunuzu dört mevsim kullanılabilir bir alana çeviriyoruz. Farklı sistemler ve özel çözümlerle ihtiyacınıza en uygun cam balkon sistemini sunuyoruz.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhbGNvbnl8ZW58MHx8MHx8fDA%3D",
      link: "/services"
    },
    {
      title: "Isıcamlı PVC Pencere",
      description: "Yüksek ısı ve ses yalıtımı sağlayan, estetik ve dayanıklı ısıcamlı PVC pencere sistemleri ile evinizde konfor ve tasarruf sunuyoruz.",
      image: "https://images.unsplash.com/photo-1600573472556-e636c2acda88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdpbmRvd3N8ZW58MHx8MHx8fDA%3D",
      link: "/services"
    },
    {
      title: "Ofis Cam Bölmesi",
      description: "Modern ofis alanları için şık ve fonksiyonel cam bölme sistemleri. Aydınlık, ferah ve profesyonel çalışma alanları için ideal çözümler.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmaWNlJTIwZ2xhc3N8ZW58MHx8MHx8fDA%3D",
      link: "/services"
    }
  ];

  const faqItems = [
    {
      title: "Cam balkon sistemleri hangi ortalama ömrü var?",
      content: "Kaliteli malzemelerle üretilen ve doğru monte edilen cam balkon sistemleri 15-20 yıl sorunsuz kullanılabilir. Düzenli bakım ve temizlik yapıldığında bu süre daha da uzayabilir."
    },
    {
      title: "Cam balkon sistemleri nasıl temizlenir?",
      content: "Cam balkon sistemleri temizliği için ılık sabunlu su ve yumuşak bez kullanılabilir. Aşındırıcı kimyasallardan ve sert temizlik malzemelerinden kaçınılmalıdır. Profiller için özel alüminyum temizleyicileri tercih edilebilir."
    },
    {
      title: "Kışın cam balkon içi neden buğulanıyor?",
      content: "Buğulanma, iç ve dış ortam arasındaki sıcaklık farkından kaynaklanır. Yoğuşmanın önüne geçmek için ısı yalıtımlı cam sistemleri tercih edilebilir veya düzenli havalandırma yapılabilir."
    },
    {
      title: "Cam balkon sistemlerinde hangi cam türleri kullanılabilir?",
      content: "Cam balkon sistemlerinde genellikle 8mm temperli cam kullanılır. İstenirse lamine cam, ısı cam veya farklı özellikli cam türleri de tercih edilebilir. Güvenlik ve dayanıklılık için temperli cam önerilmektedir."
    }
  ];

  return (
    <Layout>
      <Hero
        title="İşimizi Severek Yapıyoruz"
        subtitle="Profesyonel hizmet anlayışımız, kaliteli ürünlerimiz ve deneyimli ekibimiz ile Antalya'nın lider cam balkon firmasıyız."
        buttonText="İletişime Geçin"
        buttonLink="/contact"
      />

      {/* Company Profile Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Cam Balkon Antalya Binası"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-theme-teal text-white py-4 px-6 rounded-lg shadow-lg hidden md:block">
                  <p className="text-lg font-bold">13+ Yıllık Tecrübe</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="section-title">Firma Profilimiz</h2>
              <h3 className="text-xl md:text-2xl font-semibold text-theme-blue mb-4">
                Antalya'nın En Güvenilir Cam Balkon ve PVC Pencere Firması
              </h3>
              <p className="text-gray-600 mb-6">
                2009 yılından bu yana Antalya ve çevresinde hizmet veren firmamız, cam balkon, PVC pencere ve kapı sistemleri, ofis bölme, sineklik ve panjur sistemleri gibi geniş bir ürün yelpazesi sunmaktadır.
              </p>
              <p className="text-gray-600 mb-6">
                Müşteri memnuniyetini ön planda tutan anlayışımız, kaliteli malzemeler ve ustalıkla gerçekleştirilen montaj hizmetlerimiz ile binlerce müşterimizin güvenini kazandık.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Kaliteli Ürünler</h4>
                    <p className="text-sm text-gray-500">En iyi malzemeler, uzun ömürlü çözümler</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Profesyonel Ekip</h4>
                    <p className="text-sm text-gray-500">Deneyimli ustalar ve teknik kadro</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Hızlı Teslimat</h4>
                    <p className="text-sm text-gray-500">Zamanında ve sorunsuz montaj</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-theme-teal/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-theme-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-theme-blue">Garanti</h4>
                    <p className="text-sm text-gray-500">Tüm ürünlerde 2 yıl garanti</p>
                  </div>
                </div>
              </div>
              
              <Link to="/about">
                <Button className="bg-theme-teal hover:bg-theme-teal/90 flex items-center">
                  Daha Fazla Bilgi
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Neden Biz?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Antalya'nın en çok tercih edilen cam balkon ve PVC firması olmamızın arkasındaki nedenler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-theme-teal/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <Users className="h-8 w-8 text-theme-teal" />
              </div>
              <h3 className="text-xl font-bold text-theme-blue mb-3">Zamanında Teslimat</h3>
              <p className="text-gray-600">
                Projenizi belirlenen sürede tamamlar, sizi bekletmeyiz. Teslimat tarihlerimize sadık kalır, planlarınızın aksamasını önleriz.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-theme-teal/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <Award className="h-8 w-8 text-theme-teal" />
              </div>
              <h3 className="text-xl font-bold text-theme-blue mb-3">Avrupa Standartları Üretim</h3>
              <p className="text-gray-600">
                Üretim süreçlerimizde Avrupa standartlarını takip eder, uluslararası kalite kriterlerine uygun ürünler sunarız.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-theme-teal/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <Tool className="h-8 w-8 text-theme-teal" />
              </div>
              <h3 className="text-xl font-bold text-theme-blue mb-3">Ücretsiz Teknik Keşif</h3>
              <p className="text-gray-600">
                Uzman ekibimiz projeleriniz için ücretsiz keşif hizmeti sunar. İhtiyacınıza en uygun çözümler için doğru ölçüm ve planlama yaparız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Hizmet Alanlarımız</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kaliteli ürünler ve profesyonel montaj hizmetleri ile yaşam alanlarınıza değer katıyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="bg-theme-teal hover:bg-theme-teal/90">
                Tüm Hizmetlerimiz
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cam balkon sistemleri hakkında merak ettiğiniz soruların cevapları
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
            
            <div className="text-center mt-12">
              <Link to="/faq">
                <Button variant="outline" className="border-theme-teal text-theme-teal hover:bg-theme-teal hover:text-white">
                  Daha Fazla Soru
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-theme-blue text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Bize Ulaşın</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Cam balkon, PVC pencere ve diğer hizmetlerimiz hakkında detaylı bilgi almak veya ücretsiz keşif için hemen iletişime geçin.
            </p>
            <Link to="/contact">
              <Button className="bg-theme-teal hover:bg-theme-teal/90 text-white px-8 py-2.5 text-lg">
                İletişim
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
