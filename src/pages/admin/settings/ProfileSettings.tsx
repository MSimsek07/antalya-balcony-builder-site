
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProfileSettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Ayarlar kaydedildi",
        description: "Profil bilgileriniz başarıyla kaydedildi.",
      });
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Profil Ayarları</h1>
        <p className="text-gray-500">Kişisel bilgilerinizi güncelleyin</p>
      </div>

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
    </div>
  );
};

export default AdminProfileSettings;
