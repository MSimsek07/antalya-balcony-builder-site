import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Updated interface to include telephone2
interface CompanyInfo {
  address: string;
  telephone: string;
  telephone2?: string; // Optional second phone number
  email: string;
  workingHours: string;
  updatedAt?: any;
}

const AdminCompanySettings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CompanyInfo>({
    address: "",
    telephone: "",
    telephone2: "", // Initialize second phone number
    email: "",
    workingHours: "",
  });

  const companyInfoRef = doc(db, "settings", "companyInfo");

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const docSnap = await getDoc(companyInfoRef);
        if (isMounted) {
          if (docSnap.exists()) {
            // Ensure telephone2 defaults to empty string if not present in Firestore
            const data = docSnap.data() as CompanyInfo;
            setFormData({ telephone2: "", ...data }); // Spread existing data, ensuring telephone2 has a default
          } else {
            console.log("No company info document found, initializing form.");
            setFormData({ address: "", telephone: "", telephone2: "", email: "", workingHours: "" });
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching company info:", error);
          toast({
            title: "Hata",
            description: "Şirket bilgileri alınırken bir hata oluştu.",
            variant: "destructive",
          });
           setFormData({ address: "", telephone: "", telephone2: "", email: "", workingHours: "" });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep dependencies minimal - only run once on mount

  // Memoize handleChange using useCallback
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []); // Empty dependency array means the function reference is stable

  // Memoize handleSave using useCallback
  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const dataToSave = {
        ...formData,
        // Explicitly include telephone2, even if empty, to ensure it's saved
        telephone2: formData.telephone2 || "", 
        updatedAt: serverTimestamp(),
      };
      await setDoc(companyInfoRef, dataToSave, { merge: true });

      toast({
        title: "Ayarlar kaydedildi",
        description: "Şirket bilgileriniz başarıyla güncellendi.",
      });
    } catch (error) {
      console.error("Error saving company info:", error);
      toast({
        title: "Hata",
        description: "Şirket bilgileri kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, toast]); // Dependencies: formData (to save current value) and toast

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-8 w-8 text-theme-teal animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Şirket Ayarları</h1>
        <p className="text-gray-500">Genel şirket bilgilerini yönetin</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>İletişim ve Çalışma Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Şirketinizin tam adresi"
                rows={3}
              />
            </div>

            {/* Telephone Numbers in a Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telephone">Telefon Numarası 1</Label>
                <Input
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="+90 XXX XXX XX XX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone2">Telefon Numarası 2 (Opsiyonel)</Label>
                <Input
                  id="telephone2"
                  name="telephone2"
                  value={formData.telephone2 || ''} // Ensure value is controlled and defaults to empty string
                  onChange={handleChange}
                  placeholder="+90 YYY YYY YY YY"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta Adresi</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="info@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workingHours">Çalışma Saatleri</Label>
              <Input
                id="workingHours"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                placeholder="Örn: Hafta içi 09:00 - 18:00, Cmt 10:00 - 15:00"
              />
            </div>

            <Button
              type="submit"
              className="bg-theme-teal hover:bg-theme-teal/90 flex items-center"
              disabled={saving || loading}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCompanySettings;
