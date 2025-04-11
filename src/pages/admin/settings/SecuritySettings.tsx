
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSecuritySettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Ayarlar kaydedildi",
        description: "Güvenlik ayarlarınız başarıyla kaydedildi.",
      });
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Güvenlik Ayarları</h1>
        <p className="text-gray-500">Şifre ve güvenlik seçeneklerinizi yönetin</p>
      </div>

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
    </div>
  );
};

export default AdminSecuritySettings;
