
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminWebsiteSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Ayarlar kaydedildi",
        description: "Web sitesi ayarlarınız başarıyla kaydedildi.",
      });
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Web Sitesi Ayarları</h1>
        <p className="text-gray-500">Web sitesi ayarlarını güncelleyin</p>
      </div>

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
    </div>
  );
};

export default AdminWebsiteSettings;
