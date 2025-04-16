import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash, Plus, Upload, Loader2, ImageOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
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
import { db, COLLECTIONS } from "@/firebaseConfig"; // No need for CLOUDINARY_CONFIG here now
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
import { uploadToCloudinary } from "@/lib/cloudinaryUtils"; // Import the new upload function

// --- Interfaces ---
interface ServiceData {
  title: string;
  description: string;
  imageUrl: string;      // Cloudinary URL
  createdAt?: any;
  updatedAt?: any;
}

interface ServiceItem extends ServiceData {
  id: string;
}

interface ServiceFormState {
  title: string;
  description: string;
  imageUrl: string;       // For preview or existing URL
  imageFile: File | null; // File to be uploaded
}

// --- Component ---
const AdminServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);

  const [formState, setFormState] = useState<ServiceFormState>({
    title: "",
    description: "",
    imageUrl: "",
    imageFile: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const servicesCollectionRef = collection(db, COLLECTIONS.SERVICES);

  // --- Data Fetching ---
  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(servicesCollectionRef, orderBy("createdAt", "desc"));
      const data = await getDocs(q);
      const fetchedServices = data.docs.map((doc) => ({
        ...(doc.data() as ServiceData),
        id: doc.id,
      }));
      setServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({ title: "Hata", description: "Hizmetler getirilemedi.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]); // Keep toast dependency

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // --- Helper Functions ---
  const resetForm = () => {
    setFormState({ title: "", description: "", imageUrl: "", imageFile: null });
    setEditingServiceId(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
    }
  };

  const openDialog = (service: ServiceItem | null = null) => {
    if (service) {
      setEditingServiceId(service.id);
      setFormState({
        title: service.title,
        description: service.description,
        imageUrl: service.imageUrl, // Show existing image
        imageFile: null,           // No new file initially
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    // Delay reset to allow dialog animation to complete
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
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formState.title || !formState.description) {
      toast({ title: "Eksik Bilgi", description: "Başlık ve açıklama zorunludur.", variant: "destructive" });
      return;
    }
    // Require image only when creating a new service OR when editing and no previous image exists
    const isEditingWithoutImage = editingServiceId && !services.find(s => s.id === editingServiceId)?.imageUrl;
    if ((!editingServiceId || isEditingWithoutImage) && !formState.imageFile) {
        toast({ title: "Eksik Bilgi", description: "Yeni hizmet için resim zorunludur.", variant: "destructive" });
        return;
    }

    setIsProcessing(true);

    try {
      let finalImageUrl = formState.imageUrl; // Default to existing or preview URL

      // If a new image file is selected, upload it
      if (formState.imageFile) {
        console.log("Attempting unsigned upload to Cloudinary...");
        finalImageUrl = await uploadToCloudinary(formState.imageFile); // Use the unsigned upload function
        console.log("Cloudinary Upload Successful, URL:", finalImageUrl);
      }

      if (!finalImageUrl) {
         // This case should ideally not happen if validation is correct, but as a safeguard
         throw new Error("Resim URL'si alınamadı veya oluşturulamadı.");
      }

      // Prepare data for Firestore
      const serviceData: Partial<ServiceData> = {
        title: formState.title,
        description: formState.description,
        imageUrl: finalImageUrl, // Use the potentially updated URL
      };

      if (editingServiceId) {
        // Update existing service
        serviceData.updatedAt = serverTimestamp();
        const serviceDocRef = doc(db, COLLECTIONS.SERVICES, editingServiceId);
        await updateDoc(serviceDocRef, serviceData);
        toast({ title: "Başarılı", description: "Hizmet güncellendi." });
      } else {
        // Add new service
        serviceData.createdAt = serverTimestamp();
        await addDoc(servicesCollectionRef, serviceData);
        toast({ title: "Başarılı", description: "Yeni hizmet eklendi." });
      }

      closeDialog();
      fetchServices(); // Refresh the list

    } catch (error: any) {
      console.error("Error saving service:", error);
      toast({ title: "Hata", description: `Hizmet kaydedilemedi: ${error.message}`, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Delete Handling ---
  const openDeleteDialog = (service: ServiceItem) => {
    setServiceToDelete(service);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setServiceToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;
    setIsProcessing(true);
    try {
      const serviceDocRef = doc(db, COLLECTIONS.SERVICES, serviceToDelete.id);
      await deleteDoc(serviceDocRef);
      console.log(`Firestore entry for ${serviceToDelete.title} deleted.`); // Removed mention of public ID
      toast({ title: "Başarılı", description: "Hizmet silindi." });
      closeDeleteDialog();
      fetchServices(); // Refresh the list
    } catch (error: any) {
      console.error("Error deleting service from Firestore:", error);
      toast({ title: "Hata", description: `Hizmet silinemedi: ${error.message}`, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Render (JSX) ---
  // (JSX Structure remains largely the same as your previous version)
  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-theme-blue">Hizmetler Yönetimi</h1>
          <p className="text-gray-500">Web sitesinde gösterilecek hizmetleri yönetin.</p>
        </div>
        <Button
          className="bg-theme-teal hover:bg-theme-teal/90 flex items-center gap-2"
          onClick={() => openDialog()}
        >
          <Plus className="h-4 w-4" />
          Yeni Hizmet Ekle
        </Button>
      </div>

      {/* Services List/Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Mevcut Hizmetler</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 text-theme-teal animate-spin" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Henüz hizmet eklenmemiş.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                   <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-16 w-16 shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="h-full w-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; (e.target as HTMLImageElement).onerror = null; }}
                          />
                      ) : (
                          <ImageOff className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium truncate" title={service.title}>{service.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2" title={service.description}>{service.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 ml-4">
                    <Button variant="outline" size="icon" onClick={() => openDialog(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => openDeleteDialog(service)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
       <Dialog open={isDialogOpen} onOpenChange={(open) => open ? setIsDialogOpen(true) : closeDialog()}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingServiceId ? "Hizmet Düzenle" : "Yeni Hizmet Ekle"}</DialogTitle>
            <DialogDescription>
              {editingServiceId ? "Hizmet bilgilerini güncelleyin." : "Yeni hizmet için gerekli bilgileri girin."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
             {/* Title and Description */}
            <div className="space-y-2">
              <Label htmlFor="title">Başlık*</Label>
              <Input id="title" name="title" value={formState.title} onChange={handleFormChange} disabled={isProcessing}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama*</Label>
              <Textarea id="description" name="description" value={formState.description} onChange={handleFormChange} rows={4} disabled={isProcessing}/>
            </div>
            {/* Image Upload */}
             <div className="space-y-2">
              <Label htmlFor="image">Resim {editingServiceId ? "(Değiştirmek için yenisini seçin)" : "*"}</Label>
              <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
                 {formState.imageUrl ? ( // Show preview if available (new or existing)
                    <div className="relative w-full mb-2">
                        <img src={formState.imageUrl} alt="Önizleme" className="max-h-48 w-auto mx-auto rounded-md object-contain"/>
                    </div>
                 ) : null}
                <Button variant="outline" type="button" className="flex items-center gap-2 w-full" onClick={triggerFileInput} disabled={isProcessing}>
                  <Upload className="h-4 w-4" />
                  {formState.imageUrl ? "Resmi Değiştir" : "Resim Yükle"}
                </Button>
                <input ref={fileInputRef} id="image" type="file" accept="image/jpeg, image/png, image/webp" className="hidden" onChange={handleFileChange} disabled={isProcessing}/>
                <p className="text-xs text-gray-500 mt-2">İzin verilen formatlar: JPG, PNG, WEBP.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} disabled={isProcessing}>İptal</Button>
            <Button className="bg-theme-teal hover:bg-theme-teal/90" onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Kaydediliyor...</>) : editingServiceId ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hizmeti Sil</AlertDialogTitle>
            <AlertDialogDescription>
              `{serviceToDelete?.title}` adlı hizmeti silmek istediğinizden emin misiniz?
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

export default AdminServices;

