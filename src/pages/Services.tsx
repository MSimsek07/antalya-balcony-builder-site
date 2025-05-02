import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button"; // Keep if needed elsewhere
import { Check, MapPin, Loader2 } from "lucide-react";
import AntalyaMap from "@/components/AntalyaMap";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { db, COLLECTIONS } from "@/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

// Interface for data fetched from Firestore
interface ServiceData {
  title: string;
  description: string; // This will be the short description for the card
  detailedDescription?: string; // Optional field for a longer description in the modal
  imageUrl: string;
  // Add other fields if they exist in Firestore, like features
}

// Interface for the component's state
interface ServiceItem extends ServiceData {
  id: string;
  link: string; // Example: Generate link based on title or id
  features?: { title: string; description: string }[]; // Example structure if you add features later
}

const ServicesPage = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Fetch services from Firestore
  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    const servicesCollectionRef = collection(db, COLLECTIONS.SERVICES);
    try {
      const q = query(servicesCollectionRef, orderBy("createdAt", "desc")); // Order by creation time
      const data = await getDocs(q);
      const fetchedServices = data.docs.map((doc) => {
        const serviceData = doc.data() as ServiceData;
        // Map Firestore data to the component's expected structure
        return {
          ...serviceData,
          id: doc.id,
          link: `/services#${doc.id}`, // Simple link generation
          // If you add 'detailedDescription' to Firestore, use it here:
          // detailedDescription: serviceData.detailedDescription || serviceData.description,
          // For now, just use the main description for both card and modal if detailed isn't present
          detailedDescription: serviceData.detailedDescription, // Keep optional
          // Map features if they exist
          // features: serviceData.features || [],
        };
      });
      setServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({ title: "Hata", description: "Hizmetler getirilemedi.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <Layout>
      <Hero
        title="Hizmetlerimiz"
        subtitle="Kaliteli malzemeler ve profesyonel ekibimizle Antalya'nın cam balkon ve PVC ihtiyaçlarına çözüm üretiyoruz."
        image="https://res.cloudinary.com/drxariwwg/image/upload/v1745410259/mcq2drftac2ujyiffusy.jpg"
      />

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Hizmet Alanlarımız</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kaliteli ürünler ve profesyonel montaj hizmetleri ile yaşam alanlarınıza değer katıyoruz.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-10 w-10 text-theme-teal animate-spin" />
            </div>
           ) : services.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-gray-500">Sunulan hizmet bulunmamaktadır.</p>
              </div>
           ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description} // Use the description from Firestore for the card
                  image={service.imageUrl}     // Use imageUrl from Firestore
                  link={service.link}
                  onDetailsClick={() => setSelectedService(service)}
                />
              ))}
            </div>
          )}
        </div>  
      </section>

      {/* Service Details Modal - Updated for better scrolling and appearance */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        {selectedService && (
          <DialogContent className="flex flex-col w-full max-w-screen-md md:max-w-screen-lg h-[90vh] p-6"> {/* Adjusted classes for size and flex */} 
            <DialogHeader className="flex-shrink-0 pb-4"> {/* Prevent header from shrinking */}
              <DialogTitle className="text-2xl font-bold text-theme-blue">{selectedService.title}</DialogTitle>
              {/* Moved short description here or keep it only in card? Decided to keep long desc in body */} 
              {/* <DialogDescription className="text-base text-gray-600 mt-2">{selectedService.description}</DialogDescription> */}
            </DialogHeader>

            {/* Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto mt-6 pr-4"> {/* flex-1 to fill space, overflow-y-auto for scrolling, pr-4 for scrollbar gap */}
              <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 mb-6"> {/* Added bottom margin */} 
                <img 
                  src={selectedService.imageUrl} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/placeholder.svg'; e.currentTarget.onerror = null; }} // Fallback
                />
              </div>

              {/* Detailed Description */} 
              {/* Use detailedDescription if available, otherwise fallback to regular description */} 
              <DialogDescription className="text-base text-gray-600 mb-6"> {/* Added bottom margin */} 
                {selectedService.detailedDescription || selectedService.description}
              </DialogDescription>

              {/* Features section can be conditionally rendered if you add features to Firestore */}
              {/* 
              {selectedService.features && selectedService.features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> // Added bottom margin
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
              */}

            </div> {/* End Scrollable Body Content */}

            {/* Footer/Action button - fixed at the bottom */}
            <div className="flex-shrink-0 border-t pt-4 mt-4 flex justify-end"> {/* Added top padding/margin and flex-shrink-0 */}
              <a 
                href="https://api.whatsapp.com/send?phone=905454043462" // Consider making phone dynamic from settings
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <img src="/whatsapp.png" alt="WhatsApp iletişim simgesi" className="h-5 w-5" />
                Teklif Al
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Service Areas Map (Static for now) */}
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
