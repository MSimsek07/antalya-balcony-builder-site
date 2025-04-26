import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import StatsCounter from "@/components/StatsCounter";
import Accordion from "@/components/Accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, Users, Award, Wrench, Loader2, ImageOff } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { db, COLLECTIONS } from "@/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc
} from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

// --- Interfaces ---
interface ServiceData {
  title: string;
  description: string;
  imageUrl: string;
}

interface ServiceItem extends ServiceData {
  id: string;
  link: string;
}

interface ProjectData {
    description: string;
    imageUrl: string;
}

interface ProjectItem extends ProjectData {
    id: string;
}

// Interface for Website Settings (matching WebsiteSettings.tsx)
interface WebsiteSettingsData {
  siteTitle: string;
  siteDescription: string;
  // Include other fields if needed elsewhere, but Hero only needs these two
}

const HomePage = () => {
  // const { toast } = useToast(); // Still unused
  const [homeServices, setHomeServices] = useState<ServiceItem[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [carouselProjects, setCarouselProjects] = useState<ProjectItem[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettingsData | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const navigate = useNavigate();

  // --- Data Fetching ---
  const fetchWebsiteSettings = useCallback(async () => {
    setIsLoadingSettings(true);
    const settingsDocRef = doc(db, COLLECTIONS.SETTINGS, "websiteConfig");
    try {
      const docSnap = await getDoc(settingsDocRef);
      if (docSnap.exists()) {
        setWebsiteSettings(docSnap.data() as WebsiteSettingsData);
      } else {
        console.warn("Website settings document not found in Firestore for HomePage.");
        setWebsiteSettings({ siteTitle: "Hoş Geldiniz", siteDescription: "Sitemizi ziyaret ettiğiniz için teşekkürler." }); // Fallback defaults
      }
    } catch (error) {
      console.error("Error fetching website settings for HomePage:", error);
      setWebsiteSettings({ siteTitle: "Hata", siteDescription: "Ayarlar yüklenemedi." }); // Error state defaults
    } finally {
      setIsLoadingSettings(false);
    }
  }, []);

  const fetchHomeServices = useCallback(async () => {
    setIsLoadingServices(true);
    const servicesCollectionRef = collection(db, COLLECTIONS.SERVICES);
    try {
      const q = query(servicesCollectionRef, orderBy("createdAt", "desc"), limit(3));
      const data = await getDocs(q);
      const fetchedServices = data.docs.map((doc) => {
        const serviceData = doc.data() as ServiceData;
        return {
          ...serviceData,
          id: doc.id,
          link: `/services#${doc.id}`,
        };
      });
      setHomeServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching home services:", error);
    } finally {
      setIsLoadingServices(false);
    }
  }, []);

  const fetchCarouselProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    const projectsCollectionRef = collection(db, COLLECTIONS.PROJECTS);
    try {
      const q = query(projectsCollectionRef, orderBy("createdAt", "desc"), limit(10));
      const data = await getDocs(q);
      const fetchedProjects = data.docs.map((doc) => {
        const projectData = doc.data() as ProjectData;
        return {
          ...projectData,
          id: doc.id,
        };
      });
      setCarouselProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching carousel projects:", error);
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    fetchWebsiteSettings(); // Fetch website settings
    fetchHomeServices();
    fetchCarouselProjects();
  }, [fetchWebsiteSettings, fetchHomeServices, fetchCarouselProjects]); // Add fetchWebsiteSettings to dependencies

  // --- Static Data (FAQ - unchanged) ---
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

  // --- Render --- 
  return (
    <Layout>
      {/* Use fetched website settings for Hero title and subtitle */}
      <Hero
        title={isLoadingSettings ? "Yükleniyor..." : (websiteSettings?.siteTitle || "Başlık Yüklenemedi")}
        subtitle={isLoadingSettings ? "Açıklama yükleniyor..." : (websiteSettings?.siteDescription || "Açıklama yüklenemedi")}
        buttonText="İletişime Geçin"
        buttonLink="/contact"
      />

      {/* Image Carousel Section - Unchanged */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Projelerimizden Örnekler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tamamladığımız başarılı projeleri ve müşterilerimize sunduğumuz kaliteli hizmetleri keşfedin
            </p>
          </div>
           {isLoadingProjects ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 text-theme-teal animate-spin" />
              </div>
            ) : carouselProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Gösterilecek proje bulunmamaktadır.
              </div>
            ) : (
              <Carousel
                opts={{
                  align: "start",
                  loop: carouselProjects.length > 1,
                }}
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {carouselProjects.map((project) => (
                    <CarouselItem key={project.id} className="pl-2 md:pl-4 transition-opacity duration-300">
                      <Link to="/projects" className="block group" title="Tüm projeleri gör">
                        <Card className="overflow-hidden rounded-lg shadow-sm">
                          <div className="relative aspect-[16/9] bg-gray-100 flex items-center justify-center">
                           {project.imageUrl ? (
                              <img
                                src={project.imageUrl}
                                alt={project.description || `Proje ${project.id}`}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                              />
                              ) : null}
                            <div className={`absolute inset-0 flex items-center justify-center ${project.imageUrl ? 'hidden' : ''}`}> 
                                <ImageOff className="h-12 w-12 text-gray-400" /> 
                            </div>
                          </div>
                        </Card>
                       </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {carouselProjects.length > 1 && (
                  <div className="hidden md:block">
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-none transition-all duration-200 hover:scale-110" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-none transition-all duration-200 hover:scale-110" />
                  </div>
                )}
              </Carousel>
            )
            }
        </div>
      </section>

      {/* Company Profile Section - Unchanged */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/drxariwwg/image/upload/v1745410257/uevg8o4zlolfkkxzynv7.jpg"
                  alt="Cam Balkon Antalya Binası"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-theme-teal text-white py-4 px-6 rounded-lg shadow-lg hidden md:block">
                  <p className="text-lg font-bold">Yılların Tecrübesi</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="section-title">Firma Profilimiz</h2>
              <h3 className="text-xl md:text-2xl font-semibold text-theme-blue mb-4">
                Antalya'nın En Güvenilir Cam Balkon ve PVC Pencere Firması
              </h3>
              <p className="text-gray-600 mb-6">
                Uzun yıllardan beri Antalya ve çevresinde hizmet veren firmamız, cam balkon, PVC pencere ve kapı sistemleri, ofis bölme, sineklik ve panjur sistemleri gibi geniş bir ürün yelpazesi sunmaktadır.
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

      {/* Why Choose Us Section - Unchanged */}
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
                 <Wrench className="h-8 w-8 text-theme-teal" />
               </div>
               <h3 className="text-xl font-bold text-theme-blue mb-3">Ücretsiz Teknik Keşif</h3>
               <p className="text-gray-600">
                 Uzman ekibimiz projeleriniz için ücretsiz keşif hizmeti sunar. İhtiyacınıza en uygun çözümler için doğru ölçüm ve planlama yaparız.
               </p>
             </div>
           </div>
        </div>
      </section>

      {/* Services Section - Fetched data, Unchanged logic */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Hizmet Alanlarımız</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kaliteli ürünler ve profesyonel montaj hizmetleri ile yaşam alanlarınıza değer katıyoruz
            </p>
          </div>
          {isLoadingServices ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-10 w-10 text-theme-teal animate-spin" />
            </div>
          ) : homeServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {homeServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  image={service.imageUrl}
                  link={service.link}
                  onDetailsClick={() => navigate(service.link)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Sunulan hizmet bulunmamaktadır.</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="bg-theme-teal hover:bg-theme-teal/90">
                Tüm Hizmetlerimiz
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter - Unchanged */}
      <StatsCounter />

      {/* FAQ Section - Unchanged */}
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

      {/* CTA Section - Unchanged */}
      <section className="py-16 bg-theme-blue text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Bize Ulaşın</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Cam balkon, PVC pencere ve diğer hizmetlerimiz hakkında detaylı bilgi almak veya ücretsiz keşif için hemen iletişime geçin.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=905454043462"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-green-500 hover:bg-green-600 px-8 py-2.5 text-lg font-medium text-white transition-colors"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-6 w-6" />
              WhatsApp ile İletişim
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
