import { useState, FormEvent, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Save, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebaseConfig"; // Import Firebase auth instance
import { 
  EmailAuthProvider, 
  reauthenticateWithCredential, 
  updatePassword, 
  signOut // Import signOut 
} from "firebase/auth";

const AdminSecuritySettings = () => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password validation function
  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return "Yeni şifre en az 6 karakter olmalıdır.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Yeni şifre en az bir büyük harf içermelidir.";
    }
    if (!/[a-z]/.test(password)) {
      return "Yeni şifre en az bir küçük harf içermelidir.";
    }
    if (!/[0-9]/.test(password)) {
      return "Yeni şifre en az bir rakam içermelidir.";
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return "Yeni şifre en az bir özel karakter içermelidir (örn: !@#$%^&*).";
    }
    return null; // Password is valid
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic checks
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Yeni şifreler eşleşmiyor.");
      return;
    }

    // Validate new password complexity
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    const user = auth.currentUser;
    if (!user || !user.email) {
      setError("Kullanıcı oturumu bulunamadı veya e-posta bilgisi eksik. Lütfen tekrar giriş yapın.");
      // Optional: Redirect to login
      // setTimeout(() => navigate('/admin/login'), 3000);
      return;
    }

    setIsLoading(true);
    try {
      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Re-authentication successful, now update the password
      await updatePassword(user, newPassword);

      // Password updated successfully
      setSuccess("Şifreniz başarıyla değiştirildi. Güvenlik nedeniyle tekrar giriş yapmanız gerekebilir. Yeni şifrenizi not almayı unutmayın!");
      toast({
        title: "Başarılı",
        description: "Şifreniz güncellendi.",
      });
      // Clear fields after success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Optional: Force sign out after successful password change for security
      // setTimeout(async () => {
      //   await signOut(auth);
      //   navigate('/admin/login'); 
      // }, 3000); // Sign out after 3 seconds

    } catch (err: any) {
      console.error("Password change error:", err);
      if (err.code === 'auth/wrong-password') {
        setError("Mevcut şifreniz yanlış. Lütfen kontrol edin.");
      } else if (err.code === 'auth/weak-password') {
        setError("Yeni şifre yeterince güçlü değil. Lütfen gereksinimleri kontrol edin.");
      } else if (err.code === 'auth/requires-recent-login') {
        setError("Güvenlik nedeniyle bu işlem hassas kabul edildi ve yakın zamanda giriş yapmanızı gerektiriyor. Lütfen çıkış yapıp tekrar giriş yapın ve şifrenizi değiştirmeyi deneyin.");
      } else {
        setError(`Bir hata oluştu: ${err.message}`);
      }
      toast({
        title: "Hata",
        description: "Şifre değiştirilemedi. Lütfen hatayı kontrol edin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Güvenlik Ayarları</h1>
        <p className="text-gray-500">Hesap şifrenizi güvenle değiştirin.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Şifre Değiştir</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Hata</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert> {/* Removed variant="success" */}
                <CheckCircle className="h-4 w-4" /> 
                <AlertTitle>Başarılı</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium">Mevcut Şifre</label>
              <Input 
                id="currentPassword"
                type="password" 
                value={currentPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
                required 
                disabled={isLoading}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium">Yeni Şifre</label>
                <Input 
                  id="newPassword"
                  type="password" 
                  value={newPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">Yeni Şifre (Tekrar)</label>
                <Input 
                  id="confirmPassword"
                  type="password" 
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password requirements info */} 
            <div className="text-xs text-gray-500">
              Yeni şifre en az 6 karakter olmalı ve şunları içermelidir: 
              bir büyük harf (A-Z), bir küçük harf (a-z), bir rakam (0-9) ve 
              bir özel karakter (örn: !@#$%^&*).
            </div>
            
            {/* Removed 2FA section */}
            
            <Button 
              type="submit"
              className="bg-theme-teal hover:bg-theme-teal/90 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {isLoading ? "Kaydediliyor..." : "Şifreyi Değiştir"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSecuritySettings;
