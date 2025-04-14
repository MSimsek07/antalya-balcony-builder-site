import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth } from "@/firebaseConfig"; // Import your Firebase auth instance

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "", // Changed from username to email
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      toast({
        title: "Giriş başarılı",
        description: "Yönetim paneline yönlendiriliyorsunuz.",
      });
      onLogin(); // Call the onLogin prop to update the parent state if needed
      navigate("/admin"); // Navigate to the admin dashboard
    } catch (error: any) {
      console.error("Firebase Authentication Error:", error); // Log the error for debugging
      // Map common Firebase errors to user-friendly messages
      let description = "Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        description = "E-posta veya şifre hatalı.";
      } else if (error.code === 'auth/invalid-email') {
        description = "Geçersiz e-posta formatı.";
      } else {
        description = `Bir hata oluştu: ${error.message}`; // More specific error if available
      }

      toast({
        title: "Giriş başarısız",
        description: description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <Link
          to="/"
          className="inline-flex items-center text-theme-teal hover:text-theme-teal/90 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Ana Sayfaya Dön
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-theme-blue">Cam Balkon Antalya</h1>
          <p className="text-gray-600 mt-2">Yönetim Paneli Girişi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-posta {/* Changed label */}
            </label>
            <Input
              id="email" // Changed id
              name="email" // Changed name
              type="email" // Ensure type is email
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="admin@example.com" // Added placeholder
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="********" // Added placeholder
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-theme-teal hover:bg-theme-teal/90"
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>

        {/* Commenting out password reset as signup is disabled and users are pre-added
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Şifrenizi mi unuttunuz?{" "}
            <a href="#" className="text-theme-teal hover:underline">
              Yardım alın
            </a>
          </p>
        </div>
        */}

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Cam Balkon Antalya. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
