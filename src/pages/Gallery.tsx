import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Loader2, ZoomIn } from "lucide-react";
import { db, COLLECTIONS } from "@/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

// Interface matching Firestore data for projects
interface ProjectData {
  description: string;
  category: string; // Service Title
  imageUrl: string;
}

interface ProjectItem extends ProjectData {
  id: string;
}

// Interface for categories derived from projects
interface Category {
  id: string;
  name: string;
}

const GalleryPage = () => {
  const { toast } = useToast();
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch projects and derive categories
  const fetchProjectsAndCategories = useCallback(async () => {
    setIsLoading(true);
    const projectsCollectionRef = collection(db, COLLECTIONS.PROJECTS);
    try {
      const q = query(projectsCollectionRef, orderBy("createdAt", "desc"));
      const data = await getDocs(q);
      const fetchedProjects = data.docs.map((doc) => ({
        ...(doc.data() as ProjectData),
        id: doc.id,
      }));
      setAllProjects(fetchedProjects);

      // Derive unique categories from fetched projects
      const uniqueCategories = fetchedProjects.reduce<Category[]>((acc, project) => {
        if (project.category && !acc.some(cat => cat.name === project.category)) {
          acc.push({ id: project.category.toLowerCase().replace(/\s+/g, '-'), name: project.category });
        }
        return acc;
      }, []);
      // Add "All" category
      setCategories([{ id: "all", name: "Tümü" }, ...uniqueCategories.sort((a, b) => a.name.localeCompare(b.name))]);

    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({ title: "Hata", description: "Projeler getirilemedi.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProjectsAndCategories();
  }, [fetchProjectsAndCategories]);

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all"
    ? allProjects
    : allProjects.filter(project => project.category === activeCategory);

  // Lightbox functions
  const openLightbox = (project: ProjectItem) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedProject) return;

    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
    } else {
      newIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedProject(filteredProjects[newIndex]);
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
          {/* Category Filters */}
          {isLoading ? (
            <div className="flex justify-center items-center mb-12">
              <Loader2 className="h-6 w-6 text-theme-teal animate-spin" />
            </div>
          ) : categories.length > 1 ? ( // Show filters only if there are categories besides "All"
             <div className="flex flex-wrap justify-center mb-12 gap-2">
                {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id === 'all' ? 'all' : category.name)} // Filter by name
                    className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                    (activeCategory === category.id || (activeCategory === category.name)) 
                        ? "bg-theme-teal text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                    {category.name}
                </button>
                ))}
            </div>
          ) : null}
          
          {/* Gallery Grid */}
           {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-10 w-10 text-theme-teal animate-spin" />
            </div>
           ) : filteredProjects.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-gray-500">Bu kategoride proje bulunmamaktadır veya henüz hiç proje eklenmemiştir.</p>
              </div>
           ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProjects.map(project => (
                <div key={project.id} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer bg-gray-100">
                    <img
                        src={project.imageUrl} // Use imageUrl from Firestore
                        alt={project.description}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = '/placeholder.svg'; e.currentTarget.onerror = null; }} // Fallback
                    />
                    {/* Overlay with category and zoom button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                         <p className="text-white font-semibold text-sm mb-1 drop-shadow-md">{project.category}</p>
                        <p className="text-white text-xs line-clamp-2 drop-shadow-md">{project.description}</p>
                    </div>
                    <div 
                        onClick={() => openLightbox(project)}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <ZoomIn className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>
                </div>
                ))}
            </div>
          )}
        </div>
      </section>

       {/* Lightbox Dialog */}
       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {selectedProject && (
                <DialogContent 
                    className="max-w-none w-[95vw] h-[90vh] md:w-[80vw] md:h-[80vh] lg:w-[70vw] lg:h-[85vh] bg-black/80 border-none shadow-none p-2 md:p-4 flex items-center justify-center" 
                    onInteractOutside={(e) => e.preventDefault()} // Prevent closing on outside click for easier navigation
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <DialogClose 
                            className="absolute top-2 right-2 md:top-4 md:right-4 z-50 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-colors"
                            aria-label="Kapat"
                        >
                            <X className="h-5 w-5 md:h-6 md:w-6" />
                        </DialogClose>
                        
                        {/* Image Display */}
                        <div className="relative w-full h-full flex items-center justify-center">
                             <img
                                src={selectedProject.imageUrl}
                                alt={selectedProject.description}
                                className="max-h-full max-w-full object-contain block"
                            />
                        </div>

                        {/* Prev Button */}
                        <button
                            onClick={() => navigateImage("prev")}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-50 bg-black/60 hover:bg-black/80 text-white p-1.5 md:p-2 rounded-full transition-colors"
                            aria-label="Önceki Resim"
                        >
                            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                        </button>
                        
                        {/* Next Button */}
                        <button
                            onClick={() => navigateImage("next")}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50 bg-black/60 hover:bg-black/80 text-white p-1.5 md:p-2 rounded-full transition-colors"
                            aria-label="Sonraki Resim"
                        >
                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                        </button>

                         {/* Optional: Description below image */}
                         {/* 
                         <div className="absolute bottom-4 left-4 right-4 p-2 bg-black/50 text-white text-center rounded text-sm">
                            {selectedProject.description}
                         </div> 
                         */}
                    </div>
                </DialogContent>
            )}
        </Dialog>
    </Layout>
  );
};

export default GalleryPage;
