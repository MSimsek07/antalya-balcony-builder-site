
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Edit, 
  Trash, 
  Plus, 
  MoveHorizontal,
  X,
  Upload 
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  imageFile?: File | null;
}

interface ServiceCategory {
  id: string;
  name: string;
}

const AdminGallery = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sample data - in a real app this would come from an API
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      alt: "Cam Balkon Projesi 1",
      category: "cambalkon"
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1600573472556-e636c2acda88",
      alt: "PVC Pencere Projesi 1",
      category: "pvc"
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a",
      alt: "Ofis Bölme Projesi 1",
      category: "office"
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1600607686527-6fb886090705",
      alt: "Cam Balkon Projesi 2",
      category: "cambalkon"
    },
  ]);
  
  // Get categories from services
  const [categories, setCategories] = useState<ServiceCategory[]>([
    { id: "cambalkon", name: "Cam Balkon" },
    { id: "pvc", name: "PVC Pencere" },
    { id: "office", name: "Ofis Bölme" },
    { id: "other", name: "Diğer" },
  ]);

  // Load service categories when component mounts
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use the sample data
    const serviceCategories = [
      { id: "cambalkon", name: "Cam Balkon" },
      { id: "pvc", name: "PVC Pencere" },
      { id: "office", name: "Ofis Bölme" },
      { id: "other", name: "Diğer" },
    ];
    
    setCategories(serviceCategories);
  }, []);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Başarılı",
        description: "Galeri bilgileri kaydedildi.",
      });
      setSaving(false);
    }, 1000);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage({...image});
  };

  const handleDelete = (id: string) => {
    setImages(images.filter(image => image.id !== id));
    toast({
      title: "Silindi",
      description: "Resim başarıyla silindi.",
    });
  };

  const handleUpdateImage = () => {
    if (!editingImage) return;
    
    // Process file upload if there's one
    let updatedImage = { ...editingImage };
    
    if (editingImage.imageFile) {
      // In a real app, you would upload the file to a server here
      // For now, we'll create a temporary URL
      const imageUrl = URL.createObjectURL(editingImage.imageFile);
      updatedImage.src = imageUrl;
    }
    
    setImages(images.map(image => 
      image.id === editingImage.id ? updatedImage : image
    ));
    
    toast({
      title: "Güncellendi",
      description: "Resim bilgileri güncellendi.",
    });
    
    setEditingImage(null);
  };

  const handleAddImage = () => {
    if (!editingImage) return;
    
    // Process file upload if there's one
    let newImage = { ...editingImage };
    
    if (editingImage.imageFile) {
      // In a real app, you would upload the file to a server here
      // For now, we'll create a temporary URL
      const imageUrl = URL.createObjectURL(editingImage.imageFile);
      newImage.src = imageUrl;
    }
    
    newImage.id = Date.now().toString();
    
    setImages([...images, newImage]);
    
    toast({
      title: "Eklendi",
      description: "Yeni resim başarıyla eklendi.",
    });
    
    setEditingImage(null);
    setIsAddDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && editingImage) {
      setEditingImage({
        ...editingImage,
        imageFile: file,
        src: URL.createObjectURL(file)
      });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-theme-blue">Galeri</h1>
          <p className="text-gray-500">Web sitesinde gösterilen galeri resimlerini düzenleyin</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-theme-teal hover:bg-theme-teal/90 flex items-center gap-2"
              onClick={() => setEditingImage({
                id: '',
                src: '',
                alt: '',
                category: categories.length > 0 ? categories[0].id : '',
                imageFile: null
              })}
            >
              <Plus className="h-4 w-4" />
              Resim Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Yeni Resim Ekle</DialogTitle>
              <DialogDescription>
                Eklemek istediğiniz resim bilgilerini doldurun.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Açıklama</label>
                <Input 
                  value={editingImage?.alt || ''}
                  onChange={(e) => setEditingImage(prev => prev ? {...prev, alt: e.target.value} : null)}
                  placeholder="Resim açıklaması"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategori</label>
                <Select 
                  value={editingImage?.category || ''}
                  onValueChange={(value) => setEditingImage(prev => prev ? {...prev, category: value} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Resim</label>
                <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
                  {editingImage?.src ? (
                    <div className="relative w-full">
                      <img 
                        src={editingImage.src} 
                        alt={editingImage.alt || "Önizleme"} 
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
                onClick={handleAddImage}
                disabled={!editingImage?.alt || !editingImage?.src}
              >
                Ekle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Galeri Resimleri</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              <MoveHorizontal className="h-3.5 w-3.5 mr-1" />
              Sıralama Değiştir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="group relative border rounded-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 bg-white opacity-70 hover:opacity-100"
                        onClick={() => handleEdit(image)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Resim Düzenle</DialogTitle>
                        <DialogDescription>
                          Resim bilgilerini güncelleyin.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Açıklama</label>
                          <Input 
                            value={editingImage?.alt || ''}
                            onChange={(e) => setEditingImage(prev => prev ? {...prev, alt: e.target.value} : null)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Kategori</label>
                          <Select 
                            value={editingImage?.category || ''}
                            onValueChange={(value) => setEditingImage(prev => prev ? {...prev, category: value} : null)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Kategori seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Resim</label>
                          <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-md">
                            {editingImage?.src ? (
                              <div className="relative w-full">
                                <img 
                                  src={editingImage.src} 
                                  alt={editingImage.alt} 
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
                          onClick={handleUpdateImage}
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
                        className="h-8 w-8 bg-white text-red-500 opacity-70 hover:opacity-100"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Resmi Sil</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bu resmi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-700"
                          onClick={() => handleDelete(image.id)}
                        >
                          Sil
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm truncate">{image.alt}</p>
                  <p className="text-xs text-gray-500">{getCategoryName(image.category)}</p>
                </div>
              </div>
            ))}
            
            {/* Add new image placeholder */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <div className="border border-dashed rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setEditingImage({
                    id: '',
                    src: '',
                    alt: '',
                    category: categories.length > 0 ? categories[0].id : '',
                    imageFile: null
                  })}
                >
                  <Plus className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">Yeni Resim Ekle</p>
                </div>
              </DialogTrigger>
            </Dialog>
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

export default AdminGallery;

