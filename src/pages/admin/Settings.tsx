
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  TabsContent, 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  User, 
  Lock, 
  Building, 
  Globe, 
  Mail,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Ayarlar kaydedildi",
        description: "Değişiklikleriniz başarıyla kaydedildi.",
      });
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Ayarlar</h1>
        <p className="text-gray-500">Sistem ve site ayarlarını yönetin</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-4 w-full max-w-lg mb-6">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Güvenlik</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Şirket</span>
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Web Sitesi</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Adınız</label>
                    <Input defaultValue="Admin" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Soyadınız</label>
                    <Input defaultValue="User" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-posta Adresi</label>
                  <Input defaultValue="admin@cambalkonantalya.org" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefon</label>
                  <Input defaultValue="+90 242 229 45 67" />
                </div>
              </div>
              
              <Button 
                className="bg-theme-teal hover:bg-theme-teal/90 flex items-center"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mevcut Şifre</label>
                  <Input type="password" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Yeni Şifre</label>
                    <Input type="password" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Yeni Şifre (Tekrar)</label>
                    <Input type="password" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">İki Faktörlü Doğrulama</label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="2fa" className="h-4 w-4" />
                    <label htmlFor="2fa" className="text-sm text-gray-600">
                      İki faktörlü doğrulamayı etkinleştir
                    </label>
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-theme-teal hover:bg-theme-teal/90 flex items-center"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Şirket Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Şirket Adı</label>
                  <Input defaultValue="Cam Balkon Antalya" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vergi Dairesi</label>
                    <Input defaultValue="Muratpaşa" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vergi Numarası</label>
                    <Input defaultValue="1234567890" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adres</label>
                  <Textarea defaultValue="Altınkale Mahallesi, 1. Cadde, No:25, Döşemealtı, Antalya" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telefon</label>
                    <Input defaultValue="+90 242 229 45 67" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">E-posta</label>
                    <Input defaultValue="info@cambalkonantalya.org" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Web Sitesi</label>
                    <Input defaultValue="www.cambalkonantalya.org" />
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-theme-teal hover:bg-theme-teal/90 flex items-center"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Settings */}
        <TabsContent value="website">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Web Sitesi Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Site Başlığı</label>
                  <Input defaultValue="Cam Balkon Antalya - Antalya'nın Lider Cam Balkon Firması" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Site Açıklaması</label>
                  <Textarea defaultValue="Antalya'nın lider cam balkon ve PVC sistemleri firması. Kaliteli ürünler ve profesyonel hizmet." />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sosyal Medya Hesapları</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Facebook:</span>
                      <Input defaultValue="https://facebook.com/cambalkonantalya" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Instagram:</span>
                      <Input defaultValue="https://instagram.com/cambalkonantalya" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Twitter:</span>
                      <Input defaultValue="https://twitter.com/cambalkonantalya" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">LinkedIn:</span>
                      <Input defaultValue="https://linkedin.com/company/cambalkonantalya" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">İletişim Formu E-posta Adresi</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <Input defaultValue="info@cambalkonantalya.org" />
                  </div>
                  <p className="text-xs text-gray-500">
                    İletişim formundan gönderilen mesajlar bu e-posta adresine iletilecek.
                  </p>
                </div>
              </div>
              
              <Button 
                className="bg-theme-teal hover:bg-theme-teal/90 flex items-center"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
