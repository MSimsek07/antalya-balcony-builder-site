import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Edit,
  Trash,
  Plus,
  Upload,
  Loader2,
  ImageOff,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { db, COLLECTIONS } from "@/firebaseConfig"; // No need for Cloudinary config here
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { uploadToCloudinary } from "@/lib/cloudinaryUtils"; // Import the unsigned upload function

// --- Interfaces ---
interface ServiceInfo {
  id: string;
  title: string;
}

interface ProjectData {
  description: string;
  category: string; // Matches a Service title
  imageUrl: string;
  createdAt?: any;
  updatedAt?: any;
}

interface ProjectItem extends ProjectData {
  id: string;
}

interface ProjectFormState {
  description: string;
  category: string;
  imageUrl: string;       // For preview or existing URL
  imageFile: File | null; // File to be uploaded
}

// --- Component ---
const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ProjectItem | null>(null);

  const [formState, setFormState] = useState<ProjectFormState>({
    description: "",
    category: "",
    imageUrl: "",
    imageFile: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectsCollectionRef = collection(db, COLLECTIONS.PROJECTS);
  const servicesCollectionRef = collection(db, COLLECTIONS.SERVICES);

  // --- Data Fetching ---
  const fetchServicesForDropdown = useCallback(async () => {
    try {
        const q = query(servicesCollectionRef, orderBy("title"));
        const data = await getDocs(q);
        const fetchedServices = data.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title as string // Ensure title is treated as string
        }));
        setServices(fetchedServices);
        // If editing, ensure the category exists in the fetched services
        if (editingProjectId && formState.category) {
            if (!fetchedServices.some(s => s.title === formState.category)) {
                console.warn(`Previously selected category "${formState.category}" no longer exists in services. Resetting.`);
                setFormState(prev => ({ ...prev, category: "" })); // Reset category if it's no longer valid
            }
        }
    } catch (error) {
        console.error("Error fetching services for dropdown:", error);
        toast({ title: "Hata", description: "Hizmet kategorileri getirilemedi.", variant: "destructive" });
        setServices([]); // Ensure services is empty on error
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, editingProjectId]); // Added editingProjectId dependency

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(projectsCollectionRef, orderBy("createdAt", "desc"));
      const data = await getDocs(q);
      const fetchedProjects = data.docs.map((doc) => ({
        ...(doc.data() as ProjectData),
        id: doc.id,
      }));
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({ title: "Hata", description: "Projeler getirilemedi.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  useEffect(() => {
    // Fetch services first, then projects
    const loadData = async () => {
        await fetchServicesForDropdown();
        await fetchProjects();
    }
    loadData();
  }, [fetchServicesForDropdown, fetchProjects]);

  // --- Helper Functions ---
   const resetForm = () => {
    setFormState({ description: "", category: "", imageUrl: "", imageFile: null });
    setEditingProjectId(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
    }
  };

  const openDialog = (project: ProjectItem | null = null) => {
    if (project) {
      setEditingProjectId(project.id);
      setFormState({
        description: project.description,
        category: project.category,
        imageUrl: project.imageUrl, // Show existing image
        imageFile: null,           // No new file initially
      });
      // Ensure category is valid after setting state
      if (!services.some(s => s.title === project.category)) {
          console.warn(`Editing project with category "${project.category}" which is no longer a valid service. It will be reset if saved without change.`);
          // We don't reset it immediately here, but validation on save will handle it
      }
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    // Delay reset to allow dialog animation
    setTimeout(resetForm, 300);
  };

  // --- Image Handling ---
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file) // Update preview
      }));
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // --- Form Handling ---
  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    // Find the corresponding service title (which is what we store)
    const selectedService = services.find(s => s.title === value);
    if (selectedService) {
        setFormState(prev => ({ ...prev, category: selectedService.title }));
    } else {
        console.warn("Selected category not found in services list:", value);
        setFormState(prev => ({ ...prev, category: "" })); // Or handle as needed
    }
  };

  const handleSubmit = async () => {
    if (!formState.description || !formState.category) {
      toast({ title: "Eksik Bilgi", description: "Açıklama ve kategori zorunludur.", variant: "destructive" });
      return;
    }
    // Validate category selection again
    if (!services.some(s => s.title === formState.category)) {
        toast({ title: "Geçersiz Kategori", description: "Lütfen listeden geçerli bir hizmet kategorisi seçin.", variant: "destructive" });
        return;
    }

    // Require image only when creating a new project OR when editing and no previous image exists
    const isEditingWithoutImage = editingProjectId && !projects.find(p => p.id === editingProjectId)?.imageUrl;
    if ((!editingProjectId || isEditingWithoutImage) && !formState.imageFile) {
        toast({ title: "Eksik Bilgi", description: "Yeni proje için resim zorunludur.", variant: "destructive" });
        return;
    }

    setIsProcessing(true);

    try {
      let finalImageUrl = formState.imageUrl; // Default to existing or preview URL

      // If a new image file is selected, upload it using unsigned method
      if (formState.imageFile) {
        console.log("Attempting unsigned upload to Cloudinary for project...");
        finalImageUrl = await uploadToCloudinary(formState.imageFile);
        console.log("Cloudinary Upload Successful, URL:", finalImageUrl);
      }

      if (!finalImageUrl) {
         // Safeguard
         throw new Error("Proje resmi URL'si alınamadı veya oluşturulamadı.");
      }

      // Prepare data for Firestore
      const projectData: Partial<ProjectData> = {
        description: formState.description,
        category: formState.category, // Use the selected service title
        imageUrl: finalImageUrl,
      };

      if (editingProjectId) {
        // Update existing project
        projectData.updatedAt = serverTimestamp();
        const projectDocRef = doc(db, COLLECTIONS.PROJECTS, editingProjectId);
        await updateDoc(projectDocRef, projectData);
        toast({ title: "Başarılı", description: "Proje güncellendi." });
      } else {
        // Add new project
        projectData.createdAt = serverTimestamp();
        await addDoc(projectsCollectionRef, projectData);
        toast({ title: "Başarılı", description: "Yeni proje eklendi." });
      }

      closeDialog();
      fetchProjects(); // Refresh the projects list

    } catch (error: any) {
      console.error("Error saving project:", error);
      toast({ title: "Hata", description: `Proje kaydedilemedi: ${error.message}`, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Delete Handling ---
   const openDeleteDialog = (project: ProjectItem) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setProjectToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    setIsProcessing(true);
    try {
      const projectDocRef = doc(db, COLLECTIONS.PROJECTS, projectToDelete.id);
      await deleteDoc(projectDocRef);
      console.log(`Firestore entry for project ${projectToDelete.id} deleted.`);
      toast({ title: "Başarılı", description: "Proje silindi." });
      closeDeleteDialog();
      fetchProjects(); // Refresh the list
    } catch (error: any) {
      console.error("Error deleting project from Firestore:", error);
      toast({ title: "Hata", description: `Proje silinemedi: ${error.message}`, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Render (JSX) ---
  // (JSX Structure remains largely the same as your previous version)
  return (
     <div className="space-y-6">
       {/* Header and Add Button */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-theme-blue">Projeler Yönetimi</h1>
            <p className="text-gray-500">Web sitesi galerisinde gösterilecek projeleri yönetin.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
             {services.length === 0 && !isLoading && (
                 <p className="text-xs text-red-600">Not: Proje eklemek için önce hizmet eklemelisiniz.</p>
             )}
              <Button className="bg-theme-teal hover:bg-theme-teal/90 flex items-center gap-2" onClick={() => openDialog()} disabled={services.length === 0 || isLoading}>
              <Plus className="h-4 w-4" />
              Yeni Proje Ekle
              </Button>
          </div>
       </div>

       {/* Projects List/Grid */}
       <Card className="shadow-sm">
         <CardHeader>
           <CardTitle>Mevcut Projeler</CardTitle>
         </CardHeader>
         <CardContent>
           {isLoading ? (
             <div className="flex justify-center items-center p-8">
               <Loader2 className="h-8 w-8 text-theme-teal animate-spin" />
             </div>
           ) : projects.length === 0 ? (
             <div className="text-center py-8">
               <p className="text-gray-500">Henüz proje eklenmemiş.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {projects.map((project) => (
                 <Card key={project.id} className="overflow-hidden group relative">
                   <CardContent className="p-0">
                      <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
                       {project.imageUrl ? (
                           <img src={project.imageUrl} alt={project.description.substring(0, 30)} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; (e.target as HTMLImageElement).onerror = null; }} />
                          ) : (
                              <ImageOff className="h-12 w-12 text-gray-400" />
                          )}
                      </div>
                      <div className="p-3">
                           <p className="text-sm font-medium text-theme-blue truncate" title={project.category}>{project.category}</p>
                           <p className="text-xs text-gray-500 line-clamp-2 mt-1" title={project.description}>{project.description}</p>
                       </div>
                       {/* Edit/Delete Buttons */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/70 backdrop-blur-sm p-1 rounded-md">
                           <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => openDialog(project)}><Edit className="h-4 w-4" /></Button>
                           <Button variant="outline" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => openDeleteDialog(project)}><Trash className="h-4 w-4" /></Button>
                        </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

       {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => open ? setIsDialogOpen(true) : closeDialog()}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{editingProjectId ? "Proje Düzenle" : "Yeni Proje Ekle"}</DialogTitle>
              <DialogDescription>{editingProjectId ? "Proje bilgilerini güncelleyin." : "Yeni proje için gerekli bilgileri girin."}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Category Select */}
               <div className="space-y-2">
                <Label htmlFor="category">Kategori (Hizmet)*</Label>
                 <Select value={formState.category} onValueChange={handleCategoryChange} disabled={isProcessing || services.length === 0}>
                   <SelectTrigger id="category"><SelectValue placeholder="Bir hizmet seçin..." /></SelectTrigger>
                   <SelectContent>
                     {services.map((service) => (
                       // Use service.title as the value since that's what we store
                       <SelectItem key={service.id} value={service.title}>
                         {service.title}
                       </SelectItem>
                      ))}
                     {services.length === 0 && (<div className="px-2 py-1 text-sm text-gray-500">Önce hizmet eklemelisiniz.</div>)}
                   </SelectContent>
                 </Select>
              </div>
              {/* Description Textarea */}
               <div className="space-y-2">
                <Label htmlFor="description">Açıklama*</Label>
                <Textarea id="description" name="description" value={formState.description} onChange={handleFormChange} rows={4} disabled={isProcessing} placeholder="Proje hakkında kısa bir açıklama..."/>
              </div>
              {/* Image Upload Section */}
              <div className="space-y-2">
                <Label htmlFor="image">Proje Resmi {editingProjectId ? "(Değiştirmek için yenisini seçin)" : "*"}</Label>
                <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
                   {formState.imageUrl ? (
                       <div className="relative w-full mb-2">
                           <img src={formState.imageUrl} alt="Önizleme" className="max-h-48 w-auto mx-auto rounded-md object-contain" />
                       </div>
                   ) : null}
                  <Button variant="outline" type="button" className="flex items-center gap-2 w-full" onClick={triggerFileInput} disabled={isProcessing}>
                    <Upload className="h-4 w-4" />{formState.imageUrl ? "Resmi Değiştir" : "Resim Yükle"}
                  </Button>
                  <input ref={fileInputRef} id="image" type="file" accept="image/jpeg, image/png, image/webp" className="hidden" onChange={handleFileChange} disabled={isProcessing}/>
                  <p className="text-xs text-gray-500 mt-2">İzin verilen formatlar: JPG, PNG, WEBP.</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeDialog} disabled={isProcessing}>İptal</Button>
              <Button className="bg-theme-teal hover:bg-theme-teal/90" onClick={handleSubmit} disabled={isProcessing || !formState.category || services.length === 0}>
                {isProcessing ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Kaydediliyor...</>) : editingProjectId ? "Güncelle" : "Ekle"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

       {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Projeyi Sil</AlertDialogTitle>
              <AlertDialogDescription>
                 Bu projeyi silmek istediğinizden emin misiniz?
                 Bu işlem sadece veritabanı kaydını siler ve geri alınamaz.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeDeleteDialog} disabled={isProcessing}>İptal</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteConfirm} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Yine de Sil"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };

export default AdminProjects;
