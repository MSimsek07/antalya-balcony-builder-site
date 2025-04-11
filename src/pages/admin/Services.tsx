
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Edit, Trash, Plus, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageFile?: File | null;
}

const AdminServices = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sample data - in a real app this would come from an API
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: "1",
      title: "Cam Balkon",
      description: "Balkonunuzu dört mevsim kullanılabilir bir alana çeviriyoruz.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: "2",
      title: "Isıcamlı PVC Pencere",
      description: "Yüksek ısı ve ses yalıtımı sağlayan, estetik ve dayanıklı ısıcamlı PVC pencere sistemleri.",
      image: "https://images.unsplash.com/photo-1600573472556-e636c2acda88",
    },
    {
      id: "3",
      title: "Ofis Cam Bölmesi",
      description: "Modern ofis alanları için şık ve fonksiyonel cam bölme sistemleri.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    },
  ]);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving and updating gallery categories
    setTimeout(() => {
      toast({
        title: "Başarılı",
        description: "Hizmet bilgileri kaydedildi ve galeri kategorileri güncellendi.",
      });
      setSaving(false);
    }, 1000);
  };

  const handleEdit = (service: ServiceItem) => {
    setEditingService({...service});
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Silindi",
      description: "Hizmet başarıyla silindi.",
    });
  };

  const handleUpdateService = () => {
    if (!editingService) return;
    
    // Process file upload if there's one
    let updatedService = { ...editingService };
    
    if (editingService.imageFile) {
      // In a real app, you would upload the file to a server here
      // For now, we'll create a temporary URL
      const imageUrl = URL.createObjectURL(editingService.imageFile);
      updatedService.image = imageUrl;
    }
    
    setServices(services.map(service => 
      service.id === editingService.id ? updatedService : service
    ));
    
    toast({
      title: "Güncellendi",
      description: "Hizmet bilgileri güncellendi ve galeri kategorileri yenilendi.",
    });
    
    setEditingService(null);
  };

  const handleAddService = () => {
    if (!editingService) return;
    
    // Process file upload if there's one
    let newService = { ...editingService };
    
    if (editingService.imageFile) {
      // In a real app, you would upload the file to a server here
      // For now, we'll create a temporary URL
      const imageUrl = URL.createObjectURL(editingService.imageFile);
      newService.image = imageUrl;
    }
    
    newService.id = Date.now().toString();
    
    setServices([...services, newService]);
    
    toast({
      title: "Eklendi",
      description: "Yeni hizmet başarıyla eklendi ve galeri kategorileri güncellendi.",
    });
    
    setEditingService(null);
    setIsAddDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && editingService) {
      setEditingService({
        ...editingService,
        imageFile: file,
        image: URL.createObjectURL(file)
      });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-theme-blue">Hizmetler</h1>
          <p className="text-gray-500">Web sitesinde gösterilen hizmetleri düzenleyin</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-theme-teal hover:bg-theme-teal/90 flex items-center gap-2"
              onClick={() => setEditingService({
                id: '',
                title: '',
                description: '',
                image: '',
                imageFile: null
              })}
            >
              <Plus className="h-4 w-4" />
              Hizmet Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Yeni Hizmet Ekle</DialogTitle>
              <DialogDescription>
                Eklemek istediğiniz hizmet bilgilerini doldurun.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Başlık</label>
                <Input 
                  value={editingService?.title || ''}
                  onChange={(e) => setEditingService(prev => prev ? {...prev, title: e.target.value} : null)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Açıklama</label>
                <Textarea 
                  value={editingService?.description || ''}
                  onChange={(e) => setEditingService(prev => prev ? {...prev, description: e.target.value} : null)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Resim</label>
                <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
                  {editingService?.image ? (
                    <div className="relative w-full">
                      <img 
                        src={editingService.image} 
                        alt="Preview" 
                        className="max-h-40 mx-auto rounded-md mb-2"
                      />
                      <Button 
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={triggerFileInput}
                      >
                        Resmi Değiştir
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline"
                      type="button"
                      className="flex items-center gap-2 w-full"
                      onClick={triggerFileInput}
                    >
                      <Upload className="h-4 w-4" />
                      Resim Yükle
                    </Button>
                  )}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">İptal</Button>
              </DialogClose>
              <Button 
                className="bg-theme-teal hover:bg-theme-teal/90"
                onClick={handleAddService}
                disabled={!editingService?.title || !editingService?.image}
              >
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Mevcut Hizmetler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-md overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{service.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Hizmet Düzenle</DialogTitle>
                        <DialogDescription>
                          Hizmet bilgilerini güncelleyin.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Başlık</label>
                          <Input 
                            value={editingService?.title || ''}
                            onChange={(e) => setEditingService(prev => prev ? {...prev, title: e.target.value} : null)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Açıklama</label>
                          <Textarea 
                            value={editingService?.description || ''}
                            onChange={(e) => setEditingService(prev => prev ? {...prev, description: e.target.value} : null)}
                            rows={3}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Resim</label>
                          <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
                            {editingService?.image ? (
                              <div className="relative w-full">
                                <img 
                                  src={editingService.image} 
                                  alt="Preview" 
                                  className="max-h-40 mx-auto rounded-md mb-2"
                                />
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="w-full mt-2"
                                  onClick={triggerFileInput}
                                >
                                  Resmi Değiştir
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="outline"
                                type="button"
                                className="flex items-center gap-2 w-full"
                                onClick={triggerFileInput}
                              >
                                <Upload className="h-4 w-4" />
                                Resim Yükle
                              </Button>
                            )}
                            <input 
                              ref={fileInputRef}
                              type="file" 
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">İptal</Button>
                        </DialogClose>
                        <Button 
                          className="bg-theme-teal hover:bg-theme-teal/90"
                          onClick={handleUpdateService}
                        >
                          Güncelle
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hizmeti Sil</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bu hizmeti silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-700"
                          onClick={() => handleDelete(service.id)}
                        >
                          Sil
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
            
            {services.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Henüz hizmet bulunmamaktadır.</p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <Button 
              className="bg-theme-teal hover:bg-theme-teal/90 flex items-center gap-2"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="h-4 w-4" />
              {saving ? "Kaydediliyor..." : "Tüm Değişiklikleri Kaydet"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServices;
