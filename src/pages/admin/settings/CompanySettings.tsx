
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminCompanySettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Ayarlar kaydedildi",
        description: "Şirket bilgileriniz başarıyla kaydedildi.",
      });
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Şirket Ayarları</h1>
        <p className="text-gray-500">Şirket bilgilerinizi yönetin</p>
      </div>

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
    </div>
  );
};

export default AdminCompanySettings;
