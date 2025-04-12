import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGalleryStore } from "@/data/galleryData";
import type { GalleryImage } from "@/data/galleryData";

const GalleryPage = () => {
  const { images, categories } = useGalleryStore();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(image => image.category === activeCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <Layout>
      <Hero
        title="Projelerimiz"
        subtitle="Gerçekleştirdiğimiz projelere göz atarak işçiliğimiz ve kalitemiz hakkında fikir edinebilirsiniz."
        image="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
      />

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category.id
                    ? "bg-theme-teal text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map(image => (
              <div key={image.id} className="group relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={`${image.src}?w=600&h=600&fit=crop&auto=format`}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-theme-blue/0 group-hover:bg-theme-blue/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => openLightbox(image)}
                        className="bg-white rounded-full w-12 h-12 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-theme-blue"
                        >
                          <path d="M15 3h6v6" />
                          <path d="M10 14 21 3" />
                          <path d="M9 21h-6v-6" />
                          <path d="M3 14 14 3" />
                        </svg>
                      </button>
                    </DialogTrigger>
                    {selectedImage && (
                      <DialogContent className="max-w-5xl bg-transparent border-none shadow-none">
                        <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                          <div className="absolute top-4 right-4 z-10">
                            <button
                              onClick={() => setDialogOpen(false)}
                              className="bg-black/70 hover:bg-black text-white p-2 rounded-full"
                            >
                              <X className="h-6 w-6" />
                            </button>
                          </div>
                          <div className="relative">
                            <img
                              src={selectedImage.src}
                              alt={selectedImage.alt}
                              className="max-h-[80vh] w-auto mx-auto"
                            />
                            <button
                              onClick={() => navigateImage("prev")}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2 rounded-full"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                              onClick={() => navigateImage("next")}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-2 rounded-full"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </button>
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-bold">{selectedImage.alt}</h3>
                          </div>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;
