import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { db, COLLECTIONS } from "@/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ImageOff, ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// --- Interfaces ---
interface ProjectData {
  description: string;
  category: string; // Service Title
  imageUrl: string;
  createdAt?: any;
}

interface ProjectItem extends ProjectData {
  id: string;
}

interface Category {
  id: string;
  name: string;
}

const ProjectsPage = () => {
  const { toast } = useToast();
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch projects and derive categories
  const fetchProjectsAndCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
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
          // Use category name directly as ID for simplicity here
          acc.push({ id: project.category, name: project.category });
        }
        return acc;
      }, []);
      // Add "All" category and sort
      setCategories([{ id: "all", name: "Tümü" }, ...uniqueCategories.sort((a, b) => a.name.localeCompare(b.name))]);

    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Projeler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      toast({ title: "Hata", description: "Projeler getirilemedi.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]); // Keep toast dependency

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
        title="Projelerimiz" // Use a relevant title
        subtitle="Gerçekleştirdiğimiz projelere göz atarak işçiliğimiz ve kalitemiz hakkında fikir edinebilirsiniz." 
        image="https://res.cloudinary.com/drxariwwg/image/upload/v1745410258/wgqo5yz5kzb6dgtptysk.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="container-custom mx-auto px-4">
          {/* Category Filters */}
          {isLoading ? (
            <div className="flex justify-center items-center mb-12">
              <Loader2 className="h-6 w-6 text-theme-teal animate-spin" />
            </div>
          ) : categories.length > 1 ? (
             <div className="flex flex-wrap justify-center mb-12 gap-2">
                {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)} // Filter by category ID ('all' or category name)
                    className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                    activeCategory === category.id
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
           ) : error ? (
             <div className="text-center text-red-600 bg-red-100 p-4 rounded-md">
              <p>{error}</p>
            </div>
           ) : filteredProjects.length === 0 ? (
             <div className="text-center py-8">
                <p className="text-gray-500">{activeCategory === 'all' ? 'Henüz proje eklenmemiş.' : 'Bu kategoride proje bulunmamaktadır.'}</p>
              </div>
           ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProjects.map(project => (
                <div key={project.id} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer bg-gray-100">
                    <img
                        src={project.imageUrl}
                        alt={project.description}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg'; 
                            target.onerror = null; // Prevent infinite loops
                            // Add placeholder style if needed
                            target.classList.add('p-4', 'object-contain'); 
                        }}
                    />
                    {/* Overlay with category and zoom button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                         <p className="text-white font-semibold text-sm mb-1 drop-shadow-md">{project.category}</p>
                        <p className="text-white text-xs line-clamp-2 drop-shadow-md">{project.description}</p>
                    </div>
                    <div
                        onClick={() => openLightbox(project)}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        role="button" // Add role for accessibility
                        aria-label={`Projeyi büyüt: ${project.description}`} // Accessibility label
                    >
                        <ZoomIn className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>
                </div>
                ))}
            </div>
          )}
        </div>
      </section>

       {/* Project Details Dialog */}
       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {selectedProject && (
                <DialogContent
                    className="flex flex-col w-full max-w-screen-md md:max-w-screen-lg h-[90vh] bg-white border-none shadow-lg data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide"
                    onInteractOutside={(e) => { /* Allow closing on outside click */ }} 
                >
                    {/* Dialog Header with Title */}
                    <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-gray-200"> 
                        <DialogTitle className="text-2xl font-bold text-theme-blue">{selectedProject.category} Projesi</DialogTitle>
                    </DialogHeader>

                    {/* Scrollable Content Area (Image and Description) */}
                    {/* This div is designed to be vertically scrollable */} 
                    <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-6"> 
                        {/* Image Display */}
                        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100 mb-6"> 
                             <img
                                src={selectedProject.imageUrl}
                                alt={selectedProject.description}
                                className="w-full h-full object-contain block" 
                                onError={(e) => { 
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder.svg'; 
                                    target.onerror = null;
                                    target.classList.add('p-4', 'object-contain'); 
                                }}
                            />
                        </div>

                        {/* Project Description */} 
                        {/* The parent div is scrollable, so DialogDescription itself does not need overflow */}
                        <DialogDescription className="text-base text-gray-600 whitespace-pre-wrap"> 
                            {selectedProject.description}
                        </DialogDescription>
                    </div>

                    {/* Navigation Buttons - Placed outside the scrollable area */}
                    <div className="flex-shrink-0 pt-4 flex justify-between items-center px-6"> 
                         {filteredProjects.length > 1 && (
                            <button
                                onClick={() => navigateImage("prev")}
                                className="flex items-center text-theme-blue hover:text-theme-blue/80 disabled:opacity-50 disabled:pointer-events-none"
                                aria-label="Önceki Proje"
                                disabled={filteredProjects.length <= 1}
                            >
                                <ChevronLeft className="h-5 w-5 mr-1" /> Önceki
                            </button>
                         )}
                         {filteredProjects.length > 1 && (
                             <button
                                onClick={() => navigateImage("next")}
                                className="flex items-center text-theme-blue hover:text-theme-blue/80 disabled:opacity-50 disabled:pointer-events-none"
                                aria-label="Sonraki Proje"
                                disabled={filteredProjects.length <= 1}
                            >
                                Sonraki <ChevronRight className="h-5 w-5 ml-1" />
                            </button>
                         )}
                    </div>
                </DialogContent>
            )}
        </Dialog>
    </Layout>
  );
};

export default ProjectsPage;
