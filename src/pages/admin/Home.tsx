import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Image, ArrowUpRight, Loader2 } from "lucide-react"; // Added Loader2
import { useNavigate } from "react-router-dom";
import { db, COLLECTIONS } from "@/firebaseConfig"; // Import Firestore instance and collections
import { collection, onSnapshot, query } from "firebase/firestore"; // Import onSnapshot

const AdminHome = () => {
  const navigate = useNavigate();
  const [serviceCount, setServiceCount] = useState<number | null>(null);
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Dynamic Date --- 
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('tr-TR', options); // Format for Turkish
  };
  const currentDate = getCurrentDate();

  // --- Firestore Realtime Counts --- 
  useEffect(() => {
    setIsLoading(true);
    const servicesQuery = query(collection(db, COLLECTIONS.SERVICES));
    const projectsQuery = query(collection(db, COLLECTIONS.PROJECTS));

    const unsubscribeServices = onSnapshot(servicesQuery, (snapshot) => {
      setServiceCount(snapshot.size);
      // Check if both counts are loaded
      if (projectCount !== null) setIsLoading(false);
    }, (error) => {
      console.error("Error fetching service count:", error);
      setServiceCount(0); // Show 0 on error
      if (projectCount !== null) setIsLoading(false);
    });

    const unsubscribeProjects = onSnapshot(projectsQuery, (snapshot) => {
      setProjectCount(snapshot.size);
      // Check if both counts are loaded
      if (serviceCount !== null) setIsLoading(false);
    }, (error) => {
      console.error("Error fetching project count:", error);
      setProjectCount(0); // Show 0 on error
      if (serviceCount !== null) setIsLoading(false);
    });

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeServices();
      unsubscribeProjects();
    };
  }, [projectCount, serviceCount]); // Re-run if counts are initially null and one updates

  // --- Stats Data (Now Dynamic) --- 
  const stats = [
    {
      title: "Toplam Hizmet",
      value: serviceCount,
      icon: Package,
      link: "/admin/services",
      loading: serviceCount === null
    },
    {
      title: "Toplam Proje",
      value: projectCount,
      icon: Image,
      link: "/admin/projects",
      loading: projectCount === null
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-theme-blue">Yönetim Paneli</h1>
        {/* Updated Greeting */} 
        <p className="text-gray-500">Hoş geldiniz! Bugün {currentDate}. Yönetim panelinden sitenizi kolayca yönetebilirsiniz.</p>
      </div>

      {/* Stats Cards */} 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-theme-blue">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-theme-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-theme-blue">
                {stat.loading ? (
                  <Loader2 className="h-7 w-7 animate-spin text-theme-teal" />
                ) : (
                  stat.value ?? 0 // Display count or 0 if null
                )}
              </div>
              {/* Optional: Add back change/trend if needed, potentially calculating based on previous counts */}
              {/* <p className="text-xs text-gray-500 mt-1">+2 son 30 günde</p> */} 
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-theme-teal hover:text-theme-teal/80 px-0"
                onClick={() => navigate(stat.link)}
              >
                Detayları Gör <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Optional: Add quick links or recent activity section here */}
      {/* 
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/admin/services/new')}>Yeni Hizmet Ekle</Button>
          <Button onClick={() => navigate('/admin/projects/new')} className="ml-4">Yeni Proje Ekle</Button>
        </CardContent>
      </Card> 
      */}
    </div>
  );
};

export default AdminHome;
