import { useState, useEffect, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db, COLLECTIONS } from "@/firebaseConfig"; // Import Firestore instance and collections
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

// Interface for Website Settings
interface WebsiteSettingsData {
  siteTitle: string;
  siteDescription: string;
  faceAccount: string;
  instagramAccount: string;
  xAccount: string;
}

const AdminWebsiteSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<WebsiteSettingsData>({
    siteTitle: "",
    siteDescription: "",
    faceAccount: "",
    instagramAccount: "",
    xAccount: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Reference to the Firestore document
  const settingsDocRef = doc(db, COLLECTIONS.SETTINGS, "websiteConfig");

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data() as WebsiteSettingsData);
        } else {
          console.log("No website settings document found! Creating one with defaults.");
          // Optionally create the document with default values if it doesn't exist
          // await setDoc(settingsDocRef, settings); 
        }
      } catch (error) {
        console.error("Error fetching website settings:", error);
        toast({
          title: "Hata",
          description: "Web sitesi ayarları yüklenirken bir hata oluştu.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []); // Removed settingsDocRef from dependency array as it's stable

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  // Handle saving settings to Firestore
  const handleSave = async () => {
    if (isLoading) return; // Don't save if still loading initial data
    setSaving(true);
    try {
      await setDoc(settingsDocRef, settings, { merge: true }); // Use merge: true to avoid overwriting other fields if any
      toast({
        title: "Başarılı",
        description: "Web sitesi ayarları başarıyla kaydedildi.",
      });
    } catch (error) {
      console.error("Error saving website settings:", error);
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Web Sitesi Ayarları</h1>
        <p className="text-gray-500">Web sitesinin genel görünümünü ve sosyal medya bağlantılarını güncelleyin.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Genel Ayarlar ve Sosyal Medya</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
             <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 text-theme-teal animate-spin" />
             </div>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="siteTitle" className="text-sm font-medium">Site Başlığı (Ana Sayfa Hero)</label>
                <Input
                  id="siteTitle"
                  name="siteTitle"
                  value={settings.siteTitle}
                  onChange={handleChange}
                  placeholder="Örn: Antalya'nın Lider Cam Balkon Firması"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="siteDescription" className="text-sm font-medium">Site Açıklaması (Ana Sayfa Hero & Footer)</label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  placeholder="Sitenizin kısa bir açıklaması..."
                  rows={4}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                 <label className="text-sm font-medium block mb-2">Sosyal Medya Hesapları (URL)</label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <label htmlFor="faceAccount" className="text-xs text-gray-600">Facebook</label>
                     <Input
                       id="faceAccount"
                       name="faceAccount"
                       value={settings.faceAccount}
                       onChange={handleChange}
                       placeholder="https://facebook.com/kullaniciadi"
                     />
                   </div>
                   <div className="space-y-1">
                      <label htmlFor="instagramAccount" className="text-xs text-gray-600">Instagram</label>
                      <Input
                       id="instagramAccount"
                       name="instagramAccount"
                       value={settings.instagramAccount}
                       onChange={handleChange}
                       placeholder="https://instagram.com/kullaniciadi"
                      />
                   </div>
                   <div className="space-y-1">
                     <label htmlFor="xAccount" className="text-xs text-gray-600">X (Twitter)</label>
                     <Input
                       id="xAccount"
                       name="xAccount"
                       value={settings.xAccount}
                       onChange={handleChange}
                       placeholder="https://twitter.com/kullaniciadi"
                     />
                   </div>
                 </div>
              </div>

              <Button
                className="bg-theme-teal hover:bg-theme-teal/90 flex items-center"
                onClick={handleSave}
                disabled={saving || isLoading}
              >
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWebsiteSettings;
