import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Loader2 } from 'lucide-react'; // Import the loader icon

interface ProtectedRouteProps {
  redirectPath: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath,
  children,
}) => {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Optional: Add a small delay to prevent flickering if auth state resolves very quickly
      // setTimeout(() => setLoading(false), 150); // Example delay
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Show a loading state while checking authentication
  if (loading) {
    // Display a centered, spinning loader icon
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="h-10 w-10 text-theme-teal animate-spin" />
      </div>
    );
  }

  // If no user is logged in, redirect to the specified path
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If user is authenticated, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
